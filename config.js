module.exports = {
    remoteDB: process.env.REMOTE_DB,
    api: {
        port: process.env.API_POR,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST,
        port: process.env.MYSQL_SRV_PORT,
    },
    
}
