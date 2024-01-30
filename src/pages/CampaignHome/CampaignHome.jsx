import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as campaignsAPI from '../../utilities/campaigns-api';
import './CampaignHome.css'

export default function CampaignHome({campaign, setCampaign, campaigns, setCampaigns, getCurCampaign}) {
    let { campaignId } = useParams();
    const [campaignDescription, setCampaignDescription] = useState('')

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
    };

    return(
        <div className="campaignHome">
            {campaign.description ?
                <p>{campaign.description}</p>
                :
                <form autoComplete="off" onSubmit={addDescription}>
                    <label style={{color: 'black'}}>Add Campaign Description:</label>
                    <input type="text" name='name' onChange={(evt) => setCampaignDescription(evt.target.value)} value={campaignDescription} required />
                    <button type="submit">Add Description</button>
                </form>
            }
        </div>
    )
}