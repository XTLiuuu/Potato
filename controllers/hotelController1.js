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
      res.render( 'hotel1', {
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

exports.deleteHotelReview = (req, res) => {
  console.log("in deleteHotelReview")
  let reviewName = req.body.deleteHotelReview
  //check what reviews select to delete
  if (typeof(reviewName)=='string') {
      hotelReview.deleteOne({reviewTitle:reviewName})
           .exec()
           .then(()=>{res.redirect('/hotel1')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='object'){
      Review.deleteMany({name:{$in:reviewName}})
           .exec()
           .then(()=>{res.redirect('/hotel1')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='undefined'){
      console.log("This is if they didn't select a review")
      res.redirect('/hotel1')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown reviewName: ${reviewName}`)
  }

};
