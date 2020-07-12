const { random } = require("nano-crypto");
const auth = require('../auth');

const TABLE = 'admin';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    function list() {
        return store.list(TABLE);
    }

    function get(id) {
        return store.get(TABLE, id);
    }
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

    async function stylist(body, admin) {
        const admin_s = admin.id.substr(1,admin.id.length-2);
        const stylists = {
            name_stylist: body.name_stylist,
            email: body.email,
            dealy_time: body.dealy_time,
            id_admin: admin_s,
        }
        stylists.id = await random(10).alphanumeric();
        return store.insert("stylists", stylists);
    }

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
                active: admin.active,
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