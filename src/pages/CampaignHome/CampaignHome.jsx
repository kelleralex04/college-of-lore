import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function CampaignHome() {
    let { id } = useParams();
    const [campaign, setCampaign] = useState({})

    useEffect(function() {
        async function getCurCampaign() {
            const curCampaign = await campaignsAPI.getCurCampaign(id);
            setCampaign(curCampaign)
        }
        getCurCampaign();
    }, []);

    return(
        <h1>{campaign.name}</h1>
    )
}