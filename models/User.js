var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});

// Plugin to incorporate Passport-Local Mongoose into schema
UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

var User = mongoose.model("User", UserSchema);

module.exports = User;