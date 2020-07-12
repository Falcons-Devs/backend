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
    };
}