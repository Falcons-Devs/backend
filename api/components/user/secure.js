/**
 * @fileoverview       Security layer of the component users
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                         Platzi Master
 **/

//Technical requirements
const auth = require('../../../auth');

/**
* Data control for authentication of users  
* @param  {action}
* @return  {Verify and obtain the authentication token}
*/ 
module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch(action) {
            case 'update':
                const owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;
            case 'appointment':
                auth.check.logged(req);
                next();
                break;
            default:
                next();
        }
    }

    return middleware;
}