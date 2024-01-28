import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import CategoryLink from '../CategoryLink/CategoryLink'
import * as userService from '../../utilities/users-service';
import * as categoriesAPI from '../../utilities/categories-api';
import './NavBar.css'

export default function NavBar({user, setUser, curCampaign}) {
    const [showInput, setShowInput] = useState(false)
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState('')

    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    useEffect(function() {
        async function getCategories() {
            if (curCampaign.name) {
                let catArr = []
                curCampaign.category.forEach(c => {
                    catArr.push(c.name)
                })
                setCategories(catArr);
            }
        }
        getCategories();
    }, [curCampaign])

    async function addCategory(evt) {
        evt.preventDefault();
        const updatedCategory = await categoriesAPI.addCategory(newCategory, curCampaign.name);
        setCategories([...categories, updatedCategory.name]);
        setNewCategory('');
    };

    return (
        <div className='sidenav'>
            {curCampaign.name ?
                <div className="links">
                    <ul>
                        {categories.map((c, idx) => (
                            <CategoryLink category={c} key={idx} />
                        ))}
                    </ul>
                    {showInput ?
                        <form autoComplete="off" onSubmit={addCategory} className="category-form">
                            <input type="text" className="category-input" onChange={(evt) => setNewCategory(evt.target.value)} value={newCategory} required />
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
                <Link to='/campaigns'>Campaigns </Link>
                <Link to='' onClick={handleLogOut}>Log Out</Link>
            </div>
        </div>
    )
}