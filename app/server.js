// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.json(getDetails(request));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function getDetails(req) {
  
  var details = {
    ipAddress: null,
    language: null,
    os: null
  }
  
  // http://keyangxiang.com/2016/03/30/get-client-ip-address-in-express-js/
  var ipAddress = req.headers['x-forwarded-for'].split(",")[0];
  details.ipAddress = ipAddress;
  
  // https://stackoverflow.com/questions/11845471/how-can-i-get-the-browser-language-in-node-js-express-js?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  var language = req.headers["accept-language"]
  details.language = language;
  
  // https://stackoverflow.com/questions/12059284/get-text-between-two-rounded-brackets?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  var os = req.headers['user-agent'].match(/\(([^)]+)\)/)[1];
  details.os = os;
  
  return details;
}
