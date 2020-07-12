const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch(action) {
            case 'create':
                const owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;
            case 'authenticated':
                auth.check.logged(req);
                next();
                break;
 
            default:
                next();
        }
    }

    return middleware;
}