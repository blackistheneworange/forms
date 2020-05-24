var userLabel=document.querySelector(".username p");
var passLabel=document.querySelector(".password p");

var username=document.querySelector("input[type=text]");
var password=document.querySelector("input[type=password]");

document.querySelector(".alert").style.display="none";

document.querySelector("form").addEventListener("submit",(e)=>{
  e.preventDefault();
  
  
  if(document.querySelector("input[name=username]").value===""||document.querySelector("input[name=password]").value===""){
    
    document.querySelector(".alert").style.display="block";
    document.querySelector(".alert").innerHTML="Both Fields Are Required";
    
    
  }
  
  
  else{
     
     
     var data={
       
       username:document.querySelector("input[name=username]").value,
       password:document.querySelector("input[name=password]").value
       
     }
  
 
  
  var errBox=document.querySelector(".alert");
  
  axios({
    method:'post',
    url:'login',
    data:data
    
  })
  .then((res)=>{
    errBox.style.display="none";
    window.location.href="/admin/dashboard";
    
  },(error)=>{
    
    errBox.style.display="block";
    errBox.innerHTML=error.response.data.err;
  })
  
  
  }
  
  
})






username.addEventListener("focus",(e)=>{
  

  
    userLabel.style.transform="translate(4%,-250%)";
    userLabel.style.fontSize="0.7rem"
  
})



function labelAnimator(){
  
  
 if(username.value!==""){
   
    userLabel.style.transform="translate(4%,-250%)"
    userLabel.style.fontSize="0.7rem";
    isStyled=true;
   }
  
  
}


username.addEventListener("input",()=>labelAnimator());

username.addEventListener("blur",()=>{
  
  if(username.value===""){
    
    userLabel.style.transform="translate(5%,-100%)";
    userLabel.style.fontSize="1.2rem"
    
  }
  
});


password.addEventListener("input",()=>{
  
  if(password.value!==""){
    passLabel.style.transform="translate(4%,-250%)";
    passLabel.style.fontSize="0.7rem";
  }
  
})

password.addEventListener("blur",()=>{
  if(password.value===""){
    
    passLabel.style.transform="translate(5%,-100%)";
    passLabel.style.fontSize="1.2rem";
    
  }
  
})

password.addEventListener("focus",()=>{
  
  
    
    passLabel.style.transform="translate(4%,-250%)";
    passLabel.style.fontSize="0.7rem";
  
  
})