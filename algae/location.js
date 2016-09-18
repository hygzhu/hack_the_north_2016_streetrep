//How do i even write json, lol..

var express = require('express')
var geolib = require('geolib')

function getPostsWithinRadius(userLat, userLng, posts) {
  const radius = 10;
  var q = [];
  for (p in posts):
    var dist = geolib.getDistance(
      {latitude: userLat, longitude: userLng},
      {latitude: posts.latitude, longitude: posts.longitude}
    );
    if (dist <= radius) {
      q.append(p)
    }
}
