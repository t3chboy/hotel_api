const userModel = require('../models/userModel');

exports.userCreate = function( req, res ){
	userModel.create( req , res );
};


exports.userUpdate = function( req, res ){
	userModel.update( req , res );
};


exports.userDelete = function( req, res ){
	userModel.delete( req , res );
};