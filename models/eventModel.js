var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var eventSchema=new Schema({
  
  name:{
    type:String,
    required:true
  },
  mobile:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  proof:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  tickets:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    default:"Under Review"
  },
  rejectMessage:{
    type:String,
    default:''
  }
  
  
},{
 timestamps:true
});


module.exports=mongoose.model('event',eventSchema);