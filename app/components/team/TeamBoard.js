var React = require('react'),
    Nav = require('./../nav'),
    TeamModals = require('./TeamModals'),
    TeamRow = require('./TeamRow'),
    Modal = require('react-materialize').Modal; // Modal component from react-materialize;

var TeamBoard = React.createClass({
    getInitialState: function() {
        return {
            team_name: '',
            team_desc: '',
            team_members: [],
            admin_members: [],
            addUserName: '',
            addTeam: '',
            deleteTeam: '',
            removeMember: '',
            updateMember: ''
        };
    },
    setParent: function(member) { 
        //
    },
    componentDidUpdate: function(prevProps, prevState){
        // 
    },
    memberRemove: function(member) {
        if(window.confirm("Do you really want to remove " + member + " from the team?")){
            console.log(member);
        };
    },
    componentDidMount: function() {
        //
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
                                
                                <TeamRow memberRemove={this.memberRemove}/>

                            </div>
                        </div>
                    </div>
                </main>

            </div>
        )
    }
});

module.exports = TeamBoard;