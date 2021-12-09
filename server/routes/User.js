const express = require('express');
const router = express.Router();

const db = require('../config/db'); 

router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = req.body.newUser;

    if (newUser) {
        db.query(
            `INSERT INTO users (username, password) VALUES (${username}, ${password})`, 
            (err, results) => {
                if (err && err.code === 'ER_DUP_ENTRY') {
                    res.json({
                        registered: false, 
                        message: 'Username already exists.'
                    })
                } else {
                    res.json({
                        registered: true, 
                        username: username,
                        message: `Registration successful for user ${username}.`
                    })
                }
            }
        )
    } else {
        console.log("creating profile entry")
        db.query(
            `INSERT INTO profiles (id, first_name, last_name) VALUES (LAST_INSERT_ID(), '${username}', '')`, 
            (err, results) => {
                if (err) {
                    res.json({
                        registered: false, 
                        message: 'Error registering new user profile.'
                    })
                    console.log(err.message);
                } else {
                    res.json({
                        registered: true, 
                        message: `Profile setup successful.`
                    })
                }
            }
        );
    }
});

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        `SELECT * FROM users WHERE username='${username}'`,
        (err, results) => {
            if (err) {
                console.log(err);
            } 
            if (results.length) {
                if (results[0].password === password) { 
                   res.json({
                       loggedIn: true,
                       username: username,
                       userId: results[0].id,
                       message: "login successful."}); 
                } else {
                    res.json({
                        loggedIn: false, 
                        message: "login failed."});
                }
            } else {
                res.json({
                    loggedIn: false, 
                    message: "No such user."}); 
            } 
        }
    );
});

router.post("/getProfileData", (req, res) => {
    const id = req.body.userId; 
    console.log("%%% fetching profile data... %%%");

    db.query(
        `SELECT * FROM profiles WHERE id = ${id}`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                console.log(results)
                res.json({
                    id: id,
                    firstName: results[0].first_name || "", 
                    lastName: results[0].last_name || "",
                    occupation: results[0].job || "" 
                });
            }
        }
    )
})

router.post("/submitChanges", (req, res) => {
    console.log("%%% submitting changes... %%%");
    const id = req.body.userId; 
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const occupation = req.body.occupation;

    db.query(
        `UPDATE profiles SET first_name = '${firstName}', last_name = '${lastName}', job = '${occupation}' WHERE id = ${id}`, 
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results.affectedRows) {
                console.log(results)
                res.json({
                    newFirstName: firstName,
                    newLastName: lastName || "",
                    newOccupation: occupation || "" 
                });
            } else {
                console.log(`No matching entries found for user id: ${id}. No changes made.`)
            }
        }
    )
})

router.post("/getFeed", (req, res) => {
    console.log("%%% retrieving feed... %%%");

    db.query(
        `SELECT posts.id, posts.content, posts.author, profiles.first_name, profiles.last_name 
        FROM posts
        JOIN profiles 
        WHERE posts.author = profiles.id
        ORDER BY posts.id DESC
        LIMIT 250`, 
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                res.send(results);
                console.log(results);
            } else {
                console.log(`Couldn't fetch feed.`)
            }
        }
    )
})

router.post("/submitPost", (req, res) => {
    console.log("%%% sending new post... %%%");
    const content = req.body.content;
    const userId = req.body.author;
    db.query(
        `INSERT INTO posts (content, type, author) VALUES ("${content}", "text", ${userId})`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                res.send(results);
                console.log(results);
            } else {
                console.log(`Couldn't submit post.`)
            }
        }
    )
})

router.post("/deletePost", (req, res) => {
    console.log("%%% deleting post... %%%");
    const postId = req.body.postId;
    db.query(
        `DELETE FROM posts WHERE id = ${postId}`,
        (err, results) => {
            if (err) {
                console.log(err);
            }
            if (results) {
                res.send(results);
                console.log(results);
            } else {
                console.log(`Couldn't delete post.`)
            }
        }
    )
})

module.exports = router;