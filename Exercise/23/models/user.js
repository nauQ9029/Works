const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  amdin: {
    type: Boolean,
    default: false,
  },
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
