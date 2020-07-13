/**
 * @fileoverview       Network layer of the component authentication
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

/**
* Create the login path  
* @param  {request, responce, next}
* @return  {Token}
**/ 
router.post('/login', function(req, res, next) {
    Controller.login(req.body.email , req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(next);
})

module.exports = router;