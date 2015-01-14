// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');


// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://dev:2bees-dev1212@ds045978.mongolab.com:45978/2bees');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
