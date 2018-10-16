'use strict';

const express = require('express');

const routes = express.Router();

let userControllerClass = require('../controller/userController');
let userControllerObj = new userControllerClass();

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


module.exports = routes;