  // Super complex algorithm for determining the cred of a user

function determineCred(posts) {
  for (cur = 0,i = 0,len = posts.length; i<len; i++) {
    var p = posts[i]
    var postTime = (Date.now() - p.postDate)/1000; //Convert to seconds
    if (postTime <= 3600) {
      cur += p.rating;
    } else if (postTime >= 86400) {
      continue;
    } else {
      var dx = Math.floor(postTime / 3600); // number of hours
      var perrier = (100 - (4*dx)) / 100;
      var inc = (Math.floor((p.rating * perrier) * 10)) / 10;
      cur += inc;
    }
  }
  return cur;
}
