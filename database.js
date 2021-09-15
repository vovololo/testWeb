const { createPool } = require("mysql")

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"mpi20101218",
    database:"test",
    connectionLimit:10
})

pool.query(`SELECT * FROM employee`, (err, result, fields) => {
        if(err) return console.log(err);
        return console.log(result);
});