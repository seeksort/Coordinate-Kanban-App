var React = require('react'),
    TaskModalActivity = require('./TaskModalActivity'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize

Modal.defaultProps = {
    actions: false
};

var TaskModal = React.createClass({
    componentDidMount: function() {
        // Initialize date picker and set default date
        $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15
        });
        var picker = $('.datepicker').pickadate('picker');
        picker.set('select', [2017, 1, 31]);
    },
    handleClick: function() {
        return {}
    },
    handleClose: function() {
        return {}
    },

    render: function() {
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
                <div className="task-modal-title-div">
                <i className="material-icons right modal-close">close</i>
                    <div className="task-modal-title-details">
                        <p><span className="task-modal-title">Write and test this modal</span></p>
                        <p>in list <span className="task-modal-list">This is a test list</span></p>
                    </div>
                </div>
                <div className="task-modal-content">
                    <div className="task-modal-content-details">
                        <div className="row">
                            <div className="task-modal-ppl-date col s6">
                                <p className="modal-heading-second">Assigned:</p>
                                <ul>
                                    <li>Goku</li>
                                    <li>Bulma</li>
                                    <li>Mr. Piccolo</li>
                                </ul>
                            </div>
                            <div className="task-modal-ppl-date col s6">
                                <p className="modal-heading-second">Due Date:</p>
                                <input type="date" className="datepicker" />
                            </div>
                        </div>
                        <div className="task-modal-description">
                            <p className="modal-heading-second">Description</p>
                            <p className="modal-description">
                                Make this thing into a minimum viable product.
                            </p>
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

            </Modal>
        )
    }
});

module.exports = TaskModal;