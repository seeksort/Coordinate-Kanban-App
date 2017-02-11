var React = require('react');

var TaskModalMembers = React.createClass({
    render: function() {
        return(
            <option value={this.props.value}>
                {this.props.user_name}
            </option>
        )
    }
});

module.exports = TaskModalMembers;