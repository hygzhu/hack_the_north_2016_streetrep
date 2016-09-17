import * as Mongoose from 'mongoose';
import * as express from 'express';


//return postsCtrl.getPosts
exports.getPosts = function(req:express.Request, res: express.Response){
    res.json({info: 'Here are the messages'});
}

//postsCtrl.postMessage(req,res)
exports.postMessage = function(req:express.Request, res: express.Response){
    res.json({info: 'Message Posted Sucessfully'});
}




