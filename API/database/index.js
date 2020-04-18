const mysql = require('mysql');
const db = mysql.createConnection({
    host : 'localhost',
    user : 'Aldrich',
    password : 'neil1804',
    database : 'hokihokibento',
    port : 3306
});

module.exports = db;