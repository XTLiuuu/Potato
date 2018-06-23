'use strict';
const Review = require( '../models/Review' );
console.log("loading the reviews Controller")

// this displays all of the reviews
exports.getAllReviews = ( req, res ) => {
  console.log('in getAllReviews')
  Review.find( {} )
    .exec()
    //this is a function takes one parameter (function) and does this
    .then( ( reviews ) => {
      console.log("reviews = ")
      console.dir(reviews)
      res.render( 'reviews', {
        reviews: reviews
      } );
    } ) 
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'review promise complete' );
    } );
};


exports.saveReview = ( req, res ) => {
  console.log("in saveReview!")
  console.dir(req)
  let newReview = new Review ({
    rating: req.body.rating,
    reviewTitle: req.body.reviewTitle,
    airline: req.body.airline,
    flightnumber: req.body.flightnumber,
    origin: req.body.origin,
    destination: req.body.destination,
    cabin: req.body.cabin,
    review: req.body.review,
    photo: req.body.photo,
    time: req.body.time,
    legroom: req.body.legroom,
    seatComfort: req.body.seatComfort,
    cleaniess: req.body.cleaniess,
    service: req.body.service,
    food: req.body.food,
    entertainment: req.body.entertainment
  } )

  console.log("review = "+newReview)

  newReview.save()
    .then( () => {
      res.redirect( '/reviews' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteReview = (req, res) => {
  console.log("in deleteReview")
  let reviewName = req.body.deleteReview
  //check what reviews select to delete
  if (typeof(reviewName)=='string') {
      Review.deleteOne({reviewTitle:reviewName})
           .exec()
           .then(()=>{res.redirect('/reviews')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='object'){
      Review.deleteMany({name:{$in:reviewName}})
           .exec()
           .then(()=>{res.redirect('/reviews')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='undefined'){
      console.log("This is if they didn't select a review")
      res.redirect('/reviews')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown reviewName: ${reviewName}`)
  }

};
