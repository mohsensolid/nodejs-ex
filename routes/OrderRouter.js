var express = require('express');
var ordersRouter = express.Router();

var route = function(Order,User){
var corderController = require('../controllers/orderControllers.js')(Order);


ordersRouter.route('/addorder')
.post(function(req,res){
    var order = Order(req.body);
                order.save();
                res.send(order);
// Order.save(function(err, model) {
//             console.log(err);
//             console.log(model);

//         });
});

ordersRouter.route('/userorder/:username')
.get(function(req,res){
    Order.find({User_Name:req.params.username},function(err,userorders){
        if(err)
        {
        res.status(500).send(err);
        }else
        {
        res.json(userorders).status(200);
        }
    });
});

ordersRouter.use(function(req,res,next){
     if(req.decoded.Admin)
         {  
             next();
         }
        else
        {
            res.json([]);
        }
});

ordersRouter.route('/bydate/:date')
.get(function(req,res){
  
  Order.find({'Date':{$gte:req.params.date}} ,function(err,orders){
        if(err)
        {
        res.status(500).send(err);
        }else
        {
        res.json(orders);
        }
    });
});

ordersRouter.route('/undone')
.get(function(req,res){
  Order.find({'Done':false} ,function(err,orders){
        if(err)
        {
        res.status(500).send(err);
        }else
        {
        res.json(orders);
        }
    });
});

ordersRouter.route('/')
.post(corderController.post)
.get(corderController.get);

return ordersRouter;
};
module.exports = route;