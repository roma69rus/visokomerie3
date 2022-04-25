const mysql = require('mysql');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "2sdfTY78(",
 database: "world",
});

conn.connect();

module.exports = conn;