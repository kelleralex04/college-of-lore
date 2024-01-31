import { Link } from "react-router-dom"
import { useState } from "react"
import SubjectLink from "../SubjectLink/SubjectLink"
import * as subjectsAPI from '../../utilities/subjects-api';
import './CategoryLink.css'

export default function CategoryLink({category, curCategory, curCampaign}) {
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
                <Link to={`/${curCampaign}/${category.name}`}>{category.name}</Link>
            </li>
            {curCategory.name === category.name ?
                <div className="subjectList">
                    <ul>
                        {curCategory.subject.map((s, idx) => (
                            <SubjectLink subject={s} curCampaign={curCampaign} curCategory={curCategory.name} key={idx} />
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