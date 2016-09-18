"use strict";
var Post = (function () {
    function Post(postId, username, latitude, longitude, message, rating) {
        this.postId = postId;
        this.username = username;
        this.latitude = latitude;
        this.longitude = longitude;
        this.message = message;
        this.rating = rating;
        this.postDate = Date.now();
    }
    return Post;
}());
exports.Post = Post;
