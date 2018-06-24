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
      res.render( 'flight1', {
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

exports.deleteReview = (req, res) => {
  console.log("in deleteReview")
  let reviewName = req.body.deleteReview
  //check what reviews select to delete
  if (typeof(reviewName)=='string') {
      Review.deleteOne({reviewTitle:reviewName})
           .exec()
           .then(()=>{res.redirect('/flight1')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='object'){
      Review.deleteMany({name:{$in:reviewName}})
           .exec()
           .then(()=>{res.redirect('/flight1')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(reviewName)=='undefined'){
      console.log("This is if they didn't select a review")
      res.redirect('/flight1')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown reviewName: ${reviewName}`)
  }

};
