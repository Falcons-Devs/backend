const bcrypt = require('bcryptjs');

const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    async function login(email, password) {
        const data = await store.query(TABLA, { email: email });
        
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // Generar token;
                    return auth.sign({ ...data })
                } else {
                    throw new Error('Informacion invalida');
                }
            });
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        }

        if (data.email) {
            authData.email = data.email;
        }

        if (data.password) {
            authData.password = await bcrypt.hashSync(data.password, 5);
        }

        return store.upsert(TABLA, authData)
    }

    return {
        login,
        upsert,
    };
};