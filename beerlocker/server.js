// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Connects to mongodb
mongoose.connect('mongodb://dev:2bees-dev1212@ds045978.mongolab.com:45978/2bees');

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

// -- New Code Below -- //

// Create a new route with the prefix /beers
var beersRoute = router.route('/beers');

// Create endpoint /api/beers for POSTS
beersRoute.post(function(req, res) {
  // Create a new instance of Beer model
  var beer = new Beer();

  // Set the beer propertis that came from POST data
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;

  // Save the beer and check for errors
  beer.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Beer added to the locker!', data: beer });
  });
});


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);