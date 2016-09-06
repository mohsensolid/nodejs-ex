var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;
var User = require('../../models/userModels.js');
var local = function() {
    passport.use(new LocalStrategy({
        usernameField: 'User_Name',
        passwordField: 'Password',
         },function(username,password,done) {
           User.findOne({User_Name :username},
                    function(err,resualt) {
                        if (resualt !== null) {
                            if (resualt.Password == password)
                            {
                                var user = User(resualt);
                                // console.log(user.Admin);
                                done(null,user);
                            }
                            else
                            {
                                done(null,false,{message : 'Bad Password !!'});
                            }
                        }
                        else {
                            done(null,false,{message : 'Bad Password !!'});
                            
                        }
                    }
                        );
     
        }));
};
module.exports = local;

