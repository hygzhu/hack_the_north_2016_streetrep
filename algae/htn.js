var express = require('express')
var http = require('http');
 
var app = express();

// https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY
var options = {
  host: 'www.googleapis.com',
  path: '/geolocation/v1/geolocate?key=YOUR_API_KEY'
};

function getLocation(req) {
	callback = function(response) {
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    console.log(str);
	    process.stdout.write(str);
	  });
	}

	http.request(options, callback).end();
}
 
app.get('/shouts', function(req, res) {
  res.json({notes: "No shouts yet!"})
})

app.post('/shout', function(req, res) {
	getLocation(req);
	res.json({notes: "Updated Succesfully"})
})
 
app.listen(3000)