"use strict";
var post_server_model_1 = require('../models/post.server.model');
var user_server_model_1 = require('../models/user.server.model');
var repository_1 = require('../database/repository');
//import {Promise} from 'promise';
var repository = new repository_1.Repository();
//return postsCtrl.getPosts
exports.getPosts = function (req, res) {
    var promise = repository.getPosts();
    promise.then(function (snapshot) {
        // The Promise was "fulfilled" (it succeeded).
        res.json(snapshot.val());
    }, function (error) {
        // The Promise was rejected.
        res.json(error);
    });
};
//return postsCtrl.getPosts
exports.getPost = function (req, res) {
    var promise = repository.getPost(req.params.postKey);
    promise.then(function (snapshot) {
        // The Promise was "fulfilled" (it succeeded).
        res.json(snapshot.val());
    }, function (error) {
        // The Promise was rejected.
        res.json(error);
    });
};
exports.getPostsOfUser = function (req, res) {
    var promise = repository.getPostsOfUser(req.params.username);
    promise.then(function (snapshot) {
        // The Promise was "fulfilled" (it succeeded).
        res.json(snapshot.val());
    }, function (error) {
        // The Promise was rejected.
        res.json(error);
    });
};
exports.rankUp = function (req, res) {
    repository.rankUpPost(req.params.postKey);
    res.json({ info: "User post has been ranked up" });
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
