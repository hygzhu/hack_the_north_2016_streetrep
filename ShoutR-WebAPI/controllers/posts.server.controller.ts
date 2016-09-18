import * as Mongoose from 'mongoose';
import * as express from 'express';

import { Post } from '../models/post.server.model';
import { User } from '../models/user.server.model';
import { Repository } from '../database/repository';
//import {Promise} from 'promise';

var repository:Repository = new Repository(); 


//return postsCtrl.getPosts
exports.getPosts = function(req:express.Request, res: express.Response){

    var promise  = repository.getPosts();
    promise.then(function(snapshot) {
  // The Promise was "fulfilled" (it succeeded).
  res.json(snapshot.val());
}, function(error) {
  // The Promise was rejected.
  res.json(error);
});


    
}

exports.createUser = function(req:express.Request, res:express.Response){
var user: User = new User(
    req.body.firstName,
    req.body.lastName,
    req.body.username
    )
    //res.json({info: 'created user'});
    repository.createNewUser(user);
    res.json({info: 'User created Sucessfully and saved'});
}


//postsCtrl.postMessage(req,res)
exports.postMessage = function(req:express.Request, res: express.Response){

    var post: Post = new 
    Post("0",
            req.body.username, 
            req.body.latitude, 
            req.body.longitude, 
            req.body.message, 
            0) 

    repository.writeNewPost(post);
    res.json({info: 'Message Posted Sucessfully'});
}




