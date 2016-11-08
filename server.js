// server.js

// BASE SETUP
// =============================================================================


// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;        // set our port
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
//var sentiment = require('sentiment');

mongoose.Promise = global.Promise;
mongoose.connect(database.url)
  .then(() => console.log('DB connection succesful'))
  .catch((err) => console.error(err));     // connect to mongoDB database on modulus.io
  
app.use(express.static(__dirname + '/client'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//var Bear     = require('./app/models/bear');
//var business =require('./app/business');



// configure app to use bodyParser()
// this will let us get the data from a POST
////app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();              // get an instance of the express Router
require('./app/services/routes')(app);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('On port ' + port);