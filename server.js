const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

startOptions();
const startOptions = () => {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add Employee", "Update Employee Role",
      "View All Roles", "Add Role", "View All Departments",
      "Add Department", "Quit"]
    })
    .then((answers) => {
      switch (answers.options) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          quit();
          break;
      }
    });
};
// View All Employees
const viewAllEmployees = () => {
  db.query(`SELECT * FROM employees`, (err, res) => {
    if (err)
  })
}
// Add Employee
// Update Employee Role
// View All Roles
// Add Role
// View All Departments
// Add Department
// Quit
const sql = "select * from department_db";

db.query(sql, function (err, results) {
  console.log(results);
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });