var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var adminPostsRouter = require('./routes/admin/posts');
var adminProductsRouter = require('./routes/admin/products');
var sensoresRouter = require('./routes/admin/sensores');
var productsRouter = require('./routes/products');
var actuators = require('./routes/actuators');
var authRouter = require('./routes/auth');
var verifyAuth = require('./middlewares/authMiddleware');
var cartRouter = require('./routes/cart');
var switchRouter = require('./routes/admin/switches');

var app = express();

app.set('trust proxy', 1);
app.use(session({
  secret: 'mySecret123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/admin/posts', /*[verifyAuth],*/  adminPostsRouter);
app.use('/admin/products', [verifyAuth], adminProductsRouter);
app.use('/admin/switches', [verifyAuth], switchRouter);
app.use('/admin/sensores', [verifyAuth], sensoresRouter);
app.use('/products', productsRouter);
app.use('/actuators', actuators);


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

module.exports = app;
