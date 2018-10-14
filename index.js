/**
 * require all env variables
 */
require('dotenv').config()

const bodyParser = require('body-parser');

/**
 * [express Express Module]
 * @type {[type]}
 */
const express = require('express');

/**
 * [app Instance of express module]
 * @type {[type]}
 */
const app = express();

app.use( bodyParser.urlencoded({
	extended : true
}) ); //why are we using this ?
app.use( bodyParser.json() );

const appRoutes = require('./app_routes');
console.log( appRoutes );
app.use('/',appRoutes());

/**
 * [PORT Where application starts listening]
 * @type {Number}
 */
const PORT = 4000;


app.listen( PORT );