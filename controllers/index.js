// var litedb = require('../sql/sqlite')
// var mysql = require('../sql/mysql')
var Product = require('../models/product')
var Slider = require('../models/slider')



exports.getIndexPage = function (req, res, next) {

  const product = new Product({});
  const slider = new Slider();

  Promise.all([product.getMainPageProducts(), slider.getSlide()]).then(function(value){      
    // let product = {};
    // for (item in value[0]) {
    //   product[value[0][item]['id']] = value[0][item]; 
    // }
    // let slide = {};
    // for (item in value[1]) {
    //   slide[value[1][item]['id']] = value[1][item]; 
    // }
    res.render('index', {
      product: JSON.parse(JSON.stringify(value[0])), //value[0], value[1] можно вместо product, slide
      slide : JSON.parse(JSON.stringify(value[1]))
    });
  })
  .catch(function(err){
    console.log(err)
  })

}




