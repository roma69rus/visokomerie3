var express = require('express');
var router = express.Router();


//Controllers
var cart = require('../controllers/cart');

router.get('/', function(req, res, next) {
  res.render('cart', {});
});

router.post('/get-cart-products-by-id', cart.getCartProducts);

module.exports = router;