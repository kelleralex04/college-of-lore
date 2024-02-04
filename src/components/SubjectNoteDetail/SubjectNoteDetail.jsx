import { useState } from 'react'
import * as notesAPI from '../../utilities/notes-api';
import './SubjectNoteDetail.css'

export default function SubjectNoteDetail({subjectNote, setSubjectNote, subjectNoteContent, setSubjectNoteContent, subjectNoteTitle, setSubjectNoteTitle, 
    subjectNoteDate, setSubjectNoteDate}) {
    const [showSubjectNoteInput, setShowSubjectNoteInput] = useState(false)
    const [noteHeight, setNoteHeight] = useState('tall')

    async function editSubjectNote(evt) {
        evt.preventDefault();
        const updatedNote = await notesAPI.editSubjectNote(subjectNote._id, subjectNoteTitle, subjectNoteDate, subjectNoteContent.replace(/\n/g, '<br>'));
        setSubjectNote(updatedNote)
        setShowSubjectNoteInput(false)
        setNoteHeight('short')
    };

    function openSubjectNoteInput() {
        setShowSubjectNoteInput(true)
        setSubjectNoteContent(subjectNote.content)
        setSubjectNoteDate(subjectNote.date)
        setSubjectNoteTitle(subjectNote.title)
        setNoteHeight('short')
    }

    function closeSubjectNoteInput() {
        setShowSubjectNoteInput(false)
        setNoteHeight('tall')
    }

    return (
        <div className='edit-subject-note'>
            <div className="subject-note">
                <h1>{subjectNote.title} &nbsp; - &nbsp; {subjectNote.date}</h1>
                <p id={noteHeight}>{subjectNote.content}</p>
            </div>
            {showSubjectNoteInput ?
                <form autoComplete="off" onSubmit={editSubjectNote} className="subject-note-form" id='edit'>
                    <div className="label-input">
                        <div className='inputs'>
                            <input type="text" name='title' onChange={(evt) => setSubjectNoteTitle(evt.target.value)} value={subjectNoteTitle} placeholder="Title" required />
                            <input type="date" name='date' onChange={(evt) => setSubjectNoteDate(evt.target.value)} value={subjectNoteDate} required />
                        </div>
                        <textarea name='name' onChange={(evt) => setSubjectNoteContent(evt.target.value)} value={subjectNoteContent} placeholder="Lorem ipsum dolor sit amet..." required />
                    </div>
                    <div>
                        <button onClick={() => closeSubjectNoteInput()}>Cancel</button>
                        <button type="submit">Edit Note</button>
                    </div>
                </form>
                :
                <button style={{marginTop: '3vh'}} onClick={() => openSubjectNoteInput()}>Edit Subject Note</button>
            }
        </div>
    )
}