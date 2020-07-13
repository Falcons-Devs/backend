/**
 * @fileoverview       Controller of the component stylists
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                        Platzi Master
 **/

//Technical requirements
const TABLE = 'stylists';

/**
* Create and control the data that is sent to the injected database   
* @param  {Store by injection} {Table name, data}
* @return  {list(), get(id), update(body)}
**/
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

//Stylists list
    function list() {
        return store.list(TABLE);
    }

//Find an stylist by id
    function get(id) {
        return store.get(TABLE, id);
    }

//Update an stylist's details
    async function update(body, admin) {
        const stylists = {
            id: body.id,
            name_stylist: body.name_stylist,
            email: body.email,
            availability: body.availability,
            dealy_time: body.dealy_time,
        }
        return store.update(TABLE, stylists);
    }

    return {
        list,
        get,
        update,
    };
}