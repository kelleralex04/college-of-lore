import { useEffect, useState } from "react";
import CampaignDetail from "../../components/CampaignDetail/CampaignDetail";
import CategoryDetail from "../../components/CategoryDetail/CategoryDetail"
import SubjectDetail from "../../components/SubjectDetail/SubjectDetail"
import SessionNoteDetail from "../../components/SessionNoteDetail/SessionNoteDetail"
import SubjectNoteDetail from "../../components/SubjectNoteDetail/SubjectNoteDetail";
import CampaignSettings from "../../components/CampaignSettings/CampaignSettings";

export default function CampaignHome({campaign, setCampaign, category, setCategory, currentMain, setCurrentMain, sessionNote, setSessionNote, subject, setSubject, subjectAdded, 
    setShowSettings}) {
    const [campaignNoteTitle, setCampaignNoteTitle] = useState('')
    const [campaignNoteDate, setCampaignNoteDate] = useState('')
    const [campaignNote, setCampaignNote] = useState('')
    const [subjectNote, setSubjectNote] = useState({})
    const [subjectNoteContent, setSubjectNoteContent] = useState('')
    const [subjectNoteTitle, setSubjectNoteTitle] = useState('')
    const [subjectNoteDate, setSubjectNoteDate] = useState('')

    useEffect(function() {
        setShowSettings(true)
    }, [])

    return (
        <>
            {currentMain === 'CampaignDetail' && <CampaignDetail campaign={campaign} setCampaign={setCampaign} setCurrentMain={setCurrentMain} setSessionNote={setSessionNote}
            campaignNoteTitle={campaignNoteTitle} setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate}
            campaignNote={campaignNote} setCampaignNote={setCampaignNote} />}
            {currentMain === 'CategoryDetail' && <CategoryDetail campaign={campaign} setCampaign={setCampaign} category={category} setCategory={setCategory} setCurrentMain={setCurrentMain} 
            setSubject={setSubject} subjectAdded={subjectAdded} />}
            {currentMain === 'SubjectDetail' && <SubjectDetail subject={subject} setSubject={setSubject} setCurrentMain={setCurrentMain} setSubjectNote={setSubjectNote} 
            subjectNoteContent={subjectNoteContent} setSubjectNoteContent={setSubjectNoteContent} subjectNoteTitle={subjectNoteTitle} setSubjectNoteTitle={setSubjectNoteTitle} 
            subjectNoteDate={subjectNoteDate} setSubjectNoteDate={setSubjectNoteDate} />}
            {currentMain === 'SessionNoteDetail' && <SessionNoteDetail sessionNote={sessionNote} setSessionNote={setSessionNote} campaignNoteTitle={campaignNoteTitle} 
            setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate} campaignNote={campaignNote} 
            setCampaignNote={setCampaignNote} />}
            {currentMain === 'SubjectNoteDetail' && <SubjectNoteDetail subjectNote={subjectNote} setSubjectNote={setSubjectNote} subjectNoteContent={subjectNoteContent} 
            setSubjectNoteContent={setSubjectNoteContent} subjectNoteTitle={subjectNoteTitle} setSubjectNoteTitle={setSubjectNoteTitle} subjectNoteDate={subjectNoteDate}
            setSubjectNoteDate={setSubjectNoteDate} />}
            {currentMain === 'CampaignSettings' && <CampaignSettings campaign={campaign} />}
        </>
    )
}