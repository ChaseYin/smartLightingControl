var mongoose = require('mongoose');
var albumSchema = require('../schemas/album');
var passportLocalMongoose = require("passport-local-mongoose");

// lighterSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('album',albumSchema);