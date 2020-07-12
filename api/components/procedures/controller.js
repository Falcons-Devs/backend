
const TABLE = 'procedures';

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
        return store.ups(TABLE, procedures);
    }

    return {
        list,
        get,
        update,
    };
}