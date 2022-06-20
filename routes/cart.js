var express = require('express');
var router = express.Router();
var db = require('../sql/mysql')
var litedb = require('../sql/sqlite')


router.get('/', function(req, res, next) {
  res.render('cart', {});
});

router.post('/get-cart-products-by-id', function (req, res) {
  console.log('POSTbody', req.body.key);
  if (req.body.key.length != 0) {
    let product = {};
    litedb.getCartProductsByID(req.body.key).then((value) => {
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
});




module.exports = router;