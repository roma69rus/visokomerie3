var express = require('express');
var db = require('../sql/mysql')
var router = express.Router();
var litedb = require('../sql/sqlite')


router.get('/:name', function (req, res, next) {
  const color = req.query.color;
  console.log("color", color)
  const product_name = req.params.name;
  Promise.all([litedb.getProduct(product_name, color), litedb.getProductImages(product_name, color)])
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
});

module.exports = router;
