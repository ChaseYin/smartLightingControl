const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function(user, done) {
    console.log('profile id 是：'+user.name[0])
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    console.log('profile id 是：'+user.id)
      done(null, user);
    
  });

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

passport.use(new GoogleStrategy({
    clientID: "650388317373-iqfqhuvild9f1fqt2v870047n2iernq1.apps.googleusercontent.com",
    clientSecret: "1AQqbYKBm2O1x-fmSlplx68M",
    callbackURL: "http://sit314.herokuapp.com/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {//once login, this function will be triggered
    console.log('profile id 是：'+profile.id)
    //use the profile info (mainly profile id) to check if the user is registered in ur db(用下面的东西)
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });


    return done(null, profile);//把err改成了null, user 改成了profile

  }//这个函数结束后， serializeUser（）函数将会被调用
  
));