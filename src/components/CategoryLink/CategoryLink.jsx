import { useState } from "react"
import * as subjectsAPI from '../../utilities/subjects-api';
import './CategoryLink.css'

export default function CategoryLink({category, curCategory, curCampaign, openCategory, openSubject}) {
    const [showSubjectInput, setShowSubjectInput] = useState(false)
    const [newSubject, setNewSubject] = useState('')

    async function addSubject(evt) {
        evt.preventDefault();
        const updatedSubject = await subjectsAPI.addSubject(curCampaign, curCategory.name, newSubject);
        curCategory.subject.push(updatedSubject)
        setNewSubject('');
    };

    return (
        <>
            <li>
                <button onClick={() => openCategory(category)}>{category.name}</button>
            </li>
            {curCategory.name === category.name ?
                <div className="subjectList">
                    <ul>
                        {curCategory.subject.map((s, idx) => (
                            <li key={idx}>
                                <p onClick={() => openSubject()}>{s.name}</p>
                            </li>
                        ))}
                    </ul>
                    {showSubjectInput ?
                        <form autoComplete="off" onSubmit={addSubject} className="subject-form">
                            <input type="text" className="subject-input" onChange={(evt) => setNewSubject(evt.target.value)} value={newSubject} placeholder="New Subject" required />
                            {newSubject === '' ?
                                <button className="cancel-button" onClick={() => setShowSubjectInput(false)}>Cancel</button>
                                :
                                <button className="add-button" type="submit">Add</button>
                            }
                        </form>
                        :
                        <button className="add-button" onClick={() => setShowSubjectInput(true)}>+ Add Subject</button>
                    }
                </div>
                :
                <></>
            }
        </>
    )
}