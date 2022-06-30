// var db = require('../sql/mysql')
// var litedb = require('../sql/sqlite')
var Product = require('../models/product')

exports.getProduct = function(req, res, next) {
  const color = req.query.color;
  const product_name = req.params.name;
  const product = new Product({
    name:           req.params.name,
    product_color:  req.query.color,
  });
  Promise.all([product.getProduct(), product.getProductImages()])
    .then(function(value){      
      res.render('products.pug', {
        product: JSON.parse(JSON.stringify(value[0])),
        images: JSON.parse(JSON.stringify(value[1]))
    });
    // console.log('key', Object.keys(value[0]))
    console.log("prod1", value[0])
    // console.log("img", value[1])
    // console.log("pn", req.params)
  });
}


