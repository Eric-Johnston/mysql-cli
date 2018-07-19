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
    managerCli();
});

function managerCli(){
    inquirer.prompt([{
            name: "managerTasks",
            type: "list",
            message: "What would you like to do?",
            choices: 
            ["View Products", "View Low Inventory", "Add to Inventory", "Add Product"]
        }]).then(function(answer){
            switch (answer)
        })
}