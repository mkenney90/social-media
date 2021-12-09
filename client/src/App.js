import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { LoginContext } from './helper/Context';

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('username') !== null && localStorage.getItem('username') !== 'undefined');
  const [user, setUser] = useState({userId: localStorage.getItem('id') || ''});

  return (
    <div className="app-container">
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
    <Router>
        <Navbar />
        <Routes>
            <Route exact path="/" element={
                loggedIn ? <Home /> : <Navigate to="/login" />
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
    </Router>
    </LoginContext.Provider>
    </div>
  );
}

export default App;
