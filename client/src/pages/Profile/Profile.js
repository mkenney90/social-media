import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useContext } from "react";
import { LoginContext } from '../../helper/Context';
import './Profile.css';

function Profile() {

    const { user } = useContext(LoginContext);
    const [profileData, setProfileData] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [occupation, setOccupation] = useState('');
    const loading = profileData === undefined;
 
    const getProfileData = async () => {
        const userId = user.id || localStorage.getItem('userId');

        Axios.post("http://localhost:3001/user/getProfileData", {
            userId: userId,
        }).then((res) => {
            setProfileData(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const submitChanges = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/user/submitChanges", {
            userId: user.id || localStorage.getItem('userId'),
            firstName: firstName,
            lastName: lastName,
            occupation: occupation,
        }).then(() => {
            getProfileData();
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (profileData === null) {
            getProfileData();
        } else {
            setFirstName(profileData.firstName);
            setLastName(profileData.lastName);
            setOccupation(profileData.occupation);
        }
        // eslint-disable-next-line
    }, [profileData]);

    return (
        <div className="profile-form">
            <i className="fas fa-user fa-6x" />
            <form onSubmit={submitChanges}>
                <label>First Name
                    <input 
                        id="profile-first-name" 
                        type="text" 
                        value={firstName}
                        required
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </label>
                <label>Last Name
                    <input 
                        id="profile-last-name" 
                        type="text" 
                        value={lastName}
                        required
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </label>
                <label>Occupation
                    <input 
                        id="profile-occupation" 
                        type="text" 
                        value={occupation}
                        required
                        onChange={(event) => setOccupation(event.target.value)}
                    />
                </label>
                <button type="submit" disabled={!firstName || !lastName || !occupation}>Submit Changes</button>
            </form>
            {loading && <p>fetching profile data...</p>}
        </div>
    )
}

export default Profile;