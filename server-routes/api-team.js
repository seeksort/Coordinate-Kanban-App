// Need Mongoose ObjectId type in order to search for specific model's ID
var ObjectId = require('mongoose').Types.ObjectId,
    // Import Mongoose models for tables
    User = require('./../models/User.js'),
    Team = require('./../models/Team.js'),
    Project = require('./../models/Project.js'),
    List = require('./../models/List.js'),
    Task = require('./../models/Task.js');

module.exports = function (router) {

    /* ======== Team Actions ======== */
    // Create New Team, set creating user as default admin
    router.post('/newteam', function(req,res) {
        console.log(req.user.email)
        var userQuery = {email: req.user.email}
        User.findOne(userQuery, function(error, doc) {
            var newTeam = new Team({
                team_name: req.body.team_name,
                team_desc: req.body.team_desc,
                admin_users: [{ 
                    userID: ObjectId(doc._id),
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
    // Delete team
    router.post('/deleteteam', function(req,res){
        //TODO
    });

    // Get Team Members
    router.post('/myteam', function(req, res) {
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

    // Add Team Member
    router.post('/:team_name/addteammember', function(req, res){
        // Check to see if user in database, using email. if not, send user not found
        var userQuery = {email: {
            $regex: new RegExp('^' + req.body.email, 'i')
        }};

        User.findOne(userQuery, function(err, user){
            if (err) {
                console.log(err);
                res.send({success: false, 'message': 'an error occurred'});
            }
            else if (user <= 0) {
                res.send({success: false, 'message': 'user not found'});
            }
            else {
                // Look for team, if found add user id
                var teamQuery = {"team_name": {
                    $regex: new RegExp('^' + req.params.team_name, 'i')
                }};
                var teamUpdate = { 
                    $addToSet: { 
                        non_admin_users: { 
                            userID: ObjectId(user._id),
                            username: user.username,
                            email: user.email,
                            userRole: req.body.role
                        } 
                    }
                };
                Team.findOneAndUpdate(teamQuery, teamUpdate, function(err, doc) {
                    if (err) {
                        console.log(err);
                        res.send({success: false, 'message': 'server error, update did not succeed'});
                    }
                    else if (doc <= 0)
                        res.send({success: false, 'message': 'team not found'});
                    else {
                        res.send({success: true, 'message': 'success'});
                    }
                });       
                
            }
        });
    });

    // Remove Team Member
    router.get('/:teamid/removemember', function(req, res){
        //TODO
    });

    // Update Team Member (name, role, title) (your permissions have been udpated - page refresh)
    //TODO

}
