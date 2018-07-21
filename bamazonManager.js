//Work in Progress
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "coca2113",
  database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("\n----------------------");
    console.log("Connection successful!");
    console.log("----------------------\n");
    managerInterface();
});

function managerInterface(){
    inquirer.prompt([{
            name: "managerTasks",
            type: "list",
            message: "What would you like to do?",
            choices: 
            ["View Products", "View Low Inventory", "Add to Inventory", "Add Product"]
        }]).then(function(answer){

            switch (answer.managerTasks){

                case "View Products":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add Product":
                    addProduct();
                    break;

                default:
                    viewProducts();
            };
        });
};

function viewProducts(){
    connection.query("SELECT * FROM products;", function(err, res){
        if(err) throw err;
        for(i = 0; i < res.length; i++){
            
            var productName = res[i].product_name;
            var productId = res[i].item_id;
            var productPrice = res[i].price;
            var productStock = res[i].stock_quantity;
            console.log("\n--------------------------------------------------------------------------")
            console.log("PRODUCT NAME: " + productName + " | PRODUCT ID: " + productId + " | PRICE: " + productPrice + " | STOCK: " + productStock);
            console.log("--------------------------------------------------------------------------");
        };
        managerInterface();
    });
};

function lowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 20;", function(err, res){
        if(err) throw err;
        for(i = 0; i < res.length; i++){

            var productName = res[i].product_name;
            var productId = res[i].item_id;
            var productPrice = res[i].price;
            var productStock = res[i].stock_quantity;
            console.log("\n--------------------------------------------------------------------------")
            console.log("PRODUCT NAME: " + productName + " | PRODUCT ID: " + productId + " | PRICE: " + productPrice + " | STOCK: " + productStock);
            console.log("--------------------------------------------------------------------------");
            managerInterface();
        };
        if(res == false){
            console.log("\n-----------------------------------");
            console.log("Your inventory is in good shape!");
            console.log("-----------------------------------\n");
            managerInterface();
        };
    });
};

function addInventory(){
    inquirer.prompt([
        {
            name: "productID",
            type: "input",
            message: "Enter the ID of the product you would like to add stock to",
            validate: function(uInput){
                if(isNaN(uInput) === false){
                    return true;
                }
                return false;
            }
        }, {
            name: "addStock",
            type: "input",
            message: "How many units would you like to add?",
            validate: function(uInput){
                if(Number.isInteger(+uInput)){
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer){
        connection.query("SELECT * FROM products WHERE item_id = ?", [answer.productID], function(err, res){
            if(err) throw err;

            console.log(answer.productID)

            function updateStock(){
                var selectedProduct = answer.productID;
                var addAmount = answer.addStock;
                var query = "UPDATE products SET stock_quantity = stock_quantity + " + addAmount + " WHERE item_id = " + selectedProduct;
                
                connection.query(query, function(err, res){
                    if(err) throw err;
                    console.log("\nSuccess! You've added " + addAmount + " Units to itemID " + selectedProduct);
                    connection.end();
                })
            }
            
            
            updateStock();
        })
        
    })
}