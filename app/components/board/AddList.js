var React = require('react');

var AddList = React.createClass({
    
    render: function() {
        return (

            <div className="list grid-item add-new-list">
            {/* Add List */}
                <div className="task-title">
                    <a href="#!">
                        <h5>Add a list...</h5>
                    </a>
                </div>
            </div>

        );
    }
});

module.exports = AddList;