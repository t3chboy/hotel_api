'use strict';

const express = require('express');

const routes = express.Router();

let userControllerClass = require('../controller/userController');
let hotelControllerClass = require('../controller/hotelController');
let roomControllerClass = require('../controller/roomController');
let bookingControllerClass = require('../controller/bookingController');
let searchControllerClass = require('../controller/searchController');
let tokenServiceClass = require('../services/token_service');

let userControllerObj = new userControllerClass();
let hotelControllerObj = new hotelControllerClass();
let roomControllerObj = new roomControllerClass();
let bookingControllerObj = new bookingControllerClass();
let searchControllerObj = new searchControllerClass();
let tokenServiceObj = new tokenServiceClass();

routes.get('/', function (req, res) {
    console.log("in routes");
})

routes.delete('/user/:userId', (req, res, next) => {
    let rosterInfo = req.params;
    try {
        userControllerObj.userDelete(rosterInfo).then(data => {
            res.status(201);
            res.send({'msg':data});
        }, err => {
            res.status(500);
            res.send(err);
        })
    } catch (err) {
        res.status(500);
        res.send(err);
    }
});

routes.put('/user/:userId', (req, res, next) => {
    let rosterInfo = req.params;
    let bodyParams = req.body;
    try {
        userControllerObj.update(rosterInfo,bodyParams).then(data => {
            res.status(200);
            res.send({'msg':data});
        }, err => {
            res.status(400);
            res.send(err);
        })
    } catch (err) {
        res.status(500);
        res.send(err);
    }
});

routes.post('/user',(req, res, next)=>{

    let bodyParams = req.body;

    try{
        userControllerObj.create(bodyParams).then(data => {
            res.status(200);
            res.send({'message':data});
        }, err => {
            res.status(400);
            res.send(err);
        })
    } catch (err){
        res.status(500);
        res.send(err);
    }
});

routes.post( '/hotel',hotelControllerObj.create.bind(hotelControllerObj));

routes.put( '/hotel/:hotelId',hotelControllerObj.update.bind(hotelControllerObj));

routes.delete( '/hotel/:hotelId',hotelControllerObj.delete.bind(hotelControllerObj));

routes.post('/hotel/:hotelId/room',( req, res , next )=>{
    let bodyParams = req.body;
    let hotelId = req.params.hotelId;

    try{
        roomControllerObj.create( bodyParams, hotelId ).then(data=>{
            res.status(200);
            res.send({'message':data});
        },err =>{
            res.status(400);
            res.send(err);
        });
    } catch (err){
        res.status(500);
        res.send(err);
    }
});

routes.post('/hotel/:hotelId/room/bulk',( req, res , next )=>{
    let bodyParams = req.body;
    let hotelId = req.params.hotelId;

    try{
        roomControllerObj.bulkCreate( bodyParams, hotelId ).then(data=>{
            res.status(200);
            res.send({'message':data});
        },err =>{
            res.status(400);
            res.send(err);
        });
    } catch (err){
        res.status(500);
        res.send(err);
    }
});


routes.post('/booking/create', ( req, res, next ) =>{
    
    if(req.headers['x-token'] != undefined){
        
        if( tokenServiceObj.validateToken( req.headers['x-token']) != 0 ){
            const userId = req.headers['x-token'];
            let bodyParams = req.body;
            try{
                bookingControllerObj.create( bodyParams, userId ).then(data=>{
                    res.status(200);
                    res.send({'message':data});
                }, err =>{
                    res.status(400);
                    res.send(err);
                });
            }catch (err){
                res.status(500);
                res.send(err);
            }


        }else{
            res.status(400);
            res.send({'message':"Authentication Failed, Invalid user."}); 
        }
    }else{
        res.status(400);
        res.send({'message':"Authentication Failed, Invalid user."}); 
        res.end("");      
    }
});


routes.get('/search/:hotelId?',( req, res, next ) =>{

    const bodyParams = req.body;

    try{
        searchControllerObj.search( bodyParams ).then(data => {
            res.status(200);
            res.send({'message':data});
        },err =>{ 
            res.status(400);
            res.send(err);
        });
    }catch( error ){
        res.status('500');
        res.send(error);
    }

});




module.exports = routes;