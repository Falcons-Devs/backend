const { random } = require("nano-crypto");
const auth = require('../auth');

const TABLA = 'user';

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

    async function upsert(body) {
        const user = {
            name: body.name,
            email: body.email,
            active: body.active,
        }
        if (body.id) {
            user.id = body.id;
            user.active = 1;
        } else {
            user.id = await random(10).alphanumeric();
        }

        if (body.password || body.email) {
            await auth.upsert({
                id: user.id,
                email: user.email,
                password: body.password,
                active: user.active,
            })
        }

        return store.upsert(TABLA, user);
    }

    return {
        list,
        get,
        upsert,
    };
}