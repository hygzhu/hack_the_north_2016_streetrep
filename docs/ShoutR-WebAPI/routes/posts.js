"use strict";
var express = require('express');
var router = express.Router();
var postsCtrl = require('../controllers/posts.server.controller.js');
router.get('/', function (req, res) {
    return postsCtrl.getPosts(req, res);
});
router.get('/:postKey', function (req, res) {
    return postsCtrl.getPost(req, res);
});
/*
Sample JSon

{

"username": "harman",
"message": "poo",
"latitude": "500",
"longitude": "60"

}

*/
router.post('/message', function (req, res) {
    return postsCtrl.postMessage(req, res);
});
router.post('/rankup/:postKey', function (req, res) {
    return postsCtrl.rankUp(req, res);
});
module.exports = router;
/*

router.get('/', function(req, res, next) {
  return standupCtrl.list(req,res); //This is why you should make an interface for your controllers for intellisense
});

//SETUP ROUTES FOR OUR standup.server.controller.ts

router.get('/newnote', function(req, res){
    return standupCtrl.getNote(req, res);
});



router.post('/', function(req, res){
  return standupCtrl.filterByMember(req, res);
});
*/
/* Was able to post this data using postman on the post route /newnote:

{
   "memberName":"Bob",
   "project":"matrix",
   "workYesterday":"Build Out the Standup Meeting Node",
   "workToday":"Builded some stuff",
   "impediment":"None"
}
*/
