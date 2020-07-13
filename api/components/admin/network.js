/**
 * @fileoverview       Network layer of the component administrators
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
router.get('/', list)
router.get('/:id', get);
router.post('/', secure('authenticated'), insert);
router.post('/procedure/:id', secure('authenticated'), procedure);
router.post('/stylist/:id', secure('authenticated'), stylist);
router.put('/', secure('update'), ups);

/**
* Create and error control the data that is sent to the CONTROLLER  
* @param  {request, responce, next}
* @return  {list, get, insert, procedure, stylist, ups}
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
        .then((admin) => {
            response.success(req, res, admin, 200);
        })
        .catch(next);
}

function insert(req, res, next) {
    Controller.insert(req.body)
        .then((admin) => {
            response.success(req, res, admin, 201);
        })
        .catch(next);
}

function procedure(req, res, next) {
    console.log(req.params);
    Controller.procedure(req.body, req.params)
        .then((procedures) => {
            response.success(req, res, procedures, 201);
        })
        .catch(next);
}

function stylist(req, res, next) {
    Controller.stylist(req.body, req.params)
        .then((stylists) => {
            response.success(req, res, stylists, 201);
        })
        .catch(next);
}

function ups(req, res, next) {
    Controller.ups(req.body)
        .then((admin) => {
            response.success(req, res, admin, 201);
        })
        .catch(next);
}

module.exports = router;