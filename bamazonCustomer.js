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
    queryItems();
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
function startPrompt() {
    inquirer
        .prompt([
            {
                name: 'shop',
                type: 'input',
                message: 'What do you like to buy?'
            }
        ]).then(function () {

        })
    yo

};
startPrompt();
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.