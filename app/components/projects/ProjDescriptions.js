var React = require('react');

var ProjDescriptions = React.createClass({
    render: function() {
        return (
            <div className="list grid-item project-snapshot">
                <div className="task-title">
                    <a href="#!"><h5>Project 1</h5>
                    <p>Total Tasks: <span>54</span><br />
                    Tasks Due: <span>3</span></p></a>
                </div>
            </div>
        )
    }
});

module.exports = ProjDescriptions;