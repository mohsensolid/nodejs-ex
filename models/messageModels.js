var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageModelSchema = new Schema({
    User_Name:{type:String},
    Full_Name:{type:String},
    content:{type:String},
    Date :{type:Date ,default: Date.now  },
    read :{type:Boolean , default :false}
      
});
MessageModelSchema.pre('save', function(next){
  now = new Date();
  this.Date = now;
  if ( !this.Date ) {
    this.Date = now;
  }
  next();
});
module.exports = mongoose.model('tblUserMessage',MessageModelSchema);