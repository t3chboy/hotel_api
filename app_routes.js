module.exports = ( function() {

	//'use strict';

	const express = require('express');

	/**
	 * [router Get the express router module instance]
	 * @type {[type]}
	 */
	const routes = express.Router();

	const userController = require('./controller/userController');

	routes.get('/',function( req,res ){
		console.log("in routes");
	})

	routes.post('/user',userController.userCreate);

	routes.delete('/user/:userId',userController.userDelete);

	routes.put('/user/:userId',userController.userUpdate);

	routes.post( '/hotel' ,function( req, res ){
		res.send( " hotel added successfully " );
	});

	routes.delete( '/hotel/:hotelId' , function( req, res ){
		res.send("hotel deleted successfully");
	});

	routes.put( '/hotel/:hotelId' , function( req, res ){
		res.send( "hotel updated successfully" );
	});

	routes.post( '/hotel/room' ,function( req, res ){
		res.send("Room addedd successfully");
	});

	routes.get('/hotel/rooms/:from-:to',function( req, res ){
		res.send("List of rooms");
	})

	routes.post('/booking',function( req, res ){
		res.send("booking done successfully");
	});

	return routes;

});
