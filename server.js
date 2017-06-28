// import npm modules
var 
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan');

var router = require('./server-routes/routes');

var app = express();
var server = require('http').Server(app);
// Local Host or Heroku env.Port
var PORT = process.env.PORT || 3000;

// start logger and make public files available
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

/* ======== Default Route ======== */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Routes
app.use(router); // api routes

// Turn on server
app.listen(PORT, function() {
    console.log('Server now listening on port ' + PORT);
});
