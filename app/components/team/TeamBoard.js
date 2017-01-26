var React = require('react'),
    Nav = require('./../Nav'),
    TeamModals = require('./TeamModals'),
    TeamRow = require('./TeamRow');

var TeamBoard = React.createClass({
    getInitialState: function() {
        return { team_name: '', team_desc: '', team_members: [], admin_members: [] };
    },
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

                {/* Team Board */}
                <main>
                    <div className="main-board container">
                        <div className="team-options">
                            
                            <TeamModals />

                        </div>

                        <div className="team-page-title">
                            <h4>Super Saiyan Squad</h4>
                            <p className="team-description">A team of warriors seeking the Dragonballs.</p>
                        </div>
                        <div className="team-list-div">
                            <div className="team-list">
                                <div className="team-member-filler"></div>
                                
                                <TeamRow />


                                
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        )
    }
});

module.exports = TeamBoard;