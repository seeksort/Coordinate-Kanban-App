var React = require('react');

var TaskModal = React.createClass({
    render: function() {
        return(
            <div id="modal1" className="modal task-modal">
            {/* Modal - Task Modal */}
                <div className="modal-content">
                    <div className="task-modal-title-div">
                        <i className="material-icons right close-modal">close</i>
                        <div className="task-modal-title-details">
                            <p><span className="task-modal-title">Write and test this modal</span></p>
                            <p>in list <span className="task-modal-list">This is a test list</span></p>
                        </div>
                    </div>
                    <div className="task-modal-sidebar right">
                        <div className="modal-heading-first">Add</div>
                        <a href="#modal1" className="waves-effect waves-light btn">Tags</a>
                        <a href="#modal1" className="waves-effect waves-light btn">Due Date</a>
                    </div>
                    <div className="task-modal-content">
                        <div className="task-modal-content-details">
                            <div className="task-modal-tags-div">
                                <p className="modal-heading-second">Tags:</p>
                                <div className="task-modal-tag" style={{"backgroundColor": "blue"}}></div>
                                <div className="task-modal-tag" style={{"backgroundColor": "red"}}></div>
                            </div>
                            <div className="task-modal-description">
                                <p className="modal-heading-second">Description</p>
                            </div>
                        </div>
                        <div className="task-modal-comment">
                            <div className="modal-heading-first comment-title">Add Comment</div>
                            <div className="comment-user-div">
                                <span className="comment-user-pic team-member-icon"><img src="yuna.jpg" /></span>
                                <div className="comment-box-div">
                                    <textarea id="textarea1" cols="45"></textarea>
                                <a href="#modal1" className="waves-effect waves-light btn">Submit</a>
                                </div>
                            </div>
                        </div>
                        <div className="task-modal-activity">
                            <div className="modal-heading-first activity-title">Comments</div>
                            <div className="activity-line">
                                <span className="comment-user-pic team-member-icon"><img src="yuna.jpg" /></span>
                                <div className="comment-details">
                                    <p>
                                    Artificial amateurs, aren't at all amazing
                                    Analytically, I assault, animate things
                                    Broken barriers bounded by the bomb beat
                                    Buildings are broken, basically I'm bombarding
                                    Casually create catastrophes, casualties
                                    Canceling cats got their canopies collapsing
                                    Detonate a dime of dank daily doing dough
                                    Demonstrations, Don Dada on the down low
                                    </p>
                                    <span className="notif-time">12 hours ago</span>
                                </div>
                            </div>
                            <div className="activity-line">
                                <span className="comment-user-pic team-member-icon"><img src="yuna.jpg" /></span>
                                <div className="comment-details">
                                    <p>first</p>
                                    <span className="notif-time">a week ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
});

module.exports = TaskModal;