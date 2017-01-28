var React = require('react'),
    LoginModals = require('./LoginModals');

var Login = React.createClass({
    componentDidMount: function() {
        function onSignIn(googleUser) {
            // Useful data for your client-side scripts:
            var profile = googleUser.getBasicProfile();
            console.log("ID: " + profile.getId()); // Don't send this directly to your server!
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log("Image URL: " + profile.getImageUrl());
            console.log("Email: " + profile.getEmail());

            // The ID token you need to pass to your backend:
            var id_token = googleUser.getAuthResponse().id_token;
            console.log("ID Token: " + id_token);
        };
    },

    render: function(){
        return (
            
            <div id="home-page">

                {/* Home */}
                    <main className="container">
                        <div className="row">
                            <div id="welcome-div" className="col s12">
                                <h1>Co-ord-in-ate!</h1>
                                <h5>Kanban dashboards that help teams flow.</h5>
                                <br />

                                <LoginModals />
                                
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
});

module.exports = Login;