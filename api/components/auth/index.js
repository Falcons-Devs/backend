/**
 * @fileoverview       Entry point of the component authentication
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

 //Technical requirements
const store = require('../../../store/mysql');
const ctrl = require('./controller');

module.exports = ctrl(store);