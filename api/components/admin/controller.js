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
    /*async function insert(body) {
        const admin = {
            name: body.name,
            username: body.username,
        }

        admin.id = await random(10).alphanumeric();

        if (body.password || body.username) {
            await auth.upsert({
                id: admin.id,
                username: admin.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, admin);
    }*/

    async function upsert(body) {
        const admin = {
            name: body.name,
            username: body.username,
        }
        if (body.id) {
            admin.id = body.id;
        } else {
            admin.id = await random(10).alphanumeric();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: admin.id,
                username: admin.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, admin);
    }

    return {
        list,
        get,
        upsert,
    };
}