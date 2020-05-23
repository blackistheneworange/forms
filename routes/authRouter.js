var express=require('express');
var Admin=require('../models/adminModel');
require('dotenv').config();
var bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');


exports.route=function(router){
  
  
  
  router.route('/logout')
     .get((req,res)=>{
       console.log("Logout")
       res.cookie('token','',{expires:new Date(Date.now())});
       res.cookie('signed','',{expires:new Date(Date.now())});
       
       res.redirect('/login');
       
     })
     
  
  
  router.route('/login')
     .get(this.attachUser,(req,res,next)=>{
       
       
       if(req.isLogged===true){
         
         return res.redirect('/admin/dashboard');
         
       }
       
       res.statusCode=200;
       res.render('login');
     })
     
     .post((req,res,next)=>{
       
       var {username,password}=req.body;
       
       Admin.findOne({username:username})
        .then((admin)=>{
          
          
          if(!admin){
            
            return res.status(401).send({err:"No Such Admin Exists"})
            
          }
          
          bcrypt.compare(password,admin.password,(err,isMatch)=>{
            
            
            if(err){
              return res.status(401).send({err:"Login Failed"});
            }
            
            if(isMatch){
              
              const refreshToken=this.generateRefreshToken({name:admin.username})
          
              
              var options={
                
                 expires:new Date(Date.now()+60*24*24*365*200),
                 httpOnly:true
              };
              
    
              
              res.cookie('token',refreshToken,options);
              
              res.cookie('signed',true,{expires:options.expires});
              
           // res.redirect("/admin/dashboard")
             res.status(200).send({});
            }
            else{
              res.status(401).send({err:"Incorrect Password"});
            }
            
          })
          
        })
       
       
     });
     
     
     
  /*router.route('/signup')
    .post((req,res)=>{
      
      var {username,password}=req.body;
      
      Admin.create({username,password})
      
      .then((admin)=>{
        
        bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(admin.password,salt,(err,hashed)=>{
          
          admin.password=hashed;
          
          admin.save()
          .then((admin)=>{
            res.send(admin);
          })
          
          
        }))
        
        
      })
      
      
    })*/
}

exports.attachUser=function(req,res,next){
  
  
  var refresher=req.cookies['token'];

  
  if(refresher==null || refresher ==undefined){
    req.isLogged=false;
    next();
  }
  else{

    jwt.verify(refresher,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    
      if(err){
        req.islogged=false;
        next();
      }
      else{
        
        req.isLogged=true;
        next();
      }
      
    })
  }
  
  
}
  
exports.verifyUser=function(req,res,next){
  
  var authHeader=res._headers.authorization;
  
  
  var token=authHeader&&authHeader.split(' ')[1];
  
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    
    
    if(err){
      res.redirect('/login');
    }
    
    else{
      
      
      req.user=user;
      next();
      
    }
    
    
  })
  
}

exports.accessTokenGenerator=function(req,res,next){
  
  
  var refresher=req.cookies['token'];
  
  if(refresher==null){
    res.redirect('/login');
  }
  
  else
  {
    
    jwt.verify(refresher,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
         
         
         if(err){
           res.redirect('/login');
         }
    
         var token=generateAccessToken({name:user.name,tokenId:Math.random()});
  
         res.setHeader('authorization','Bearer '+token);
        
         next();
  
    });
  
  }
  
};

exports.generateRefreshToken=function(user){
  
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
  
};

generateAccessToken=function(user){
  
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1m'})
}
  


