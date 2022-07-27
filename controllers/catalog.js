// var db = require('../sql/mysql')
// var litedb = require('../sql/sqlite')
var Product = require('../models/product')
var Category = require('../models/category')

exports.getCatalog = function (req, res, next) {
  
  const product = new Product({});
  const category = new Category({});

  Promise.all([category.getCatalogCategories(), product.getCatalogAllProducts()]).then(function(value){            
    let products = {};
    for (item in value[1]) {
      products[value[1][item]['product_id']] = value[1][item]; 
    }
    console.log("PRODUCTS", products)
    res.render('catalog', {
      categories: JSON.parse(JSON.stringify(value[0])),
      products : JSON.parse(JSON.stringify(products))
    });
  });
}

