import * as Firebase from 'firebase'
import { Post } from '../models/post.server.model';
import { User } from '../models/user.server.model';


/*
set( ) 	Write or replace data to a defined path, like messages/users/<username>
update( ) 	Update some of the keys for a defined path without replacing all of the data
push( ) 	Add to a list of data in the database. Every time you call push() 
            your database generates a unique ID, like messages/users/<unique-user-id>/<username>
transaction( ) 	Use our transactions feature when working with complex data that 
                could be corrupted by concurrent updates
*/

export class Repository {

firebaseDb: Firebase;

constructor(){
 var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyDd-Wl2yxssqlVnM_5O2Hz3EgczJFXxyMQ",
    authDomain: "shoutrapplication.firebaseapp.com",
    databaseURL: "https://shoutrapplication.firebaseio.com",
    storageBucket: "shoutrapplication.appspot.com",
    messagingSenderId: "446299891274"
  };
  
  firebase.initializeApp(config);
  this.firebaseDb =  firebase.database();
}



createNewUser(user: User) {
  this.firebaseDb.ref('users/' + user.username).set({
    username: user.username,
    firstname: user.firstName,
    lastname: user.lastName,
    streetCred: user.streetCred
  });
}


 writeNewPost(post: Post) {
  // A post entry.
  var postData = {
    latitude: post.latitude,
    longitude: post.longitude,
    message: post.message,
    postDate: post.postDate,
    rating: post.rating,
    username: post.username,
    id : post.postId
  };

  // Get a key for a new Post.
  var postKey = this.firebaseDb.ref().child('posts').push().key;
  postData.id = postKey;
  
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + postKey] = postData;
  updates['/user-posts/' + post.username + '/' + postKey] = postData;

  return this.firebaseDb.ref().update(updates);
}

rankUpPost(postKey: string){

  var promise = this.firebaseDb.ref().child('posts').child(postKey).once('value');
  
  promise.then(function(snapshot) {
  // The Promise was "fulfilled" (it succeeded).
   var postData = snapshot.val();
   postData.rating = postData.rating + 1;
   var updates = {};
   updates['/posts/' + postKey] = postData;
   updates['/user-posts/' + postData.username + '/' + postKey] = postData;

 // return this.firebaseDb.ref().update(updates);

}, function(error) {
  // The Promise was rejected.
  console.log(error);
});


}

rankDownPost(postKey: string){

}


getPost(postKey: string){
return this.firebaseDb.ref().child('posts').child(postKey).once('value')
}

getPostsOfUser(username: string){
  return this.firebaseDb.ref().child('user-posts').child(username).once('value');
}


getPosts(){
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
return this.firebaseDb.ref().child('posts').once('value')











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




}






}





