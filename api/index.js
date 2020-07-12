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
const errors = require('../network/errors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');


// ROUTER
app.use('/admin', admin);
app.use('/user', user);
app.use('/auth', auth);
app.use('/procedures', procedures);
app.use('/stylists', stylists);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
    console.log('App listening on port ', config.api.port);
    console.log('Press Ctrl+C to quit.');
});