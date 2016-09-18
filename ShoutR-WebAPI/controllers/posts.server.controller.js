"use strict";
var post_server_model_1 = require('../models/post.server.model');
var user_server_model_1 = require('../models/user.server.model');
var repository_1 = require('../database/repository');
var repository = new repository_1.Repository();
//return postsCtrl.getPosts
exports.getPosts = function (req, res) {
    res.json({ info: 'Here are the messages' });
};
exports.createUser = function (req, res) {
    var user = new user_server_model_1.User(req.body.firstName, req.body.lastName, req.body.username);
    //res.json({info: 'created user'});
    repository.createNewUser(user);
    res.json({ info: 'User created Sucessfully and saved' });
};
//postsCtrl.postMessage(req,res)
exports.postMessage = function (req, res) {
    var post = new post_server_model_1.Post("0", req.body.username, req.body.latitude, req.body.longitude, req.body.message, 0);
    repository.writeNewPost(post);
    res.json({ info: 'Message Posted Sucessfully' });
};
