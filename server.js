var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var path=require('path');

var mongoose=require('mongoose');
var debug=require('debug');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var multer=require('multer');
require('dotenv').config();
var upload=multer();
var auth=require('./routes/authRouter');



var app=express();

const port=process.env.PORT||3000;

const mongoUrl=process.env.MONGO_URI||"mongodb://localhost:27017/test"

//mongo connection
mongoose.connect(mongoUrl,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>{
  console.log("Connected to Database");
})
.catch(err=>console.log("Error Connecting To Database"));


var indexRouter=require('./routes/indexRouter');
var adminRouter=require('./routes/adminRouter');
var auth=require('./routes/authRouter');

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));


app.use(session({secret:'test',resave:true,saveUninitialized:false}))
app.use(cookieParser());
app.use(morgan('dev'));



//global variables
app.set('views','views');
app.set('view engine','ejs');


/*var indexRouter=require('./routes/indexRouter');
var adminRouter=require('./routes/adminRouter');*/


//route mounts
app.use('/',auth.attachUser,indexRouter);
app.use('/admin',auth.accessTokenGenerator,auth.verifyUser,adminRouter);


//error handler
app.use((err,req,res,next)=>{
  
  if(err){
    res.send({err:err.msg});
  }
  else{
    next();
  }
  
});



module.exports=app;