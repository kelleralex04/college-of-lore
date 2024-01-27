import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function CampaignHome({campaign, setCampaign}) {
    let { id } = useParams();
    

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