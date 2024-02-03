import { useState } from "react";
import CampaignDetail from "../../components/CampaignDetail/CampaignDetail";
import CategoryDetail from "../../components/CategoryDetail/CategoryDetail"
import SubjectDetail from "../../components/SubjectDetail/SubjectDetail"
import SessionNoteDetail from "../../components/SessionNoteDetail/SessionNoteDetail"

export default function CampaignHome({campaign, setCampaign, category, setCategory, currentMain, setCurrentMain, sessionNote, setSessionNote, subject, setSubject}) {

    const [campaignNoteTitle, setCampaignNoteTitle] = useState('')
    const [campaignNoteDate, setCampaignNoteDate] = useState('')
    const [campaignNote, setCampaignNote] = useState('')

    return (
        <>
            {currentMain === 'CampaignDetail' && <CampaignDetail campaign={campaign} setCampaign={setCampaign} setCurrentMain={setCurrentMain} setSessionNote={setSessionNote}
            campaignNoteTitle={campaignNoteTitle} setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate}
            campaignNote={campaignNote} setCampaignNote={setCampaignNote} />}
            {currentMain === 'CategoryDetail' && <CategoryDetail category={category} setCategory={setCategory} setCurrentMain={setCurrentMain} setSubject={setSubject} />}
            {currentMain === 'SubjectDetail' && <SubjectDetail subject={subject} />}
            {currentMain === 'SessionNoteDetail' && <SessionNoteDetail sessionNote={sessionNote} setSessionNote={setSessionNote} campaignNoteTitle={campaignNoteTitle} 
            setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate} campaignNote={campaignNote} 
            setCampaignNote={setCampaignNote} />}
        </>
    )
}