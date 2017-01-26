var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ListSchema = new Schema({
  list_name: {
    type: String
  },
  projectID: {
    type: Schema.Types.ObjectId,
    ref: "Project" 
  }
});

var List = mongoose.model("List", ListSchema);

module.exports = List;
