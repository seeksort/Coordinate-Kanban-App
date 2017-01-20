var React = require('react'),
    Nav = require('./../nav');

var ProjBoard = React.createClass({
    
    componentDidMount: function() {
        var script = document.createElement("script");

        script.src = "./../public/script.js";
        script.async = true;

        document.body.appendChild(script);
    },

    render: function() {
        return (

            <div>
                
                {/* Render Nav */}
                <Nav />

                {/* Render Board */}
                <main>
                    {/* Board */}
                    <div className="main-board">
                        {/* Filter */}
                        <div className="filter-div">
                             <div id="filter-icon-div">
                                 <a href="#!" className="dropdown-button" id="filter-icon" data-activates="dropdown-filters" data-beloworigin="true" data-hover="true"><i className="material-icons center">filter_list</i></a>
                             </div>
                        </div>
                        {/* Packery grid settings */}
                        <div className="grid">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>
                            {/* List */}
                            <div className="list grid-item">
                                <div className="task-title">
                                    <div className="task-title-text">
                                        <h5>This is a test list</h5></div>
                                    <div className="task-title-icon"><i className="material-icons">more_horiz</i></div>
                                </div>
                                <div className="task-group">
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#modal1">
                                            <span className="task-name">Write and test this modal</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="tiny material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Add New Card */}
                                    <a href="#">
                                        <div className="task-ind add-new-card">
                                            <span className="task-name">Add new card...</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* Task */}
                            <div className="list grid-item">
                                <div className="task-title">
                                    <div className="task-title-text">
                                        <h5>List!</h5></div>
                                    <div className="task-title-icon"><i className="material-icons">more_horiz</i></div>
                                </div>
                                <div className="task-group">
                                    {/* Indiv Card */}
                                    <a href="#">
                                        <div className="task-ind">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <a className=""><i className="tiny material-icons">schedule</i>Jan 14</a>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    {/* Indiv Card */}
                                    <a href="#">
                                        <div className="task-ind">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <a className=""><i className="tiny material-icons">schedule</i>Jan 14</a>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Add New Card */}
                                    <a href="#">
                                        <div className="task-ind add-new-card">
                                            <span className="task-name">Add new card...</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* Task */}
                            <div className="list grid-item">
                                <div className="task-title">
                                    <div className="task-title-text">
                                        <h5>List!</h5></div>
                                    <div className="task-title-icon"><i className="material-icons">more_horiz</i></div>
                                </div>
                                <div className="task-group">
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Add New Card */}
                                    <a href="#">
                                        <div className="task-ind add-new-card">
                                            <span className="task-name">Add new card...</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* Task */}
                            <div className="list grid-item">
                                <div className="task-title">
                                    <div className="task-title-text">
                                        <h5>List!</h5></div>
                                    <div className="task-title-icon"><i className="material-icons">more_horiz</i></div>
                                </div>
                                <div className="task-group">
                                    {/* Add New Card */}
                                    <a href="#">
                                        <div className="task-ind add-new-card">
                                            <span className="task-name">Add new card...</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* Task */}
                            <div className="list grid-item">
                                <div className="task-title">
                                    <div className="task-title-text">
                                        <h5>List!</h5></div>
                                    <div className="task-title-icon"><i className="material-icons">more_horiz</i></div>
                                </div>
                                <div className="task-group">
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Add New Card */}
                                    <a href="#">
                                        <div className="task-ind add-new-card">
                                            <span className="task-name">Add new card...</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* Task */}
                            <div className="list grid-item">
                                <div className="task-title">
                                    <div className="task-title-text">
                                        <h5>List!</h5></div>
                                    <div className="task-title-icon"><i className="material-icons">more_horiz</i></div>
                                </div>
                                <div className="task-group">
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Indiv Card */}
                                    <div className="task-ind">
                                        <a href="#">
                                            <span className="task-name">Go to the store</span>
                                            <div className="due-date-div">
                                                <div className="due-date-text">
                                                    <i className="material-icons">schedule</i>Jan 14
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* Add New Card */}
                                    <a href="#">
                                        <div className="task-ind add-new-card">
                                            <span className="task-name">Add new card...</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            
                            {/* List */}
                            <div className="list grid-item add-new-list">
                                <div className="task-title"><a href="#!"><h5>Add a list...</h5></a></div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        );
    }
});

module.exports = ProjBoard;