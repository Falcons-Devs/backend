/**
 * @fileoverview  Authentication layer of users, administrators and stylists
 *                and they are assigned a token
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

//Complete the format for the token with a secret key
function sign(data) {
    return jwt.sign(data, secret);
}

//Check the token
function verify(token) {
    return jwt.verify(token, secret)
}

//Constant that is returned when requesting login and authentication
const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner) {
            throw error('You can not do this', 401);
        }
    },
    
    logged: function(req) {
        const decoded = decodeHeader(req);
    },
}

//Get the token sent in the request
function getToken(auth) {
    if (!auth) {
        throw error('No token comes', 401);
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Invalid format', 401);
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

//Decode the token and compare it with the saved key
function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};