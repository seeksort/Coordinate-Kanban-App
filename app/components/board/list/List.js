var React = require('react'),
    helpers = require('./../../utils/helpers'),
    TaskModal = require('./task/TaskModal'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize;

Modal.defaultProps = {
    actions: false
};

var List = React.createClass({
    getInitialState: function() {
        return {
            taskName: ''
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (prevProps.tasks !== this.props.tasks) {
            console.log(this.props.tasks)
        }
    },

    handleChange: function(event){
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },

    handleSubmit: function(event){
        event.preventDefault();
        // Variables for incomplete app...
        var team = 'regulators';
        var project = 'bake-some-pies';
        $('.modal').modal('close');
        helpers.addTask(this.props.listId, this.state.taskName).then(function(data){
            this.state.taskName = '';
            // Another server call to reload tasks
            helpers.getProject("bake-some-pies").then(function(data){
                this.props.setParent(data.lists);
            }.bind(this))
        }.bind(this));
    },

    renderTasks: function() {
        var listIndex = this.props.listIndex
        var users = this.props.users
        var parentFcn = this.props.setParent
        return this.props.tasks.map(function(currentTask,index){
            return (
                <TaskModal 
                    key={index}
                    id={"list-"+index}
                    taskIndex={index}
                    listIndex={listIndex}
                    taskid={currentTask._id}
                    task_name={currentTask.task_name}
                    description={currentTask.description}
                    assigned={currentTask.assigned}
                    comments={currentTask.comments}
                    due_date={currentTask.due_date}
                    users={users}
                    setParent={parentFcn}
                />
            )
        });
    },

    render: function() {
        return(

            <div className="list grid-item" data-title={this.props.title.toLowerCase()}>
            {/* List */}
                <div className="task-title">
                    <div className="task-title-text">
                        <h5 className="task-title-txt">{this.props.title}</h5>
                    </div>    
                </div>
                <div className="task-group">
                    
                    {this.renderTasks.call(this)}
                    
                    <Modal
                        trigger={
                            <div className="task-ind add-new-card">
                                <a href="#modal-add" data-delay="50" className="task-name add-new-card">Add new card...
                                </a> 
                            </div>
                        }
                    >

                        {/* Add New Task */}
                        <div className="modal-content">
                            <h4>Add a Task</h4>
                            <div className="row">
                                {/* FORM WITH POST */}
                                <form className="col s12" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input 
                                                id="taskName" 
                                                type="text" 
                                                className="validate" 
                                                value={this.state.taskName}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="taskName">Enter task name...</label>
                                        </div>
                                        <div className="col s12 right-align">
                                            <button className="modal-action modal-close waves-effect waves-green btn btn-modal">Save</button>
                                            <a className="modal-action modal-close waves-effect waves-green btn" onClick={$('#modal1').modal('close')}>Cancel</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </Modal>

                </div>
            </div>

        )
    }
});

module.exports = List;