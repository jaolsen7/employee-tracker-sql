const mysql = require("mysql2");

// mySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'department_db'
});
db.connect();
module.exports = db;