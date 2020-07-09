const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', secure('check'), insert);
//router.post('/appointments', secure('appointments'), appointments);
router.put('/', secure('ckeck'), upsert);

// Internal functions
function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
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

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((admin) => {
            response.success(req, res, admin, 201);
        })
        .catch(next);
}

/*function appointments(req, res, next){
    Controller.appointments(req.user.id)
    .then(data => {
        response.success(req, res, user, 201);
    })
    .catch(next);
}*/

module.exports = router;