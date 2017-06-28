// Need Mongoose ObjectId type in order to search for specific model's ID
var ObjectId = require('mongoose').Types.ObjectId,
    // Import Mongoose models for tables
    User = require('./../models/User.js'),
    Team = require('./../models/Team.js'),
    Project = require('./../models/Project.js'),
    List = require('./../models/List.js'),
    Task = require('./../models/Task.js');


module.exports = function (router) {

    /* ======== Projects List Actions ======== */
    // Get User Projects
    router.get('/projects', function(req, res) {
        //Team.find()
        //TODO
    });

    // Create Project
    router.post('/:team_name/newproject', function(req, res) {
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
                        {team_name: ObjectId(team._id)}
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
    router.get('/:project_name/getall', function(req,res){
        var resObj;
        var cleanProjName = req.params.project_name.split('-').join(' ');
        var projQuery = { project_name: { 
            $regex: new RegExp('^' + cleanProjName, 'i') 
        }}
        Project.findOne(projQuery, function(err, proj) {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            }
            else if (proj === 0) {
                res.json({ success: false, message: 'Could not find project.'});
            }
            else {
                // Add list of all users
                User.find({}, function(err, users){
                    if (err) {
                        console.log(err);
                        res.sendStatus(404);
                    }
                    else if (proj === 0) {
                        res.json({ success: false, message: 'Could not find users.'});
                    }
                    else {
                        var userArr = []
                        users.forEach(function(el){
                            var userObj = {user_name: el.username, id: el._id}
                            userArr.push(userObj);
                        })

                        var listQuery = {projectID: ObjectId(proj._id.toString())}
                        List.find({}, function(err, lists) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(404);
                            }
                            else if (lists === 0 ) {
                                // A project with no lists was found.
                                res.json({ 
                                    success: true,
                                    users: userArr,
                                    project_name: proj.project_name,
                                    lists: [{
                                        title: '',
                                        listId: '',
                                        tasks: []
                                    }]
                                });
                            }
                            else {
                                resObj = { 
                                    success: true,
                                    users: userArr,
                                    project_name: proj.project_name,
                                    lists: []
                                }
                                lists.forEach(function(currList, indexList) {
                                    var populatedList = {
                                        title: currList.list_name,
                                        listId: currList._id,
                                        tasks: []
                                    };
                                    var taskQuery = {list: currList._id};
                                    Task.find(taskQuery)
                                    .populate(
                                        'assigned', 'username -_id'
                                    )
                                    .exec(function(err, tasks){
                                        if (err) {
                                            console.log(err);
                                            res.sendStatus(404);
                                        }
                                        else if (tasks === 0) {
                                            // A list with no tasks was found.
                                            resObj.lists.push(populatedList);
                                        }
                                        else {
                                            tasks.forEach(function(currTask, indexTask){
                                                populatedList.tasks.push(currTask);
                                            });
                                            resObj.lists.push(populatedList);
                                        }
                                    });
                                });
                                setTimeout(function(){
                                    res.json(resObj);
                                }, 1000);
                            }
                        });
                    }
                });
            }
        });
    });

}
