/**
 * @fileoverview       Network layer of the component users
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const express = require('express');
const response = require('../network/response');
const Store = require('../store/mysql');
const router = express.Router();

// Routes
router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', update);
router.put('/:table', ups);
router.post('/:table/query', query);

/**
* Create and error control the data that is sent to the CONTROLLER  
* @param  {request, responce, next}
* @return  {list, get, ups, appointment}
**/ 
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

async function update(req, res, next) {
    const dates = await Store.update(req.params.table, req.body)
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