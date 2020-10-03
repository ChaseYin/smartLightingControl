const validator = require('validator')
const request = require('request')
var express = require('express');
var router = express.Router();
var User = require("../models/User");
var bcrypt = require('bcrypt');
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");


const session = require('express-session')
// var session = require("session");
// var apiKey = 'dEyZCJh3RNnbNTbJOiqWvA';
//var base64 = getBase64(file);



var crypto = require('crypto');
const { response } = require('express');
const { userInfo } = require('os');
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants');
// var Cookies = require('cookies');
const { error } = require('console');

// 

router.use(session({
    secret : '$$$ChaseTest1',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge:60*60*1000 }

}))

var responseData;
router.use(function(req,res,next){
    responseData = {
        code:0,
        message:''
    }
    next();
})

router.post('/user/register',function(req,res,next){

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var email = req.body.email;
    var country = req.body.country;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var tel = req.body.tel;
    var zip_postal_code = req.body.zip_postal_code;
    var region = req.body.region;
    var city = req.body.city;
    var adress = req.body.address;
    var hashPassword = req.body.password;

    const data = {
        members: [
            {
                email_address:email,
                status: 'subscribed',
                merge_fields:{
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    }
    const postData = JSON.stringify(data);

    const options = {
        url:'https://us17.api.mailchimp.com/3.0/lists/ffda8c0206',
        method:'POST',
        headers:{
            Authorization:'auth 0c808a85d6afe5c1b5316b159161afc0-us17'
        },
        body:postData 
    }
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds,function(err,salt){
        bcrypt.hash(password,salt,function(err,hash){
             hashPassword = hash;
            // password = hash;
            // repassword = hash;
            storeUserData();
        })
    })
    
    function storeUserData(){
// 用户是否为空
    if(username == ''){
        responseData.code = 1;
        responseData.message = 'Username cannot be empty';
        res.json(responseData);
        return;
    }
    if(password == ''){
        responseData.code = 2;
        responseData.message = 'password cannot be empty';
        res.json(responseData);
        return;
    }
    if(password != repassword){
        responseData.code = 3;
        responseData.message = 'Password input not same';
        res.json(responseData);
        return;
    }
    if(!validator.isEmail(email))
    {
        responseData.code = 4;
        responseData.message = 'Wrong email format(test by validator)';
        res.json(responseData);
        return;
    }
    if(!validator.isEmail(username))
    {
        responseData.code = 4;
        responseData.message = 'Wrong email format(test by validator)';
        res.json(responseData);
        return;
    }
    User.findOne({
        username:username
    }).then((userInfo)=>{
        if(userInfo){
            responseData.code = 4;
            responseData.message = 'Username has already exists';
            res.json(responseData);
            return;
        }else{
            var user = new User({
                username:username,
                password:hashPassword,
                email:email,
                country:country,
                first_name:first_name,
                last_name:last_name,
                tel:tel,
                zip_postal_code:zip_postal_code,
                address:adress,
                city:city,
                region:region
            });
            request(options, (err,response,body)=>{
                if(err)
                {
                    throw error
                }else
                {
                    if(response.statusCode === 200)
                    {
                        console.log("Successful Get Email address!")
                    }
                }
        
            });
            return user.save();
        }
    }).then((newUserInfo) => [ 
        responseData.message = 'Register successfully',
        res.json(responseData)
    ]);
    }
});

router.get('/user/logout',function(req,res,next){ 
    // req.flash("success", "See you later!");   报错TypeError: req.flash is not a function
    req.cookies.set('userInfo',null);
    res.json(responseData);
});



router.post('/user/login',function(req,res,next){
    var username = req.body.username;
    var password  = req.body.password;
    
    if(username == '' || password == ''){
        responseData.code = 1;
        responseData.message = 'Username or password cannot be empty';
        res.json(responseData);
        return;
    }

    User.findOne({ username: username }, function(err, user) {
        if (!user) {
            responseData.code = 1;
            responseData.message = 'Do not have this user';
            res.json(responseData);
            return;
        }
    
      });
    // if(User.findOne({username:username})){

   
  
    User.findOne({
        username:username,
        // password:hash
    }).then(function(user){
        // console.log('找到的密码是：'+user.password);
        bcrypt.compare(password,user.password,function(err,res){
            const pwdMatchFlag = res;
            tryLogin(pwdMatchFlag);
        })
    

        function tryLogin(pwdMatchFlag){
            if(pwdMatchFlag)
            {
                User.find({
                    username:username,
                }).then((userInfo)=>{
                    console.log('userInfo ：'+userInfo);
                    responseData.message = 'Login Successfully!';
                    responseData.userInfo = {
                    _id:userInfo[0]._id,
                    username:userInfo[0].username,
                    password:userInfo[0].password//新加的
                };  

                    req.cookies.set('userInfo',JSON.stringify({
                    _id:userInfo[0]._id,
                    username:userInfo[0].username,
                    password:userInfo[0].password,
                    // maxAge:60*60*1000
                    
                }));
                // Cookies.set('name', 'value', {
                //     expires: 7,
                //     });
               
                // req.cookies.setMaxAge(2 * 3600);
                    res.json(responseData);
                    console.log("cookies是！+++++++++++++++++++");
                    console.log('json是：'+JSON.stringify(res));
  
                })
            }
            else{
                responseData.code = 2;
                responseData.message = 'Wrong Email or Password';
                res.json(responseData);
            return;
            }
    }

        
    })

    
})


// 退出



module.exports = router;