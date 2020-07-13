/**
 * @fileoverview  Entry point of the Microservice of data storage and connection to the database
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const config = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

// ROUTES
app.use('/', router);

//Port where the connection to the server is heard
app.listen(config.mysqlService.port, () => {
    console.log('Mysql service listening on the port', config.mysqlService.port);
})