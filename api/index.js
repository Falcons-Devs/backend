const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const admin = require('./components/admin/network');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');


// ROUER
app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});