const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'123456',
    database:'db_crowdfunding'
});
db.connect();
module.exports = db;