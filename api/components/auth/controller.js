const bcrypt = require('bcryptjs');

const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    async function login(email, password) {
        const data = await store.query(TABLE, { email: email });
        
        return bcrypt.compare(password, data.password)
            .then(equal => {
                if (equal === true) {
                    // Make token;
                    return auth.sign({ ...data })
                } else {
                    throw new Error('Informacion invalida');
                }
            });
    }

    async function ups(data) {
        const authData = {
            id: data.id,
        }

        if (data.email) {
            authData.email = data.email;
        }

        if (data.password) {
            authData.password = await bcrypt.hashSync(data.password, 5);
        }

        return store.ups(TABLE, authData)
    }

    return {
        login,
        ups,
    };
};