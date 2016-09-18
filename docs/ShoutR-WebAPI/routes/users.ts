var express = require('express');
var router = express.Router();

var postsCtrl = require('../controllers/posts.server.controller.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
Sample JSon

{

"username": "harman666666",
"firstName": "Harman",
"lastName": "Singh"
}

*/
router.post('/create', function(req,res,next){
  postsCtrl.createUser(req,res,next);
});

router.get('/:username/posts',function(req,res){
  return postsCtrl.getPostsOfUser(req,res);
});



module.exports = router;
