var React = require('react'),
    Nav = require('./../nav'),
    ProjTeamTitle = require('./ProjTeamTitle'),
    ProjDescriptions = require('./ProjDescriptions'),
    Modal = require('react-materialize').Modal;

var Projects = React.createClass({
    componentDidMount: function() {
        var grids = document.querySelectorAll('.grid');

        // Packery intitialize for each grid on page
        grids.forEach(function(current, index) {
            var elem = document.querySelector('.grid-' + index);
            var pckry = new Packery(elem, {
                // options
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer',
                itemSelector: '.grid-item',
                percentPosition: true,
                fitWidth: false
            });
            // Packery + Draggabilly
            // Drag Lists
            pckry.getItemElements().forEach(function(itemElem) {
                var draggie = new Draggabilly(itemElem);
                pckry.bindDraggabillyEvents(draggie);
            });   

        });
    },

    render: function() {
        return (
            <div>

            {/* Nav */}
            <Nav />


            <main>
                {/* Board */}
                <div className="main-board" id="projects-page">
                    {/* Packery grid settings */}

                    {/* New Project */}
                    <Modal
                        trigger = {
                            <div className="grid grid-0">
                                <div className="gutter-sizer"></div>
                                <div className="grid-sizer"></div>
                                {/* Projects */}
                                <br />
                                <div className="grid-item create-proj">
                                    <div className="task-title">
                                        <h5><a href="#!"><i className="material-icons">add</i>Create Project...</a></h5>
                                    </div>
                                </div>
                            </div>
                        }
                    >

                        <div className="modal-content">
                            <h4>Create New Project</h4>
                            <div className="row">
                                {/* FORM WITH POST */}
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="team_name" type="text" className="validate" />
                                            <label htmlFor="team_name">Project Name</label>
                                        </div>
                                    
                                        <div className="input-field col s12">
                                            <p>Team:</p>
                                            <p>
                                                <input className="with-gap" name="group1" type="radio" id="test1"  />
                                                <label htmlFor="test1">Personal</label>
                                            </p>
                                            <p>
                                                <input className="with-gap" name="group1" type="radio" id="test2"  />
                                                <label htmlFor="test2">Super Saiyan Squad</label>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 right-align">
                                            <a href="#!" className="modal-action modal-close waves-effect waves-green btn btn-modal">Submit</a>
                                            <a href="#!" className="modal-action modal-close waves-effect waves-green btn">Cancel</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>

                    {/* Personal Projects */}
                    <div>
                        
                        {/* Team Title */}
                        <ProjTeamTitle />

                        <div className="grid grid-1">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>
                            {/* Projects */}
                            
                            <ProjDescriptions />

                            <ProjDescriptions />
                           
                        </div>
                    </div>

                    {/* Team Projects */}
                    <div>
                        {/* Team Title */}
                        <ProjTeamTitle />

                        <div className="grid grid-2">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>
                            {/* Projects */}
                            
                            <ProjDescriptions />

                            <ProjDescriptions />

                            <ProjDescriptions />

                            <ProjDescriptions />

                            <ProjDescriptions />

                        </div>
                    </div>

                    {/* Team Projects */}
                    <div>
                        {/* Team Title */}
                        <ProjTeamTitle />

                        <div className="grid grid-3">
                            <div className="gutter-sizer"></div>
                            <div className="grid-sizer"></div>
                            {/* Projects */}
                            
                            <ProjDescriptions />

                        </div>
                    </div>

                </div>
            </main>

            </div>
        );
    }
});

module.exports = Projects;