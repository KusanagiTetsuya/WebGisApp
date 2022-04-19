var mysql = require('mysql');

var pool = mysql.createPool({
    host:'localhost', port: 8081,
    user:'root', password:'root',
    database:'db_webgisapp', connectionLimit:100,
    multipleStatements:true
})

module.exports = pool;