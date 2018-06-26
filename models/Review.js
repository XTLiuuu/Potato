'use strict';
const mongoose = require( 'mongoose' );

var reviewSchema = mongoose.Schema( {
  name: String,
  email: String,
  rating: Number,
  reviewTitle: String,
  airline: String,
  flightnumber: String,
  photo: Object,
  origin: String,
  destination: String,
  cabin: String,
  review: String,
  time: String,
  legroom: Number,
  seatComfort: Number,
  cleaniess: Number,
  service: Number,
  food: Number,
  entertainment: Number
} );

module.exports = mongoose.model( 'Review', reviewSchema );
