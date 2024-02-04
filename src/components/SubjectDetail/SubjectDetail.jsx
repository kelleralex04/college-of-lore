import { useState } from "react"
import * as categoriesAPI from '../../utilities/categories-api';
import * as subjectsAPI from '../../utilities/subjects-api';
import * as notesAPI from '../../utilities/notes-api';
import './SubjectDetail.css'

export default function SubjectDetail({subject, setSubject, setCurrentMain, setSubjectNote, subjectNoteContent, setSubjectNoteContent, subjectNoteTitle, setSubjectNoteTitle, 
    subjectNoteDate, setSubjectNoteDate, category, setCategory }) {
    const [showSubjectNoteInput, setShowSubjectNoteInput] = useState(false)
    const [subjectName, setSubjectName] = useState('')
    const [subjectDescription, setSubjectDescription] = useState('')
    const [showSubjectDescriptionInput, setShowSubjectDescriptionInput] = useState(false)
    const [showSubjectWarning, setShowSubjectWarning] = useState(false)

    async function addSubjectNote(evt) {
        evt.preventDefault();
        const updatedSubject = await notesAPI.addSubjectNote(subject._id, subjectNoteTitle, subjectNoteDate, subjectNoteContent.replace(/\n/g, '<br>'));
        setSubject(updatedSubject)
        setSubjectNoteContent('');
        setSubjectNoteTitle('');
        setSubjectNoteDate('');
        setShowSubjectNoteInput(false);
    };

    async function editSubject(evt) {
        evt.preventDefault();
        if (subjectDescription && subjectDescription.length > 0) {
            const updatedSubject = await subjectsAPI.editSubject(subject._id, subjectName, subjectDescription.replace(/\n/g, '<br>'));
            setSubject(updatedSubject)
        } else {
            const updatedSubject = await subjectsAPI.editSubjectTitle(subject._id, subjectName)
            setSubject(updatedSubject)
        }
        const updatedCategory = await categoriesAPI.populateCategory(category._id)
        setCategory(updatedCategory)
        setSubjectDescription('');
        setShowSubjectDescriptionInput(false)
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

    function showEditSubject() {
        setShowSubjectDescriptionInput(true);
        setSubjectName(subject.name);
        setSubjectDescription(subject.description);
    }

    async function deleteSubject() {
        await subjectsAPI.deleteSubject(category._id, subject._id);
        setSubject({})
        const updatedCategory = await categoriesAPI.populateCategory(category._id)
        setCategory(updatedCategory)
        setCurrentMain('CategoryDetail')
    }

    return(
        <div className="file-detail">
            <div className="file-top-elements">
                <div className="edit-subject">
                    {showSubjectDescriptionInput ?
                        <div className='top-elements'>
                            <form id='edit-subject-form' autoComplete="off" onSubmit={editSubject} className="subject-description-form">
                                <label style={{color: 'black'}}>Edit File Name:</label>
                                <input style={{color: 'black'}} type="text" onChange={(evt) => setSubjectName(evt.target.value)} value={subjectName} required />
                                <label style={{color: 'black'}}>Edit File Description:</label>
                                <textarea name='name' onChange={(evt) => setSubjectDescription(evt.target.value)} value={subjectDescription} placeholder="Lorem ipsum dolor sit amet..." />
                            </form>
                            <div className='edit-subject-buttons'>
                                <button type="submit" form='edit-subject-form'>Save</button>
                                {showSubjectWarning ?
                                    <div className='delete-subject-warning'>
                                        <p>Are you sure?</p>
                                        <div>
                                            <button onClick={() => deleteSubject()}>DELETE</button>
                                            <button onClick={() => setShowSubjectWarning(false)}>Cancel</button>
                                        </div>
                                    </div>
                                    :
                                    <button onClick={() => setShowSubjectWarning(true)}>Delete File</button>
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <div style={{width: '100%'}}>
                                <h1>{subject.name}</h1>
                                <div className="subject-description">
                                    {subject.description ?
                                        <p>{subject.description}</p>
                                        :
                                        <p>No description yet...</p>
                                    }
                                </div>
                            </div>
                            <button onClick={() => showEditSubject()}>Edit File</button>
                        </div>
                    }
                </div>
            </div>
            <div className="file-bottom-elements">
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
        </div>
    )
}