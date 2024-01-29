import './Header.css'
import { Link } from 'react-router-dom'

export default function NavBar({ user, campaign }) {
    return (
        <div className='header'>
            <div className='leftDiv'>
                <img src="https://i.imgur.com/fnUXPMw.png" alt='' />
                <p>College of Lore</p>
            </div>
            <Link to={`/${campaign.name}`}>{campaign.name}</Link>
            <p>{user.name}</p>
        </div>
    )
}