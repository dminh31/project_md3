const myql2 = require("mysql2");
require("dotenv").config()
const connection = myql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const database = connection.promise();

module.exports = database;
