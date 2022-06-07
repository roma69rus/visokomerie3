var express = require('express');
var db = require('../sql/mysql')
var router = express.Router();


router.get('/', function (req, res, next) {
 
  Promise.all([db.getCatalogCategories(), db.getCatalogAllProducts()]).then(function(value){      
    let categories = {};
    for (item in value[0]) {
      categories[value[0][item]['id']] = value[0][item]; 
    }    

    let products = {};
    for (item in value[1]) {
      products[value[1][item]['product_id']] = value[1][item]; 
    }

    res.render('catalog', {
      categories: JSON.parse(JSON.stringify(categories)),
      products : JSON.parse(JSON.stringify(products))
    });
    console.log("cat", categories)
    console.log("prod", products)
  });
});

module.exports = router;
