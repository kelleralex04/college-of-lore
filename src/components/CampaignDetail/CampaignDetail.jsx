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
        setShowDescriptionInput(false);
        setShowSessionNoteInput(true);
        setCampaignDescriptionHeight("short-campaign-description");
    }

    function closeSessionNoteInput() {
        setShowSessionNoteInput(false);
        setCampaignDescriptionHeight("tall-campaign-description");
    }

    return(
        <div className="campaignDetail">
            <div className="edit-description" id={campaignDescriptionHeight}>
                {showDescriptionInput ?
                    <form autoComplete="off" onSubmit={editCampaign} className="campaign-description-form">
                        <label style={{color: 'black'}}>Edit Campaign Name:</label>
                        <input style={{color: 'black'}} type="text" onChange={(evt) => setCampaignName(evt.target.value)} value={campaignName} required />
                        <label style={{color: 'black'}}>Edit Campaign Description:</label>
                        <textarea name='name' onChange={(evt) => setCampaignDescription(evt.target.value)} value={campaignDescription} />
                        <button type="submit">Save</button>
                    </form>
                    :
                    <div className="description">
                        {campaign.description ?
                            <p>{campaign.description}</p>
                            :
                            <p>No description yet...</p>
                        }
                        <button onClick={() => showEditCampaign()}>Edit Campaign</button>
                    </div>
                }
            </div>
            <table className="session-note-table">
                <thead className="header-row">
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                    {campaign.sessionNote ?
                        <tbody className="table-body">
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
                        <label style={{color: 'black'}}>Add Session Note:</label>
                        <input type="text" name='title' onChange={(evt) => setCampaignNoteTitle(evt.target.value)} value={campaignNoteTitle} placeholder="Title" required />
                        <input type="date" name='date' onChange={(evt) => setCampaignNoteDate(evt.target.value)} value={campaignNoteDate} required />
                        <textarea id="campaign-note-input" name='name' onChange={(evt) => setCampaignNote(evt.target.value)} value={campaignNote} placeholder="Lorem ipsum dolor sit amet..." required />
                    </div>
                    <div>
                        <button onClick={() => closeSessionNoteInput()}>Cancel</button>
                        <button type="submit">Add Note</button>
                    </div>
                </form>
            :
                <button onClick={() => openSessionNoteInput()}>Add Session Note</button>
            }
        </div>
    )
}