/**
 * @fileoverview       Controller of the component authentication
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                        Platzi Master
 **/

//Technical requirements
const bcrypt = require('bcryptjs');
const auth = require('../../../auth');
const { TokenExpiredError } = require('jsonwebtoken');
const TABLE = 'auth';

/**
* Check if the user is logged in and if they have a password assigned by token   
* @param  {email, password, data}
* @return  {Token, pass the assigned key data}
**/ 
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

//Compare email data and password
    async function login(email, password) {
        const data = await store.query(TABLE, { email: email });
        
        return bcrypt.compare(password, data.password)
            .then(equal => {
                if (equal === true) {
                    // Make token;
                    return auth.sign({ ...data })
                } else {
                    throw new Error('Informacion invalida');
                }
            });
    }

//Returns the data necessary to create or authenticate [user, administrator, stylist]
    async function ups(data) {
        const authData = {
            id: data.id,
        }

        if (data.email) {
            authData.email = data.email;
        }

        if (data.password) {
            authData.password = await bcrypt.hashSync(data.password, 5);
        }

        return store.ups(TABLE, authData);
    }

    return {
        login,
        ups,
    };
};