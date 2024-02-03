import { useState } from "react"
import * as subjectsAPI from '../../utilities/subjects-api';
import './CategoryLink.css'

export default function CategoryLink({category, curCategory, setCurCategory, openCategory, openSubject}) {
    const [showSubjectInput, setShowSubjectInput] = useState(false)
    const [newSubject, setNewSubject] = useState('')

    async function addSubject(evt) {
        evt.preventDefault();
        const updatedCategory = await subjectsAPI.addSubject(curCategory._id, newSubject);
        setCurCategory(updatedCategory)
        setNewSubject('');
        setShowSubjectInput(false);
    };

    return (
        <>
            <li>
                <p className="sidenav-link" onClick={() => openCategory(category)}>{category.name}</p>
            </li>
            {curCategory.name === category.name ?
                <div className="subjectList">
                    <ul>
                        {curCategory.subject.map((s, idx) => (
                            <li key={idx}>
                                <p className="sidenav-link" style={{'padding': '6px 8px 6px 0'}} onClick={() => openSubject(s)}>{s.name}</p>
                            </li>
                        ))}
                    </ul>
                    {showSubjectInput ?
                        <form autoComplete="off" onSubmit={addSubject} className="subject-form">
                            <input type="text" className="subject-input" onChange={(evt) => setNewSubject(evt.target.value)} value={newSubject} placeholder="New File" required />
                            {newSubject === '' ?
                                <button className="cancel-button" onClick={() => setShowSubjectInput(false)}>Cancel</button>
                                :
                                <button className="add-button" type="submit">Add</button>
                            }
                        </form>
                        :
                        <button className="add-button" onClick={() => setShowSubjectInput(true)}>+ Add File</button>
                    }
                </div>
                :
                <></>
            }
        </>
    )
}