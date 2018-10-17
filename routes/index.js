'use strict';

const express = require('express');

const routes = express.Router();

let userControllerClass = require('../controller/userController');
let hotelControllerClass = require('../controller/hotelController');
let userControllerObj = new userControllerClass();
let hotelControllerObj = new hotelControllerClass();

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



module.exports = routes;