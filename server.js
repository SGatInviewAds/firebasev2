var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var uuid = require('uuid');
var app = express();

function moduleAvailable(name) {
  try {
    require.resolve(name);
    return true;
  } catch(e){}
  return false;
}

if (moduleAvailable('./env.js')) {
  var env = require('./env.js');
}

// var db = process.env.MONGOLAB_URI || env.MONGOLAB_URI || "mongodb://localhost/OutCryGaming";
// mongoose.connect(db, function(err) {
//   if (err) return console.log("Error connecting to database: %s. Make sure you ran mongod :)", db);
//
//   var x = new Date();
//   console.log("Connected to %s at %s", db, x.toLocaleString());
// });


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');




app.set('view options', {
  layout: false
});
var newSessionID = uuid();

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


//on homepage load, render the index page
app.get('/', function(req, res) {
  res.render('index');
});
//-------to allow remote access--------------------------------------------------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', function(req, res) {
  // console.log(req.body, "in serverjs 185")
  // res.render('404');
})

//----------------APP IS LISTENING-----------------------------------------------------------
var server = app.listen(port, function() {
  var host = server.address().address;
  var x = new Date();
  console.log('Example app listening at http://localhost: %s.\nStarted at %s', port, x.toLocaleString());
});
