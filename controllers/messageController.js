
var MessageController = function(Message){
    var get = function(req,res){
    var query = {};
 
    Message.find(function(err,messages){
        if(err)
        {
        res.status(500).send(err);
        }else
        {
        res.json(messages);
        }
    });
   
};
    var post = function(req,res){
    var message = Message(req.body);
    message.save();
 
    res.status(201).send(message);
};
    return{
        post:post,
        get:get
    };
};
module.exports = MessageController;