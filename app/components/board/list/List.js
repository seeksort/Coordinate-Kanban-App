var React = require('react'),
    TaskModal = require('./task/TaskModal'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize;

Modal.defaultProps = {
    actions: false
};

var List = React.createClass({
    render: function() {
        return(

            <div className="list grid-item">
            {/* List */}
                <div className="task-title">
                    <div className="task-title-text">
                        <h5>This is a test list</h5>
                    </div>    
                </div>
                <div className="task-group">
                    
                    <TaskModal />


                    <div className="">
                    </div>
                    {/* TODO FIX STYLING */}
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
                                            <input id="list-name" type="text" className="validate" />
                                            <label htmlFor="list-name">Task Title</label>
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