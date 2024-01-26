import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service';
import './NavBar.css'

export default function NavBar({user, setUser}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return (
        <div className='sidenav'>
            <h4>Welcome, {user.name.toUpperCase()}</h4>
            <Link to='/campaigns'>Campaigns</Link>
            <Link to='' onClick={handleLogOut}>Log Out</Link>
        </div>
    )
}