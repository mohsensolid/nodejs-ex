var OrderController = function(Order){
    var get = function(req,res){
    var query = {};
 
    Order.find(function(err,orders){
        if(err)
        {
        res.status(500).send(err);
        }else
        {
        res.json(orders);
        }
    });
   
};
    var post = function(req,res){
    var order = Order(req.body);
    order.save();

    res.status(201).send(order);
};
    return{
        post:post,
        get:get
    };
};
module.exports = OrderController;