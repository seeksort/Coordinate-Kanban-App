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
            taskName: '',
            tasks: this.props.tasks
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
        helpers.addTask(this.props.listId, this.state.taskName).then(function(data){
            this.state.taskName = '';
            // Another server call to reload tasks
            helpers.getProject("bake-some-pies").then(function(data){
                this.props.setParent(data.lists);
            }.bind(this))
        }.bind(this));
    },

    renderTasks: function() {
        return this.props.tasks.map(function(currentTask,index){
            return (
                <TaskModal 
                    key={index}
                    id={"list-"+index}
                    taskid={currentTask._id}
                    task_name={currentTask.task_name}
                    description={currentTask.description}
                    assigned={currentTask.assigned}
                    comments={currentTask.comments}
                    dueDate={currentTask.due_date || ''}
                />
            )
        });
    },

    render: function() {
        return(

            <div className="list grid-item">
            {/* List */}
                <div className="task-title">
                    <div className="task-title-text">
                        <h5>{this.props.title}</h5>
                    </div>    
                </div>
                <div className="task-group">
                    
                    {this.renderTasks.call(this)}


                    <div className="">
                    </div>
                    
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