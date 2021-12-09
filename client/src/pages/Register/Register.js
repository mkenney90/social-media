import { useContext, useState } from 'react';
import './Register.css';
import Axios from 'axios';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../helper/Context';
import { Link } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const { setLoggedIn, setUser } = useContext(LoginContext);

    const register = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/user/register", {
            username: username, 
            password: password,
            newUser: true
        }).then((res) => {
            if (res.data.registered) {
                localStorage.setItem("username", res.data.username);
                setErrors('');
                navigate('/profile');
                createProfile();
            } else {
                setErrors(res.data.message);
            }
        }).catch((err) => {
            setErrors(err);
        });
    }

    const createProfile = () => {
        Axios.post("http://localhost:3001/user/register", {
            username: username, 
            newUser: false
        }).then((res) => {
            if (res.data.registered) {
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("userId", res.data.userId);
                setLoggedIn(true);
                setUser({
                    id: res.data.userId,
                    username: username
                });
                setErrors('');
                navigate('/profile');
            } else {
                localStorage.clear();
                setErrors(res.data.message);
            }
        }).catch((err) => {
            setErrors(err);
        });
    }

    return (
        <div className="register">
            <h2>Sign up below:</h2>
            <form onSubmit={register}>
                <div className="registration-form">
                    <input 
                        type="text" 
                        placeholder="username" 
                        required
                        onChange={(event) => (setUsername(event.target.value))} 
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        required
                        onChange={(event) => (setPassword(event.target.value))} 
                    />
                    <button type="submit" disabled={!username || !password}>Register</button>
                    <span className="register-or-login-minder">Already have an account? <Link to="/Login">Login here.</Link></span>
                    <div className="error-container">
                        {errors && <h4 className="error-msg">{errors}</h4>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;