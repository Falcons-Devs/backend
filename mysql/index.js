//const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const config = require('../config');
const router = require('./network');

const app = express();

//app.use(cors());
app.use(bodyParser.json());

// RUTAS
app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('Servicio de mysql escuchando en el puerto', config.mysqlService.port);
})