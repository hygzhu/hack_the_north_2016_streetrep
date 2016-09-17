import {Express} from 'express';

var express = require('express');
var router:Express = express.Router();
var postsCtrl = require('../controllers/posts.server.controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
