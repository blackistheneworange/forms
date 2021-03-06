var express=require('express');
var multer=require('multer');
var path=require('path');
var Events=require('../models/eventModel');
var config=require('../bin/config');
var cloud =require('@google-cloud/storage');
var serviceKey=require('../bin/keys.json')
const {Storage}=cloud;
var {uploadImage}=require('../bin/cloudUploadHelper');


var router=express.Router();



/*const storage=new Storage({
  keyFilename:serviceKey,
  projectId:"forms-images"
})

var storage=new Storage({
  projectId:'forms-images',
  keyFilename:serviceKey
})

var myBucket=storage.bucket('forms-images-store');


/*const storage=multer.diskStorage({
  
  destination:(req,file,cb)=>{
    
    cb(null,"public/images");
    
  },
  filename:(req,file,cb)=>{
    
    var alteredName="";
    
    var imgCount=config.imageCount;
    if(req.headers.name!==""){
      alteredName=req.headers.email;
    }
    else{
      alteredName=imgCount.toString();
      config.imageCount++;
    }
    
    
    
    var ext=file.mimetype.split('/')[1];
    
    cb(null,"form-"+alteredName+`.${ext}`);
  }
  
  
});*/





const upload=multer({
  storage:multer.memoryStorage(),
  limits:{
    fileSize:5*1024*1024
  }
})

router.route('/')
   .get((req,res,next)=>{
     
     if(config.appDisabled===true){
       
       return res.render('disabled',{
         logged:req.isLogged
       });
     }
     
    
     res.statusCode=200;
     res.render('index',{logged:req.isLogged});
     
   })
  
   .post((req,res,next)=>{
     
     if(config.appDisabled===true){
       
       
       return res.render('disabled',{
         logged:req.isLogged
       });
     }
     
     
     req.session.name=req.body.name;
     req.session.mobile=req.body.mobile;
     req.session.email=req.body.email;
     req.session.type=req.body.type;
     req.session.tickets=req.body.tickets;
     
     req.session.image=req.body.image;
     
     res.send({});
    
   })
   
   
   
router.route('/preview')
   .get((req,res,next)=>{
     
     
     if(!req.session.name){
       res.redirect('/');
       
     }
     
     else{
       
     
     var data={
       name:req.session.name,
       email:req.session.email,
       mobile:req.session.mobile,
       type:req.session.type,
       tickets:req.session.tickets,
       image:req.session.image,
       logged:req.isLogged
     }
     
     
     
     req.session.destroy();
     
     res.render('preview',data);
     
     }
     
   })
   
   .post((req,res,next)=>{
     
     if(config.appDisabled===true){
       return res.render('disabled',{
         logged:req.isLogged
       });
     }
     
     Events.create(req.body)
     .then((event)=>{
      
       req.session.eventId=event._id;
       res.send({});
     })
     
     
     
   })
   

router.route('/success')
  .get((req,res,next)=>{
    
    
    if(config.appDisabled){
      return res.render('disabled',{
        logged:req.isLogged
      });
    }
    
      if(req.session.deleted){
        
        req.session.destroy();
        
        res.render('success',{
          deleted:true,logged:req.isLogged});
      }
      
      else if(req.session.eventId){
      
      var id=req.session.eventId;
      var url=req.get('host')+'/'+id;
      var formLink='/'+id;
      
    
      
      res.render('success',{id:id,url:url,link:formLink,deleted:false,logged:req.isLogged});
      
      
      }
    
      else{
        
        res.redirect('/');
      }
      
  })
  
require('./authRouter').route(router);
  
  
router.route('/:id')
   .get((req,res)=>{
     
     
     if(config.appDisabled===true){
       
       return res.render('disabled',{logged:req.isLogged});
       
     }
     
     Events.findById(req.params.id)
     .then((event)=>{
       
       
       if(!event){
         
         res.statusCode=404;
         return res.render('error',{logged:req.isLogged});
         
       }
      
       
       return res.render('application',{
         
         name:event.name,
         id:event._id,
         mobile:event.mobile,
         email:event.email,
         image:event.proof,
         type:event.type,
         tickets:event.tickets,
         status:event.status,
         rejectReason:event.rejectMessage,
         logged:req.isLogged
       })
       
     })
     
     
     .catch((err)=>{
       res.statusCode=404;
     res.render('error',{logged:req.isLogged});
     });
     
     
   })
   
   
   
router.delete('/delete/:id',(req,res)=>{
  
  
  if(config.appDisabled===true){
    return res.render('disabled',{logged:req.isLogged});
  }
  
  Events.findByIdAndRemove(req.params.id)
  .then((event)=>{
    
    if(!event){
      
      res.statusCode=404;
      res.render('error',{logged:req.isLogged});
    }
    
    else{
      
       req.session.deleted=true;
       res.status(200).send({});
    }
  })
  .catch((err)=>{
    res.statusCode=404;
    res.render('error',{logged:req.isLogged});
  })
  
  
})
  
  
  
router.route('/upload')
   .post(upload.single('proof'),async (req,res)=>{
     
     
     var fileName="";
     var ext=req.file.mimetype.split('/')[1];
     if(req.headers.email!==""){
       fileName=req.headers.email+'-'+Date.now()+`.${ext}`;
     }
     else{
       fileName=config.imageCount+'-'+Date.now()+`.${ext}`;
     }
     
     
     try {
    const myFile = req.file
    const imageUrl = await uploadImage(myFile,fileName)
  
    res.status(200).json({fileName:imageUrl})
    
  } 
  catch(error) {
    res.status(401).send({})
   
  }
     
   //  res.send({fileName:'images/'+req.file.filename});
     
   })
   

   
   
module.exports=router;