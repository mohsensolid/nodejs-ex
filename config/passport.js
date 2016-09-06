var passport = require('passport');


var mypassport = function(app) {
  
   
    app.use(passport.initialize());
     app.use(passport.session());
    passport.serializeUser(function(user,done){
       
        // console.log(user);
      
        done(null,user);
        
    });

    passport.deserializeUser(function(user,done) {
        // var decoded = jwt.decode(user, 'secret');
        done(null,user);
         console.log('decoded');
    });
      require('./strategies/local.strategy')();
};
module.exports = mypassport;
