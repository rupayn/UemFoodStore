require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let expressSession=require('express-session')
let ejs_layout=require('express-ejs-layouts')
const MongodbStore=require("connect-mongo");
let bodyParser = require('body-parser');
let flash=require('express-flash')


const db_url=process.env.DBURL;
// let passport=require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu');
var orderRouter = require('./routes/order');
let localStrategy=require('passport-local');


var app = express();





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret: process.env.SECRET,
  cookie: { maxAge: 1000*60*60*12 }, // 12 hours
  store: MongodbStore.create({
    mongoUrl: process.env.URL,
    collection:'sessions',
}),
}))


app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(ejs_layout)
let passport=require('passport')

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(usersRouter.authenticate()));
passport.serializeUser(usersRouter.serializeUser())
passport.deserializeUser(usersRouter.deserializeUser())

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/order', orderRouter);



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
