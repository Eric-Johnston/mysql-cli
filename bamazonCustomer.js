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
    console.log("Connection successful!");
    placeOrder();
})

function placeOrder(){
    inquirer
        .prompt([{
            name: "productId",
            type: "input",
            message: "What is the ID of the product you would like to purchase?",
            validate: function(uInput){
                if(isNaN(uInput) === false){
                    return true;
                }
                return false;
            }
        }, {
            name: "productAmount",
            type: "input",
            message: "How many units would you like?",
            validate: function(uInput){
                if(isNaN(uInput) === false){
                    return true;
                }
                return false;
            }
        }])
    .then(function(answer){
        var query = "SELECT * FROM products WHERE item_id = ?";
        connection.query(query, [answer.productId], function(err,res){
            if(err) throw err;

            var availableStock = parseInt(res[0].stock_quantity);
            var unitPrice = parseFloat(res[0].price);
            var unitAmount = parseInt(answer.productAmount)
            var department = res[0].department_name;
            
            var productBuy = function(){
            
                var newStock = parseInt(res[0].stock_quantity) - answer.productAmount;
                var totalPrice = unitPrice * unitAmount;
                var query = "UPDATE products SET stock_quantity = "+ newStock + " WHERE item_id = "+ answer.productId;
        
                connection.query(query, function(err, res){
                    if(err) throw err;
                    console.log("\nOrder completed!");
                    console.log("\nYour total is $" + totalPrice);
                })
            }
            
            if(availableStock >= unitAmount){
                productBuy();
                connection.end();
            }
            else{
                console.log("Not enough units in stock!");
                placeOrder();
            }
        })
    })
}