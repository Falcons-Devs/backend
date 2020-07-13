/**
 * @fileoverview  Entry point of the entire project and where a connection
 *                to the server is created, the architecture, its connections
 *                and the routes to be used are organized
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const config = require('../config.js');
const admin = require('./components/admin/network');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const procedures = require('./components/procedures/network');
const stylists = require('./components/stylists/network');
const appointments = require('./components/appointments/network');
const errors = require('../network/errors');

const swaggerDoc = require('./swagger.json');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// ROUTER
app.use('/admin', admin);
app.use('/user', user);
app.use('/auth', auth);
app.use('/procedures', procedures);
app.use('/stylists', stylists);
app.use('/appointments', appointments);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Route of errors
app.use(errors);

//Port where the connection to the server is heard
app.listen(config.api.port, () => {
    console.log('App listening on port ', config.api.port);
    console.log('Press Ctrl+C to quit.');
});