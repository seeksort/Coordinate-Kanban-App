var React = require('react'),
    helpers = require('./../utils/helpers'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize;

Modal.defaultProps = {
    actions: false
};

// var socket = io.connect();

var TeamModals = React.createClass({
    getInitialState: function() {
        return { term: "" };
    },
    componentDidMount: function() {
        //socket.on('add message', this.notification);
    },
    handleSubmit: function(event) {
        // TODO
    },

    render: function() {
        return (
            <div>
                {/* Modal - Add Team Member */}
                <Modal
                    trigger={
                        <a href="#modal1" className="waves-effect waves-light btn" id="add-member-btn">Add Team Member</a>
                    }
                >

                    <div className="modal-content">
                        <h4>Add a Team Member</h4>
                        <div className="row">
                            {/* FORM WITH POST */}
                            <form className="col s12" onSubmit={this.handleSubmit}>
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

                </Modal>

                {/* Modal - Create Team */}
                <Modal
                    trigger={
                        <a href="#modal2" className="waves-effect waves-light btn" id="create-team-btn">Create New Team</a>
                    }
                >

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

                </Modal>

                {/* Modal - Delete Team */}
                <Modal
                    trigger={
                        <a href="#modal3" className="waves-effect waves-light btn delete-team-btn">Delete Team</a>
                    }
                >

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
                </Modal>
            </div>
        )
    }
});
module.exports = TeamModals;