const express = require('express');

const response = require('../network/response');
const Store = require('../store/mysql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', ups);
router.post('/:table/query', query);

async function list(req, res, next) {
    const dates = await Store.list(req.params.table)
    response.success(req, res, dates, 200);
}

async function get(req, res, next) {
    const dates = await Store.get(req.params.table, req.params.id)
    response.success(req, res, dates, 200);
}

async function insert(req, res, next) {
    const dates = await Store.insert(req.params.table, req.body)
    response.success(req, res, dates, 200);
}

async function ups(req, res, next) {
    const dates = await Store.ups(req.params.table, req.body)
    response.success(req, res, dates, 200);
}

async function query(req, res, next) {
    const dates = await store.query(req.params.table, req.body.query, req.body.join)
    response.success(req, res, dates, 200);
}

module.exports = router;