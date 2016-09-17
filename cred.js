// Super complex algorithm for determining the cred of a user

function determineCred(posts) {
  var cur = 0;
  for (p in posts) {
    var postTime = Date.now() - p.postDate;
    if (postTime <= 3600) {
      cur += p.rating
    } else {
      cur += p.rating / 2
    }
  }
  return cur;  
}
