console.log("in routes");

var commentDb = require('../models/commentModel');
var sentiment = require('sentiment');

var sentimence = "";
var sentimentResult = "";
var sentiVal = "";

// expose the routes to our app with module.exports
module.exports = function (app) {



    app.get('/api/comment', function (req, res) {

        console.log("in inside routes function");
        // use mongoose to get all comment in the database
        commentDb.find(function (err, comments) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                console.log('err', err);
            // res.send(err) 

            return res.json(comments); // return all comment in JSON format
          
        });
    });



    app.post('/api/comment', function (req, res) {

        sentimence = sentiment(req.body.name);
        console.log("sent::", sentimence);
        console.log("tokens", sentimence.tokens);
        if (sentimence.score > "0") {

            sentimentResult = "positive";

        }
        else if (sentimence.score == "0") {


            sentimentResult = "neutral";

        }
        else if (sentimence.score < "0") {

            sentimentResult = "negative";

        }
        commentDb.create({
            name: req.body.name,

            sentimentValue: sentimentResult

        }, function (err, comment) {
            if (err)
                console.log("err", err);
            //  res.send(err);

            // get and return all the todos after you create another
            commentDb.find(function (err, comments) {
                if (err)
                    res.send(err)

                res.json(comments);

            });
        });

    });

    app.delete('/api/comment/:comment_id', function (req, res) {
        commentDb.remove({
            _id: req.params.comment_id
        }, function (err, comment) {
            if (err)
                console.log("err", err);
            // res.send(err);

            // get and return all the todos after you create another
            commentDb.find(function (err, comment) {
                if (err)
                    res.send(err)
                res.json(comment);
            });
        });
    });


    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};