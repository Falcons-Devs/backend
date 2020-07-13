/**
 * @fileoverview       Network layer of the component users
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', ups);
router.put('/', secure('update'), ups);
router.post('/appointment', secure ('appointment'), appointment);

/**
* Create and error control the data that is sent to the CONTROLLER  
* @param  {request, responce, next}
* @return  {list, get, ups, appointment}
**/ 
function list(req, res, next) {
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function ups(req, res, next) {
    Controller.ups(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

function appointment(req, res, next) {
    Controller.appointment(req.body)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

module.exports = router;