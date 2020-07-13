/**
 * @fileoverview       Controller of the component users
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                        Platzi Master
 **/

//Technical requirements
const { random } = require("nano-crypto");
const auth = require('../auth');
const TABLE = 'user';

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

//Users list
    function list() {
        return store.list(TABLE);
    }

//Find an user by id
    function get(id) {
        return store.get(TABLE, id);
    }

//Create and Update an user's details
    async function ups(body) {
        const user = {
            name: body.name,
            email: body.email, 
        }
        if (body.id) {
            user.id = body.id;
        } else {
            user.id = await random(10).alphanumeric();
        }

        if (body.password || body.email) {
            await auth.ups({
                id: user.id,
                email: user.email,
                password: body.password,
            })
        }
        return store.ups(TABLE, user);
    }

//Schedule an appointment for cosmetic procedure
    async function appointment(body){
        const appointment = {
            date: body.date,
            id_client: body.id_client,
            id_procedure: body.id_procedure,
            id_stylist: body.id_stylist,
        }
        appointment.id = await random(10).alphanumeric();
        return store.ups('appointments', appointment);
    }

    return {
        list,
        get,
        ups,
        appointment,
    };
}