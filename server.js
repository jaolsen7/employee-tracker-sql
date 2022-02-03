const inquirer = require("inquirer");
const consoleTable = require("console.table");

// MySQL Connection
const db = require("./db/connection");

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
          db.end();
          break;
      }
    });
};

// View All Employees
const viewAllEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    const data = res.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: `${employee.id}`,
    }));
    console.table(data);
    startOptions();
  })
};
// Add Employee
const addEmployee = () => {
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    const roleChoice = res.map((role) => ({
      name: `${role.title}`,
      value: role.department_id,
    }));
  // db.query(`SELECT * FROM employee`, (err, res) => {
  //   const managerChoice = res.map((employee) => ({
  //     name: `${employee.first_name} ${employee.last_name}`,
  //     manager_id: `${employee.manager_id}`,
  //   }))
  // });
  inquirer
    .prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is their first name?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is their last name?",
    },
    {
      name: "role_id",
      type: "list",
      message: "What is their role?",
      choices: roleChoice,
    },
    {
      name: "manager_id",
      type: "list",
      message: "What is their manager_id?",
      choices: [1, 2],
    },
    ])
    .then((answers) => {
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
      [
        answers.first_name,
        answers.last_name,
        answers.role_id,
        answers.manager_id,
      ])
      console.log("Successfully added!");
      startOptions();
    });
  })
};
// Update Employee Role
const updateEmployeeRole = () => {
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    const data = res.map((employee) => ({
      id: `${employee.id}`,
      name: `${employee.first_name} ${employee.last_name}`
    }));
    console.table(data);
    startOptions();
  })
};
// View All Roles
// Add Role
// View All Departments
// Add Department
// Quit

startOptions();