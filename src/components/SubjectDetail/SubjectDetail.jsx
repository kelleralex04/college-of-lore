import { useState } from "react"
import * as notesAPI from '../../utilities/notes-api';

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

    return(
        <div>
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
                <div>
                    <h1>{subject.name}</h1>
                    <form autoComplete="off" onSubmit={addSubjectNote} className="session-note-form">
                        <div className="label-input">
                            <label style={{color: 'black'}}>Add Session Note:</label>
                            <input type="text" name='title' onChange={(evt) => setSubjectNoteTitle(evt.target.value)} value={subjectNoteTitle} placeholder="Title" required />
                            <input type="date" name='date' onChange={(evt) => setSubjectNoteDate(evt.target.value)} value={subjectNoteDate} required />
                            <textarea name='name' onChange={(evt) => setSubjectNoteContent(evt.target.value)} value={subjectNoteContent} placeholder="Lorem ipsum dolor sit amet..." required />
                        </div>
                        <div>
                            <button onClick={() => setShowSubjectNoteInput(false)}>Cancel</button>
                            <button type="submit">Add Note</button>
                        </div>
                    </form>
                </div>
                :
                <button onClick={() => setShowSubjectNoteInput(true)}>Add Note</button>
            }
        </div>
    )
}