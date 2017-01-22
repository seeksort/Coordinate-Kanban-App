var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  project_name: {
    type: String
  },
  team_name: {
    type: String
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: "List" 
  }]
});

var Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
