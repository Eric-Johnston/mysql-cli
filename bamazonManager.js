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
    var query = "SELECT * FROM products;"
    connection.query(query, function(err, res){
        if(err) throw err;
        for(i = 0; i < res.length; i++){
            
            var productName = res[i].product_name;
            var productId = res[i].item_id;
            var productPrice = res[i].price;
            var productStock = res[i].stock_quantity;
            console.log("---------------------")
            console.log("PRODUCT NAME: " + productName + " | PRODUCT ID: " + productId + " | PRICE: " + productPrice + " | STOCK: " + productStock);
            console.log("---------------------");
        };
        managerInterface();
    });
};

function lowInventory(){
    var query = "SELECT * FROM products WHERE stock_quantity < 50;";
    connection.query(query, function(err, res){
        if(err) throw err;
        for(i = 0; i < res.length; i++){

            var productName = res[i].product_name;
            var productId = res[i].item_id;
            var productPrice = res[i].price;
            var productStock = res[i].stock_quantity;
            console.log("---------------------")
            console.log("PRODUCT NAME: " + productName + " | PRODUCT ID: " + productId + " | PRICE: " + productPrice + " | STOCK: " + productStock);
            console.log("---------------------");
            managerInterface();
        }
    })
}