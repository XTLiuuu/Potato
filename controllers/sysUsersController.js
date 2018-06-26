'use strict';
const User = require( '../models/sysUser' );
console.log("loading the users Controller")


// this displays all of the users
exports.getAllUsers = ( req, res ) => {
  console.log('in getAllUsers')
  User.find( {} )
    .exec()
    //this is a function takes one parameter (function) and does this
    .then( ( users ) => {
      console.log("users = ")
      console.dir(users)
      res.render( 'sysusers', {
        users: users
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'user promise complete' );
    } );
};


exports.saveUser = ( req, res ) => {
  console.log("in saveUser!")
  console.dir(req)
  let newUser = new User( {
    name: req.body.name,
    password: req.body.password
  } )

  console.log("user = "+newUser)

  newUser.save()
    .then( () => {
      res.redirect( '/sysUsers' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteUser = (req, res) => {
  console.log("in deleteUser")
  let userName = req.body.deleteName
  //check what users select to delete
  if (typeof(userName)=='string') {
      User.deleteOne({name:userName})
           .exec()
           .then(()=>{res.redirect('/sysUsers')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(userName)=='object'){
      User.deleteMany({name:{$in:userName}})
           .exec()
           .then(()=>{res.redirect('/sysUsers')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(userName)=='undefined'){
      console.log("This is if they didn't select a user")
      res.redirect('/sysUsers')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown userName: ${userName}`)
  }

};
