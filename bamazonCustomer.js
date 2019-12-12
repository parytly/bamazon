var mysql = require('mysql');
var inquirer = require('inquirer');

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
    // queryItems();
    startPrompt();
})

// DISPLAY ALL THE ITEMS
const queryItems = function () {
    connection.query("SELECT * FROM  products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department + " | " + res[i].price + " | " + res[i].quantity)
        };
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
                    type: 'checkbox',
                    message: 'What do you like to buy?',
                    choices: function () {
                        var productChoices = [];
                        for (var i = 0; i < res.length; i++) {
                            productChoices.push(res[i].item_id + ' | ' + res[i].product_name);
                        }
                        return productChoices;
                    }
                },
                { // The second message should ask how many units of the product they would like to buy.
                    name: 'quantity',
                    type: 'number',
                    message: 'How many do you want?'
                }
            ]).then(function (answer) {
                connection.query("SELECT * FROM  products", function (err, res) {
                    // updateQuantity();
                })
            })
    });
};

// UPDATE THE QUANTITY OF THE ITEM IN MYSQL
function updateQuantity() {
    connection.query('UPDATE products SET ? WHERE ?',
        [
            {
                quantity: res.quantity - answer.quantity,
            }
        ]
    );
}
