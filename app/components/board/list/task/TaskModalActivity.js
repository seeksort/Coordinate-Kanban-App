var React = require('react'),
    moment = require('moment');

var TaskModalActivity = React.createClass({
    render: function() {
        return(
            <div className="activity-line">
                <span className="comment-user-pic team-member-icon"><img src="yuna.jpg" /></span>
                <div className="comment-details">
                    <p>
                    {this.props.text}
                    </p>
                    <span></span>
                    <span className="notif-time">{moment(this.props.commentDate, 'dddd, MMMM Do YYYY, h:mm:ss a').fromNow()}</span>
                </div>
            </div>
        )
    }
});

module.exports = TaskModalActivity;