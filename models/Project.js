var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  project_name: {
    type: String
  },
  teamID: {
    type: Schema.Types.ObjectId,
    ref: "Team" 
  }
});

var Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
