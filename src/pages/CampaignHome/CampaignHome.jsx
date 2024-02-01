import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SessionNoteLink from "../../components/SessionNoteLink/SessionNoteLink";
import * as campaignsAPI from '../../utilities/campaigns-api';
import * as notesAPI from '../../utilities/notes-api';
import './CampaignHome.css'

export default function CampaignHome({campaign, setCampaign, campaigns, setCampaigns, getCurCampaign}) {
    let { campaignId } = useParams();
    const [campaignDescription, setCampaignDescription] = useState('')
    const [campaignNoteTitle, setCampaignNoteTitle] = useState('')
    const [campaignNoteDate, setCampaignNoteDate] = useState('')
    const [campaignNote, setCampaignNote] = useState('')
    const [showDescriptionInput, setShowDescriptionInput] = useState(false)

    useEffect(function() {
        getCurCampaign(campaignId);
    }, []);

    async function addDescription(evt) {
        evt.preventDefault();
        const updatedCampaign = await campaignsAPI.addCampaignDescription(campaign.name, campaignDescription.replace(/\n/g, '<br>'));
        setCampaign(updatedCampaign)
        const updatedCampaigns = campaigns.map((c) => {
            if (c.name === campaign.name) {
                return updatedCampaign
            } else {
                return c
            }
        })
        setCampaigns(updatedCampaigns)
        setCampaignDescription('');
        setShowDescriptionInput(false)
    };

    async function addCampaignNote(evt) {
        evt.preventDefault();
        const updatedCampaign = await notesAPI.addCampaignNote(campaign.name, campaignNoteTitle, campaignNoteDate, campaignNote.replace(/\n/g, '<br>'));
        setCampaign(updatedCampaign)
        const updatedCampaigns = campaigns.map((c) => {
            if (c.name === campaign.name) {
                return updatedCampaign
            } else {
                return c
            }
        })
        setCampaigns(updatedCampaigns)
        setCampaignNote('');
        setCampaignNoteTitle('');
        setCampaignNoteDate('');
    };

    function showEditDescription() {
        setShowDescriptionInput(true);
        setCampaignDescription(campaign.description);
    }

    return(
        <div className="campaignHome">
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
                                <SessionNoteLink campaign={campaign.name} note={n} key={idx} />
                            ))}
                        </tbody>
                        :
                        <p>No Notes</p>
                    }
            </table>
            <form autoComplete="off" onSubmit={addCampaignNote} className="session-note-form">
                <div className="label-input">
                    <label style={{color: 'black'}}>Add Session Note:</label>
                    <input type="text" name='title' onChange={(evt) => setCampaignNoteTitle(evt.target.value)} value={campaignNoteTitle} placeholder="Title" required />
                    <input type="date" name='date' onChange={(evt) => setCampaignNoteDate(evt.target.value)} value={campaignNoteDate} required />
                    <textarea name='name' onChange={(evt) => setCampaignNote(evt.target.value)} value={campaignNote} placeholder="Lorem ipsum dolor sit amet..." required />
                </div>
                <button type="submit">Add Note</button>
            </form>
        </div>
    )
}