var express = require('express');
var db = require('../sql/mysql')
var litedb = require('../sql/sqlite')
var router = express.Router();


router.get('/', function (req, res, next) {
 
  Promise.all([litedb.getMainPageProducts(), litedb.getSlider()]).then(function(value){      
    let product = {};
    for (item in value[0]) {
      product[value[0][item]['id']] = value[0][item]; 
    }
    console.log(product)
    let slide = {};
    for (item in value[1]) {
      slide[value[1][item]['id']] = value[1][item]; 
    }
    res.render('index', {
      product: JSON.parse(JSON.stringify(product)), //value[0], value[1] можно вместо product, slide
      slide : JSON.parse(JSON.stringify(slide))
    });
  })
  .catch(function(err){
    console.log(err)
  })
  
});


module.exports = router;


// Черновик из app.js
// app.get('/', function (req, res) {
//   const DBquery = 'select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image ' +
//   'from visokomerie.product_options opt ' +
//   'left join visokomerie.product p ' +
//   'on p.id = opt.product_id ' +
//   'left join visokomerie.product_options_image img ' +
//   'on opt.id = img.option_id ' +
//   'where img.main_image = "1" and p.id in ' +
//     '(select p.id ' +
//     'from product p, product_category pc, products_to_categories ptc ' +
//     'where pc.id = ptc.category_id ' +
//     'and ptc.product_id = p.id ' +
//     'and pc.name = "БРЮКИ") ' +
//   'order by opt.`order`';

//   let products = new Promise(function(resolve, reject){
//     PoolConnections.getConnection(function(err, conn) {
//       if(err) throw err;
//       conn.query(DBquery, function (err, result, fields) {
//         if (err) throw err;
//         resolve(result);    
//         conn.release();
//       });
//     });
//   });

//   let sliders = new Promise(function(resolve, reject){
//     PoolConnections.getConnection(function(err, conn) {  
//       if(err) throw err;
//       conn.query("select * from visokomerie.slider", function (err, result, fields) {
//         if (err) throw err;   
//         resolve(result);     
//         conn.release();  
//       });
//     });
//   });

//   Promise.all([products, sliders]).then(function(value){      
//     let product = {};
//     for (item in value[0]) {
//       product[value[0][item]['id']] = value[0][item]; 
//     }

//     let slide = {};
//     for (item in value[1]) {
//       slide[value[1][item]['id']] = value[1][item]; 
//     }
  
//     console.log(product);
//     console.log(slide);
//     res.render('index', {
//       product: JSON.parse(JSON.stringify(product)),
//       slide : JSON.parse(JSON.stringify(slide))
//     });
//   });
// });