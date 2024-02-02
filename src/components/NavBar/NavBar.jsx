import { useState } from "react";
import { Link } from "react-router-dom"
import CategoryLink from '../CategoryLink/CategoryLink'
import * as userService from '../../utilities/users-service';
import * as categoriesAPI from '../../utilities/categories-api';
import './NavBar.css'

export default function NavBar({setUser, curCampaign, curCategory, setCurrentMain, setCategory}) {
    const [showInput, setShowInput] = useState(false)
    const [newCategory, setNewCategory] = useState('')

    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    async function addCategory(evt) {
        evt.preventDefault();
        const updatedCategory = await categoriesAPI.addCategory(curCampaign.name, newCategory);
        curCampaign.category.push(updatedCategory)
        setNewCategory('');
    };

    async function openCategory(c) {
        const updatedCategory = await categoriesAPI.populateCategory(c._id)
        setCategory(updatedCategory)
        setCurrentMain('CategoryDetail')
    }

    async function openSubject(s) {
        setCurrentMain('SubjectDetail')
    }

    return (
        <div className='sidenav'>
            {curCampaign.name ?
                <div className="links">
                    <ul className="categoryList">
                        {curCampaign.category.map((c, idx) => (
                            <CategoryLink category={c} curCategory={curCategory} curCampaign={curCampaign.name} openCategory={openCategory} openSubject={openSubject} key={idx} />
                        ))}
                    </ul>
                    {showInput ?
                        <form autoComplete="off" onSubmit={addCategory} className="category-form">
                            <input type="text" className="category-input" onChange={(evt) => setNewCategory(evt.target.value)} value={newCategory} placeholder="New Category" required />
                            {newCategory === '' ?
                                <button className="cancel-button" onClick={() => setShowInput(false)}>Cancel</button>
                                :
                                <button className="add-button" type="submit">Add</button>
                            }
                        </form>
                        :
                        <button className="add-button" onClick={() => setShowInput(true)}>+ Add Category</button>
                    }
                </div>
                :
                <div></div>
            }
            <div className="links">
                <Link to='/'>Campaigns </Link>
                <Link to='' onClick={handleLogOut}>Log Out</Link>
            </div>
        </div>
    )
}