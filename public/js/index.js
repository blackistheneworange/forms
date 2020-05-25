


      var select=document.querySelector("form select");
      var ticketLabel=document.querySelector("form #tickets");
      var fileUploaded=false,filePath;


      //select.value="";

     const nameRegex=/^([a-zA-Z]+( [a-zA-Z]+)?( [a-zA-Z]+)?( [a-zA-Z]+)?)$/;

     const emailRegex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

     select.addEventListener("input",()=>{


        if(select.value!=='Self'){
          ticketLabel.style.display='block';
        }
        else{
          ticketLabel.style.display='none';
        }

      })
      
  document.querySelector("#inputProof").addEventListener("change",()=>{
        
        var file=document.querySelector("#inputProof").value;
        
        var name=file.split("\\");
        
        document.querySelector(".fileName").innerHTML=name[2];
        
      })
      
      var inputs=document.querySelectorAll(".form-control");
      
      inputs.forEach((input)=>{
      
      input.addEventListener("focus",(e)=>{
        
    
        e.target.parentElement.children[0].style.color="#5ed6d0";
        
        
      })
      
      input.addEventListener("blur",(e)=>{
        
   
        e.target.parentElement.children[0].style.color="#000"
      })
      
      });
      
      
      
      var errCount=0;

      var email=document.querySelector("input[name=email]");
      var fullName=document.querySelector("input[name=name]");
      var mobile=document.querySelector("input[name=mobile]");
      var proof=document.querySelector("input[name=proof]");
      var tickets=document.querySelector("input[name=tickets]")


      proof.addEventListener('change',()=>{


        const ext=proof.value.match(/(.jpg|.jpeg|.png)/);

if(ext===null){
          
          document.querySelector(".proof").style.display="block";

          if(proof.value===''){
            document.querySelector('.proof').innerHTML='Upload a Valid Verification Id to Continue!'
          }
          else{
            document.querySelector('.proof').innerHTML='Only JPEG/PNG/JPG file extensions are allowed!'
          }

          
        }
        else{
          
          document.querySelector('.proof').innerHTML='';
          
          document.querySelector(".proof").style.display="none";
          
          var formData=new FormData();
          formData.append('proof',proof.files[0])
          
       
          
          $.ajax({
            method:'POST',
            url:'/upload',
            headers:{
              email:document.querySelector("input[name=email]").value.split('@')[0]
            },
            data:formData,
           cache:false,
           processData:false,
           contentType:false,
            success:function(res){
              fileUploaded=true;
              document.querySelector(".proof").style.display="none";
              filePath=res.fileName;
            },
            error:function(err){
              document.querySelector(".proof").style.display="block";
              document.querySelector(".proof").inmerHTML="File Upload Failed! Try Again";
              
            }
          })


        }


})

      document.querySelector("form").addEventListener("submit",(e)=>{

        e.preventDefault();


        if(mobile.value==""||mobile.value.length!==10){
          
          document.querySelector(".mobile").style.display="block";
          document.querySelector('.mobile').innerHTML="Enter a Valid Mobile Number!";
          errCount++;
        }
        else{
          document.querySelector(".mobile").style.display="none";
          document.querySelector('.mobile').innerHTML='';
        }

        if(fullName.value==''||fullName.value.match(nameRegex)===null){
          document.querySelector(".name").style.display="block";
          document.querySelector('.name').innerHTML="Enter a Valid Name!";
          errCount++;
        }
        else{
          document.querySelector(".name").style.display="none";
          document.querySelector('.name').innerHTML='';
        }

        if(email.value==''||email.value.match(emailRegex)===null){
          document.querySelector(".email").style.display="block";
          document.querySelector('.email').innerHTML="Enter a Valid Email Address!";
          errCount++;
        }
        else{
          
          document.querySelector('.email').innerHTML='';
          document.querySelector(".email").style.display="none";
        }

  
        
        if(fileUploaded===false){
          
          document.querySelector(".proof").style.display="block";
          document.querySelector('.proof').innerHTML='Upload a  Valid Verification ID to continue!';
          
          errCount++;
          
        }
        else{
          
          document.querySelector('.proof').innerHTML='';
          document.querySelector(".proof").style.display="none";
        }


        if(select.value==="" || select.value==="Select a registration type..."){
          document.querySelector('.type').innerHTML='Select a Registration Type!'
          document.querySelector(".type").style.display="block";
          errCount++;
        }
        else{
        
          document.querySelector('.type').innerHTML='';
          document.querySelector(".type").style.display="none";
        }


        if((select.value!=='Self'&&select.value!=="Select a registration type..."&&tickets.value===0)||(select.value!==''&&select.value!=='Select a registration type...'&&select.value!=='Self'&&tickets.value<2)){

          document.querySelector(".tickets").style.display="block";
          document.querySelector('.tickets').innerHTML='Minimum 2 Tickets should be entered!'
          errCount++;
        }
        else{
          
          document.querySelector('.tickets').innerHTML='';
          document.querySelector(".tickets").style.display="none";
        }


      if(errCount===0)
        {

          if(select.value==='Self')
          {
            tickets.value=1;
          }
       
       
       let data={
         
         name:fullName.value,
         mobile:mobile.value,
         email:email.value,
         type:select.value,
         image:filePath,
         tickets:tickets.value
       }
      
      $.ajax({
        method:'POST',
        url:'/',
        contentType:'application/json',
        data:JSON.stringify(data),
        
        success:function(res){
          document.querySelector(".formError").style.display="none";
          window.location.href='/preview';
          
        },
        
        error:function(err){
          
          document.querySelector(".formError").style.display="block";
          
        }
      })

   }
   else{

      errCount=0;
   }


})