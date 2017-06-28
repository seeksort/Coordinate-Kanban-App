var mongoose = require('mongoose');
var Promise = require('bluebird');

module.exports = function() {

    // Set up database
    mongoose.Promise = Promise;

    var databaseUri = 'mongodb://localhost/kanban';
    var db = mongoose.connection;

    // Use either localhost or env, if in Heroku
    if (process.env.MONGODB_URI) {
        mongoose.connect(process.env.MONGODB_URI);
    } 
    else {
        mongoose.connect(databaseUri);
    }

    // Catch Mongoose errors
    db.on('error', function(error) {
        console.log('Mongoose Error: ', error);
    });

    //Connect to database
    db.once('open', function() {
        console.log('Mongoose connection successful.');
    });

}
