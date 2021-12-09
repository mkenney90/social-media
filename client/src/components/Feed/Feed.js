import React, { useEffect, useState, useContext } from "react";
import { FeedContext } from "../../context/FeedContext";
import Axios from 'axios';
import './Feed.css';

function Feed({ submit, setSubmit, userId }) {

    const [loading, setLoading] = useState(false);
    const { feed, setFeed } = useContext(FeedContext)

    const getFeed = async () => {
        setLoading(true);
        Axios.post("http://localhost:3001/user/getFeed", {
        }).then((res) => {
            setLoading(false);
            setFeed(res.data)
        }).catch((err) => {
            console.log(err);
        });
    }

    const deletePost = async (postId) => {
        setLoading(true);
        Axios.post("http://localhost:3001/user/deletePost", {
            postId: postId
        }).then((res) => {
            setLoading(false);

            let targetPost = document.querySelector(`[data-id="${postId}"]`);
            if (targetPost !== null) {
                targetPost.classList.add("deleted-post");
                setTimeout(() => {
                    const updatedFeed = feed.filter(
                        (post) => postId !== post.id
                    )
                    setFeed(updatedFeed);
                    targetPost.classList.remove("deleted-post");
                }, 1000)
            }

        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (feed === undefined || submit) {
            getFeed();
            setSubmit(false);
        }
    }, [feed, setFeed, submit, loading])

    return (
        <div className="feed-container">
            {feed !== undefined && feed.map((p, idx) => {
                return (
                    <div className="post-container" data-id={p.id} key={idx}>
                        <p className="post-author">
                            {parseInt(userId) === p.author ? (
                                `You `
                            ):(
                                `${p.first_name} ${p.last_name} `
                            )} 
                            said
                        </p>
                        <div className="post-content">
                            {p.content}                        
                            {parseInt(userId) === p.author && 
                                <div className="btn-delete-post" onClick={() => deletePost(p.id)}>
                                    <i className="fas fa-times fa-sm" />
                                </div>
                            }
                        </div>

                    </div>
                )
            })
            }
            {loading && <p>fetching posts...</p>}
        </div>
    )
}

export default Feed;