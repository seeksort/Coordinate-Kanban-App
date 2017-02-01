var React = require('react'),
    moment = require('moment'),
    TaskModalActivity = require('./TaskModalActivity'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize

Modal.defaultProps = {
    actions: false
};

var TaskModal = React.createClass({
    componentDidMount: function() {
        // Initialize date picker and set default date
        $('.datepicker').pickadate({});
        var picker = $('.datepicker').pickadate('picker');
        if (this.props.due_date !== '') {
            var year = parseInt(moment(this.props.due_date).format("YYYY"))
            var month = parseInt(moment(this.props.due_date).format("M"))
            var day = parseInt(moment(this.props.due_date).format("D"))
            picker.set('select', [year, month, day]);
        }
    },

    componentDidUpdate: function() {
        // Initialize date picker and set default date
        $('.datepicker').pickadate({});
        var picker = $('.datepicker').pickadate('picker');
        if (this.props.due_date !== '') {
            var year = parseInt(moment(this.props.due_date).format("YYYY"))
            var month = parseInt(moment(this.props.due_date).format("M"))
            var day = parseInt(moment(this.props.due_date).format("D"))
            picker.set('select', [year, month, day]);
        }
    },

    evalDate: function() {
        if (this.props.dueDate !== '') {
            return moment(this.props.dueDate).format("MMM D") 
        }
        else {
            return ''
        }
    },

    renderAssigned: function() {
        return this.props.assigned.map(function(currentMember,index){
            return (<li>{currentMember}</li>)
        });
    },

    renderComments: function() {
        return this.props.comments.map(function(currentComment,index){
            return (
                <TaskModalActivity 
                    key={index}
                    id={"list-"+index}
                    commentDate={currentComment.commentDate}
                    text={currentComment.text}
                    userID={currentComment.userID}
                />
            )
        });
    },

    render: function() {
        return(
            <Modal
                trigger = {
                    <div className="task-ind">
                    {/* Indiv Card */}
                        <a href="#modal1">
                            <span className="task-name">{this.props.title}</span>
                            <div className="due-date-div">
                                <div className="due-date-text">
                                    <i className="material-icons">schedule</i>{this.evalDate.call(this)}
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
                        <p><span className="task-modal-title">{this.props.title}</span></p>
                    </div>
                </div>
                <div className="task-modal-content">
                    <div className="task-modal-content-details">
                        <div className="row">
                            <div className="task-modal-ppl-date col s6">
                                <p className="modal-heading-second">Assigned:</p>
                                <ul>
                                    <li>Team Member</li>
                                    <li>Team Member</li>
                                    {this.renderAssigned.call(this)}

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
                                {this.props.description}
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
                        
                        {this.renderComments.call(this)}

                    </div>
                </div>

            </Modal>
        )
    }
});

module.exports = TaskModal;