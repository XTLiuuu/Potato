'use strict';
const Profile = require( '../models/profile' );
const mongo = require('mongodb');
console.log("loading the profile Controller")

// this displays all of the hotel reviews
exports.getProfile = ( req, res ) => {
  const objId = new mongo.ObjectId(req.params.id)
  console.log('in getProfile')
  Profile.findOne(objId)
    .exec()
    //this is a function takes one parameter (function) and does this
    .then( ( profile ) => {
      profile: profile
      res.render( 'profile');
      console.log(profile);
      console.log(profile.name);
      console.log(profile.email);
      console.log(profile.phone);
      console.log(profile.gender);
      console.log(profile.dob);
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'profile promise complete' );
    } );
};

exports.saveProfile = ( req, res ) => {
  console.log("in saveProfile!")
  console.dir(req)
  let newProfile = new Profile ({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    dob: req.body.dob,
    fav: req.body.fav
  } )
  console.log("profile = "+ newProfile.phone)

  newProfile.save()
    .then( () => {
      res.redirect( '/profile' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.attachProfile = ( req, res, next ) => {
  console.log('in attachProfile')
  //const objId = new mongo.ObjectId(req.params.id)
  Profile.findOne({email:res.locals.user.googleemail})
  //Profile.findOne(objId) //{"_id": objId})
    .exec()
    .then( ( profile ) => {
      if (profile == null){
        profile = new Profile ({
          name: req.user.googlename,
          email: req.user.googleemail,
          phone: req.body.phone,
          gender: req.body.gender,
          dob: req.body.dob,
          fav: req.body.fav
        } )
      }
      res.locals.profile = profile
      next()
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log(res.locals.profile);
      console.log( 'attachProfile promise complete' );
    } );
};
