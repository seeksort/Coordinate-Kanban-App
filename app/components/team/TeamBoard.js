var React = require('react'),
    Nav = require('./../Nav'),
    TeamModals = require('./TeamModals');

var TeamBoard = React.createClass({
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
    
    render: function() {
        return (
            <div>

            {/* Nav */}
            <Nav />

            {/* Team Board */}
            <main>
                <div className="main-board container">
                    <div className="team-options">
                        
                        <TeamModals />

                    </div>

                    <div className="team-page-title">
                        <h4>Super Saiyan Squad</h4>
                    </div>
                    <div className="team-list-div">
                        <div className="team-list">
                            <div className="team-member-filler"></div>
                            {/* Team Member */}
                            <div className="team-member-div">
                                <div className="team-member-icon">
                                    <img src="yuna.jpg" />
                                </div>
                                <div className="team-member-info">
                                    <span className="team-member-name">Son Goku</span>
                                    <span className="team-member-title">Senior Developer</span>
                                    <span className="team-member-role">Member</span>
                                </div>
                                <div className="team-member-options right hide-on-med-and-down">
                                    <div>
                                        <label>Change Member Role</label>
                                        <select className="browser-default" defaultValue="1">
                                            <option value="1">Member</option>
                                            <option value="2">Admin</option>
                                          </select>
                                    </div>
                                    <div>
                                        <a className="waves-effect waves-light btn">Remove Member</a>
                                    </div>
                                </div>
                            </div>

                            {/* Team Member */}
                            <div className="team-member-div">
                                <div className="team-member-icon">
                                    <img src="yuna.jpg" />
                                </div>
                                <div className="team-member-info">
                                    <span className="team-member-name">Son Goku</span>
                                    <span className="team-member-title">Senior Developer</span>
                                    <span className="team-member-role">Member</span>
                                </div>
                                <div className="team-member-options right hide-on-med-and-down">
                                    <div>
                                        <label>Change Member Role</label>
                                        <select className="browser-default" defaultValue="2">
                                            <option value="1">Member</option>
                                            <option value="2">Admin</option>
                                          </select>
                                    </div>
                                    <div>
                                        <a className="waves-effect waves-light btn">Remove Member</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal - Add Team Member */}
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Add a Team Member</h4>
                    <div className="row">
                        {/* FORM WITH POST */}
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" type="text" className="validate" />
                                    <label htmlFor="name">Team Member Name</label>
                                </div>
                                <div className="input-field col s12">
                                    <input id="email" type="text" className="validate" />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <input id="job_title" type="text" className="validate" />
                                    <label htmlFor="job_title">Job Title</label>
                                    <p>
                                        <input type="checkbox" className="filled-in" id="filled-in-box" />
                                        <label htmlFor="filled-in-box">Make Admin</label>
                                    </p>
                                    <br />
                                </div>
                                <div className="col s12 right-align">
                                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn btn-modal">Send Invitation Email</a>
                                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Cancel</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal - Create Team */}
            <div id="modal2" className="modal">
                <div className="modal-content">
                    <h4>Create New Team</h4>
                    <div className="row">
                        {/* FORM WITH POST */}
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="team_name" type="text" className="validate" />
                                    <label htmlFor="team_name">Team Name</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="team_description" type="textarea" className="materialize-textarea"></textarea>
                                    <label htmlFor="team_description">Team Description</label>
                                </div>
                                <div className="col s12 right-align">
                                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn btn-modal">Submit</a>
                                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Cancel</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal - Delete Team */}
            <div id="modal3" className="modal">
                <div className="modal-content">
                    <h4>DELETE TEAM</h4>
                    <div className="row">
                        {/* FORM WITH POST */}
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <p>
                                        This action will delete your team and all of your team's boards. This cannot be reversed.
                                    </p>
                                    <span id="delete-team-confirm">Are you sure you want to delete your team?</span>
                                </div>
                                <div className="input-field col s12">
                                    Type "Yes" to confirm:
                                    <div className="input-field inline">
                                        <input id="delete-team-resp" type="text" className="validate" />
                                        <label htmlFor="delete-team-resp">Input</label>
                                    </div>
                                </div>
                                <div className="col s12 right-align">
                                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn delete-team-btn">Delete Team</a>
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

module.exports = TeamBoard;