import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function CampaignHome({campaign, setCampaign}) {
    let { campaignId } = useParams();
    const [campaignDescription, setCampaignDescription] = useState('')

    useEffect(function() {
        async function getCurCampaign() {
            const curCampaign = await campaignsAPI.getCurCampaign(campaignId);
            setCampaign(curCampaign)
        }
        getCurCampaign();
    }, []);

    async function addDescription(evt) {
        evt.preventDefault();
        const updatedCampaign = await campaignsAPI.addCampaignDescription(campaign.name, campaignDescription);
        setCampaign(updatedCampaign)
        setCampaignDescription('');
    };

    return(
        <>
            <h1>{campaign.name}</h1>
            <p>{campaign.description}</p>
            <form autoComplete="off" onSubmit={addDescription}>
                <label style={{color: 'black'}}>Add Campaign Description:</label>
                <input type="text" name='name' onChange={(evt) => setCampaignDescription(evt.target.value)} value={campaignDescription} required />
                <button type="submit">Add Description</button>
            </form>
        </>
    )
}