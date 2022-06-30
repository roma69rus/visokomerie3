var express = require('express');
var router = express.Router();

//Controllers
var product = require('../controllers/products');

router.get('/:name', product.getProduct);

module.exports = router;
