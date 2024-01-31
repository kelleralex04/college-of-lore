import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as campaignsAPI from '../../utilities/campaigns-api';
import './CampaignHome.css'

export default function CampaignHome({campaign, setCampaign, campaigns, setCampaigns, getCurCampaign}) {
    let { campaignId } = useParams();
    const [campaignDescription, setCampaignDescription] = useState('')
    const [showDescriptionInput, setShowDescriptionInput] = useState(false)

    useEffect(function() {
        getCurCampaign(campaignId);
    }, [campaignId]);

    async function addDescription(evt) {
        evt.preventDefault();
        const updatedCampaign = await campaignsAPI.addCampaignDescription(campaign.name, campaignDescription);
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

    function showEditDescription() {
        setShowDescriptionInput(true);
        setCampaignDescription(campaign.description);
    }

    return(
        <div className="campaignHome">
            {campaign.description ?
                <div>
                    {showDescriptionInput ?
                        <form autoComplete="off" onSubmit={addDescription}>
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
        </div>
    )
}