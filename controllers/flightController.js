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
      res.render( 'flight', {
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
