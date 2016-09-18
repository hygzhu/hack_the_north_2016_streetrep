"use strict";
/*
set( ) 	Write or replace data to a defined path, like messages/users/<username>
update( ) 	Update some of the keys for a defined path without replacing all of the data
push( ) 	Add to a list of data in the database. Every time you call push()
            your database generates a unique ID, like messages/users/<unique-user-id>/<username>
transaction( ) 	Use our transactions feature when working with complex data that
                could be corrupted by concurrent updates
*/
var Repository = (function () {
    function Repository() {
        var firebase = require("firebase");
        var config = {
            apiKey: "AIzaSyDd-Wl2yxssqlVnM_5O2Hz3EgczJFXxyMQ",
            authDomain: "shoutrapplication.firebaseapp.com",
            databaseURL: "https://shoutrapplication.firebaseio.com",
            storageBucket: "shoutrapplication.appspot.com",
            messagingSenderId: "446299891274"
        };
        firebase.initializeApp(config);
        this.firebaseDb = firebase.database();
    }
    Repository.prototype.createNewUser = function (user) {
        this.firebaseDb.ref('users/' + user.username).set({
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
        });
    };
    Repository.prototype.writeNewPost = function (post) {
        // A post entry.
        var postData = {
            latitude: post.latitude,
            longitude: post.longitude,
            message: post.message,
            postDate: post.postDate,
            rating: post.rating,
            username: post.username,
            id: post.postId
        };
        // Get a key for a new Post.
        var postKey = this.firebaseDb.ref().child('posts').push().key;
        postData.id = postKey;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + postKey] = postData;
        //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
        return this.firebaseDb.ref().update(updates);
    };
    return Repository;
}());
exports.Repository = Repository;
