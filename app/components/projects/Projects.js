var React = require('react'),
    Nav = require('./../Nav'),
    ProjTeamTitle = require('./ProjTeamTitle'),
    ProjDescriptions = require('./ProjDescriptions');

var Projects = React.createClass({
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


            <main>
                {/* Board */}
                <div className="main-board" id="projects-page">
                    {/* Packery grid settings */}
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

                    {/* New Project */}
                    <div>
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
                    </div>
                </div>
            </main>

            </div>
        );
    }
});

module.exports = Projects;