var mongoose = require('mongoose');


var Schema = mongoose.Schema;


module.exports =  new Schema({
    id: Number,
    switch:String,
	userClick:false,
    nearLight:Number,
    time: Date,
    brightness:Number,
    clickTime:Number,
    type: String,
    colorTemperature:Number,
    color:String
});
