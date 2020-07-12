const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', secure('authenticated'), insert);
router.post('/procedure', secure('authenticated'), procedure);
router.post('/stylist', secure('authenticated'), stylist);
router.put('/', secure('create'), upsert);

// Internal functions
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
    Controller.procedure(req.body, req.admin.id)
        .then((procedures) => {
            response.success(req, res, procedures, 201);
        })
        .catch(next);
}

function stylist(req, res, next) {
    Controller.stylist(req.body, req.admin.id)
        .then((stylists) => {
            response.success(req, res, stylists, 201);
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((admin) => {
            response.success(req, res, admin, 201);
        })
        .catch(next);
}

module.exports = router;