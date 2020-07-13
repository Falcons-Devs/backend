/**
 * @fileoverview       Entry point of the component stylists
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const config = require('../../../config');

let store;
if (config.remoteDB === true) {
    store = require('../../../store/remote-mysql');
} else {
    store = require('../../../store/mysql');
}

const ctrl = require('./controller');

module.exports = ctrl(store);