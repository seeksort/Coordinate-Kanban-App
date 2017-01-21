var React = require('react'),
    LoginModals = require('./LoginModals');

var Login = React.createClass({
    componentDidMount: function() {
        if (document.querySelector('#main-script')) {
            var replaceScr = document.querySelector('#main-script');
            replaceScr.remove();
        }
        var script = document.createElement("script");
        script.id = "main-script";
        script.src = "./../public/script.js";
        script.async = true;
        document.body.appendChild(script);
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