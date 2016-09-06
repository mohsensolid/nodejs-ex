var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    // var datenow = new Date.now;
var orderSchema = new Schema({
         User_Name:{type:String,default:''},
         Order_ID:{type:String,default:''},
         Done:{type:Boolean ,default:false},
         Date:{type:Date,default: Date.now },
         Items:[{ 
         Furit_Name:{type:String,default:''},
         Furit_Count:{type:Number,default:0},
         Furit_Type:{type:String,default:''}        
    }]
});

orderSchema.pre('save', function(next){
  now = new Date();
  this.Date = now;
  if ( !this.Date ) {
    this.Date = now;
  }
  next();
});
module.exports = mongoose.model('tblOrder',orderSchema);