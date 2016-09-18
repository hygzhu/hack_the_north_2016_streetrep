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
        // A post entry.
        var userData = {
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
        };
        // Get a key for a new Post.
        var userKey = user.username;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/users/' + userKey] = userData;
        return this.firebaseDb.ref().update(updates);
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
        updates['/user-posts/' + post.username + '/' + postKey] = postData;
        return this.firebaseDb.ref().update(updates);
    };
    Repository.prototype.rankUpPost = function (postKey) {
        var postRatingRef = this.firebaseDb.ref().child('posts').child(postKey).child('rating');
        postRatingRef.transaction(function (rating) {
            return rating + 1;
        });
    };
    Repository.prototype.rankDownPost = function (postKey) {
        var postRatingRef = this.firebaseDb.ref().child('posts').child(postKey).child('rating');
        postRatingRef.transaction(function (rating) {
            return rating - 1;
        });
    };
    Repository.prototype.determineCred = function (posts) {
        var cur = 0;
        //for (cur = 0,i = 0,len = posts.length; i<len; i++) {
        for (var p in posts) {
            var postTime = (Date.now() - p.postDate) / 1000; //Convert to seconds
            if (postTime <= 3600) {
                cur += p.rating;
            }
            else if (postTime >= 86400) {
                continue;
            }
            else {
                var dx = Math.floor(postTime / 3600); // number of hours
                var perrier = (100 - (4 * dx)) / 100;
                var inc = (Math.floor((p.rating * perrier) * 10)) / 10;
                cur += inc;
            }
        }
        return cur;
    };
    Repository.prototype.evalStreetCredOfUser = function (username) {
        var promise = this.getPostsOfUser(username);
        promise.then(function (snapshot) {
            // The Promise was "fulfilled" (it succeeded).
            var posts = snapshot.val();
            var newStreetCred = this.determineCred(posts);
            var streetCredRef = this.firebaseDb.ref().child('users').child(username).child('streetCred');
            streetCredRef.transaction(function (rating) {
                return newStreetCred;
            });
        }, function (error) {
            // The Promise was rejected.
            console.log(error);
        });
    };
    Repository.prototype.getPost = function (postKey) {
        return this.firebaseDb.ref().child('posts').child(postKey).once('value');
    };
    Repository.prototype.getPostsOfUser = function (username) {
        return this.firebaseDb.ref().child('user-posts').child(username).once('value');
    };
    Repository.prototype.getPosts = function () {
        /*
          var postsRef = this.firebaseDb.ref().child('posts');
          var posts;
          postsRef.once('value', function(snapshot) {
            return snapshot.val();
         // updateStarCount(postElement, snapshot.val());
        }, function(error){
        console.log(error);
        });
        */
        return this.firebaseDb.ref().child('posts').once('value');
        //return posts;
        //var variable; 
        //return this.firebaseDb.ref().child('posts' + '/' + "-KRvVsH593_6fAlI2sAK").once('value')
        /*.then(function(snapshot){
          variable = 5;
          return variable;
        }, function(error){
          variable = error;
          return variable;
        });*/
        /*
        Let's demonstrate the differences between callbacks and promises by building part of a blog webapp. Our first step is to fetch an article’s contents. Here is how it might look with callbacks:
        
        ref.child('blogposts').child(id).once('value', function(snapshot) {
          // The callback succeeded; do something with the final result.
          renderBlog(snapshot.val());
        }, function(error) {
          // The callback failed.
          console.error(error);
        });
        The Promise-based implementation is similar:
        
        ref.child('blogposts').child(id).once('value').then(function(snapshot) {
          // The Promise was "fulfilled" (it succeeded).
          renderBlog(snapshot.val());
        }, function(error) {
          // The Promise was rejected.
          console.error(error);
        });
        
        */
    };
    return Repository;
}());
exports.Repository = Repository;
