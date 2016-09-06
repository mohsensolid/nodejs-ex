var express = require('express');
var userRequestRouter = express.Router();

var route = function(UserRequest){
var cuserRequestController = require('../controllers/UserRequestControllers.js')(UserRequest);

userRequestRouter.route('/')
.post(cuserRequestController.post);

userRequestRouter.route('/')
.get(cuserRequestController.get);

return userRequestRouter;
};
module.exports = route;