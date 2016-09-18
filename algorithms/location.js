//How do i even write json, lol..

var geolib = require('geolib');

function getPostsWithinRadius(userLat, userLng, posts) {
  const radius = 10;
  var q = [];
  for (len=posts.length,i=0;i<len;i++) {
    var p = posts[i];
    var dist = geolib.getDistance(
      {latitude: userLat, longitude: userLng},
      {latitude: p.latitude, longitude: p.longitude}
    );
    if (dist <= radius) {
      q.push(p)
    }
  }
  return q;
}
