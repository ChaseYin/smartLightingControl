var mongoose = require('mongoose');
const validator = require('validator');
var passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;


module.exports =  new Schema({
    country: String,
    first_name: String,
    last_name: String,
    username:{
        type:String,
        unique: true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('The email is not valid! Tested by validator!')
            }
        }
    }, 
    password:String,
    email: {
        type:String,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('The email is not valid! Tested by validator!')
            }
        }
    },    
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    city: String,
    region: String,
    address: String,
    zip_postal_code: String,
    tel: String,
    isAdmin:{
        type:Boolean,
        default:false
    }
});
