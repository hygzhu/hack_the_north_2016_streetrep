"use strict";
//return postsCtrl.getPosts
exports.getPosts = function (req, res) {
    res.json({ info: 'Here are the messages' });
};
//postsCtrl.postMessage(req,res)
exports.postMessage = function (req, res) {
    res.json({ info: 'Message Posted Sucessfully' });
};
