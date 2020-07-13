/**
 * @fileoverview       Controller of the component appointments
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                        Platzi Master
 **/

//Technical requirements
const TABLE = 'appointments';

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

//Appointments list
    function list() {
        return store.list(TABLE);
    }

//Find an appointment by id
    function get(id) {
        return store.get(TABLE, id);
    }
    
//Update an appointment's details
    async function update(body) {
        
        const procedures = {
            id: body.id,
            canceled: body.canceled,
       }
        return store.ups(TABLE, procedures);
    }

    return {
        list,
        get,
        update,
    };
}