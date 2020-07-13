/**
 * @fileoverview  Error control in responses
 * @version                 1.0
 * @author        Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const response = require('./response');

/**
* Create and control the errors   
* @param  {err, req, res, next}
* @return  {response, require, message, status}
**/
function errors(err, req, res, next) {
    console.error('[error]', err);

    const message = err.message || 'Internal error';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

module.exports = errors;
