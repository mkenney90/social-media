import { useState, useContext } from 'react';
import { FeedContext, FeedProvider } from "../../context/FeedContext";
import Axios from 'axios';

function Create({ setSubmit, userId, placeholder }) {

    const [content, setContent] = useState('');
    const { feed, setFeed } = useContext(FeedContext);

    const submitPost = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/user/submitPost", {
            content: content,
            author: userId
        }).then(() => {
            let createForm = document.getElementsByClassName("post-form")[0];
            setContent('');
            createForm.classList.add("moving-posts")

            setTimeout(() => {
                const newPost = {
                    content: content,
                    author: parseInt(userId)
                }
                setFeed([newPost, ...feed]);
                createForm.classList.remove("moving-posts")
            }, 900)

        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <form className="post-form" onSubmit={submitPost}>
            <label>
                <textarea 
                    id="post-content" 
                    type="text" 
                    value={content}
                    placeholder={placeholder}
                    required
                    onChange={(event) => setContent(event.target.value)}
                />
            </label>
            <button type="submit" disabled={!content}>Submit Post</button>
        </form>
    )
}

export default Create;