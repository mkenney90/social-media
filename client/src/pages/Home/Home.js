import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from '../../helper/Context';
import { FeedContext, FeedProvider } from "../../context/FeedContext";
import './Home.css';
import Feed from "../../components/Feed/Feed";
import Create from "../../components/Create/Create";

function Home({ startingFeed, children }) {
    return (
        <FeedProvider startingFeed={startingFeed}>
            <HomeNoFeedProvider>
                {children}
            </HomeNoFeedProvider>
        </FeedProvider>
    );
}

function HomeNoFeedProvider() {

    const { user } = useContext(LoginContext);
    const { feed, setFeed } = useContext(FeedContext);
    const userId = user.id || localStorage.getItem('userId');
    const [submit, setSubmit] = useState(false);

    const placeholders = [
        "Tell us what you're thinking",
        "What's on your mind?",
        "Anything you need to get off your chest?",
        "Express yourself!"
    ]
    const randInt = Math.floor(Math.random() * placeholders.length);

    useEffect(() => {
        console.log("refreshed feed")
    }, [feed])

    return (
        <div className="home">
            <i className="fas fa-home fa-6x" />
            <Create setSubmit={setSubmit} userId={userId} placeholder={placeholders[randInt]} />
            <Feed feed={feed} setFeed={setFeed} submit={submit} setSubmit={setSubmit} userId={userId} />
        </div>
    );
}

export default Home;