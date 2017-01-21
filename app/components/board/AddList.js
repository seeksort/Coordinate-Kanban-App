var React = require('react');

var AddList = React.createClass({
    
    render: function() {
        return (

            <div>

                <div className="list grid-item add-new-list">
                {/* Add List */}
                    <div className="task-title">
                        <a href="#modal-add-list">
                            <h5>Add a list...</h5>
                        </a>
                    </div>
                </div>


                {/* Modal - Sign Up */}
                <div id="modal-add-list" className="modal">
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
                                        <input id="name" type="text" className="validate" />
                                        <label htmlFor="name">User Name</label>
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

        );
    }
});

module.exports = AddList;