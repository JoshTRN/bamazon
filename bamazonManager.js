var inquirer = require('inquirer');
var mysql = require('mysql');

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
        choices: ['View Products for Sale', 'View Low Inventory', 'Add New Product'],
        name: 'choice'

    }
]).then(function (res) {
    switch (res.choice) {
        case 'View Products for Sale':
            viewProductForSale();
            break;
        case 'View Low Inventory':
            viewLowInventory();
            break;
        case 'Add New Product':
            addNewProduct();
    }
});

function viewProductForSale() {
    connection.query("SELECT id, product_name, price, quantity FROM bamazon.products WHERE quantity>0", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            var product = "\nProduct Name: " + res[i].product_name;
            var id = "\nID #" + res[i].id;
            var price = "\nPrice: $" + res[i].price;
            var quant = "\nQuantity: " + res[i].quantity + '\n';
            console.log(product, id, price, quant);
        }
    });
    connection.end();
}

function viewLowInventory() {
    connection.query("SELECT id, product_name, price, quantity FROM bamazon.products WHERE quantity<5", function (err, res) {
        if (err) throw err;


        for (var i = 0; i < res.length; i++) {

            var product = "\nProduct Name: " + res[i].product_name;
            var id = "\nID #" + res[i].id;
            var price = "\nPrice: $" + res[i].price;
            var quant = "\nQuantity: " + res[i].quantity + '\n';
            console.log(product, id, price, quant);
        }
    });
    connection.end();
}

function addNewProduct() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What's the Product Name?",
            name: 'product_name'
        }, {
            type: 'input',
            message: "What department does it belong in?",
            name: 'department_name'
        }, {
            type: 'input',
            message: "What's the Price in $?",
            name: 'price'
        }, {
            type: 'input',
            message: "How Many are you adding to inventory?",
            name: 'quantity'
        },
    ]).then(function (res) {
        connection.query("INSERT INTO products SET ?",
        {
          product_name:res.product_name,
          department_name: res.department_name.toLowerCase(),
          price: parseFloat(res.price),
          quantity: parseInt(res.quantity)
        },
        function (err) {
            if (err) throw err;
            console.log('\nYour product has been added\n');
            console.log(res.product_name);
            console.log(res.department_name,);
            console.log(res.price);
            console.log(res.quantity);
            connection.end();
        })
    });
}
