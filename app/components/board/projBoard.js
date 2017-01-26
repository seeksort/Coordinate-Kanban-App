var React = require('react'),
    Nav = require('./../Nav'),
    List = require('./list/List'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize;

Modal.defaultProps = {
    actions: false
};

var ProjBoard = React.createClass({
    componentDidMount: function() {
        if (document.querySelector('#main-script')) {
            var replaceScr = document.querySelector('#main-script');
            replaceScr.remove();
        }
        var script = document.createElement("script");
        script.id = "main-script";
        script.src = "./../public/script.js";
        script.async = true;
        document.body.appendChild(script);
    },

    render: function() {
        return (
            <div>
                
                {/* Nav */}
                <Nav />

                {/* Filter Dropdown */}
                <ul id="dropdown-filters" className="dropdown-content">
                    <li><a href="#!">All Tasks</a></li>
                    <li><a href="#!">My Tasks</a></li>
                    <li><a href="#!">Due Soon</a></li>
                    <li className="divider"></li>
                    <li><a href="#!">Remove Filter</a></li>
                </ul>

                {/* Board */}
                <main>
                    <div className="main-board">

                        {/* Filter */}
                        <div className="proj-buttons-div">
                             <div className="proj-buttons-inner">
                                 <a href="#!" className="dropdown-button" id="filter-icon" data-activates="dropdown-filters" data-beloworigin="true" data-hover="true"><i className="material-icons center">filter_list</i></a>
                             </div>

                            {/* Add a List */}
                             <div className="proj-buttons-inner">
                                <Modal
                                    trigger={
                                        <a href="#modal1" className="tooltipped" data-delay="50" data-tooltip="Add a List"><i className="material-icons center">add</i></a>
                                    }
                                >

                                    <div className="modal-content">
                                        <h4>Add a List</h4>
                                        <div className="row">
                                            {/* FORM WITH POST */}
                                            <form className="col s12" onSubmit={this.handleSubmit}>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <input id="list-name" type="text" className="validate" />
                                                        <label htmlFor="list-name">List Name</label>
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

                        {/* Packery grid settings */}
                        <div className="grid">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>

                            {/* List Component */}
                            <List />

                        </div>
                    </div>
                </main>

            
            </div>
        );
    }
});

module.exports = ProjBoard;