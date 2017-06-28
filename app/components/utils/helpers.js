var axios = require('axios');

var helpers = {

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
                return true;
            }
            else {
                return false;
            }
        });
    },

    // Logout
    logout: function() {
        return axios.get('/logout').then(function(res){
            if (res.data.success === true) {
                alert('You have been logged out.');
                return true;
            }
            else {
                alert('An error occurred. Please contact administrator.')
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
        return new Promise(function(resolve, reject) {
            var url = '/' + taskid + '/' + apiParam
            axios.post(url, state).then(function(res){
                if (res.data.success === true) {
                    resolve('task updated.');
                }
                else {
                    reject(res.data.message)
                    alert('could not update task!');
                }
            })
        });
    },

    // Get project lists & tasks
    getProject: function(projectName){
        var url = '/' + projectName + '/getall'
        console.log(url)
        return axios.get(url).then(function(res){
            console.log(res)
            var projObj = {
                title: res.data.project_name,
                lists: res.data.lists,
                users: res.data.users
            }
            return projObj;
        });
    }

};

module.exports = helpers;