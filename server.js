const express = require("express");
const db = require("./db/connection");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

const sql = "select * from department_db";

db.query(sql, function (err, results) {
  console.log(results);
});