const { random } = require("nano-crypto");
const auth = require('../auth');

const TABLA = 'admin';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }
    async function insert(body) {
        const admin = {
            name: body.name,
            email: body.email,
        }

        admin.id = await random(10).alphanumeric();

        if (body.password || body.email) {
            await auth.upsert({
                id: admin.id,
                email: admin.email,
                password: body.password,
            })
        }

        return store.upsert(TABLA, admin);
    }

    async function procedure(body, admin) {
        const procedures = {
            name_procedure: body.name_procedure,
            description: body.description,
            price: body.price,
            duration_time: body.duration_time,
            active: body.active,
            id_admin: admin.id,
        }
        producers.id = await random(10).alphanumeric();
        return store.insert("producers", producers);
    }

    async function stylist(body, admin) {
        const stylists = {
            name_stylist: body.name_stylist,
            email: body.email,
            availability: body.availability,
            dealy_time: body.dealy_time,
            id_admin: admin.id,
        }
        stylists.id = await random(10).alphanumeric();
        return store.insert("stylists", stylists);
    }

    async function upsert(body) {
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
            await auth.upsert({
                id: admin.id,
                email: admin.email,
                password: body.password,
                active: admin.active,
            })
        }

        return store.upsert(TABLA, admin);
    }

    return {
        list,
        get,
        upsert,
        insert,
        procedure,
        stylist,
    };
}