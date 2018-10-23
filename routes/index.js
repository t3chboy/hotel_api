'use strict';

const express = require('express');

const routes = express.Router();

const logger = require('../services/logger_service');

/**
 * [userControllerClass User controller with Rest methods]
 * @type {[type]}
 */
let userControllerClass = require('../controller/userController');

/**
 * [hotelControllerClass Hotel controller with Rest methods]
 * @type {[type]}
 */
let hotelControllerClass = require('../controller/hotelController');

/**
 * [roomControllerClass Room controller with Rest methods]
 * @type {[type]}
 */
let roomControllerClass = require('../controller/roomController');

/**
 * [bookingControllerClass Room Booking controller]
 * @type {[type]}
 */
let bookingControllerClass = require('../controller/bookingController');

/**
 * [searchControllerClass Room search controller]
 * @type {[type]}
 */
let searchControllerClass = require('../controller/searchController');

/**
 * [tokenServiceClass User Identity Token generation and validation service]
 * @type {[type]}
 */
let tokenServiceClass = require('../services/token_service');

let userControllerObj = new userControllerClass();
let hotelControllerObj = new hotelControllerClass();
let roomControllerObj = new roomControllerClass();
let bookingControllerObj = new bookingControllerClass();
let searchControllerObj = new searchControllerClass();
let tokenServiceObj = new tokenServiceClass();


routes.get('/', function (req, res) {
    console.log("in routes");
    res.status(200);
    res.send("Welcome to hotel API");   
})

/*============================================= User Routes =====================================================*/

routes.delete('/user/:userId', (req, res, next) => {
    let userId = req.params.userId;
    try {
        userControllerObj.delete(userId).then(data => {
            res.status(201);
            res.json({'message':data});
        }, err => {
            res.status(400);
            res.send(err);
            logger.info(err);
        })
    } catch (err) {
        res.status(500);
        res.send(err);
        logger.info(err);
    }
});

routes.put('/user/:userId', (req, res, next) => {
    let userId = req.params.userId;
    let bodyParams = req.body;
    try {
        userControllerObj.update(userId,bodyParams).then(data => {
            res.status(200);
            res.send({"message":data});
        }, err => {
            res.status(400);
            res.send(err);
            logger.info(err);
        })
    } catch (err) {
        res.status(500);
        res.send(err);
        logger.info(err);
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
            logger.info(err);
        })
    } catch (err){
        res.status(500);
        res.send(err);
        logger.info(err);
    }
});

/*============================================= Hotel Routes =====================================================*/


routes.post('/hotel',(req, res, next)=>{

    let requestParams = req.body;

    try{
        hotelControllerObj.create(requestParams).then(data => {
            res.status(200);
            res.send({'message':data});
        }, err => {
            res.status(400);
            res.send(err);
            logger.info(err);
        })
    } catch (err){
        res.status(500);
        res.send(err);
        logger.info(err);
    }
});


routes.put('/hotel/:hotelId', (req, res, next) => {
    let hotelId = req.params.hotelId;
    let requestParams = req.body;
    try {
        hotelControllerObj.update(hotelId,requestParams).then(data => {
            res.status(200);
            res.send({"message":data});
        }, err => {
            res.status(400);
            res.send(err);
            logger.info(err);
        })
    } catch (err) {
        res.status(500);
        res.send(err);
        logger.info(err);
    }
});


routes.delete('/hotel/:hotelId', (req, res, next) => {
    let hotelId = req.params.hotelId;
    try {
        hotelControllerObj.delete(hotelId).then(data => {
            res.status(201);
            res.json({'message':data});
        }, err => {
            res.status(400);
            res.send(err);
            logger.info(err);
        })
    } catch (err) {
        res.status(500);
        res.send(err);
        logger.info(err);
    }
});


/*============================================= Room Routes =====================================================*/

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
            logger.info(err);
        });
    } catch (err){
        res.status(500);
        res.send(err);
        logger.info(err);
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
            logger.info(err);
        });
    } catch (err){
        res.status(500);
        res.send(err);
        logger.info(err);
    }
});

/*============================================= Booking Routes =====================================================*/

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
                    logger.info(err);
                });
            }catch (err){
                res.status(500);
                res.send(err);
                logger.info(err);
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

/*============================================= Search Routes =====================================================*/

routes.get('/search/:hotelId?/',( req, res, next ) =>{

    const queryParams = req.query;
    const hotelId = req.params.hotelId || 0;


    try{
        searchControllerObj.search( queryParams , hotelId ).then(data => {
            res.status(200);
            res.send({'data':data});
        },err =>{ 
            res.status(400);
            res.send(err);
            logger.info(err);
        });
    }catch( error ){
        res.status('500');
        res.send(error);
        logger.info(error);
    }

});




module.exports = routes;