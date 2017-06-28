var React = require('react'),
    moment = require('moment'),
    TaskModalActivity = require('./TaskModalActivity'),
    TaskModalMembers = require('./TaskModalMembers'),
    Modal = require('react-materialize').Modal,
    helpers = require('./../../../utils/helpers');

Modal.defaultProps = {
    actions: false
};

var TaskModal = React.createClass({
    getInitialState: function() {
        return {
            users: this.props.users,
            assigned: this.props.assigned,
            comments: [],
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
            closeOnSelect: true,
            selectYears: true,
            selectMonths: true,
            onSet: function(event) {
                var val = new Date(event.select);
                this.setState({
                    due_date: val,
                    param: 'edit-due-date'
                });
            }.bind(this),
            onClose: function() {
                this.handleSubmit()
            }.bind(this)
        });
        this.evalDateColor();
    },

    componentDidUpdate: function(prevProps, prevState) {
        $('.datepicker').pickadate({
            formatSubmit: 'yyyy/mm/dd',
            closeOnSelect: true,
            onSet: function(event) {
                var val = new Date(event.select);
                this.setState({
                    due_date: val,
                    param: 'edit-due-date'
                });
                this.handleSubmit()
            }.bind(this),
            onClose: function() {
                this.handleSubmit()
            }.bind(this)
        });
        this.evalDateColor();
    },

    evalDate: function() {
        if (this.state.due_date !== undefined) {
            return moment(this.state.due_date).format("MMM D");
        }
    },

    evalDateColor: function() {
        if ((this.state.due_date !== undefined) && (moment(this.state.due_date).valueOf()) <= (Date.now())){
            var findId = ("text" + this.props.listIndex + this.props.taskIndex)
            document.getElementById(findId).style.backgroundColor = "#CC4343";
        }
    },

    renderMembers: function() {
        return this.state.users.map(function(currentMember,index){
            return (
                <TaskModalMembers 
                    key={index} 
                    id={currentMember.id}
                    value={currentMember.user_name}
                    user_name={currentMember.user_name}
                />
            )
        });
    },

    renderComments: function() {
        return this.props.comments.map(function(currentComment,index){
            return (
                <TaskModalActivity 
                    key={index}
                    id={"list-"+index}
                    commentDate={currentComment.comment_date}
                    text={currentComment.text}
                    userID={currentComment.userID}
                />
            )
        });
    },

    renderAssigned: function(){
        var str = '';
        if (this.state.assigned !== undefined) {
            this.state.assigned.map(function(curr, i) {
                if (curr.username!== undefined) {
                    str += curr.username + ', ';                
                }
            });
        } 
        return str.slice(0, -2);
    },

    handleChange: function(event){
        var newState = {};
        newState[event.target.dataset.state] = event.target.value;
        // this.setState(newState);
        // var newState = {};
        newState["param"] = event.target.dataset.param;
        this.setState(newState);
        // if (event.target.dataset.state === "task_name" ||
        //     event.target.dataset.state === "due_date" ||
        //     event.target.dataset.state === "desc") {

        // }
    },

    handleSubmit: function(event = 0){
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
            case "desc":
                apiParam = "desc";
                break;
            case "assign-member":
                apiParam = "assignmember";
                break;
            default:
                break;
        }
        helpers.updateTask(this.props.taskid, apiParam, this.state)
        .then(helpers.getProject("bake-some-pies").then(function(data){
            $('.modal').modal('close');
            this.props.setParent(data.lists);
        }.bind(this)));
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
                                <div className="due-date-text" id={"text" + this.props.listIndex + this.props.taskIndex}>
                                    {this.props.due_date !== undefined && <i className="material-icons">schedule</i>}{this.evalDate.call(this)}
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
                            className="validate" 
                            type="text"
                            data-state="task_name"
                            data-param="task-update"
                            value={this.state.task_name}
                            onChange={this.handleChange}
                            onBlur={this.handleSubmit}
                        /></p>
                    </div>
                </div>
                <div className="task-modal-content">
                    <div className="task-modal-content-details">
                        <div className="row">
                            <div className="task-modal-ppl-date col s6">
                                <p className="modal-heading-second">Assigned:</p>
                                <p className="assigned-member">{this.renderAssigned.call(this) || '-- No one assigned --'}</p>
                                <p className="modal-heading-second">Assign a member...</p>
                                <div className="input-field col s12">
                                    <form onSubmit={this.handleSubmit}>
                                        <select 
                                            className="browser-default" 
                                            data-state="user_name"
                                            data-param="assign-member" 
                                            value={this.state.user_name}
                                            onChange={this.handleChange}
                                        >
                                            <option value=""></option>
                                            {this.renderMembers.call(this)}
                                        </select>
                                        <input type="submit" value="Submit" />
                                    </form>
                                </div>
                            </div>
                            <div className="task-modal-ppl-date col s6">
                                <p className="modal-heading-second">Due Date:</p>
                                <input 
                                    type="date" 
                                    className="datepicker"
                                    data-state="due_date"
                                    data-param="task-update"
                                    data-value={this.state.due_date === undefined ? moment().format("YYYY/MM/DD") : moment(this.state.due_date).format("YYYY/MM/DD")}
                                    onChange={this.handleDateChange}
                                />
                            </div>
                        </div>
                        <div className="task-modal-description">
                            <p className="modal-heading-second">Description</p>
                            <p className="modal-description">
                                <input 
                                    className="validate" 
                                    type="text"
                                    data-state="desc"
                                    data-param="desc"
                                    value={this.state.desc}
                                    onChange={this.handleChange}
                                    onBlur={this.handleSubmit}
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