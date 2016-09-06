var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    // var datenow = new Date.now;
var UserRequestSchema = new Schema({
 
    User_Name:{type:String},
    Password:{type:String},
    Full_Name:{type:String},
    Phone :{type:String},
    Address :{type:String,default:''},
    Email :{type:String},   
    Done:{type:Boolean ,default:false},
    Date:{type:Date,default: Date.now }

});

UserRequestSchema.pre('save', function(next){
  now = new Date();
  this.Date = now;
  if ( !this.Date ) {
    this.Date = now;
  }
  next();
});
module.exports = mongoose.model('tblUserRequest',UserRequestSchema);