// import npm modules
var 
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    Promise = require('bluebird');

mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 3000;


// start logger and make public files available
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Start Mongoose & test connection
var ObjectId = require('mongoose').Types.ObjectId,
    databaseUri = 'mongodb://localhost/coordinateapp',
    db = mongoose.connection;

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} 
else {
    mongoose.connect(databaseUri);
}

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});


/* User Account Actions */
// Create new account
// Log in

/* Projects List Actions */
// Get User Projects
// Create Project
// Get Project - redirect to Get - All Lists and Tasks

/* Team Actions */
// Create New Team
// Get Team Members
// Add Team Member
// Delete Team
// Update Team Member (name, role, title)

/* Project Actions - certain actions (add/update member/list/task/comment) should update notifications table */
// Create New Project
// Get - All Lists and Tasks
// Get - My Tasks
// Get - Due Soon
// Get - Custom Filter - This might be a 'reach' goal.
// Add List
// Add Task
// Add Member to Task
// Add Tag to Task
// Add Comment to Task
// Update List
// Update Task
// Update Tag
// Update Comment
// Delete List
// Delete Task
// Delete Tag
// Delete Comment


app.listen(PORT, function() {
    console.log('Server now listening on port ' + PORT);
});