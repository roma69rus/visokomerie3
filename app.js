var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
const sassMiddleware = require('node-sass-middleware');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(sassMiddleware({
  /* Options */
  src: __dirname + "/scss",
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
  prefix:  ''  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/country', function (req, res) {
  connection.query('select * from country', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});


1
2
3
4
5
6
7
//rest api to get a single customer data
app.get('/country/:id', function (req, res) {
   connection.query('select * from country where Code=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
  console.log('req111', req)
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : '2sdfTY78(',
  database : 'world'
});
 
 
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})



module.exports = app;
app.listen(3000);
