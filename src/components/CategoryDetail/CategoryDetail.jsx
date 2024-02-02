import { useState } from 'react';
import * as categoriesAPI from '../../utilities/categories-api';
import * as subjectsAPI from '../../utilities/subjects-api';
import './CategoryDetail.css'

export default function CategoryDetail({category, setCategory, setCurrentMain, setSubject}) {
    const [categoryDescription, setCategoryDescription] = useState('')
    const [showCategoryDescriptionInput, setShowCategoryDescriptionInput] = useState(false)
    const [showSubjectInput, setShowSubjectInput] = useState(false)
    const [newSubject, setNewSubject] = useState('')

    async function addSubject(evt) {
        evt.preventDefault();
        const updatedSubject = await subjectsAPI.addSubject(category._id, newSubject);
        category.subject.push(updatedSubject)
        setNewSubject('');
        setShowSubjectInput(false);
    };

    async function addDescription(evt) {
        evt.preventDefault();
        const updatedCategory = await categoriesAPI.addCategoryDescription(category._id, categoryDescription.replace(/\n/g, '<br>'));
        setCategory(updatedCategory)
        setCategoryDescription('');
        setShowCategoryDescriptionInput(false)
    };

    function showEditDescription() {
        setShowCategoryDescriptionInput(true);
        setCategoryDescription(category.description);
    }

    async function openSubject(s) {
        setSubject(s)
        setCurrentMain('SubjectDetail')
    }

    return(
        <div className='category-detail'>
            <h1>{category.name}</h1>
            {category.description ?
                <div className="edit-description">
                    {showCategoryDescriptionInput ?
                        <form autoComplete="off" onSubmit={addDescription} className="category-description-form">
                            <label style={{color: 'black'}}>Edit Category Description:</label>
                            <textarea name='name' onChange={(evt) => setCategoryDescription(evt.target.value)} value={categoryDescription} required />
                            <button type="submit">Edit Description</button>
                        </form>
                        :
                        <div className="description">
                            <p>{category.description}</p>
                            <button onClick={() => showEditDescription()}>Edit Description</button>
                        </div>
                    }
                </div>
                :
                <form autoComplete="off" onSubmit={addDescription} className="category-description-form">
                    <div className="label-input">
                        <label style={{color: 'black'}}>Add Folder Description:</label>
                        <textarea name='name' onChange={(evt) => setCategoryDescription(evt.target.value)} value={categoryDescription} required />
                    </div>
                    <button type="submit">Add Description</button>
                </form>
            }
            <h1>Files</h1>
            <ul>
                {category.subject.map((s, idx) => (
                    <li key={idx}>
                        <p className="sidenav-link" style={{'padding': '6px 8px 6px 0'}} onClick={() => openSubject(s)}>{s.name}</p>
                    </li>
                ))}
            </ul>
            <>
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
            </>
        </div>
    )
}