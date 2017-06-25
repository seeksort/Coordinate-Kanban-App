var React = require('react'),
    helpers = require('./utils/helpers'),
    withRouter = require('react-router').withRouter;

var Nav = withRouter(React.createClass({
    componentDidMount: function() {
        $(".button-collapse").sideNav();
        $('.dropdown-button').dropdown();
    },

    handleSignOut: function() {
        helpers.logout().then(function(data){
            if (data) {
                this.props.router.replace('/login');
            }
        }.bind(this));
    },

    render: function(){
        return (
            <div>

                {/* Dropdowns */} 
                <ul id="dropdown-projects" className="dropdown-content">
                    <li><a href="#">Project One</a></li>
                    <li><a href="#">Project Two</a></li>
                    <li className="divider"></li>
                    <li><a href="#"><i className="tiny material-icons">add</i>Create Project...</a></li>
                </ul>
                <ul id="dropdown-notifications" className="dropdown-content">
                    <li><a>No recent notifications</a></li>
                </ul>
                <ul id="dropdown-profile" className="dropdown-content">
                    <li><a href="" onClick={this.handleSignOut}>Sign Out</a></li>
                </ul>
                {/* Nav */}
                <div className="nav-fixed">
                    <nav>
                        <div className="nav-wrapper">
                            {/* Normal Nav */} 
                            <a href="#/team" className="brand-logo center">Get It Together</a>
                            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>

                            {/* Top Right Nav */} 
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li>
                                    <a href="#/team"><i className="material-icons tooltipped" data-position="bottom" data-delay="50" data-tooltip="Team">people</i></a>
                                </li>
                                <li>
                                    <a href="#/projects" className="dropdown-button" data-activates="dropdown-projects" data-beloworigin="true" data-hover="true"><i className="material-icons">developer_board</i></a>
                                </li>
                                <li>
                                    <a href="#" className="dropdown-button" data-activates="dropdown-notifications" data-beloworigin="true" data-hover="true"><i className="material-icons">notifications</i></a>
                                </li>
                                <li>
                                    <a href="#/board" className="dropdown-button" data-activates="dropdown-profile" data-beloworigin="true" data-hover="true"><i className="material-icons">person_pin</i></a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Side Nav */} 
                    {/* side nav must be outside of nav tag to coexist w/ fixed nav. */}
                    <ul className="side-nav collapsible" id="mobile-demo">
                        <li>
                            <div className="collapsible-header"><a href="#/team"><i className="tiny material-icons">people</i>Team</a></div>
                        </li>
                        <li>
                            <div className="collapsible-header"><a href="#" className="secondary-content"><i className="tiny material-icons">expand_more</i></a><a href="#/projects"><i className="tiny material-icons">developer_board</i>Projects</a></div>
                            <div className="collapsible-body">
                                <ul>
                                    <li><a href="#">Project One</a></li>
                                    <li><a href="#">Project Two</a></li>
                                    <li><a href="#"><i className="tiny material-icons">add</i>Create Project...</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header"><a href="#" className="secondary-content"><i className="tiny material-icons">expand_more</i></a><a href="#"><i className="tiny material-icons">notifications</i>Notifications</a></div>
                            <div className="collapsible-body">
                                <ul>
                                    <li><a>No recent notifications</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="" onClick={this.handleSignOut}>Sign Out</a>
                        </li>
                    </ul>
                </div>

                {/*<div>{this.props.children}</div>*/}

            </div>

        );
    }
}));

module.exports = Nav;