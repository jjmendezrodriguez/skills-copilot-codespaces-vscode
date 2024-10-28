// Create web server
// Create a new comment
// Get all comments

// Require necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create new web server
var app = express();

// Use body-parser to parse JSON data
app.use(bodyParser.json());

// Create a new comment
app.post('/comments', function(req, res) {
  // Read the comments.json file
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // Parse the JSON data
    var comments = JSON.parse(data);

    // Add new comment
    var newComment = {
      id: Date.now(),
      text: req.body.text
    };
    comments.push(newComment);

    // Write the new comment to the comments.json file
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      // Send the new comment as a response
      res.json(newComment);
    });
  });
});

// Get all comments
app.get('/comments', function(req, res) {
  // Read the comments.json file
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // Parse the JSON data
    var comments = JSON.parse(data);

    // Send the comments as a response
    res.json(comments);
  });
});

// Start the web server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});