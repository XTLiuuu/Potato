'use strict';
const mongoose = require( 'mongoose' );

var hotelReviewSchema = mongoose.Schema( {
  email: String,
  name: String,
  rating: Number,
  reviewTitle: String,
  hotelName: String,
  brand: String,
  city: String,
  state: String,
  purpose: String,
  review: String,
  photo: Object,
  service: Number,
  location: Number,
  food: Number,
  value: Number,
  cleanienss: Number,
  entertainment: Number
} );

module.exports = mongoose.model( 'hotelReview', hotelReviewSchema );
