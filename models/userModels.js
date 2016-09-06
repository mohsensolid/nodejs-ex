var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var userModel = new Schema({
    User_Name:{type:String},
    Password:{type:String},
    Full_Name:{type:String},
    Phone :{type:String},
    Address :{type:String},
    Email :{type:String},
    Admin :{type:Boolean}
});

module.exports = mongoose.model('tblUsers',userModel);

module.exports.createUser = function(newUser,callback){
    newUser.save(callback);
};