var express = require('express');
var MessageRouter = express.Router();

var route = function(Message){
var cmessageController = require('../controllers/messageController.js')(Message);
MessageRouter.route('/')
.post(cmessageController.post);
MessageRouter.use(function(req,res,next){
     if(req.decoded.Admin)
         {  
             next();
         }
        else
        {
            res.json([]);
        }
});
MessageRouter.route('/')
.get(cmessageController.get);

return MessageRouter;
};
module.exports = route;