const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "db1",
    password: "123456"
});

let sql = "SELECT * FROM user";

pool.execute(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
});