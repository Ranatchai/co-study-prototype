var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '.tmp/public')));
}
app.use(function(req, res, next) {
  res.locals.title = 'The Prototype';
  next();
});


var shell = require('shelljs');
var _ = require('lodash');
var AppConfig = require('./app.config');
var active = 'cover';
for (var i = 0; i < process.argv.length; i++) {
  var value = process.argv[i];
  if (value.indexOf('--target:') >= 0) {
    active = value.slice('--target:'.length);
    break;
  }
}
app.get('/', function(req, res, next) {
  console.log('index');
  // serverRender(req, res, next);    
  res.render('app', {
    html: '',
    // errors: req.flash('error')
  });
});
app.get('/switch', function(req, res, next) {   
  var list = Object.keys(AppConfig).map(function(key) {
    return _.extend({key: key}, AppConfig[key]);
  });

  res.render('app-list', {
    list: list,
    // errors: req.flash('error'),
    active: active
  });
});
app.post('/switch', function(req, res, next) {
  var target = req.body.target;
  if (!target || !AppConfig[target]) {
    return next();
  }
  active = target;
  var child = shell.exec('grunt webpack:dev --target:' + target, {silent: true, async: true}, function(err, out) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;