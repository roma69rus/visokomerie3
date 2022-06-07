var express = require('express');
var db = require('../sql/mysql')
var router = express.Router();


router.get('/', function (req, res, next) {
 
  Promise.all([db.getProduct(), db.getProductImages()]).then(function(value){      
    let product = {};
    // for (item in value[0]) {
    //   product[value[0][item]['option_id']] = value[0][item]; 
    // }    

    let images = {};
    // for (item in value[0]) {
    //   images[value[0][item]['option_id']] = value[0][item]; 
    // }    

    res.render('product', {
      product: JSON.parse(JSON.stringify(value[0])),
      images: JSON.parse(JSON.stringify(value[1]))
    });
    console.log('key', Object.keys(value[0]))
    console.log("prod", value[0][0]['description'])
    console.log("img", value[1])
  });
});

module.exports = router;
