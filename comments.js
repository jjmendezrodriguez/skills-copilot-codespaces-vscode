// create web server
var express = require('express');
var app = express();
var fs = require("fs");

// create the server
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s", host, port);
});

// GET request to the comments page
app.get('/comments', function(req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
});

// POST request to the comments page
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/comments', urlencodedParser, function(req, res) {
    var comment = req.body.comment;
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data.comments.push(comment);
        console.log(data);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
    res.end("comment added");
});

// PUT request to the comments page
app.put('/comments', urlencodedParser, function(req, res) {
    var comment = req.body.comment;
    var index = req.body.index;
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data.comments[index] = comment;
        console.log(data);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
    res.end("comment updated");
});

// DELETE request to the comments page
app.delete('/comments', urlencodedParser, function(req, res) {
    var index = req.body.index;
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data.comments.splice(index, 1);
        console.log(data);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            }
        });
    });