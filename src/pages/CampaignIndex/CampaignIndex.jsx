import { useState, useEffect } from "react";
import CampaignLink from '../../components/CampaignLink/CampaignLink';
import * as campaignsAPI from '../../utilities/campaigns-api';
import './CampaignIndex.css'

export default function CampaignIndex({setCampaign, campaigns, setCampaigns, getCampaigns, setCurrentMain, setShowSettings}) {
    const [newCampaign, setNewCampaign] = useState('')

    useEffect(function() {
        getCampaigns();
        setCampaign({});
        setCurrentMain('CampaignDetail');
        setShowSettings(false);
    }, [])

    async function addCampaign(evt) {
        evt.preventDefault();
        const updatedCampaign = await campaignsAPI.addCampaign(newCampaign);
        setCampaigns([...campaigns, updatedCampaign]);
        setNewCampaign('');
    };

    return (
        <div className="campaignIndex">
            <h1>Campaign Index</h1>
            <ul>
                {campaigns.map((c, idx) => (
                    <CampaignLink campaign={c} key={idx} />
                ))}
            </ul>
            <form autoComplete="off" onSubmit={addCampaign}>
                <label style={{color: 'black'}}>New Campaign:</label>
                <input type="text" name='name' onChange={(evt) => setNewCampaign(evt.target.value)} value={newCampaign} required />
                <button type="submit">Add Campaign</button>
            </form>
        </div>
    )
}