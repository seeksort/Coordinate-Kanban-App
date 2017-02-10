var React = require('react'),
    moment = require('moment'),
    TaskModalActivity = require('./TaskModalActivity'),
    Modal = require('react-materialize').Modal,
    helpers = require('./../../../utils/helpers');

Modal.defaultProps = {
    actions: false
};

var TaskModal = React.createClass({
    getInitialState: function() {
        return {
            comments: [],
            // task_name: this.props.task_name,
            due_date: this.props.due_date,
            user_name: '',
            task_name: this.props.task_name,
            comment: '',
            desc: this.props.description,
            param: ''
        }
    },

    componentDidMount: function() {
        var comp = this;
        // Initialize date picker and set default date
        $('.datepicker').pickadate({
            formatSubmit: 'yyyy/mm/dd',
            onSet: function(event) {
                var val = $(this).get('select', 'yyyy-mm-dd');
                this.setState({value: val});
                this.handleDateChange({target: {due_date: this.state.value}});
            }.bind(this)
        });
    },

    componentDidUpdate: function() {
        $('.datepicker').pickadate({
            formatSubmit: 'yyyy/mm/dd',
        });
    },

    evalDate: function() {
        if (this.state.due_date !== undefined) {
            return moment(this.state.due_date).format("MMM D");
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

    handleChange: function(event){
        var newState = {};
        newState[event.target.dataset.state] = event.target.value;
        this.setState(newState);
        var newState = {};
        newState["param"] = event.target.dataset.param;
        this.setState(newState);
    },

    handleDateChange: function(event){
        this.setState({due_date: event.target.value})
    },


    handleSubmit: function(event = 0){
        console.log(this.state.param)
        if (event !== 0) {
            event.preventDefault();        
        }
        var apiParam = ""
        switch (this.state.param) {
            case "add-comment":
                apiParam = "addcomment";
                break;
            case "task-update":
                apiParam = "taskupdate";
                break;
            case "edit-due-date":
                apiParam = "duedate";
                break;
            default:
                break;
        }
        console.log(apiParam)
        console.log(this.state)
        helpers.updateTask(this.props.taskid, apiParam, this.state);
        var newState = {
            comments: [],
            user_name: '',
            comment: ''
        }
        this.setState(newState);
    },

    render: function() {
        return(
            <Modal
                trigger = {
                    <div className="task-ind">
                    {/* Indiv Card */}
                        <a href={"#modal" + this.props.listIndex + this.props.taskIndex}>
                            <span className="task-name">{this.state.task_name}</span>
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
                        <p><input 
                            className="validate task-modal-title" 
                            type="text"
                            data-state="task_name"
                            data-param="task-update"
                            value={this.state.task_name}
                            onChange={this.handleChange}
                            onInput={this.handleSubmit}
                        /></p>
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
                                <input 
                                    type="date" 
                                    className="datepicker"
                                    data-state="due_date"
                                    data-param="task-update"
                                    data-value={this.state.due_date !== undefined && moment(this.state.due_date).format("YYYY/MM/DD")}
                                    onChange={this.handleDateChange}
                                    onInput={this.handleSubmit}
                                />
                            </div>
                        </div>
                        <div className="task-modal-description">
                            <p className="modal-heading-second">Description</p>
                            <p className="modal-description">
                                <input 
                                    className="validate task-modal-title" 
                                    type="text"
                                    data-state="desc"
                                    data-param="edit-due-date"
                                    value={this.state.desc}
                                    onChange={this.handleChange}
                                    onInput={this.handleSubmit}
                                />
                            </p>
                        </div>
                    </div>
                    <div className="task-modal-comment">
                        <div className="modal-heading-first comment-title">Add Comment</div>
                        {/* FORM WITH POST */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="comment-user-div">
                                <div className="comment-user-pic team-member-icon"><img src="yuna.jpg" /></div>
                                <div className="comment-box-div">
                                    <textarea 
                                        className="materialize-textarea"
                                        data-state="comment"
                                        data-param="add-comment"
                                        value={this.state.comment}
                                        onChange={this.handleChange}
                                    ></textarea>
                                <button className="waves-effect waves-light btn">Submit</button>
                                </div>
                            </div>
                        </form>
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