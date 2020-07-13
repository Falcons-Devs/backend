/**
 * @fileoverview       Connection to the database and handling of SQL queries
 * @version                               1.0
 * @author         Byron Piedrahita <https://github.com/ByronPiedrahita>
 * @copyright                        Platzi Master
 **/

//Technical requirements
const mysql = require('mysql');
const config = require('../config');

//Configuration of Data Base
const base = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

//Conection
function handleCon() {
    connection = mysql.createConnection(base);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

//Query that lists the data of a table
function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

//Query that looks for a data in the table by its identifier
function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

//Query that creates new data in the table
function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

//Query that updates the data of a table
function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

//Query that identifies if a record is created or if it is being updated
async function ups(table, data) {
    const id = data.id;
    const row = await this.query(table, { id: id });
    if (row !== null) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
}

//Query that allows other queries
function query(table, query) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    get,
    insert,
    update,
    ups,
    query,
    
};