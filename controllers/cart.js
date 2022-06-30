// var db = require('../sql/mysql')
// var litedb = require('../sql/sqlite')
var Product = require('../models/product')

exports.getCartProducts = function (req, res, next) {
  const prod = new Product({});

  //IDS array
  ids = req.body.key;
  console.log("IDS", req.body.key)

  if (ids.length != 0) {
    let product = {};
    prod.getCartProductsByID(ids).then((value) => {
      for (item in value){
        product[value[item]['id']] = value[item]
      }
      console.log("prod", product)
      res.json(product)
    });
  }
  else {
    res.send('0');
  }
}


