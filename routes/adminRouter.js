const express=require('express');
const router=express.Router();
var config=require('../bin/config');
var Events=require('../models/eventModel');


const app=express();





router.route('/dashboard')
  .get((req,res,next)=>{
  
    
    res.render('dashboard',{
      
      disabledOption:config.appDisabled
    })
    
  })
  
  
router.route('/analysis')
   .get((req,res,next)=>{
     
     Events.find({})
     .then((events)=>{
       
       if(!events){
         
         return res.send({self:0,group:0,corporate:0,others:0})
         
       }
       
       var self=0,group=0,corporate=0,others=0;
       
       events.forEach((event)=>{
         
       /*  if(event.status!=='Rejected')
         {*/
           
           if(event.type==='Self'){self++;}
           else if(event.type==='Group'){group++;}
           else if(event.type==='Corporate'){corporate++;}
           else{others++;}
           
       //  }
         
         
       })
       
    
       res.send({self:self,group:group,corporate:corporate,others:others});
       
       
     })
     
     
   })
   
   
   
router.get('/entries',(req,res,next)=>{
  
  
  Events.find({})
  .then((events)=>{
    
    if(!events){
      return res.send({err:"No Entries"});
    }
    
    var names=[],ids=[],dates=[],statuses=[],totalEntries=0,totalTickets=0,notReviewed=0,acceptedApplications=0,rejectedApplications=0;
    
    events.forEach((event)=>{
      
      names.push(event.name)
      dates.push(event.createdAt.toDateString());
      
      ids.push(event._id);
      statuses.push(event.status);
      
      totalEntries++;
      
      
      if(event.status!=="Rejected")
      {
      totalTickets+=parseInt(event.tickets);
      }
      
      if(event.status==="Under Review"){
        notReviewed++;
      }
      else if(event.status==="Accepted"){
        acceptedApplications++;
      }
      else{
        rejectedApplications++;
      }
      
    })
    
    
    
    res.send({names:names,ids:ids,dates:dates,statuses:statuses,totalEntries:totalEntries,totalTickets:totalTickets,notReviewed:notReviewed,acceptedApplications:acceptedApplications,rejectedApplications:rejectedApplications});
    
    
  })
  
  
})


router.get('/:id',(req,res,next)=>{
  
  Events.findById(req.params.id)
  .then((event)=>{
       
      if(!event){
        res.statusCode=404;
        return res.render('error',{logged:true});
      }
  
       res.render("applicationAdmin",{
    
         name:event.name,
         email:event.email,
         mobile:event.mobile,
         type:event.type,
         tickets:event.tickets,
         status:event.status,
         proof:event.proof,
         id:event._id
    
       })
       
  
  })
  .catch((err)=>{
    res.statusCode=404;
    res.render('error',{logged:true});
  })
})

router.put('/acceptApplication',(req,res,next)=>{
  console.log("In acceptor")
  Events.findById(req.body.id)
  .then((event)=>{
    
    event.status="Accepted";
    event.save()
    .then((event)=>{
      
      res.send({});
    })
    
  })
  
  
})


router.put('/rejectApplication',(req,res,next)=>{
  
  
  Events.findById(req.body.id)
  .then((event)=>{
    
    event.status="Rejected";
    event.rejectMessage=req.body.reason;
    event.save()
   .then((event)=>{
     res.send({});
   })
    
    
  })
  
})
   
  
router.put('/disable',(req,res,next)=>{
  
  config.appDisabled=true;
  res.send({msg:"Application Successfully Disabled!"})
  
})

router.put('/enable',(req,res,next)=>{
  
  
  config.appDisabled=false;
  res.send({msg:"Application Successfully Enabled and is Live Now!"})
})


router.delete('/deleteAll',(req,res,next)=>{
  
  Events.deleteMany({})
  .then((events)=>{
    if(!events){
      return res.send({err:"No Entries Available To Delete!"})
    }
     res.send({msg:"All Entries Deleted Successfully!"})
  });
  
})



  
  
module.exports=router;