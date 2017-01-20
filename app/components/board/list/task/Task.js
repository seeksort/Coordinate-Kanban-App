var React = require('react'),
    TaskModal = require('./TaskModal');

var Task = React.createClass({
    render: function() {
        return(

            <div>
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
                
                <TaskModal />

            </div>

        )
    }
});

module.exports = Task;