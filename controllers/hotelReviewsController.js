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
    email: req.user.googleemail,
    name: req.user.googlename,
    rating: req.body.rating,
    reviewTitle: req.body.reviewTitle,
    hotelName: req.body.hotelName,
    brand: req.body.brand,
    state: req.body.state,
    city: req.body.city,
    purpose: req.body.purpose,
    review: req.body.review,
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
      res.redirect( '/hotel' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.attachHotelReview = ( req, res, next ) => {
  console.log('in attachHotelReview')
  hotelReview.find( {email:res.locals.user.googleemail} )
    .exec()
    .then( ( hotelReview ) => {
      res.locals.hotelReview = hotelReview
      next()
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( res.locals.hotelReview );
      console.log( 'attachHotelReview promise complete' );
    } );
};


exports.deleteHotelReview1 = (req, res) => {
  console.log("in deleteHotelReview")
  let reviewName = req.body.reviewID
  //check what reviews select to delete
  if (typeof(reviewName)=='string') {
      hotelReview.deleteOne({_id:reviewName})
           .exec()
           .then(()=>{res.redirect('/myReviews')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='object'){
      hotelReview.deleteMany({id:{$in:reviewName}})
           .exec()
           .then(()=>{res.redirect('/myReviews')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='undefined'){
      console.log("This is if they didn't select a review")
      res.redirect('/myReviews')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown reviewName: ${reviewName}`)
  }

};
