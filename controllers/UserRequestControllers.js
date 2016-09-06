
var UserRequestController = function(UserRequest){
    var get = function(req,res){
    var query = {};
 
    UserRequest.find(function(err,users){
        if(err)
        {
        res.status(500).send(err);
        }else
        {
        res.json(users);
        }
    });
   
};
    var post = function(req,res){
    var user = UserRequest(req.body);
    user.save();
  
    res.status(201).send(user);
};
    return{
        post:post,
        get:get
    };
};
module.exports = UserRequestController;