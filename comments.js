// create web server
// Import the Express module to create a web server
const express = require('express');
const app = express();

// Middleware to parse JSON requests
// Allows Express to interpret the request body as JSON
app.use(express.json());

// Array to store comments, simulating a temporary "database"
const comments = [];

// Route to retrieve all comments
// GET /comments - Returns all comments as JSON
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Route to add a new comment
// POST /comments - Receives a comment in the request body and adds it to the list
app.post('/comments', (req, res) => {
  const comment = req.body;  // Captures the comment sent in the request body
  comments.push(comment);    // Adds the comment to the temporary "database"
  res.status(201).send();    // Responds with status 201 (Created) indicating success
});

// Start the server on port 3000
// Listens for requests and logs a confirmation message to the console
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Usage example:
// Run the server with `node comments.js` and test with the following requests:
// To add a comment: 
// curl -X POST -H "Content-Type: application/json" -d '{"username": "Alice", "content": "I am Alice"}' http://localhost:3000/comments
// To get all comments: 
// curl http://localhost:3000/comments
