/**
 * @fileoverview       Controller of the component administrators
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                        Platzi Master
 **/

 //Controller requirements

const { random } = require("nano-crypto");
const auth = require('../auth');

const TABLE = 'admin';

/**
* Create and control the data that is sent to the injected database   
* @param  {Store by injection} {Table name, data}
* @return  {list(), get(id), insert(body), procedure(body, admin), stylist(body, admin), ups(body)}
*/ 

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

//Administrators list
    function list() {
        return store.list(TABLE);
    }

//Find an administrator by id
    function get(id) {
        return store.get(TABLE, id);
    }

//Create administrators
    async function insert(body) {
        const admin = {
            name: body.name,
            email: body.email,
        }

        admin.id = await random(10).alphanumeric();

        if (body.password || body.email) {
            await auth.ups({
                id: admin.id,
                email: admin.email,
                password: body.password,
            })
        }

        return store.ups(TABLE, admin);
    }

//Create procedures
    async function procedure(body, admin) {
        const admin_s = admin.id.substr(1,admin.id.length-2);
        const procedures = {
            name_procedure: body.name_procedure,
            description: body.description,
            price: body.price,
            duration_time: body.duration_time,
            active: body.active,
            id_admin: admin_s,
        }
        procedures.id = await random(10).alphanumeric();
        return store.insert("procedures", procedures);
    }

//Create stylists
    async function stylist(body, admin) {
        const admin_s = admin.id.substr(1,admin.id.length-2);
        const stylists = {
            name_stylist: body.name_stylist,
            email: body.email,
            dealy_time: body.dealy_time,
            id_admin: admin_s,
        }
        stylists.id = await random(10).alphanumeric();

        if (body.password || body.email) {
            await auth.ups({
                id: stylists.id,
                email: stylists.email,
                password: body.password,
            })
        }

        return store.insert("stylists", stylists);
    }

//Update an administrator's details
    async function ups(body) {
        const admin = {
            name: body.name,
            email: body.email,
            active: body.active,
        }
        if (body.id) {
            admin.id = body.id;
        } else {
            admin.id = await random(10).alphanumeric();
        }

        if (body.password || body.email) {
            await auth.ups({
                id: admin.id,
                email: admin.email,
                password: body.password,
            })
        }

        return store.ups(TABLE, admin);
    }

    return {
        list,
        get,
        ups,
        insert,
        procedure,
        stylist,
    };
}