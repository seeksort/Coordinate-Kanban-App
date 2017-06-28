var moment = require('moment');

// Need Mongoose ObjectId type in order to search for specific model's ID
var ObjectId = require('mongoose').Types.ObjectId,
    // Import Mongoose models for tables
    User = require('./../models/User.js'),
    Team = require('./../models/Team.js'),
    Project = require('./../models/Project.js'),
    List = require('./../models/List.js'),
    Task = require('./../models/Task.js');

module.exports = function (router) {

    /* ======== Project Actions - certain actions (add/update member/list/task/comment) should update notifications table ======== */
    // Get - All Lists and Tasks
    router.post('/getprojlists', function(req,res) {
        //TODO
    });
    // Get - My Tasks
        //TODO
    // Get - Due Soon
        //TODO

    // Add List
    router.post('/:team_name/:project_name/newlist', function(req, res) {
        var teamQuery = {team_name: {
            $regex: new RegExp('^' + req.params.team_name, 'i')
        }};
        Team.findOne(teamQuery, function(error, team){
            if (error) {
                console.log(error);
                res.send({success: false, 'message': 'an error occurred'});
            }
            else if (team <= 0) {
                res.send({success: false, 'message': 'team not found'});
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
                        res.send({success: false, 'message': 'an error occurred'});
                    }
                    else if (project <= 0) {
                        res.send({success: false, 'message': 'project not found'});
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
    // Add Task (user can have more than one task w/ same title, diff _id)
    router.post('/:listid/newtask', function(req, res) {
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

    // Update Member to Task
    router.post('/:taskid/assignmember', function(req, res) {
        console.log(req.body)
        var userQuery = { username: req.body.user_name }
        User.findOne(userQuery, function(err, user){
            if (err) {
                console.log(err);
                res.json({success: false, 'message': 'server error, update did not succeed'});
            }
            else if (user <= 0) {
                res.send({success: false, 'message': 'user not found'});
            }
            else {
                var taskQuery = { 
                    _id: ObjectId(req.params.taskid),
                    "assigned": {
                        $not: {
                            $eq: user._id
                        }
                    }
                }
                
                var updateMember = {
                    $push: {
                        "assigned": user._id
                    }
                }
                Task.findOneAndUpdate(taskQuery, updateMember, {upsert: true}, function(err, doc) {
                    if (err) {
                        console.log(err);
                        res.send({success: false, 'message': 'server error, update did not succeed'});
                    }
                    else if (doc <= 0) {
                        res.send({success: false, 'message': 'task not found'});
                    }
                    else {
                        res.send({success: true, 'message': 'success'});
                    }
                });
                
            }
        });
    });
    // Add Comment to Task
    router.post('/:taskid/addcomment', function(req, res) {
        console.log(req)
        var userQuery = { username: req.user.username }
        console.log(userQuery)
        User.findOne(userQuery, function(err, user){
            if (err) {
                console.log(err);
                res.json({success: false, 'message': 'server error, update did not succeed'});
            }
            else if (user <= 0) {
                res.send({success: false, 'message': 'user not found'});
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
                        res.send({success: false, 'message': 'server error, update did not succeed'});
                    }
                    else if (doc <= 0) {
                        res.send({success: false, 'message': 'task not found'});
                    }
                    else {
                        console.log(doc)
                        res.send({success: true, 'message': 'success'});
                    }
                });
            }
        });
    });
    // Update Task Description
    router.post('/:taskid/desc', function(req, res) {
        var taskQuery = { _id: ObjectId(req.params.taskid) }
        var updateDesc = {
            $set: {
                description: req.body.desc
            }
        }
        Task.findOneAndUpdate(taskQuery, updateDesc, function(err, doc) {
            if (err) {
                console.log(err);
                res.send({success: false, 'message': 'server error, update did not succeed'});
            }
            else if (doc <= 0) {
                res.send({success: false, 'message': 'task not found'});
            }
            else {
                res.send({success: true, 'message': 'success'});
            }
        });
    });
    // Update List
    router.post('/:listid/listupdate', function(req, res) {
        var listQuery = { _id: ObjectId(req.params.listid) }
        var update = {
            $set: {
                list_name: req.body.title
            }
        }
        List.findOneAndUpdate(listQuery, update, function(err, doc) {
            if (err) {
                console.log(err);
                res.send({success: false, 'message': 'server error, update did not succeed'});
            }
            else if (doc <= 0) {
                res.send({success: false, 'message': 'list not found'});
            }
            else {
                res.send({success: true, 'message': 'success'});
            }
        });
    });
    // Update Task
    router.post('/:taskid/taskupdate', function(req, res) {
        var updateObj;
        var title = req.body.field;
        // query can update either task_name or description
        updateObj = {
            task_name: req.body.task_name,
            description: req.body.desc
        }

        console.log(updateObj);
        var taskQuery = { _id: ObjectId(req.params.taskid) }
        var update = {
            $set: updateObj
        }
        Task.findOneAndUpdate(taskQuery, update, function(err, doc) {
            if (err) {
                console.log(err);
                res.send({success: false, 'message': 'server error, update did not succeed'});
            }
            else if (doc <= 0) {
                res.send({success: false, 'message': 'task not found'});
            }
            else {
                res.send({success: true, 'message': 'success'});
            }
        });
    });
    // Remove Member from Task
    router.post('/:taskid/removemember', function(req, res) {
        var userQuery = { username: req.body.username }
        User.findOne(userQuery, function(err, user){
            if (err) {
                console.log(err);
                res.json({success: false, 'message': 'server error, update did not succeed'});
            }
            else if (user <= 0) {
                res.send({success: false, 'message': 'user not found'});
            }
            else {
                var taskQuery = { _id: ObjectId(req.params.taskid) }
                var updateMember = {
                    $pull: {
                        assigned: {
                            userID: ObjectId(user._id)
                        }
                    }
                }
                Task.findOneAndUpdate(taskQuery, updateMember, function(err, doc) {
                    if (err) {
                        console.log(err);
                        res.send({success: false, 'message': 'server error, update did not succeed'});
                    }
                    else if (doc <= 0) {
                        res.send({success: false, 'message': 'task not found'});
                    }
                    else {
                        res.send({success: true, 'message': 'success'});
                    }
                });
                
            }
        });
    });
    // Delete List
    router.post('/:listid/removelist', function(req, res) {
        var listQuery = {
            _id: ObjectId(req.params.listid)
        }
        List.remove(listQuery, function(err, obj) {
            if (err) {
                console.log(err);
                res.send({success: false, 'message': 'server error, update did not succeed'});
            } 
            else if (obj.result.n === 0) {
                res.send({success: false, 'message': 'the list was not found'})
            }
            else {
                res.send({success: true, 'message': 'success'});
            }
        })
    });
    // Delete Task
    router.post('/:taskid/removetask', function(req, res) {
        var listQuery = {
            _id: ObjectId(req.params.taskid)
        }
        Task.remove(listQuery, function(err, obj) {
            if (err) {
                console.log(err);
                res.send({success: false, 'message': 'server error, update did not succeed'});
            } 
            else if (obj.result.n === 0) {
                res.send({success: false, 'message': 'the task was not found'})
            }
            else {
                res.send({success: true, 'message': 'success'});
            }
        });
    });
    // Add/update Due Date
    router.post('/:taskid/duedate', function(req, res) {
        var taskQuery = {
            _id: ObjectId(req.params.taskid)
        }
        var update = {
            $set: {
                due_date: new Date(req.body.due_date)
            }
        }
        Task.findOneAndUpdate(taskQuery, update, function(err, doc) {
            if (err) {
                console.log(err);
                res.send({success: false, 'message': 'server error, update did not succeed'});
            }
            else if (doc <= 0) {
                res.send({success: false, 'message': 'task not found'});
            }
            else {
                res.send({success: true, 'message': 'success'});
            }
        });
    });
}
