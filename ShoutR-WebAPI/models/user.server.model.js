"use strict";
var User = (function () {
    function User(firstName, lastName, username) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
    return User;
}());
exports.User = User;
