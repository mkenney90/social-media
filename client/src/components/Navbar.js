import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../helper/Context';

function Navbar() {

    const {loggedIn} = useContext(LoginContext);

    return (
        <div className="navbar">
            {loggedIn ? (
            <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <Link to="/logout">Logout</Link>
            </> 
            ) : (
            <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </>
            )}
        </div>
    )
}

export default Navbar;