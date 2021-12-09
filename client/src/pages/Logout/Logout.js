import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../helper/Context';

function Logout() {

    const { setLoggedIn, setUser } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(false);
        setUser();
        localStorage.clear();
        
        navigate('/');
        // eslint-disable-next-line
    }, []);

    return (
        <>You are now logged out.</>
    )
}

export default Logout;