import './Header.css'

export default function NavBar({ user, campaign }) {
    return (
        <div className='header'>
            <div className='leftDiv'>
                <img src="https://i.imgur.com/fnUXPMw.png" alt='' />
                <p>College of Lore</p>
            </div>
            <p>{campaign.name}</p>
            <p>{user.name}</p>
        </div>
    )
}