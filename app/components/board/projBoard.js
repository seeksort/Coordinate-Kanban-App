var React = require('react'),
    Nav = require('./../Nav'),
    List = require('./list/List'),
    AddList = require('./AddList');

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
                        <div className="filter-div">
                             <div id="filter-icon-div">
                                 <a href="#!" className="dropdown-button" id="filter-icon" data-activates="dropdown-filters" data-beloworigin="true" data-hover="true"><i className="material-icons center">filter_list</i></a>
                             </div>
                        </div>

                        {/* Packery grid settings */}
                        <div className="grid">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>

                            {/* List Component */}
                            <List />
                            
                            {/* AddList Component */}
                            <AddList />

                        </div>
                    </div>
                </main>

            
            </div>
        );
    }
});

module.exports = ProjBoard;