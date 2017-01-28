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
                        <div className="row center-align">
                        {/* TODO - Configure Log In */}
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
              
                </Modal>

            </div>
        )
    }
});

module.exports = LoginModal;