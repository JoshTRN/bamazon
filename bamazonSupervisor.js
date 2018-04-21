var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('tty-table')('automattic-cli-table');

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

    var headList = ['department_id', 'department_name', 'overhead_costs', 'product_sales', 'total_profit'];

    connection.query("SELECT  departments.department_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - overhead_costs) AS total_profit FROM departments LEFT JOIN bamazon.products ON departments.department_name = products.department_name GROUP BY department_name, department_id ORDER BY department_id;", function (err, res) {
        if (err) throw err;
        var table = new Table({
                head: headList
            });

        for (var i = 0; i < res.length; i++) {
            var itemList = []
            itemList.push(res[i].department_id, res[i].department_name, res[i]. overhead_costs, res[i].product_sales, res[i].total_profit);
            table.push(itemList);
        }
            console.log(table.toString());
            connection.end();

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