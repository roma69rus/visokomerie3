var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var deliveryRouter = require('./routes/delivery');
var cartRouter = require('./routes/cart');
var contactsRouter = require('./routes/contacts');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));





// app.get('/catalog', function (request, response) {
//   const DBquery1 = 'select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image ' +
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
  
//   const DBquery2 = 'select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image ' +
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
//     'and pc.name = "РУБАШКИ") ' +
//   'order by opt.`order`';

//   let pants = new Promise(function(resolve, reject){   //брюки
//     PoolConnections.getConnection(function(err, conn) {
//       if(err) throw err;
//       conn.query(DBquery1, function (err, result, fields) {
//         if (err) throw err;
//         resolve(result);    
//         conn.release();
//       });
//     });
//   });

//   let shirt = new Promise(function(resolve, reject){
//     PoolConnections.getConnection(function(err, conn) {  
//       if(err) return reject(err);
//       conn.query(DBquery2, function (err, result, fields) {
//         if (err) throw err;   
//         resolve(result);     
//         conn.release();  
//       });
//     });
//   });

//   Promise.all([pants, shirt]).then(function(value){      
//     let pants = {};
//     for (item in value[0]) {
//       pants[value[0][item]['id']] = value[0][item]; 
//     }

//     let shirt = {};
//     for (item in value[1]) {
//       shirt[value[1][item]['id']] = value[1][item]; 
//     }
  
//     console.log(pants);
//     console.log(shirt);
//     // response.render('catalog', {
//     //   pants: JSON.parse(JSON.stringify(pants)),
//     //   shirt : JSON.parse(JSON.stringify(shirt))
//     // });
//   });
// });



app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/delivery', deliveryRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/contacts', contactsRouter);
// app.use('/products', productsRouter);
// app.use('/indexx', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('components/error');
  console.log("[Error log]:",err);
});


const port = 8000;


module.exports = app;
// app.listen(3000);
app.listen(port, () => {
  console.log(`Server running at ${port} port`);
});