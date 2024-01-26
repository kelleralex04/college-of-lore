import { useState, useEffect } from "react";
import CampaignLink from '../../components/CampaignLink/CampaignLink';
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function CampaignIndex() {
    const [campaigns, setCampaigns] = useState([])
    const [newCampaign, setNewCampaign] = useState('')

    useEffect(function() {
        async function getCampaigns() {
            const campaignList = await campaignsAPI.getCampaignList();
            setCampaigns(...campaigns, campaignList)
        }
        getCampaigns()
    }, []);
    
    async function addCampaign(evt) {
        evt.preventDefault();
        const updatedCampaign = await campaignsAPI.addCampaign(newCampaign);
        setCampaigns([...campaigns, updatedCampaign]);
        setNewCampaign('');
    };

    return (
        <>
            <h1>Campaign Index</h1>
            <ul>
                {campaigns.map((c, idx) => (
                    <CampaignLink campaign={c.name} key={idx} />
                ))}
            </ul>
            <form autoComplete="off" onSubmit={addCampaign}>
                <label style={{color: 'black'}}>New Campaign:</label>
                <input type="text" name='name' onChange={(evt) => setNewCampaign(evt.target.value)} value={newCampaign} required />
                <button type="submit">Add Campaign</button>
            </form>
        </>
    )
}