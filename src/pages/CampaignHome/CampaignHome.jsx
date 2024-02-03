import { useEffect, useState } from "react";
import CampaignDetail from "../../components/CampaignDetail/CampaignDetail";
import CategoryDetail from "../../components/CategoryDetail/CategoryDetail"
import SubjectDetail from "../../components/SubjectDetail/SubjectDetail"
import SessionNoteDetail from "../../components/SessionNoteDetail/SessionNoteDetail"
import CampaignSettings from "../../components/CampaignSettings/CampaignSettings";

export default function CampaignHome({campaign, setCampaign, category, setCategory, currentMain, setCurrentMain, sessionNote, setSessionNote, subject, setSubject, subjectAdded, 
    setShowSettings}) {
    const [campaignNoteTitle, setCampaignNoteTitle] = useState('')
    const [campaignNoteDate, setCampaignNoteDate] = useState('')
    const [campaignNote, setCampaignNote] = useState('')

    useEffect(function() {
        setShowSettings(true)
    }, [])

    return (
        <>
            {currentMain === 'CampaignDetail' && <CampaignDetail campaign={campaign} setCampaign={setCampaign} setCurrentMain={setCurrentMain} setSessionNote={setSessionNote}
            campaignNoteTitle={campaignNoteTitle} setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate}
            campaignNote={campaignNote} setCampaignNote={setCampaignNote} />}
            {currentMain === 'CategoryDetail' && <CategoryDetail campaign={campaign} category={category} setCategory={setCategory} setCurrentMain={setCurrentMain} setSubject={setSubject} 
            subjectAdded={subjectAdded} />}
            {currentMain === 'SubjectDetail' && <SubjectDetail subject={subject} />}
            {currentMain === 'SessionNoteDetail' && <SessionNoteDetail sessionNote={sessionNote} setSessionNote={setSessionNote} campaignNoteTitle={campaignNoteTitle} 
            setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate} campaignNote={campaignNote} 
            setCampaignNote={setCampaignNote} />}
            {currentMain === 'CampaignSettings' && <CampaignSettings campaign={campaign} />}
        </>
    )
}