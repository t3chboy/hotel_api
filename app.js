/**
 * require all env variables
 */
require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));



let config = require('./configuration');
const appRoutes = require('./routes/index');
app.use('/', appRoutes);


const PORT = config.port;

app.listen(PORT);