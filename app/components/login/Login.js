var React = require('react'),
    helpers = require('./../utils/helpers'),
    LoginModals = require('./LoginModals'),
    withRouter = require('react-router').withRouter;

var Login = withRouter(React.createClass({
    getInitialState: function() {
        return {
            email: '',
            password: '',
            loggedin: false,
            newEmail: '',
            newUsername: '',
            newPassword: ''
        }
    },

    handleLoginChange: function(event){
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },

    handleLoginSubmit: function(event){
        event.preventDefault();
        helpers.login(this.state.email, this.state.password).then(function(data){
            this.setState({ email:'', password: '', loggedin: data })
            if (this.state.loggedin) {
                console.log('logged in, redirect to team')
                $('.modal').modal('close');
                this.props.router.replace('/board');
            }
            else {
                alert('Incorrect username or password.');
            }
        }.bind(this));
    },

    handleSignupChange: function(event){
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },

    handleSignupSubmit: function(event){
        event.preventDefault();
        helpers.userSignup(this.state.newUsername, this.state.newEmail, this.state.newPassword).then(function(data){
            console.log(data)
            this.setState({ newEmail:'', newUsername: '', newPassword: '' })
            if (data === true) {
                alert('You have been registered!')
                $('.modal').modal('close');
            }
        }.bind(this));
    },


    render: function(){
        return (
            
            <div id="home-page">

                {/* Home */}
                    <main className="container">
                        <div className="row">
                            <div id="welcome-div" className="col s12">
                                <h1>Get It Together</h1>
                                <h5>Kanban dashboards that help teams flow.</h5>
                                <br />

                                <LoginModals 
                                    email={this.state.email}
                                    password={this.state.password}
                                    handleLoginChange={this.handleLoginChange}
                                    handleLoginSubmit={this.handleLoginSubmit}
                                    newEmail={this.state.newEmail}
                                    newUsername={this.state.newUsername}
                                    newPassword={this.state.newPassword}
                                    handleSignupChange={this.handleSignupChange}
                                    handleSignupSubmit={this.handleSignupSubmit}
                                />
                                
                            </div>
                        </div>
                    </main>

                {/* Footer */}
                    <footer className="home-page-footer">
                        <div className="">
                            <div className="container">
                            Final Project for the Coding Bootcamp at UT Austin. © 2017 Kristin Faner
                            </div>
                          </div>
                    </footer>   

            </div>

        )
    }
}));

module.exports = Login;