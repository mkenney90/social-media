const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!QAZxsw2',
    database: 'social'
});

module.exports = db;