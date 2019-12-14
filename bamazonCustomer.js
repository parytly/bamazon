var mysql = require('mysql');
var inquirer = require('inquirer');

// creating a table for the list of items
var Table = require('cli-table');
var table = new Table({
    head: ['Item_id', 'Product', 'Department', 'Price', 'Quantity'],
    colWidths: [10, 20, 20, 20, 20]
});

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_DB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id' + connection.threadId + "\n");
    queryItems();
})

// DISPLAY ALL THE ITEMS
const queryItems = function () {
    connection.query("SELECT * FROM  products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department + " | " + res[i].price + " | " + res[i].quantity)
            table.push(
                [res[i].item_id,
                res[i].product_name,
                res[i].department,
                res[i].price,
                res[i].quantity]
            );
        };
        console.log("\n Welcome to Bamazon!!!\n\n" + table.toString());
        startPrompt();
    });
};

// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.

function startPrompt() {
    connection.query("SELECT * FROM  products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'shop',
                    type: 'input',
                    message: '\nWhat do you like to buy? (enter in the item-id)',
                    choices: function () {
                        var productChoices = [];
                        for (var i = 0; i < res.length; i++) {
                            productChoices.push(res[i].item_id + ' | ' + res[i].product_name);
                        }
                        return productChoices;
                    }
                },
                // The second message should ask how many units of the product they would like to buy.
                {
                    name: 'quantity',
                    type: 'number',
                    message: '\nHow many do you want?'
                }
            ]).then(function (answer) {
                var selectedItemQuantity = res[answer.shop - 1].quantity
                var newQuantity = selectedItemQuantity - answer.quantity

                var balance = res[answer.shop - 1].price * answer.quantity

                if (answer.quantity > selectedItemQuantity) {
                    console.log("\n Insufficient quantity! Please select again. \n")
                    startPrompt();
                } else {
                    // UPDATE THE QUANTITY OF THE ITEM IN MYSQL
                    connection.query('UPDATE products SET ? WHERE ?',
                        [
                            {
                                quantity: newQuantity,
                            },
                            {
                                item_id: answer.shop
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;

                            console.log("\nYour Total: $" + balance + "\nCongrats on your purchase. Thank You for shopping.\n")
                            connection.end();
                        }
                    );
                }
            })
    });
}


