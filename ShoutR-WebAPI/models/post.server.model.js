var Post = (function () {
    function Post(postId, username, latitude, longitude, message) {
        this.postId = postId;
        this.username = username;
        this.latitude = latitude;
        this.longitude = longitude;
        this.message = message;
    }
    return Post;
}());
