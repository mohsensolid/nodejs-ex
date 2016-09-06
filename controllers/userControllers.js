var UserController = function(User){
    var get = function(req,res){
    var query = {};
 
    User.find(function(err,users){
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
    var user = User(req.body);
    user.save();
  
    res.status(201).send(user);
};
    return{
        post:post,
        get:get
    };
};
module.exports = UserController;