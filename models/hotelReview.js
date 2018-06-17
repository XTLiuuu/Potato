'use strict';
const mongoose = require( 'mongoose' );

var hotelReviewSchema = mongoose.Schema( {
  rating: Number,
  reviewTitle: String,
  hotelName: String,
  roomType: String,
  country: String,
  city: String,
  purpose: String,
  review: String,
  time: String,
  photo: Object,
  service: Number,
  location: Number,
  food: Number,
  value: Number,
  cleanienss: Number,
  entertainment: Number
} );

module.exports = mongoose.model( 'hotelReview', hotelReviewSchema );
