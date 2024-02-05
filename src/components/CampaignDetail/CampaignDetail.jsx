import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as campaignsAPI from '../../utilities/campaigns-api';
import * as notesAPI from '../../utilities/notes-api';
import './CampaignDetail.css'

export default function CampaignDetail({campaign, setCampaign, setCurrentMain, setSessionNote, campaignNote, setCampaignNote, campaignNoteTitle, setCampaignNoteTitle, campaignNoteDate, 
    setCampaignNoteDate}) {
    let { campaignId } = useParams();
    
    const [campaignName, setCampaignName] = useState('')
    const [campaignDescription, setCampaignDescription] = useState('')
    const [showDescriptionInput, setShowDescriptionInput] = useState(false)
    const [showSessionNoteInput, setShowSessionNoteInput] = useState(false)
    const [campaignDescriptionHeight, setCampaignDescriptionHeight] = useState("tall-campaign-description")
    const [file, setFile] = useState(null)
    const [imageName, setImageName] = useState('')
    const [showImage, setShowImage] = useState(false)
    const [curImage, setCurImage] = useState(null)

    useEffect(function() {
        async function getCurCampaign(campaignId) {
            const curCampaign = await campaignsAPI.getCurCampaign(campaignId);
            setCampaign(curCampaign)
        }
        getCurCampaign(campaignId)
    }, [])

    async function editCampaign(evt) {
        evt.preventDefault();
        if (campaignDescription && campaignDescription.length > 0) {
            const updatedCampaign = await campaignsAPI.editCampaign(campaign._id, campaignName, campaignDescription.replace(/\n/g, '<br>'));
            setCampaign(updatedCampaign)
        } else {
            const updatedCampaign = await campaignsAPI.editCampaignTitle(campaign._id, campaignName);
            setCampaign(updatedCampaign)
        }
        setCampaignDescription('');
        setShowDescriptionInput(false)
    };

    async function addCampaignNote(evt) {
        evt.preventDefault();
        const updatedCampaign = await notesAPI.addCampaignNote(campaign._id, campaignNoteTitle, campaignNoteDate, campaignNote.replace(/\n/g, '<br>'));
        setCampaign(updatedCampaign)
        setCampaignNote('');
        setCampaignNoteTitle('');
        setCampaignNoteDate('');
        setShowSessionNoteInput(false);
        setCampaignDescriptionHeight("tall-campaign-description");
    };


    function showEditCampaign() {
        setShowDescriptionInput(true);
        setShowSessionNoteInput(false);
        setCampaignDescriptionHeight("tall-campaign-description");
        setCampaignName(campaign.name)
        setCampaignDescription(campaign.description);
    }

    function openSessionNote(note) {
        setCurrentMain('SessionNoteDetail')
        setSessionNote(note)
    }

    function openSessionNoteInput() {
        setCampaignNoteTitle('');
        setCampaignNoteDate('');
        setCampaignNote('');
        setCampaignNoteTitle('');
        setShowDescriptionInput(false);
        setShowSessionNoteInput(true);
        setCampaignDescriptionHeight("short-campaign-description");
    }

    function closeSessionNoteInput() {
        setShowSessionNoteInput(false);
        setCampaignDescriptionHeight("tall-campaign-description");
    }

    async function submit(evt) {
        evt.preventDefault()
    
        const formData = new FormData();
        formData.append("s3Images", file)
        const result = await fetch(`http://localhost:3000/image/upload/${campaign._id}/${imageName}`, {method: 'POST', body: formData})
        const data = await result.json()
        const updatedCampaign = await campaignsAPI.addImage(campaign._id, data.files[0].location.slice(61))
        setCampaign(updatedCampaign)
        setFile(null)
        setImageName('')
    }
    
    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    function openImage(i) {
        setShowImage(true)
        setCurImage(i.imageId)
    }

    return(
        <div className="campaignDetail">
            <div className="edit-description">
                {showDescriptionInput ?
                    <form autoComplete="off" onSubmit={editCampaign} className="campaign-description-form">
                        <label style={{color: 'black', marginTop: '3vh'}}>Edit Campaign Name:</label>
                        <input style={{color: 'black'}} type="text" onChange={(evt) => setCampaignName(evt.target.value)} value={campaignName} required />
                        <label style={{color: 'black', marginTop: '3vh'}}>Edit Campaign Description:</label>
                        <textarea name='name' onChange={(evt) => setCampaignDescription(evt.target.value)} value={campaignDescription} />
                        <button style={{width: '5vw', alignSelf: 'center'}} type="submit">Save</button>
                    </form>
                    :
                    <div>
                        <div className="description" id={campaignDescriptionHeight}>
                            {campaign.description ?
                                <p style={{marginTop: '3vh'}}>{campaign.description}</p>
                                :
                                <p>No description yet...</p>
                            }
                        </div>
                        <button onClick={() => showEditCampaign()}>Edit Campaign</button>
                    </div>
                }
            </div>
            <div className="bottom-divs">
                <div className="image-upload-div">
                    <h1>Images</h1>
                    <div className="uploadImageContainer">
                        <form onSubmit={submit}>
                            <input type="text" name="name" onChange={(evt) => setImageName(evt.target.value)} value={imageName} placeholder="Image Name" required />
                            <input onChange={fileSelected} type="file" accept="image/*" name='image'></input>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    {campaign.image ?
                        <div>
                            {campaign.image.map((i, idx) => (
                                <div className="image-name" onClick={() => openImage(i)} key={idx}>{i.name}</div>
                                // <img src={`https://college-of-lore-seir-1030.s3.us-west-2.amazonaws.com/${i}`} alt="" />
                            ))}
                        </div>
                        :
                        <h1>No images yet...</h1>
                    }
                    {showImage ?
                        <img src={`https://college-of-lore-seir-1030.s3.us-west-2.amazonaws.com/${curImage}`} alt="" />
                        :
                        <></>
                    }
                </div>
                <div className="session-note-div">
                    <table className="session-note-table">
                        <thead className="header-row">
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                            {campaign.sessionNote ?
                                <tbody className="table-body" style={{maxHeight: '10vh'}}>
                                    {campaign.sessionNote.map((n, idx) => (
                                        <tr key={idx}>
                                            <td className="note-link" onClick={() => openSessionNote(n)}>{n.title}</td>
                                            <td>{n.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                :
                                <></>
                            }
                    </table>
                    {showSessionNoteInput ?
                        <form autoComplete="off" onSubmit={addCampaignNote} className="session-note-form">
                            <div className="label-input">
                                <div className="inputs">
                                    <input type="text" name='title' onChange={(evt) => setCampaignNoteTitle(evt.target.value)} value={campaignNoteTitle} placeholder="Title" required />
                                    <input type="date" name='date' onChange={(evt) => setCampaignNoteDate(evt.target.value)} value={campaignNoteDate} required />
                                </div>
                                <textarea id="campaign-note-input" name='name' onChange={(evt) => setCampaignNote(evt.target.value)} value={campaignNote} placeholder="Lorem ipsum dolor sit amet..." required />
                            </div>
                            <div className="session-note-buttons">
                                <button onClick={() => closeSessionNoteInput()}>Cancel</button>
                                <button type="submit">Add Note</button>
                            </div>
                        </form>
                    :
                        <button onClick={() => openSessionNoteInput()}>Add Session Note</button>
                    }
                </div>
            </div>
        </div>
    )
}