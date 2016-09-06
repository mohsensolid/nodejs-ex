var express = require('express');
var usersRouter = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
  var usera;
var route = function(User){
var cuserController = require('../controllers/userControllers.js')(User);
usersRouter.route('/signIn') 
 .post(passport.authenticate('local',{
       
    }),function(req,res) {
        // res.json(req.body);
            var user = User(req.user);
            var tokenparameter = {
                User_Name:user.User_Name,
                Admin:user.Admin
            };
             
                //    console.log(user);
                        var token = jwt.encode(tokenparameter, 'secret');
                                    res.json({access_token :token});

                                        });
 


usersRouter.route('/')
.post(cuserController.post)
.get(cuserController.get);



usersRouter.use('/:id',function(req,res,next){
var query = {};
     User.findOne({User_Name:req.params.id},function(err,user){
        
        if(err)
        {
        res.status(500).send(err);
        }else if (user)
        {
            req.user = user;
             next();
        }
        else{
        res.status(404).send('user not Found !!');
        }
      
    });
});

usersRouter.route('/:id')
.get(function(req,res){
    res.json(req.user);
})
.patch(function(req,res){
    if(req.body._id)
        delete req.body._id;
for(var p in req.body)
    {
        req.user[p] = req.body[p];
    }
    req.user.save(function(err){
        if(err)
        {
            res.status(500).send(err);
        }
        else{
               
            res.json(req.user);
        }
    });
});


                                           //     req.login(req.body,function() {
          
    // });


//  function(err, user) {
    //     req.login(req.body,function() {
          
    // });


//  function(err, user) {
    
//                     if(err)
//                     {
//                        console.log(err); 
//                     }
//                     else
//                     {
//                         usera=user;
//                       console.log(user); 
//                     }
                
                    
 
//   }),function(req,res){
//       res.send('hi');
//       console.log(user); 
//   }) ;

   

return usersRouter;
};
module.exports = route;