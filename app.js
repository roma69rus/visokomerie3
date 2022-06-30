var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
var productsRouter = require('./routes/products');
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



app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
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