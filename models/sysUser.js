'use strict';
const mongoose = require( 'mongoose' );

var sysUserSchema = mongoose.Schema( {
  name: String,
  password: String,
} );

module.exports = mongoose.model( 'sysUser', sysUserSchema );
