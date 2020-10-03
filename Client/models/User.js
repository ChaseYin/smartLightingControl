var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');
var passportLocalMongoose = require("passport-local-mongoose");

usersSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User',usersSchema);