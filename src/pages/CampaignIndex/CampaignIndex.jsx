import { useState, useEffect } from "react";
import CampaignDetails from '../../components/CampaignDetails/CampaignDetails';
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function CampaignIndex() {
    const [campaigns, setCampaigns] = useState([])
    const [newCampaign, setNewCampaign] = useState('')

    useEffect(function() {
        async function getCampaigns() {
            const campaignList = await campaignsAPI.getCampaignList();
            setCampaigns(campaignList)
        }
        getCampaigns();
    }, []);
    
    async function addCampaign(evt) {
        evt.preventDefault();
        const updatedCampaignList = await campaignsAPI.addCampaign(newCampaign);
        setCampaigns(updatedCampaignList);
        setNewCampaign('');
        console.log('hi')
    };

    return (
        <>
            <h1>Campaign Index</h1>
            <ul>
                {campaigns.map((c, idx) => (
                    <CampaignDetails campaign={c.name} key={idx} />
                ))}
            </ul>
            <form autoComplete="off" onSubmit={addCampaign}>
                <label>New Campaign:</label>
                <input type="text" name='name' onChange={(evt) => setNewCampaign(evt.target.value)} value={newCampaign} required />
                <button type="submit">Add Campaign</button>
            </form>
        </>
    )
}