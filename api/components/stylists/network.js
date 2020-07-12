const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.put('/:id', update);

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
        .then((procedure) => {
            response.success(req, res, procedure, 200);
        })
        .catch(next);
}

function update(req, res, next) {
    Controller.update(req.body, rep.params.id)
        .then((procedure) => {
            response.success(req, res, procedure, 201);
        })
        .catch(next);
}

module.exports = router;