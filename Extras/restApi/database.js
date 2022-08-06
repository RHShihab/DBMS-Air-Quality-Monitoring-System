const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'sql_hr',
    user: 'root',
    password: 'admin'
})

module.exports = connection;