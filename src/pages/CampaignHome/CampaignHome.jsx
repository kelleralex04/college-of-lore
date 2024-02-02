import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CampaignDetail from "../../components/CampaignDetail/CampaignDetail";
import CategoryDetail from "../../components/CategoryDetail/CategoryDetail"
import SubjectDetail from "../../components/SubjectDetail/SubjectDetail"
import SessionNoteDetail from "../../components/SessionNoteDetail/SessionNoteDetail"
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function CampaignHome({campaign, setCampaign, category, setCategory, currentMain, setCurrentMain, sessionNote, setSessionNote}) {
    let { campaignId } = useParams();

    useEffect(function() {
        async function getCurCampaign(campaignId) {
            const curCampaign = await campaignsAPI.getCurCampaign(campaignId);
            setCampaign(curCampaign)
        }
        getCurCampaign(campaignId)
    }, [])

    return (
        <>
            {currentMain === 'CampaignDetail' && <CampaignDetail campaign={campaign} setCampaign={setCampaign} setCurrentMain={setCurrentMain} setSessionNote={setSessionNote} />}
            {currentMain === 'CategoryDetail' && <CategoryDetail category={category} setCategory={setCategory} />}
            {currentMain === 'SubjectDetail' && <SubjectDetail category={category} />}
            {currentMain === 'SessionNoteDetail' && <SessionNoteDetail sessionNote={sessionNote} />}
        </>
    )
}