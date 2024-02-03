import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CampaignDetail from "../../components/CampaignDetail/CampaignDetail";
import CategoryDetail from "../../components/CategoryDetail/CategoryDetail"
import SubjectDetail from "../../components/SubjectDetail/SubjectDetail"
import SessionNoteDetail from "../../components/SessionNoteDetail/SessionNoteDetail"
import * as campaignsAPI from '../../utilities/campaigns-api';
import * as notesAPI from '../../utilities/notes-api';

export default function CampaignHome({campaign, setCampaign, category, setCategory, currentMain, setCurrentMain, sessionNote, setSessionNote, subject, setSubject}) {

    const [campaignNoteTitle, setCampaignNoteTitle] = useState('')
    const [campaignNoteDate, setCampaignNoteDate] = useState('')
    const [campaignNote, setCampaignNote] = useState('')

    async function addCampaignNote(evt) {
        evt.preventDefault();
        const updatedCampaign = await notesAPI.addCampaignNote(campaign._id, campaignNoteTitle, campaignNoteDate, campaignNote.replace(/\n/g, '<br>'));
        setCampaign(updatedCampaign)
        setCampaignNote('');
        setCampaignNoteTitle('');
        setCampaignNoteDate('');
    };

    async function editCampaignNote(evt) {
        evt.preventDefault();
        const updatedNote = await notesAPI.editCampaignNote(sessionNote._id, campaignNoteTitle, campaignNoteDate, campaignNote.replace(/\n/g, '<br>'));
        setSessionNote(updatedNote)
        setCampaignNote('');
        setCampaignNoteTitle('');
        setCampaignNoteDate('');
    };

    return (
        <>
            {currentMain === 'CampaignDetail' && <CampaignDetail campaign={campaign} setCampaign={setCampaign} setCurrentMain={setCurrentMain} setSessionNote={setSessionNote}
            campaignNoteTitle={campaignNoteTitle} setCampaignNoteTitle={setCampaignNoteTitle} campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate}
            campaignNote={campaignNote} setCampaignNote={setCampaignNote} addCampaignNote={addCampaignNote} />}
            {currentMain === 'CategoryDetail' && <CategoryDetail category={category} setCategory={setCategory} setCurrentMain={setCurrentMain} setSubject={setSubject} />}
            {currentMain === 'SubjectDetail' && <SubjectDetail subject={subject} />}
            {currentMain === 'SessionNoteDetail' && <SessionNoteDetail sessionNote={sessionNote} campaignNoteTitle={campaignNoteTitle} setCampaignNoteTitle={setCampaignNoteTitle} 
            campaignNoteDate={campaignNoteDate} setCampaignNoteDate={setCampaignNoteDate} campaignNote={campaignNote} setCampaignNote={setCampaignNote} editCampaignNote={editCampaignNote} />}
        </>
    )
}