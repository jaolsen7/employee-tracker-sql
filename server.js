const inquirer = require("inquirer");
const consoleTable = require("console.table");

// MySQL Connection
const db = require("./db/connection");

function startOptions () {
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
function viewAllEmployees () {
  db.query(`SELECT employee.first_name, employee.last_name, role.title, department.name AS dept, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    console.table(res);
    startOptions();
  })
};
// Add Employee
function addEmployee () {
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    const roleChoice = res.map((role) => ({
      name: `${role.title}`,
      value: role.department_id,
    }));
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
function updateEmployeeRole () {
  db.query(
    `SELECT * FROM employee`,
    async function (err, employee) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      const { empChoice } = await inquirer.prompt([
        {
          type: "list",
          name: "empChoice",
          message: "Which employee would you like to update?",
          choices: employee.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ]);
        db.query("select * from role;", async function (err, role) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        const { roleChoice } = await inquirer.prompt([
          {
            type: "list",
            name: "roleChoice",
            message: "What is their new role?",
            choices: role.map((role) => ({
              name: `${role.title}`,
              value: role.id,
            })),
          },
        ]);
        const updateQuery = `
          UPDATE employee
          SET role_id = ?
          WHERE id = ?`;
        db.query(updateQuery, [roleChoice, empChoice], function (err) {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          console.log("Employee role updated successfully");
          startOptions();
        });
      });
    }
  );
};
// View All Roles
function viewAllRoles () {
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    console.table(res);
    startOptions();
  })
};
// Add Role
function addRole () {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    inquirer
      .prompt([{
              name: "newRoleTitle",
              type: "input",
              message: "What is the name of the new role?",
          },
          {
              name: "newSalary",
              type: "input",
              message: "How much will they getting paid annually?",
          },
          {
              name: "newDept",
              type: "list",
              message: "Which department does this role belong?",
              choices: res.map((department) => ({
                name: `${department.name}`,
                value: department.id,
                })),
          },
      ])
      .then((answer) => {
          db.query(`INSERT INTO role (title, salary, department_id) values ("${answer.newRoleTitle}", "${answer.newSalary}", "${answer.newDept}")`)
          startOptions();
      })
  })
};
// View All Departments
function viewAllDepartments () {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    console.table(res);
    startOptions();
  })
};
// Add Department
function addDepartment () {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit(1);
    };
    inquirer
      .prompt([{
              name: "newDeptTitle",
              type: "input",
              message: "What is the name of the new department?",
          },
      ])
      .then((answer) => {
          db.query(`INSERT INTO department (name) values ("${answer.newDeptTitle}")`)
          startOptions();
      })
  })
};
// Quit

startOptions();