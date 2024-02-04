import { useState } from "react"
import * as notesAPI from '../../utilities/notes-api';
import './SubjectDetail.css'

export default function SubjectDetail({subject, setSubject, setCurrentMain, setSubjectNote, subjectNoteContent, setSubjectNoteContent, subjectNoteTitle, setSubjectNoteTitle, 
    subjectNoteDate, setSubjectNoteDate }) {
    const [showSubjectNoteInput, setShowSubjectNoteInput] = useState(false)

    async function addSubjectNote(evt) {
        evt.preventDefault();
        const updatedSubject = await notesAPI.addSubjectNote(subject._id, subjectNoteTitle, subjectNoteDate, subjectNoteContent.replace(/\n/g, '<br>'));
        setSubject(updatedSubject)
        setSubjectNoteContent('');
        setSubjectNoteTitle('');
        setSubjectNoteDate('');
        setShowSubjectNoteInput(false);
    };

    function openSubjectNote(note) {
        setCurrentMain('SubjectNoteDetail');
        setSubjectNote(note);
    }

    function openSubjectNoteInput() {
        setShowSubjectNoteInput(true)
        setSubjectNoteTitle('')
        setSubjectNoteContent('')
        setSubjectNoteDate('')
    }

    return(
        <div className="file-detail">
            <h1>{subject.name}</h1>
            <table className="subject-note-table">
                <thead className="header-row">
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                    {subject.subjectNote ?
                        <tbody className="table-body">
                            {subject.subjectNote.map((n, idx) => (
                                <tr key={idx}>
                                    <td className="note-link" onClick={() => openSubjectNote(n)}>{n.title}</td>
                                    <td>{n.date}</td>
                                </tr>
                            ))}
                        </tbody>
                        :
                        <></>
                    }
            </table>
            {showSubjectNoteInput ?
                <div className="add-subject-note">
                    <form autoComplete="off" onSubmit={addSubjectNote} className="subject-note-form">
                        <div className="label-input">
                            <div className="inputs">
                                <input type="text" name='title' onChange={(evt) => setSubjectNoteTitle(evt.target.value)} value={subjectNoteTitle} placeholder="Title" required />
                                <input type="date" name='date' onChange={(evt) => setSubjectNoteDate(evt.target.value)} value={subjectNoteDate} required />
                            </div>
                            <textarea name='name' onChange={(evt) => setSubjectNoteContent(evt.target.value)} value={subjectNoteContent} placeholder="Lorem ipsum dolor sit amet..." required />
                        </div>
                        <div className="subject-note-buttons">
                            <button onClick={() => setShowSubjectNoteInput(false)}>Cancel</button>
                            <button type="submit">Add Note</button>
                        </div>
                    </form>
                </div>
                :
                <button onClick={() => openSubjectNoteInput()}>Add Note</button>
            }
        </div>
    )
}