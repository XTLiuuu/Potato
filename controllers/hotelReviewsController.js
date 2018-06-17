'use strict';
const hotelReview = require( '../models/hotelReview' );
console.log("loading the hotel reviews Controller")

// this displays all of the hotel reviews
exports.getAllHotelReviews = ( req, res ) => {
  console.log('in getAllHotelReviews')
  hotelReview.find( {} )
    .exec()
    //this is a function takes one parameter (function) and does this
    .then( ( hotelReviews ) => {
      console.log("hotel reviews = ")
      console.dir(hotelReviews)
      res.render( 'hotelReview', {
        hotelReviews: hotelReviews
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'hotel review promise complete' );
    } );
};


exports.saveHotelReview = ( req, res ) => {
  console.log("in saveHotelReview!")
  console.dir(req)
  let newHotelReview = new hotelReview ({
    rating: req.body.rating,
    reviewTitle: req.body.reviewTitle,
    hotelName: req.body.hotelName,
    roomType: req.body.roomType,
    country: req.body.country,
    city: req.body.city,
    purpose: req.body.purpose,
    review: req.body.review,
    time: req.body.time,
    photo: req.body.photo,
    service: req.body.service,
    location: req.body.location,
    food: req.body.food,
    value: req.body.value,
    cleanienss: req.body.cleanienss,
    entertainment: req.body.entertainment
  } )

  console.log("hotel review = "+newHotelReview)

  newHotelReview.save()
    .then( () => {
      res.redirect( '/hotelReviews' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteHotelReview = (req, res) => {
  console.log("in deleteHotelReview")
  let reviewName = req.body.deleteHotelReview
  //check what reviews select to delete
  if (typeof(reviewName)=='string') {
      hotelReview.deleteOne({reviewTitle:reviewName})
           .exec()
           .then(()=>{res.redirect('/hotelReviews')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='object'){
      Review.deleteMany({name:{$in:reviewName}})
           .exec()
           .then(()=>{res.redirect('/hotelReviews')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='undefined'){
      console.log("This is if they didn't select a review")
      res.redirect('/hotelReviews')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown reviewName: ${reviewName}`)
  }

};
