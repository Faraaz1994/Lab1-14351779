let mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: 'node',
    database: 'grubhub'
});
connection.connect();


module.exports = connection;



