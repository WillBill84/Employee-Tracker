const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
let showroles;

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; 
    port: 3306,

    // database username
    user: 'root',

    // database password
    password: 'root',
    database: 'tracker_DB',
});



// Initiate MySQL Connection.
connection.connect(function (err) {

    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);

    connection.query("SELECT * from roles", function (error, res) {
        showroles = res.map(roles => ({ name: roles.title, value: roles.id }))
    })

    start();
})



function start() {
    inquirer.prompt({
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            "Add Department",
            "View all Departments",
            "Add Roles",
            "View all Roles",
            "Add Employee",
            "View all Employees",
            "Exit"
        ],
    })

        .then(function (res) {
            switch (res.start) {

                case "Add Department":
                    addDept();
                    break;

                case "View all Departments":
                    viewAllDept();
                    break;

                case "Add Roles":
                    addRole();
                    break;

                case "View all Roles":
                    viewAllRoles();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "View all Employees":
                    viewAllEmployees();
                    break;

                case "Exit":
                    connection.end();
                    break;

            }
        })

}



function addDept() {
    inquirer.prompt({

        type: "input",
        name: "deptName",
        message: "What Department would you like to add?"

    })
        .then(function (res) {
            console.log(res);
            const query = connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: res.deptName
                },
                function (err, res) {
                    connection.query("SELECT * FROM departments", function (err, res) {
                        console.table(res);
                        start();
                    })
                }
            )
        })
}

function viewAllDept() {
    connection.query("SELECT * FROM departments", function (err, res) {
        console.table(res);
        start();
    })
}





function addRole() {
    let departments = [];
    connection.query("SELECT * FROM departments",

        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                res[i].first_name + " " + res[i].last_name
                departments.push({ name: res[i].name, value: res[i].id });
            }

            inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What role would you like to add?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary for the role?"
                },
                {
                    type: "list",
                    name: "department",
                    message: "what department?",
                    choices: departments
                }
            ])
                .then(function (res) {
                    console.log(res);
                    const query = connection.query(
                        "INSERT INTO roles SET ?",
                        {
                            title: res.title,
                            salary: res.salary,
                            department_id: res.department
                        },
                        function (err, res) {
                            if (err) throw err;
                            start();
                        }
                    )
                })
        })
}

function viewAllRoles() {
    connection.query("SELECT roles.*, departments.name FROM roles LEFT JOIN departments ON departments.id = roles.department_id", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    }
    )
}






function addEmployee() {

    console.log("Inserting a new employee.\n");
    inquirer.prompt([
        {
            type: "input",
            message: "First Name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "Last Name?",
            name: "last_name"
        },
        {
            type: "list",
            message: "Select employee's role?",
            name: "role_id",
            choices: showroles
        },
        {
            type: "input",
            message: "Enter their manager's ID?",
            name: "manager_id"
        }
    ])
        .then(function (res) {
            const query = connection.query(
                "INSERT INTO employees SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee added!\n");
                    start();
                }
            );
        })
}
function viewAllEmployees() {

    connection.query("SELECT employees.first_name, employees.last_name, roles.title AS \"role\", managers.first_name AS \"manager\" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
}


