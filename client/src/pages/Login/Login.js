import { useContext, useEffect, useState } from 'react';
import './Login.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../helper/Context';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const { loggedIn, setLoggedIn, setUser } = useContext(LoginContext);

    let navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/user/login", {
            username: username, 
            password: password
        }).then((res) => {
            if (res.data.loggedIn) {
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("userId", res.data.userId);
                setLoggedIn(true);
                setUser({
                    id: res.data.userId,
                    username: username
                });
                setErrors('');
            } else {
                setErrors(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn])

    return (
        <div className="login">
            <form onSubmit={login}>
                <h2>Welcome back</h2>
                <div className="login-form">
                    <input type="text" className={errors !== '' ? 'error' : ''} required placeholder="username" onChange={(event) => (setUsername(event.target.value))} />
                    <input type="password" className={errors !== '' ? 'error' : ''} required placeholder="password" onChange={(event) => (setPassword(event.target.value))} />
                    <button type="submit" disabled={!username || !password}>Login</button>
                    <span className="register-or-login-minder">Don't have an account? <Link to="/Register">Sign up here.</Link></span>
                    <div className="error-container">
                        {errors && <h4 className="error-msg">{errors}</h4>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;