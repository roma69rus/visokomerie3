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
    // let resultvalue = {}; //Это пример кода как упаковать в 1 вложенный объект категории  -  товары
    // let currItem = {};
    // for (item in value[0]) {
    //   resultvalue[value[0][item]['id']] = {};
    //   currItem = resultvalue[value[0][item]['id']]
    //   console.log("item", item)
    //   for (const p in value[1]) {
    //     if (value[0][item]['id'] === value[1][p]['category_id']) {
    //       currItem[value[1][p]['product_id']] = value[1][p];  
    //     }
    //   }
    // }
    // console.log("object", resultvalue)
    res.render('catalog', {
      categories: JSON.parse(JSON.stringify(value[0])),
      products : JSON.parse(JSON.stringify(products))
    });
  });
}

