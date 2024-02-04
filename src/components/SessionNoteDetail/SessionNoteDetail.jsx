import { useState } from 'react'
import * as notesAPI from '../../utilities/notes-api';
import './SessionNoteDetail.css'

export default function SessionNoteDetail({campaign, sessionNote, setSessionNote, campaignNote, setCampaignNote, campaignNoteTitle, setCampaignNoteTitle, campaignNoteDate, 
    setCampaignNoteDate, setCurrentMain}) {
    const [showSessionNoteInput, setShowSessionNoteInput] = useState(false)
    const [showSessionNoteWarning, setShowSessionNoteWarning] = useState(false)
    const [noteHeight, setNoteHeight] = useState('tall')

    async function editCampaignNote(evt) {
        evt.preventDefault();
        const updatedNote = await notesAPI.editCampaignNote(sessionNote._id, campaignNoteTitle, campaignNoteDate, campaignNote.replace(/\n/g, '<br>'));
        setSessionNote(updatedNote)
        setShowSessionNoteInput(false)
        setNoteHeight('tall')
    };

    function openSessionNoteInput() {
        setShowSessionNoteInput(true)
        setCampaignNote(sessionNote.content)
        setCampaignNoteDate(sessionNote.date)
        setCampaignNoteTitle(sessionNote.title)
        setNoteHeight('short')
    }

    async function deleteSessionNote() {
        await notesAPI.deleteSessionNote(campaign._id, sessionNote._id)
        setCurrentMain('CampaignDetail')
    }

    return(
        <div className='edit-session-note'>
            <div className="session-note">
                <h1>{sessionNote.title} &nbsp; - &nbsp; {sessionNote.date}</h1>
                <p id={noteHeight}>{sessionNote.content}</p>
            </div>
            {showSessionNoteInput ?
                <form autoComplete="off" onSubmit={editCampaignNote} className="session-note-form" id='edit'>
                    <div className="label-input">
                        <div className='inputs'>
                            <input type="text" name='title' onChange={(evt) => setCampaignNoteTitle(evt.target.value)} value={campaignNoteTitle} placeholder="Title" required />
                            <input type="date" name='date' onChange={(evt) => setCampaignNoteDate(evt.target.value)} value={campaignNoteDate} required />
                        </div>
                        <textarea name='name' onChange={(evt) => setCampaignNote(evt.target.value)} value={campaignNote} placeholder="Lorem ipsum dolor sit amet..." required />
                    </div>
                    <div className='edit-buttons'>
                        <button type="submit">Save</button>
                        {showSessionNoteWarning ?
                            <div style={{display: 'flex'}}>
                                <label>Are you sure?</label>
                                <button onClick={() => deleteSessionNote()}>DELETE</button>
                                <button onClick={() => setShowSessionNoteWarning(false)}>Cancel Delete</button>
                            </div>
                            :
                            <button onClick={() => setShowSessionNoteWarning(true)}>Delete Note</button>
                        }
                    </div>
                </form>
                :
                <button style={{marginTop: '3vh'}} onClick={() => openSessionNoteInput()}>Edit Session Note</button>
            }
        </div>
    )
}