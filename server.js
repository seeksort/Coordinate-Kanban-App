// import npm modules
var 
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    moment = require('moment'),
    Promise = require('bluebird'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    LocalStrategy = require('passport-local').Strategy;

mongoose.Promise = Promise;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// Local Host or Heroku env.Port
var PORT = process.env.PORT || 3000;

// start logger and make public files available
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Start Mongoose & test connection
// Need Mongoose ObjectId type in order to search for specific model's ID
var ObjectId = require('mongoose').Types.ObjectId,
    databaseUri = 'mongodb://localhost/kanban',
    db = mongoose.connection,
    // Import Mongoose models for tables
    User = require('./models/User.js'),
    Team = require('./models/Team.js'),
    Project = require('./models/Project.js'),
    List = require('./models/List.js'),
    Task = require('./models/Task.js');

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

// Passport.js passport-local-mongoose authentication
app.use(session({
  secret: 'turn around bright eyes',
  store: new MongoStore({
    mongooseConnection: db,
  }),
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 60000,
    secure: true 
  }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ======== Default Route ======== */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

/* ======== User Account Actions ======== */
// Create new account
app.post('/newuser', function(req, res, next) {
    console.log(req.body);
    // Passport-Local Mongoose function; will create new user, hash the password (2nd argument) and store username, email, hashed pw, and pw salt in DB
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
    }), req.body.password, function(error, userAccount) {
        if (error) {
            console.log('there was an error ' + error);
            return res.json({ message : 'there was an error' });
        }
        // After account created, authenticate user
        passport.authenticate('local')(req, res, function () {
            req.session.save(function(err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            })
        });
    });
});

// Log in - if fail redirect to login page
app.post('/userlogin', function(req, res, next) {
    passport.authenticate('local')(req, res, function () {
        req.session.save(function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })
});


/* ======== Projects List Actions ======== */
// Get User Projects
// Create Project
app.post('/:userid/:team_name/newproject', function(req, res) {
    // Look for Project for Team in DB, if in DB throw error, if not, save to DB
    // console.log(req.session.cookie.user);
    var teamQuery = {team_name: {
        $regex: new RegExp('^' + req.params.team_name, 'i')
    }}

    Team.findOne(teamQuery, function(error, team) {
        if (error) {
            console.log(err);
        } 
        else if (team <= 0) {
            res.json({ success: false, message: 'Team is not in database.'});
        }
        else {
            var projQuery = { 
                $and: [
                    {project_name: req.body.project_name},
                    {team_name: team._id}
                ]
            };
            // ensure project is not in DB and assoc w/ team
            Project.find(projQuery, function(err, doc) {
                if (err) {
                    console.log(err);
                } 
                else if (doc > 0) {
                    console.log(error);
                    res.json({ success: false, message: 'This team already has a project with that name.'});
                } else {
                    var newProj = new Project({
                        project_name: req.body.project_name,
                        teamID: ObjectId(team._id)
                    });
                    newProj.save(function(error, proj) {
                        if (error) {
                            console.log(error);
                            res.json({ success: false, message: 'Could not save to DB.'});
                        } 
                        else {
                            res.json({ success: true, message: 'New project created.'});
                        }
                    });
                }
            });
        }
    });
});

// Get Project - redirect to Get - All Lists and Tasks

/* ======== Team Actions ======== */
// Create New Team, set creating user as default admin
app.post('/:userid/newteam', function(req,res) {
    console.log(req.params.userid)
    var userQuery = {_id: ObjectId(req.params.userid)}
    User.findOne(userQuery, function(error, doc) {
        var newTeam = new Team({
            team_name: req.body.team_name,
            team_desc: req.body.team_desc,
            admin_users: [{ 
                userID: doc._id,
                username: doc.username,
                email: doc.email,
                userRole: "Team Creator"
            }]
        });
        var teamQuery = {team_name: req.body.team_name}
        Team.find(teamQuery, function(err, docs) {
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
                        res.json({ success: true, message: 'New team created.'});
                    }
                });
            }
            else {
                res.json({ success: false, message: 'Team not available.'});
            }
        });
        
    })
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

// Add Team Member - TEMP, will add websocket later
app.post('/:team_name/addteammember', function(req, res){
    // Check to see if user in database, using email. if not, send user not found
    var userQuery = {email: {
        $regex: new RegExp('^' + req.body.email, 'i')
    }};

    User.findOne(userQuery, function(err, user){
        if (err) {
            console.log(err);
            res.send({'message': 'an error occurred'});
        }
        else if (user <= 0) {
            res.send({'message': 'user not found'});
        }
        else {
            // Look for team, if found add user id
            var teamQuery = {"team_name": {
                $regex: new RegExp('^' + req.params.team_name, 'i')
            }};
            var teamUpdate = { 
                $addToSet: { 
                    non_admin_users: { 
                        userID: user._id,
                        username: user.username,
                        email: user.email,
                        userRole: req.body.role
                    } 
                }
            };
            Team.findOneAndUpdate(teamQuery, teamUpdate, function(err, doc) {
                if (err) {
                    console.log(err);
                    res.send({'message': 'there was an error'});
                }
                else if (doc <= 0)
                    res.send({'message': 'team not found'});
                else {
                    res.send({'message': 'success'});
                }
            });       
            
        }
    });
});

// Websocket
io.on('connection', function (socket) {
    // Add Team Member - WEBSOCKET (added you to team)
    socket.on('add member', function (msg) {
        console.log(msg);
        //TODO
        });
    // Delete Team - WEBSOCKET (this team has been deleted)
    socket.emit('delete team', { message: 'team deleted' });
    socket.on('delete', function (data) {
        console.log(data);
        //TODO
    });
});

// Update Team Member (name, role, title) - WEBSOCKET (your permissions have been udpated - page refresh)

/* ======== Project Actions - certain actions (add/update member/list/task/comment) should update notifications table ======== */

// Get - All Lists and Tasks
app.post('/getprojlists', function(req,res) {
    //TODO
});
// Get - My Tasks
// Get - Due Soon
// Get - Custom Filter - This might be a 'reach' goal.
// Add List - WEBSOCKET
app.post('/:team_name/:project_name/newlist', function(req, res) {
    var teamQuery = {team_name: {
        $regex: new RegExp('^' + req.params.team_name, 'i')
    }};
    Team.findOne(teamQuery, function(error, team){
        if (error) {
            console.log(error);
            res.send({'message': 'an error occurred'});
        }
        else if (team <= 0) {
            res.send({'message': 'team not found'});
        }
        else {
            // Remove dashes from project_name param and replace w/ space for regex search
            var cleanProjName = req.params.project_name.split('-').join(' ');
            var projQuery = { project_name: { 
                $regex: new RegExp('^' + cleanProjName, 'i') 
            }}
            var projectQuery = {
                $and: [
                    projQuery,
                    { teamID: ObjectId(team._id) }
                ] 
            };
            Project.findOne(projectQuery, function(err, project){
                if (err) {
                    console.log(err);
                    res.send({'message': 'an error occurred'});
                }
                else if (project <= 0) {
                    res.send({'message': 'project not found'});
                }
                else {
                    var newList = new List({
                        list_name: req.body.list_name,
                        projectID: ObjectId(project._id)
                    });
                    newList.save(function(err, list) {
                        if (err) {
                            console.log(err);
                            res.json({ success: false, message: 'Could not save to DB.'});
                        } 
                        else {
                            res.json({ success: true, message: 'New list created.'});
                        }
                    });
                }
            });   
        }
    });
});
// Add Task (user can have more than one task w/ same title, diff _id) - WEBSOCKET
app.post('/:listid/newtask', function(req, res) {
    var newTask = new Task({
        task_name: req.body.task_name,
        list: ObjectId(req.params.listid)
    });
    newTask.save(function(err, task) {
        if (err) {
            console.log(err);
            res.json({ success: false, message: 'Could not save to DB.'});
        }
        else {
            res.json({ success: true, message: 'New task created.'});
        }
    })
});

// Update Member to Task - WEBSOCKET
app.post('/:taskid/addmember', function(req, res) {
    var userQuery = { username: req.body.username }
    User.findOne(userQuery, function(err, user){
        if (err) {
            console.log(err);
            res.json({'message': 'an error occurred'});
        }
        else if (user <= 0) {
            res.send({'message': 'user not found'});
        }
        else {
            var taskQuery = { _id: ObjectId(req.params.taskid) }
            var updateMember = {
                $addToSet: {
                    assigned: {
                        userID: ObjectId(user._id)
                    }
                }
            }
            Task.findOneAndUpdate(taskQuery, updateMember, function(err, doc) {
                if (err) {
                    console.log(err);
                    res.send({'message': 'there was an error'});
                }
                else if (doc <= 0)
                    res.send({'message': 'task not found'});
                else {
                    res.send({'message': 'success'});
                }
            });
            
        }
    });
});
// Add Comment to Task - WEBSOCKET
app.post('/:taskid/addcomment', function(req, res) {
    var userQuery = { username: req.body.username }
    User.findOne(userQuery, function(err, user){
        if (err) {
            console.log(err);
            res.json({'message': 'an error occurred'});
        }
        else if (user <= 0) {
            res.send({'message': 'user not found'});
        }
        else {
            var time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
            var taskQuery = { _id: ObjectId(req.params.taskid) }
            var updateMember = {
                $push: {
                    comments: {
                        userID: ObjectId(user._id),
                        text: req.body.comment,
                        comment_date: time
                    }
                }
            }
            Task.findOneAndUpdate(taskQuery, updateMember, function(err, doc) {
                if (err) {
                    console.log(err);
                    res.send({'message': 'there was an error'});
                }
                else if (doc <= 0)
                    res.send({'message': 'task not found'});
                else {
                    res.send({'message': 'success'});
                }
            });
        }
    });
});
// Update Task Description
app.post('/:taskid/desc', function(req, res) {
    var taskQuery = { _id: ObjectId(req.params.taskid) }
    var updateDesc = {
        $set: {
            description: req.body.desc
        }
    }
    Task.findOneAndUpdate(taskQuery, updateDesc, function(err, doc) {
        if (err) {
            console.log(err);
            res.send({'message': 'there was an error'});
        }
        else if (doc <= 0)
            res.send({'message': 'task not found'});
        else {
            res.send({'message': 'success'});
        }
    });
});
// Update List - WEBSOCKET
// Update Task - WEBSOCKET
// Delete List - WEBSOCKET
// Delete Task - WEBSOCKET
// Remove Member from Task - WEBSOCKET


app.listen(PORT, function() {
    console.log('Server now listening on port ' + PORT);
});