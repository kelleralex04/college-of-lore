import { useEffect, useState } from "react";
import CampaignDetail from "../../components/CampaignDetail/CampaignDetail";
import CategoryDetail from "../../components/CategoryDetail/CategoryDetail"
import SubjectDetail from "../../components/SubjectDetail/SubjectDetail"
import SessionNoteDetail from "../../components/SessionNoteDetail/SessionNoteDetail"
import SubjectNoteDetail from "../../components/SubjectNoteDetail/SubjectNoteDetail";
import CampaignSettings from "../../components/CampaignSettings/CampaignSettings";
import FullscreenImage from "../../components/FullscreenImage/FullscreenImage";

export default function CampaignHome({campaign, setCampaign, category, setCategory, currentMain, setCurrentMain, sessionNote, setSessionNote, subject, setSubject, subjectAdded, 
    setShowSettings, showCategoryDescriptionInput, setShowCategoryDescriptionInput}) {
    const [campaignNoteTitle, setCampaignNoteTitle] = useState('')
    const [campaignNoteDate, setCampaignNoteDate] = useState('')
    const [campaignNote, setCampaignNote] = useState('')
    const [subjectNote, setSubjectNote] = useState({})
    const [subjectNoteContent, setSubjectNoteContent] = useState('')
    const [subjectNoteTitle, setSubjectNoteTitle] = useState('')
    const [subjectNoteDate, setSubjectNoteDate] = useState('')
    const [curImage, setCurImage] = useState(null)

    useEffect(function() {
        setShowSettings(true)
    }, [])

    return (
        <>
            {currentMain === 'CampaignDetail' && <CampaignDetail campaign={campaign} setCampaign={setCampaign} setCurrentMain={setCurrentMain} setSessionNote={setSessionNote}
            campaignNoteTitle={campaignNoteTitle} setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate}
            campaignNote={campaignNote} setCampaignNote={setCampaignNote} curImage={curImage} setCurImage={setCurImage} />}
            {currentMain === 'CategoryDetail' && <CategoryDetail campaign={campaign} setCampaign={setCampaign} category={category} setCategory={setCategory} setCurrentMain={setCurrentMain} 
            setSubject={setSubject} subjectAdded={subjectAdded} showCategoryDescriptionInput={showCategoryDescriptionInput} setShowCategoryDescriptionInput={setShowCategoryDescriptionInput} />}
            {currentMain === 'SubjectDetail' && <SubjectDetail subject={subject} setSubject={setSubject} setCurrentMain={setCurrentMain} setSubjectNote={setSubjectNote} 
            subjectNoteContent={subjectNoteContent} setSubjectNoteContent={setSubjectNoteContent} subjectNoteTitle={subjectNoteTitle} setSubjectNoteTitle={setSubjectNoteTitle} 
            subjectNoteDate={subjectNoteDate} setSubjectNoteDate={setSubjectNoteDate} category={category} setCategory={setCategory} />}
            {currentMain === 'SessionNoteDetail' && <SessionNoteDetail campaign={campaign} sessionNote={sessionNote} setSessionNote={setSessionNote} campaignNoteTitle={campaignNoteTitle} 
            setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate} campaignNote={campaignNote} 
            setCampaignNote={setCampaignNote} setCurrentMain={setCurrentMain} />}
            {currentMain === 'SubjectNoteDetail' && <SubjectNoteDetail subjectNote={subjectNote} setSubjectNote={setSubjectNote} subjectNoteContent={subjectNoteContent} 
            setSubjectNoteContent={setSubjectNoteContent} subjectNoteTitle={subjectNoteTitle} setSubjectNoteTitle={setSubjectNoteTitle} subjectNoteDate={subjectNoteDate}
            setSubjectNoteDate={setSubjectNoteDate} subject={subject} setCurrentMain={setCurrentMain} />}
            {currentMain === 'CampaignSettings' && <CampaignSettings campaign={campaign} />}
            {currentMain === 'FullscreenImage' && <FullscreenImage curImage={curImage} setCurrentMain={setCurrentMain} />}
        </>
    )
}