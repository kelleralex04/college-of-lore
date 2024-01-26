import './Header.css'

export default function NavBar({ user }) {
    return (
        <div className='header'>
            <div className='leftDiv'>
                <img src="https://i.imgur.com/fnUXPMw.png" alt='' />
                <h1>College of Lore</h1>
            </div>
            <h1>{user.name}</h1>
        </div>
    )
}