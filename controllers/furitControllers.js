var furitController = function(Furit){
    var get = function(req,res){
    var query = {};
 
    Furit.find(function(err,furits){
        if(err)
        {
        res.status(500).send(err);
        }else
        {
        res.json(furits);
        }
    });
   
};
    var post = function(req,res){
    var furit = Furit(req.body);
    furit.save();
   res.status(201).send(furit);
};
    return{
        post:post,
        get:get
    };
};
module.exports = furitController;