var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  task_name: {
    type: String
  },
  description: {
    type: String,
    default: ""
  },
  assigned: [
    {
      type: Schema.Types.ObjectId,
      ref: "User" 
    }
  ],
  comments: [
    {userID: {
      type: Schema.Types.ObjectId,
      ref: "User" 
    },
    text: {
      type: String
    },
    comment_date: { 
      type: String
    }},
  ],
  due_date: { 
    type: Date
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: "List" 
  }
});

var Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
