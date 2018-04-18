var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadID + '\n');
    displayProducts();
})

function displayProducts() {
    connection.query("SELECT id, product_name, price FROM bamazon.products WHERE quantity>0", function (err, res) {
        if (err) throw err;
        

        for (var i = 0; i < res.length; i++) {
            var product = "\nProduct Name: " + res[i].product_name;
            var id = "\nID #" + res[i].id;
            var price = "\nPrice: $" + res[i].price + '\n';
            console.log(product, id, price);
        }
        connection.end();
    })
}