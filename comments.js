// create web server
// use express
const express = require('express');
const app = express();
// create a port to listen to
const PORT = 4001;

// use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// create a commentsByPostId object to store comments
const commentsByPostId = {};

// create a get request to get comments of a post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// create a post request to add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];
    comments.push(req.body);
    commentsByPostId[postId] = comments;

    res.status(201).send(comments);
});

// listen to the port
app.listen(PORT, () => {
    console.log(`Comments service is running on port ${PORT}`);
});
