var axios = require('axios');

var helpers = {

    // Team - get team info based on user email
    getTeam: function(loggedInUser){
        // var loggedInUser = 'shiba@muchwow.com'; //dummy name for testing
        // return axios.get('')
    },

    // Add Member
    addMember: function(memberObj) {
        // console.log(memberObj); //debug
        // var socket = io();
        // socket.emit('add member', memberObj);
        // socket.on('add member', function(msg) {

        // });
    },

    // Login
    login: function(email, password){
        return axios.post('/userlogin', {
            'email': email,
            'password': password
        }).then(function(res){
            if (res.data.success === true) {
                return true;
            }
            else {
                return false;
            }
        }).catch(function (error) {
            console.log(error);
            alert('Incorrect password or login')
        });
    },

    // Check if logged in
    loginCheck: function() {
        return axios.get('/userlogin').then(function(res){
            if (res.data.success === true) {
                console.log('should return true')
                return true;
            }
            else {
                console.log('should return false')
                return false;
            }
        });
    },

    // Register new user
    userSignup: function(username, email, password) {
        console.log('userSignup');
        return axios.post('/newuser', {
            'username': username,
            'email': email,
            'password': password
        }).then(function(res){
            if (res.data.error == 'userExists') {
                alert('Sorry, that user already exists.');
                return false;
            }
            else {
                return true;            
            }
        }).catch(function (error) {
            console.log(error);
            alert('Registration error.');
            return false
        });
    },

    // Add a new list
    addList: function(teamName, projectName, listName) {
        var url = '/' + teamName + '/' + projectName + '/newlist'
        return axios.post(url, {
            'list_name': listName
        }).then(function(res){
            console.log('new list created.');
        }).catch(function (error) {
            console.log(error);
        });
    },

    // add a new task
    addTask: function(listId, taskName) {
        var url = '/' + listId + '/newtask'
        return axios.post(url, {
            'task_name': taskName
        }).then(function(res){
            console.log('new task created.');
        }).catch(function (error) {
            console.log(error);
        });
    },

    // Update a task
    updateTask: function(taskid, apiParam, state) {
        var url = '/' + taskid + '/' + apiParam
        axios.post(url, state).then(function(res){
            console.log(res);
            console.log('task updated.');
        }).catch(function (error) {
            console.log(error);
        });
    },

    // Get project lists & tasks
    getProject: function(projectName){
        var url = '/' + projectName + '/getall'
        console.log(url)
        return axios.get(url).then(function(res){
            var projObj = {
                title: res.data.project_name,
                lists: res.data.lists
            }
            return projObj;
        });
    }

};

module.exports = helpers;