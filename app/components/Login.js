var React = require('react');

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
                                <a href="#modal1" className="waves-effect waves-light btn">Log In</a>
                                <a href="#modal2" className="waves-effect waves-light btn">Sign Up</a>
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

                {/* Modal - Log In */}
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <h4>Log In</h4>
                            <div className="row center-align">
                                <div className="col s12 g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                                <a href="#modal2" className="waves-effect waves-light btn btn-modal">Placeholder Google Sign In</a>
                            </div>
                            <div className="row">
                                {/* FORM WITH POST */}
                                <form className="col s12">
                                    <div className="row">
                                        <hr />
                                        <p style={{"textAlign": "center"}}>Or sign in with email:</p>
                                        <div className="input-field col s12">
                                            <input id="email" type="email" className="validate" />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input id="password" type="password" className="validate" />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col s12 right-align">
                                            <button className="modal-action waves-effect waves-green btn btn-modal" type="submit" name="action">Submit
                                            </button>
                                            
                                            <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Cancel</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                {/* Modal - Sign Up */}
                    <div id="modal2" className="modal">
                        <div className="modal-content">
                            <h4>Sign Up</h4>
                            <div className="row">
                                {/* FORM WITH POST */}
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="email" type="email" className="validate" />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input id="password" type="password" className="validate" />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col s12 right-align">
                                            <button className="modal-action waves-effect waves-green btn btn-modal" type="submit" name="action">Send Invite Email
                                            </button>
                                            <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Cancel</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>               

            </div>

        )
    }
});

module.exports = Login;