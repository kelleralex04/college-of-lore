import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as campaignsAPI from '../../utilities/campaigns-api';
import * as notesAPI from '../../utilities/notes-api';
import './CampaignDetail.css'

export default function CampaignDetail({campaign, setCampaign, setCurrentMain, setSessionNote, campaignNote, setCampaignNote, campaignNoteTitle, setCampaignNoteTitle, campaignNoteDate, 
    setCampaignNoteDate}) {
    let { campaignId } = useParams();

    const [campaignDescription, setCampaignDescription] = useState('')
    const [showDescriptionInput, setShowDescriptionInput] = useState(false)
    const [showSessionNoteInput, setShowSessionNoteInput] = useState(false)

    useEffect(function() {
        async function getCurCampaign(campaignId) {
            const curCampaign = await campaignsAPI.getCurCampaign(campaignId);
            setCampaign(curCampaign)
        }
        getCurCampaign(campaignId)
    }, [])

    async function addDescription(evt) {
        evt.preventDefault();
        const updatedCampaign = await campaignsAPI.addCampaignDescription(campaign._id, campaignDescription.replace(/\n/g, '<br>'));
        setCampaign(updatedCampaign)
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
    };


    function showEditDescription() {
        setShowDescriptionInput(true);
        setCampaignDescription(campaign.description);
    }

    function openSessionNote(note) {
        setCurrentMain('SessionNoteDetail')
        setSessionNote(note)
    }

    return(
        <div className="campaignDetail">
            {campaign.description ?
                <div className="edit-description">
                    {showDescriptionInput ?
                        <form autoComplete="off" onSubmit={addDescription} className="campaign-description-form">
                            <label style={{color: 'black'}}>Edit Campaign Description:</label>
                            <textarea name='name' onChange={(evt) => setCampaignDescription(evt.target.value)} value={campaignDescription} required />
                            <button type="submit">Edit Description</button>
                        </form>
                        :
                        <div className="description">
                            <p>{campaign.description}</p>
                            <button onClick={() => showEditDescription()}>Edit Description</button>
                        </div>
                    }
                </div>
                :
                <form autoComplete="off" onSubmit={addDescription} className="campaign-description-form">
                    <div className="label-input">
                        <label style={{color: 'black'}}>Add Campaign Description:</label>
                        <textarea name='name' onChange={(evt) => setCampaignDescription(evt.target.value)} value={campaignDescription} required />
                    </div>
                    <button type="submit">Add Description</button>
                </form>
            }
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
                        <textarea name='name' onChange={(evt) => setCampaignNote(evt.target.value)} value={campaignNote} placeholder="Lorem ipsum dolor sit amet..." required />
                    </div>
                    <div>
                        <button onClick={() => setShowSessionNoteInput(false)}>Cancel</button>
                        <button type="submit">Add Note</button>
                    </div>
                </form>
            :
                <button onClick={() => setShowSessionNoteInput(true)}>Add Session Note</button>
            }
        </div>
    )
}