// import npm modules
var 
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    Promise = require('bluebird');

mongoose.Promise = Promise;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// Local Host or Heroku env.Port
var PORT = process.env.PORT || 3000;

// HTTP Port 80
// server.listen(80);

// start logger and make public files available
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Start Mongoose & test connection
var ObjectId = require('mongoose').Types.ObjectId,
    databaseUri = 'mongodb://localhost/kanban',
    db = mongoose.connection,
    User = require('./models/User.js'),
    Team = require('./models/Team.js'),
    Project = require('./models/Project.js');

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} 
else {
    mongoose.connect(databaseUri);
}

db.on('error', function(error) {
    console.log('Mongoose Error: ', error);
});

db.once('open', function() {
    console.log('Mongoose connection successful.');
});


/* ======== User Account Actions ======== */
// Create new account
app.post('/newuser', function(req, res) {
    console.log(req.body)
    var newUser = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    });
    console.log(newUser);
    // Look for user in DB, if in DB throw error, if not save to DB
    User.find({user_name: req.body.name}, function(err, docs) {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        }
        else if (docs.length <= 0) {
            newUser.save(function(error, doc) {
                if (error) {
                    console.log(error);
                    res.json({ success: false, message: 'Could not save to DB.'});
                } 
                else {
                    res.json({ success: true, message: 'New user created.'});
                }
            })
        }
        else {
            res.json({ success: false, message: 'User in database.'});
        }
    });
});

// Log in

/* ======== Projects List Actions ======== */
// Get User Projects
// Create Project
// Get Project - redirect to Get - All Lists and Tasks

/* ======== Team Actions ======== */
// Create New Team
app.post('/newteam', function(req,res) {
    var newTeam = new Team({
        team_name: req.body.team_name,
        team_desc: req.body.team_desc
    });
    Team.find({team_name: req.body.team_name}, function(err, docs) {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        }
        else if (docs.length <= 0) {
            newTeam.save(function(error, doc) {
                if (error) {
                    console.log(error);
                    res.json({ success: false, message: 'Could not save to DB.'});
                } 
                else {
                    res.json({ success: true, message: 'New user created.'});
                }
            });
        }
        else {
            res.json({ success: false, message: 'User in database.'});
        }
    });
})

// Get Team Members
app.post('/myteam', function(req, res) {
    var userQuery = {"email": req.body.email};
    console.log(userQuery);

    User.findOne(userQuery, function(err, doc) {
        if (err) {
            console.log(err);
        } 
        else {
            console.log(doc);
            res.json(doc);
        }
    });
});

// Websocket
io.on('connection', function (socket) {
    // Add Team Member - WEBSOCKET (added you to team)
    socket.on('add member', function (msg) {
        console.log(msg);
        // Check to see if user in database, using email. if not, send user not found
        var userQuery = {email: msg.email};

        User.findOne( userQuery, function(err, user){
            if (err) {
                console.log(err);
                io.emit('an error occurred');
            }
            else if (user) {
                var teamQuery = {team_name: user.team_name};
                var teamUpdate = { 
                    $addToSet: { 
                        non_admin_users: { 
                            userId: user.user_name,
                            userRole: user.role
                        } 
                    } 
                };
                Team.findOneAndUpdate( teamQuery, teamUpdate, function(err, doc) {
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', doc);
                });       
                io.emit('add member', {user: user.user_name})
            }
            else {
                io.emit('user not found');
            }
        });
    });
    // Delete Team - WEBSOCKET (this team has been deleted)
    socket.emit('delete team', { message: 'team deleted' });
    socket.on('delete', function (data) {
        console.log(data);
    });
});

// Update Team Member (name, role, title) - WEBSOCKET (your permissions have been udpated - page refresh)

/* ======== Project Actions - certain actions (add/update member/list/task/comment) should update notifications table ======== */
// Create New Project - WEBSOCKET 
// Get - All Lists and Tasks
// Get - My Tasks
// Get - Due Soon
// Get - Custom Filter - This might be a 'reach' goal.
// Add List - WEBSOCKET
// Add Task - WEBSOCKET
// Add Member to Task - WEBSOCKET
// Add Tag to Task - WEBSOCKET
// Add Comment to Task - WEBSOCKET
// Update List - WEBSOCKET
// Update Task - WEBSOCKET
// Update Tag - WEBSOCKET
// Update Comment - WEBSOCKET
// Delete List - WEBSOCKET
// Delete Task - WEBSOCKET
// Delete Tag - WEBSOCKET
// Delete Comment - WEBSOCKET


app.listen(PORT, function() {
    console.log('Server now listening on port ' + PORT);
});