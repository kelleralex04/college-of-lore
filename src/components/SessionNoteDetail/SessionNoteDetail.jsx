import { useState } from 'react'
import * as notesAPI from '../../utilities/notes-api';
import './SessionNoteDetail.css'

export default function SessionNoteDetail({sessionNote, setSessionNote, campaignNote, setCampaignNote, campaignNoteTitle, setCampaignNoteTitle, campaignNoteDate, setCampaignNoteDate}) {
    const [showSessionNoteInput, setShowSessionNoteInput] = useState(false)
    const [noteHeight, setNoteHeight] = useState('tall')

    async function editCampaignNote(evt) {
        evt.preventDefault();
        const updatedNote = await notesAPI.editCampaignNote(sessionNote._id, campaignNoteTitle, campaignNoteDate, campaignNote.replace(/\n/g, '<br>'));
        setSessionNote(updatedNote)
        setShowSessionNoteInput(false)
        setNoteHeight('short')
    };

    function openSessionNoteInput() {
        setShowSessionNoteInput(true)
        setCampaignNote(sessionNote.content)
        setCampaignNoteDate(sessionNote.date)
        setCampaignNoteTitle(sessionNote.title)
        setNoteHeight('short')
    }

    function closeSessionNoteInput() {
        setShowSessionNoteInput(false)
        setNoteHeight('tall')
    }

    return(
        <div className='edit-session-note'>
            <div className="session-note">
                <h1>{sessionNote.title} &nbsp; - &nbsp; {sessionNote.date}</h1>
                <p id={noteHeight}>{sessionNote.content}</p>
            </div>
            {showSessionNoteInput ?
                <form autoComplete="off" onSubmit={editCampaignNote} className="session-note-form">
                    <div className="label-input">
                        <label style={{color: 'black'}}>Edit Session Note:</label>
                        <input type="text" name='title' onChange={(evt) => setCampaignNoteTitle(evt.target.value)} value={campaignNoteTitle} placeholder="Title" required />
                        <input type="date" name='date' onChange={(evt) => setCampaignNoteDate(evt.target.value)} value={campaignNoteDate} required />
                        <textarea name='name' onChange={(evt) => setCampaignNote(evt.target.value)} value={campaignNote} placeholder="Lorem ipsum dolor sit amet..." required />
                    </div>
                    <div>
                        <button onClick={() => closeSessionNoteInput()}>Cancel</button>
                        <button type="submit">Edit Note</button>
                    </div>
                </form>
                :
                <button style={{marginTop: '3vh'}} onClick={() => openSessionNoteInput()}>Edit Session Note</button>
            }
        </div>
    )
}