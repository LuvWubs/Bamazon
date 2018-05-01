var mysql = require('mysql');
var columnify = require('columnify');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: "bamazon"
});

// console.log("BAM!azon");
connection.connect((err) => {
  if(err) throw err;
});

function prompt(question) {
  return inquirer.prompt([question])
};

var init = function() {
  var identityQ = {
    type: 'list',
    message: 'Who the hell do you think you are?',
    choices: ['potential customer--be nice to me!', 'the Boss'],
    name: 'user'
  };

  prompt(identityQ).then((answer) => {
    switch(answer.user) {
      case 'potential customer--be nice to me!':
        getProducts();
        break;
      case 'the Boss':

        break;
        // default:
    }
  })
};

function getProducts() {
  connection.query('SELECT * FROM products', function(err, results) {
    if (err) throw err;

    var columns = columnify(results, {columnSplitter: ' | '})
    console.log(columns);
    allProductInfo = results;
    purchaseId(results);
  })
}

function purchaseId(results) {
  var productPrompt = {
    type: 'input',
    message: 'What would you like to purchase?',
    name: 'item_id'
  };
  prompt(productPrompt).then(product => {
    askQuantity(product.item_id);
  })
}

function askQuantity(item_id) {
  var quantityPrompt = {
    type: 'input',
    message: 'How many would you like to purchase?',
    name: 'quantity'
  };
  prompt(quantityPrompt).then(answer => {
    // console.log(answer);
    var item = checkProductAvailability(parseInt(item_id), answer.quantity);
  })
}

function checkProductAvailability(itemId, quantity) {
  connection.query('SELECT quantity FROM products WHERE id = ' + itemId, function(err, res) {
    if (err) throw err;
    if (quantity > res) {
      console.log("I don't have that many to sell to you!");
      askQuantity();
    } else {
      console.log('this is the users quantity in the db: ', res[0].quantity);
      console.log('quantity: ', quantity);
      var newQuantity = res[0].quantity - quantity;
      console.log('new db quantity: ', newQuantity);
      connection.query('UPDATE products SET ? WHERE ?',
        [{
          quantity: newQuantity
        }, {
          id: itemId
        }]
      )
    }
  })
  var item = allProductInfo.filter(function(item) {
    if (item.id === itemId) {
      return item;
    }
  });

  console.log('item', item);
  return item;
}

var customerInput = function(dbCon) {
  var that = {};
  var allProductInfo;

  that.getProducts = getProducts;

  return that;
};

init();
