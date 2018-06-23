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

const User = require( './models/user' )
//const flash = require('connect-flash')
const session = require("express-session")
const bodyParser = require("body-parser");

const sysUsersController = require('./controllers/sysUsersController')
const usersController = require('./controllers/usersController')
const reviewsController = require('./controllers/reviewsController')
const hotelReviewsController = require('./controllers/hotelReviewsController')

const mongoose = require( 'mongoose' );
var app = express();

//NEW CODE FOR authentication
//const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)

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
app.use(session({ secret: 'zzbbyanana' }));
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    console.log("user has been Authenticated")
    res.locals.user = req.user
    res.locals.loggedIn = true
    if (req.user){
      if (req.user.googleemail=='lxt@brandeis.edu'){
        console.log("Owner has logged in")
        res.locals.status = '0211'
      } else {
        console.log('User has logged in')
        res.locals.status = 'user'
      }
    }
  }
  next()
})

//Now add the authentication routes

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/signin', function(req,res){
  res.render('signin',{})
    })

app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });




app.use('/', mainRouter);
app.use('/newtrip', newtripRouter);
app.use('/signin', signinRouter);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/loginerror'
        }));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("checking to see if they are authenticated!")
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      return next();
    }
    console.log("user has not been authenticated...")
    // if they aren't redirect them to the home page
    res.redirect('/signin');
}

// we require them to be logged in to see their profile
app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

console.log("before the users routes...")
console.dir(usersController)
app.get('/users', usersController.getAllUsers );
app.get('/users/:id', usersController.getAllUsers );

app.get('/sysUsers', isLoggedIn, sysUsersController.getAllUsers );
app.post('/saveUser', isLoggedIn, sysUsersController.saveUser );
app.post('/deleteUser', isLoggedIn, sysUsersController.deleteUser );

app.get('/reviews', isLoggedIn,reviewsController.getAllReviews );
app.post('/saveReview', isLoggedIn, reviewsController.saveReview );
app.post('/deleteReview', isLoggedIn, reviewsController.deleteReview );

app.get('/hotelReviews', isLoggedIn, hotelReviewsController.getAllHotelReviews );
app.post('/saveHotelReview', isLoggedIn, hotelReviewsController.saveHotelReview );
app.post('/deleteHotelReview', isLoggedIn, hotelReviewsController.deleteHotelReview );

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
