/**
 * @fileoverview       Controller of the component procedures
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                        Platzi Master
 **/

//Technical requirements
const TABLE = 'procedures';

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

//Procedures list
    function list() {
        return store.list(TABLE);
    }

//Find an procedure by id
    function get(id) {
        return store.get(TABLE, id);
    }

//Update an procedure's details
    async function update(body) {
        
        const procedures = {
            id: body.id,
            name_procedure: body.name_procedure,
            description: body.description,
            price: body.price,
            duration_time: body.duration_time,
            promotion: body.promotion,
            active: body.active,
       }
        return store.update(TABLE, procedures);
    }

    return {
        list,
        get,
        update,
    };
}