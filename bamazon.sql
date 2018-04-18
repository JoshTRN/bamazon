DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NULL,
department_name VARCHAR(20) NULL,
price DECIMAL (10,2) NOT NULL,
quantity INT(10),
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("tooth brushes", "hygiene", 2.15, 5);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("Xbox", "electronics", 329.99, 13);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("Samsung TV", "electronics", 1099.99, 41);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("deoderant", "hygiene", 4.27, 7);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("pants", "clothing", 10.97, 26);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("Hand Soap", "hygiene", 4.00, 54);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("Smart Phone", "electronics", 300.00, 8);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("Wallet", "accessories", 15.99, 3);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("Silverware Set", "kitchen", 65.77, 19);

INSERT INTO products (product_name, department_name, price, quantity)
VALUE ("Wooden Desk", "furniture", 89.99, 2);

SELECT product_name, quantity FROM bamazon.products WHERE quantity>4;
