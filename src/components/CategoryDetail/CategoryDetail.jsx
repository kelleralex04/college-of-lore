import { useState } from 'react';
import * as campaignsAPI from '../../utilities/campaigns-api';
import * as categoriesAPI from '../../utilities/categories-api';
import * as subjectsAPI from '../../utilities/subjects-api';
import './CategoryDetail.css'

export default function CategoryDetail({campaign, setCampaign, category, setCategory, setCurrentMain, setSubject}) {
    const [categoryName, setCategoryName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')
    const [showCategoryDescriptionInput, setShowCategoryDescriptionInput] = useState(false)
    const [showCategoryWarning, setShowCategoryWarning] = useState(false)

    async function editCategory(evt) {
        evt.preventDefault();
        if (categoryDescription && categoryDescription.length > 0) {
            const updatedCategory = await categoriesAPI.editCategory(category._id, categoryName, categoryDescription.replace(/\n/g, '<br>'));
            setCategory(updatedCategory)
        } else {
            const updatedCategory = await categoriesAPI.editCategoryTitle(category._id, categoryName)
            setCategory(updatedCategory)
        }
        const updatedCampaign = await campaignsAPI.getCurCampaign(campaign._id)
        setCampaign(updatedCampaign)
        setCategoryDescription('');
        setShowCategoryDescriptionInput(false)
    };

    function showEditCategory() {
        setShowCategoryDescriptionInput(true);
        setCategoryName(category.name);
        setCategoryDescription(category.description);
    }

    async function openSubject(s) {
        const updatedSubject = await subjectsAPI.populateSubject(s._id)
        setSubject(updatedSubject)
        setCurrentMain('SubjectDetail')
    }

    async function deleteCategory() {
        await categoriesAPI.deleteCategory(campaign._id, category._id);
        setCategory({})
        setCurrentMain('CampaignDetail')
    }

    return(
        <div className='category-detail'>
            <div className="edit-category">
                {showCategoryDescriptionInput ?
                    <div className='top-elements'>
                        <form id='edit-category-form' autoComplete="off" onSubmit={editCategory} className="category-description-form">
                            <label style={{color: 'black'}}>Edit Folder Name:</label>
                            <input style={{color: 'black'}} type="text" onChange={(evt) => setCategoryName(evt.target.value)} value={categoryName} required />
                            <label style={{color: 'black'}}>Edit Folder Description:</label>
                            <textarea name='name' onChange={(evt) => setCategoryDescription(evt.target.value)} value={categoryDescription} placeholder="Lorem ipsum dolor sit amet..." />
                        </form>
                        <div>
                            <button type="submit" form='edit-category-form'>Save</button>
                            {showCategoryWarning ?
                                <div className='delete-category-warning'>
                                    <p>Are you sure?</p>
                                    <div>
                                        <button onClick={() => deleteCategory()}>DELETE</button>
                                        <button onClick={() => setShowCategoryWarning(false)}>Cancel</button>
                                    </div>
                                </div>
                                :
                                <button onClick={() => setShowCategoryWarning(true)}>Delete Folder</button>
                            }
                        </div>
                    </div>
                    :
                    <div>
                        <div style={{width: '100%'}}>
                            <h1>{category.name}</h1>
                            <div className="category-description">
                                {category.description ?
                                    <p>{category.description}</p>
                                    :
                                    <p>No description yet...</p>
                                }
                            </div>
                        </div>
                        <button onClick={() => showEditCategory()}>Edit Folder</button>
                    </div>
                }
            </div>
            <div className='bottom-elements'>
                <div className='files'>
                    <h1>Files</h1>
                    <ul className='file-list'>
                        {category.subject.map((s, idx) => (
                            <li key={idx}>
                                <p className="sidenav-link" style={{'padding': '6px 8px 6px 0'}} onClick={() => openSubject(s)}>{s.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}