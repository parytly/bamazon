# bamazon
Challenge #1: Customer View

In this activity, it will be creating an Amazon shopping application using MySQL and Node.js. The app will take in orders from customers and update stock from the store's inventory. 

Using Node.js, the application will welcome in the customer, and display the list of products available.
    - item_id (unique id for each product)
    - product (Name of product)
    - department
    - price (cost to customer)
    - quantity (how much of the product is available in stores)

The app prompt users with two messages.
    - The first should ask them the ID of the product they would like to buy.
    - The second message should ask how many units of the product they would like to buy.

    - If the customer select an item that has insufficient stock quantity, a message will appear "insufficient quantity! Please choose a lower amount."
        - Then the app will bring the customer back to the prompt to buy again.

Once the order is fullfilled, the quantity of that purchase item will update in Mysql and a message will show the customer's total balance and purchased item.