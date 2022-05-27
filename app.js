var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
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

var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'admin',
  password : '2sdfTY78(',
  database : 'visokomerie'
});

app.get('/', function (req, res) {
  const DBquery = 'select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image ' +
  'from visokomerie.product_options opt ' +
  'left join visokomerie.product p ' +
  'on p.id = opt.product_id ' +
  'left join visokomerie.product_options_image img ' +
  'on opt.id = img.option_id ' +
  'where img.main_image = "1" and p.id in ' +
    '(select p.id ' +
    'from product p, product_category pc, products_to_categories ptc ' +
    'where pc.id = ptc.category_id ' +
    'and ptc.product_id = p.id ' +
    'and pc.name = "БРЮКИ") ' +
  'order by opt.`order`';

  connection.query(DBquery, function (error, results, fields) {
    if (error) throw error;
    // console.log('CONNECT1', results)
    let product = {};
    for (let i = 0; i < results.length; i++) {
      product[results[i]['id']] = results[i];     
    }  
    console.log('1234', JSON.parse(JSON.stringify(product)));
    res.render('index', {
      product: JSON.parse(JSON.stringify(product))
    });
  });

  // connection.query("select * from visokomerie.slider", function (error, results, fields) {
  //   if (error) throw error;    
  //   let slide = {};
  //   for (let i = 0; i < results.length; i++) {
  //     slide[results[i]['id']] = results[i];     
  //   }  
  //   console.log('slide', JSON.parse(JSON.stringify(slide)));
  //   res.render('index', {
  //     slide: JSON.parse(JSON.stringify(slide))
  //   });
  // });
 
});



app.get('/indexx', function (req, res) {
  const DBquery = 'select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image ' +
  'from visokomerie.product_options opt ' +
  'left join visokomerie.product p ' +
  'on p.id = opt.product_id ' +
  'left join visokomerie.product_options_image img ' +
  'on opt.id = img.option_id ' +
  'where img.main_image = "1" and p.id in ' +
    '(select p.id ' +
    'from product p, product_category pc, products_to_categories ptc ' +
    'where pc.id = ptc.category_id ' +
    'and ptc.product_id = p.id ' +
    'and pc.name = "БРЮКИ") ' +
  'order by opt.`order`';

  connection.query(DBquery, function (error, results, fields) {
    if (error) throw error;
    // console.log('CONNECT1', results)
    let product = {};
    for (let i = 0; i < results.length; i++) {
      product[results[i]['id']] = results[i];     
    }  
    console.log('123', JSON.parse(JSON.stringify(product)));
    res.render('indexx', {
      product: JSON.parse(JSON.stringify(product))
    });
  }); 
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/indexx', indexRouter);

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
});


 
 
// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected with mysql database...')
// })

module.exports = app;
app.listen(3000);