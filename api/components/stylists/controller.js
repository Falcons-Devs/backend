
const TABLE = 'stylists';

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

    async function update(body, admin) {
        const stylists = {
            id: body.id,
            name_stylist: body.name_stylist,
            email: body.email,
            availability: body.availability,
            dealy_time: body.dealy_time,
            id_admin: admin.id,
        }
        return store.ups(TABLE, stylists);
    }

    return {
        list,
        get,
        update,
    };
}