var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mainRouter = require('./routes/main');
var newtripRouter = require('./routes/newtrip');
var flightreviewRouter = require('./routes/flightreview');
var hotelreviewRouter = require('./routes/hotelreview');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin');

const usersController = require('./controllers/usersController');
const reviewsController = require('./controllers/reviewsController');
const hotelReviewsController = require('./controllers/hotelReviewsController');

const mongoose = require( 'mongoose' );
var app = express();

// here is where we connect to the database!
mongoose.connect( 'mongodb://localhost/demoapp3' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we are connected!")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/newtrip', newtripRouter);
//app.use('/users', usersRouter);
app.use('/signin', signinRouter);
//app.use('/flightreview', flightreviewRouter);
//app.use('/hotelreview', hotelreviewRouter);
console.log("before the users routes...")
console.dir(usersController)
app.get('/users', usersController.getAllUsers );
app.post('/saveUser', usersController.saveUser );
app.post('/deleteUser', usersController.deleteUser );

app.get('/reviews', reviewsController.getAllReviews );
app.post('/saveReview', reviewsController.saveReview );
app.post('/deleteReview', reviewsController.deleteReview );

app.get('/hotelReviews', hotelReviewsController.getAllHotelReviews );
app.post('/saveHotelReview', hotelReviewsController.saveHotelReview );
app.post('/deleteHotelReview', hotelReviewsController.deleteHotelReview );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
