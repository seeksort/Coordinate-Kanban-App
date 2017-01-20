var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  team_name: {
    type: String
  },
  admin_users: [
    userID {
      type: Schema.Types.ObjectId,
      ref: "User" 
    },
    userRole: {
      type: String
    }
  ],
  non_admin_users: [
    userID {
      type: Schema.Types.ObjectId,
      ref: "User" 
    },
    userRole: {
      type: String
    }
  ],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "Project" 
  }]
});

var Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
