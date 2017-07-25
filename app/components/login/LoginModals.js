var React = require('react'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize;

Modal.defaultProps = {
    actions: false
};

var LoginModal = React.createClass({
    render: function(){
        return (
            <div>

                {/* Modal - Log In */}
                <Modal
                    trigger={
                        <a href="#modal1" className="waves-effect waves-light btn">Log In</a> 
                    }
                >

                    <div className="modal-content">
                        <i className="material-icons right modal-close">close</i>
                        <h4>Log In</h4>

                        <div className="row">
                            {/* FORM WITH POST */}
                            <form className="col s12" onSubmit={this.props.handleLoginSubmit}>
                                <div className="row">
                                    <div className="col s4">
                                        <h5>Guest Account:</h5>
                                    </div>
                                    <div className="col s8">
                                        <p>Email: guest@wow.com</p>
                                        <p>Password: iamaguest</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <br />
                                    <div className="input-field col s12">
                                        <input 
                                            id="email" 
                                            type="email" 
                                            className="validate" 
                                            value={this.props.email}
                                            onChange={this.props.handleLoginChange}
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input 
                                            id="password"
                                            type="password" 
                                            className="validate" 
                                            value={this.props.password}
                                            onChange={this.props.handleLoginChange}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="col s12 right-align">
                                        <button className="modal-action waves-effect waves-green btn btn-modal" type="submit" name="action">Submit
                                        </button>
                                        
                                        <a className="modal-action modal-close waves-effect waves-green btn" onClick={$('#modal1').modal('close')}>Cancel</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </Modal>



                {/* Modal - Sign Up */}
                <Modal
                    trigger={
                        <a href="#modal2" className="waves-effect waves-light btn">Sign Up</a>
                    }
                >

                    <div className="modal-content">
                        <i className="material-icons right modal-close">close</i>
                        <h4>Sign Up</h4>
                        <div className="row">
                            {/* FORM WITH POST */}
                            <form className="col s12" onSubmit={this.props.handleSignupSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input 
                                            id="newEmail" 
                                            type="email" 
                                            className="validate" 
                                            value={this.props.newEmail}
                                            onChange={this.props.handleSignupChange}
                                        />
                                        <label htmlFor="newEmail">Email</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input 
                                            id="newUsername" 
                                            type="text" 
                                            className="validate" 
                                            value={this.props.newUsername}
                                            onChange={this.props.handleSignupChange}
                                        />
                                        <label htmlFor="newUsername">User Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input 
                                            id="newPassword" 
                                            type="password" 
                                            className="validate" 
                                            value={this.props.newPassword}
                                            onChange={this.props.handleSignupChange}
                                        />
                                        <label htmlFor="newPassword">Password</label>
                                    </div>
                                    <div className="col s12 right-align">
                                        <button className="modal-action waves-effect waves-green btn btn-modal" type="submit" name="action">Sign Up
                                        </button>
                                        <a className="modal-action modal-close waves-effect waves-green btn" onClick={$('#modal1').modal('close')}>Cancel</a>
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

module.exports = LoginModal;