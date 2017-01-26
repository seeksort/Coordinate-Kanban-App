var React = require('react'),
    TaskModalActivity = require('./TaskModalActivity'),
    GithubPicker = require('react-color').GithubPicker,
    Modal = require('react-materialize').Modal; // Modal component from react-materialize

Modal.defaultProps = {
    actions: false
};

var TaskModal = React.createClass({
    getInitialState: function() {
        return {
            displayColorPicker: false,
            
        }
    },
    handleClick: function() {
        this.setState({displayColorPicker: !this.displayColorPicker});
    },
    handleClose: function() {
        this.setState({ displayColorPicker: false });
    },

    render: function() {
        var popover = {
            position: 'absolute',
            right: '5px',
            zIndex: '2'
        }
        var cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        }
        return(
            <Modal
                trigger = {
                    <div className="task-ind">
                    {/* Indiv Card */}
                        <a href="#modal1">
                            <span className="task-name">Write and test this modal</span>
                            <div className="due-date-div">
                                <div className="due-date-text">
                                    <i className="material-icons">schedule</i>Jan 14
                                </div>
                            </div>
                        </a>
                    </div>
                }
            >
            {/* Modal - Task Modal */}
                <div className="modal-content">
                    <div className="task-modal-title-div">
                        <div className="task-modal-title-details">
                            <p><span className="task-modal-title">Write and test this modal</span></p>
                            <p>in list <span className="task-modal-list">This is a test list</span></p>
                        </div>
                    </div>
                    <div className="task-modal-sidebar right">
                        <div className="modal-heading-first">Add</div>
                        <div>
                            <a className="waves-effect waves-light btn" onClick={this.handleClick}>Tags</a>
                            { this.state.displayColorPicker ? <div style={ popover }>
                              <div style={ cover } onClick={ this.handleClose }/>
                              <GithubPicker
                                width='138px'
                               />
                            </div> : null }
                        </div>
                        <a className="waves-effect waves-light btn">Due Date</a>
                    </div>
                    <div className="task-modal-content">
                        <div className="task-modal-content-details">
                            <div className="task-modal-tags-div">
                                <p className="modal-heading-second">Tags:</p>
                                <div className="task-modal-tag" style={{"backgroundColor": "blue"}}></div>
                                <div className="task-modal-tag" style={{"backgroundColor": "red"}}></div>
                            </div>
                            <div className="task-modal-description">
                                <p className="modal-heading-second">Description</p>
                            </div>
                        </div>
                        <div className="task-modal-comment">
                            <div className="modal-heading-first comment-title">Add Comment</div>
                            <div className="comment-user-div">
                                <span className="comment-user-pic team-member-icon"><img src="yuna.jpg" /></span>
                                <div className="comment-box-div">
                                    <textarea id="textarea1" cols="45"></textarea>
                                <a href="" className="waves-effect waves-light btn">Submit</a>
                                </div>
                            </div>
                        </div>
                        <div className="task-modal-activity">
                            <div className="modal-heading-first activity-title">Comments</div>
                            
                            <TaskModalActivity />

                            <TaskModalActivity />

                        </div>
                    </div>
                </div>

            </Modal>
        )
    }
});

module.exports = TaskModal;