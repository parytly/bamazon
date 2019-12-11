DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NULL,
    quantity INT NULL,
    PRIMARY KEY (item_id)
);

-- POPULATE 10 ROWS OF ITEMS

INSERT INTO products (product_name, department, price, quantity)
VALUES 
("Pencils", "Supplies", 0.99, 400),
("Notebook", "Supplies", 2.99, 350),
("Folder", "Supplies", 1.99, 550),
("Hoodie Jacket", "Clothing", 40.00, 150),
("Levis Jean", "Clothing", 52.99, 150),
("Hat", "Clothing", 15.15, 200),
("Calculator", "Supplies", 19.99, 250),
("MacBook Pro", "Electronics", 1999.99, 150),
("Microsoft Surface", "Electronics", 999.99, 200),
("Apple Airpods", "Electronics", 199.99, 200),
("Dell Mouse", "Electronics", 15.20, 450),
("Jansport Backpack", "Supplies", 39.99, 400),
("Hydro Flask", "Accessories", 49.99, 100);