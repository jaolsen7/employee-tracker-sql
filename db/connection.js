const mysql = require("mysql2");

// mySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'department_db'
});
db.connect(function(err) {
    if (err) {
        return console.log("Error when loading page...")
    } else {
        return console.log("Successful connection!")
    }
});
module.exports = db;