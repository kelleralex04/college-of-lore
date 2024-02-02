import { useEffect, useState } from "react";
import * as campaignsAPI from '../../utilities/campaigns-api';
import './CampaignIndex.css'

export default function CampaignIndex({setCampaign, campaigns, setCampaigns, setCurrentMain}) {
    const [newCampaign, setNewCampaign] = useState('')

    useEffect(function() {
        setCampaign({})
    }, [])

    async function addCampaign(evt) {
        evt.preventDefault();
        const updatedCampaign = await campaignsAPI.addCampaign(newCampaign);
        setCampaigns([...campaigns, updatedCampaign]);
        setNewCampaign('');
    };

    function openCampaign(c) {
        setCampaign(c)
        setCurrentMain('CampaignHome')
    }

    return (
        <div className="campaignIndex">
            <h1>Campaign Index</h1>
            <ul>
                {campaigns.map((c, idx) => (
                    <li key={idx}>
                        <button onClick={() => openCampaign(c)}>{c.name}</button>
                    </li>
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