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
      res.render( 'hotel', {
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
