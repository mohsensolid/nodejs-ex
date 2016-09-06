var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var furitSchema = new Schema({
    _ID:{type:String},
    FuritName:{type:String, default :''},
    FuritImage:{type:String, default :''},
    FuritCount:{type:Number, default :null},
    FuritType:{type:String, default :''},
    FuritType1:{type:String, default :''},
    FuritType2:{type:String, default :''},
    FuritType3:{type:String, default :''},
    FuritType4:{type:String, default :''},
    FuritType5:{type:String, default :''},
    FuritType6:{type:String, default :''},
    Available :{type:Boolean }
  
});
module.exports = mongoose.model('tblfurit',furitSchema);