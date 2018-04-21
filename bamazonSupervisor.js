var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon"
});

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Product Sales by Department', 'Create New Department'],
        name: 'choice'

    }
]).then(function (res) {
    switch (res.choice) {
        case 'View Product Sales by Department':
            viewProductSalesByDepartment();
            break;
        case 'Create New Department':
            createNewDepartment();
            break;
    }
});

function viewProductSalesByDepartment() {
    //get department names


    connection.query('SELECT department_name FROM bamazon.departments', 
    function (err, res) {
        
        for (var i = 0; i < res.length; i++) {
            var deptName = res[i]
            console.log(deptName.)
            // connection.query('SELECT department_name, product_sales FROM bamazon.products WHERE ?',
            //     {
            //         department_name: deptName
            //     }, function (err, res) {

            //         if (err) throw err;
            //         // loop over department
            //         var deptTotal = 0
            //         for (var i = 0; i < res.length; i++) {
            //             deptTotal += res[i].product_sales;
            //         }
            //         console.log(deptName, deptTotal)
            //     });
        };
}); 
}

function createNewDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What's the name of the new department?",
            name: 'department'
        }, {
            type: 'input',
            message: 'What is the overhead cost?',
            name: 'overhead',
        }
    ]).then(function (res) {
        connection.query('INSERT INTO bamazon.departments SET ?',
            {
                department_name: res.department,
                overhead_costs: res.overhead
            }, function (err) {
                if (err) throw err;

                console.log('Department added');
                connection.end();
            });
    });
}

// current query
// SELECT  departments.department_id, products.department_name, departments.overhead_costs,
// SUM(products.product_sales) AS product_sales, 
// (SUM(products.product_sales) - SUM(overhead_costs)) AS total_profit
// FROM products
// INNER JOIN bamazon.departments ON departments.department_name = products.department_name
// GROUP BY department_name, department_id
// ORDER BY department_id;

// createDepartmentsFromProducts();

// var table = new Table({
//     head: ['TH 1 label', 'TH 2 label']
// });

// // table is an Array, so you can `push`, `unshift`, `splice` and friends 
// table.push(
//     ['First value', 'Second value']
//   , ['First value', 'Second value']
// );

// console.log(table.toString());