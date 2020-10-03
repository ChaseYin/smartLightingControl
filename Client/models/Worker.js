var mongoose = require('mongoose');
var workerSchema = require('../schemas/workers');
module.exports = mongoose.model('Worker',workerSchema);