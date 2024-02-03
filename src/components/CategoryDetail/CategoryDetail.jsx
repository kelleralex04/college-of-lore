import { useState } from 'react';
import * as categoriesAPI from '../../utilities/categories-api';
import './CategoryDetail.css'

export default function CategoryDetail({campaign, category, setCategory, setCurrentMain, setSubject}) {
    const [categoryDescription, setCategoryDescription] = useState('')
    const [showCategoryDescriptionInput, setShowCategoryDescriptionInput] = useState(false)

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

    async function deleteCategory() {
        await categoriesAPI.deleteCategory(campaign._id, category._id);
        setCategory({})
        setCurrentMain('CampaignDetail')
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
            <button onClick={() => deleteCategory()}>Delete Folder</button>
        </div>
    )
}