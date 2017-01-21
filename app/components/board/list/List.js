var React = require('react'),
    TaskModal = require('./task/TaskModal');

var List = React.createClass({
    render: function() {
        return(

            <div className="list grid-item">
            {/* List */}
                <div className="task-title">
                    <div className="task-title-text">
                        <h5>This is a test list</h5></div>
                    <div className="task-title-icon"><i className="material-icons">more_horiz</i></div>
                </div>
                <div className="task-group">
                    
                    <TaskModal />


                    <div className="task-ind add-new-card">
                    {/* Add New Card */}
                        <a href="#">
                            <span className="task-name">Add new card...</span>
                        </a>
                    </div>

                </div>
            </div>

        )
    }
});

module.exports = List;