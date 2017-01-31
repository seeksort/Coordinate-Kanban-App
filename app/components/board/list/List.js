var React = require('react'),
    TaskModal = require('./task/TaskModal'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize;

Modal.defaultProps = {
    actions: false
};

var List = React.createClass({
    componentDidMount: function() {
        console.log(this.props)
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (prevProps.tasks !== this.props.tasks) {
            console.log(this.props.tasks)
        }
    },

    renderTasks: function() {
        return this.props.tasks.map(function(currentTask,index){
            return (
                <TaskModal 
                    key={index}
                    id={"list-"+index}
                    title={currentTask.task_name}
                    description={currentTask.description}
                    assigned={currentTask.assigned}
                    comments={currentTask.comments}
                    dueDate={currentTask.due_date}
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
                                            <input id="task-name" type="text" className="validate" />
                                            <label htmlFor="task-name">Enter task name...</label>
                                        </div>
                                        <div className="col s12 right-align">
                                            <a href="#!" className="modal-action modal-close waves-effect waves-green btn btn-modal">Save</a>
                                            <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Cancel</a>
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