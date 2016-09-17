var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var Firebase from 'firebase';
var firebase = require("firebase");

var routes = require('./routes/index.js');
var users = require('./routes/users.js');
var posts = require('./routes/posts.js');

var firebaseDatabase = require('./database/firebaseDatabase');

import {Express} from 'express';

var app:Express = express();
//var myFireBaseReference = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/")



var config = {
    apiKey: "AIzaSyDd-Wl2yxssqlVnM_5O2Hz3EgczJFXxyMQ",
    authDomain: "shoutrapplication.firebaseapp.com",
    databaseURL: "https://shoutrapplication.firebaseio.com",
    storageBucket: "shoutrapplication.appspot.com",
    messagingSenderId: "446299891274"
  };
  
  firebase.initializeApp(config);

// Get a reference to the database service
  var database = firebase.database();

  firebaseDatabase(database);
  


/*
Initialize like so: 
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};

firebase.initializeApp(config);
*/


//var myFireBaseDbReference = new Firebase("https://shoutrapplication.firebaseio.com");

//var executeDB = require('/database/firebaseDatabase.js')(myFireBaseDbReference);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);

// catch 404 and forward to error handler
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
