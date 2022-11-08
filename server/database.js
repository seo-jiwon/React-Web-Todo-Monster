const mysql = require("mysql");

require('dotenv').config({ path: '../.env' });

const connection = mysql.createConnection({
    host : process.env.REACT_APP_DATABASE_HOST || 'localhost',
    user : process.env.REACT_APP_DATABASE_USER || 'root',
    password : process.env.REACT_APP_DATABASE_PASSWORD || '',
    database : process.env.REACT_APP_DATABASE_DATABASENAME || 'todomonster'
});
connection.connect();

module.exports = connection;