

      var select=document.querySelector("select");
      var ticketWrap=document.querySelector(".ticketWrap");
      
      
    
      var edit=document.querySelector(".edit");
      var update=document.querySelector(".update");
      var table=document.querySelector("table");
      let updateState=false;
      let isUpdated=false;
      let imageError=false;



      
      var tableRows=document.querySelectorAll("table tr");
      let i=0;
      
      tableRows.forEach((row)=>{
        
        if(i!==3){
          row.children[2].firstChild.value=row.children[1].innerHTML;
        row.children[2].style.display="none";
        
        }
        
        i++;
        
      })




       const nameVal=document.querySelector("input[name=name]").value;
      const mobileVal=document.querySelector("input[name=mobile]").value;
      const emailVal=document.querySelector("input[name=email]").value;
      const ticketsVal=document.querySelector("input[name=tickets]").value;
      const typeVal=document.querySelector("select").value;
      const proofVal=document.querySelector("input[name=proof]").value;



     const nameRegex=/^([a-zA-Z]+( [a-zA-Z]+)?( [a-zA-Z]+)?( [a-zA-Z]+)?)$/;

     const emailRegex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;



    select.addEventListener("change",()=>{


        if(select.value!=='Self'){
          ticketWrap.style.display='block';
          document.querySelector(".ticketValue").style.display="none";
        }
        else{
          ticketWrap.style.display='none';
          document.querySelector(".ticketValue").style.display="block";
          document.querySelector(".ticketValue").innerHTML=1;
        }

    })
      var errCount=0;

     var proof=document.querySelector("input[name=proof]");
     var proofImg=document.querySelector(".proofImg")


      var email=document.querySelector("input[name=email]");
      var fullName=document.querySelector("input[name=name]");
      var mobile=document.querySelector("input[name=mobile]");

      var tickets=document.querySelector("input[name=tickets]");
   
     var imgPath=document.querySelector(".proofImg").src;
      



      function editor(){
        
        i=0;

        tableRows.forEach((row)=>{
          if(i!==3){
          
          
          
        if(row.children[2].classList.contains('ticketWrap')){
              
              if(document.querySelector("select").value==='Self'){
                
              }
              
              else{
              row.children[2].style.display="block";
              row.children[2].style.paddingBottom="5%";
              row.children[1].style.display="none";
              }
          }
          else{
          
          row.children[2].style.display="block";
        
          row.children[2].style.paddingBottom="5%";
      
          row.children[1].style.display="none";
          
          }
          
          }
          
        i++;
        })
    
        document.querySelector(".fileUploadButton").style.display="block";

        //proof.style.display="block";

        edit.style.display="none";
        update.style.display="block";
        updateState=true;
        isUpdated=true;
        
        document.querySelector("table").classList.toggle("table-dark");
        document.querySelector(".editorText").style.display="block";
        
        

      }
      
      var errSet=false;


      function updator(){
        
    
        var newMobile=document.querySelector("input[name=mobile]").value;
        var newName=document.querySelector("input[name=name]").value;
        var newEmail=document.querySelector("input[name=email]").value;
        var newType=document.querySelector("select").value;
        var newTickets=document.querySelector("input[name=tickets]").value;

        if(newMobile.length<10||newMobile.length>10){
          
          document.querySelector(".mobile").style.display="block";
          document.querySelector('.mobile').innerHTML="Enter a Valid Mobile Number!";
          errSet=true;
        }
        else{
         
         document.querySelector(".mobile").style.display="none";
          document.querySelector('.mobile').innerHTML='';
        }

       if(newName===''||newName.match(nameRegex)===null){
         
          document.querySelector('.name').style.display="block"
          document.querySelector('.name').innerHTML="Enter a Valid Name!";
          errSet=true;
        }
        else{
          document.querySelector('.name').style.display="none";
          document.querySelector('.name').innerHTML='';
        }

      if(newEmail===''||newEmail.match(emailRegex)===null){
          
          document.querySelector(".email").style.display="block";
          document.querySelector('.email').innerHTML="Enter a Valid Email Address!";
          errSet=true;
        }
        else{
          document.querySelector(".email").style.display="none";
          document.querySelector('.email').innerHTML='';
        }

       if(imageError===true){
         errSet=true;
       }



       if(newType===""){
          
          document.querySelector(".type").style.display="block";
          document.querySelector('.type').innerHTML='Select a Registration Type!'
          errCount++;
        }
        else{
          document.querySelector(".type").style.display="none";
          document.querySelector('.type').innerHTML='';
          
      
          if(newType==='Self'){
            document.querySelector("input[name=tickets]").value=1;
            tableRows[5].children[1].innerHTML=1;
            
          }
        }


        if(((newType!=='Self'&&newTickets<2)||(newType!==''&&newType!=='Self'&&newTickets<2))){

          document.querySelector('.tickets').style.display="block";
          document.querySelector('.tickets').innerHTML='Minimum 2 Tickets should be entered!'
          errSet=true;
        }
        else{
          
          document.querySelector(".tickets").style.display="none";
          document.querySelector('.tickets').innerHTML='';
        }



        if(errSet===true){
          errSet=false;
        }

        else{
          i=0;
          
          document.querySelector(".editorText").style.display="none";
          document.querySelector("table").classList.toggle("table-dark");

        tableRows.forEach((row)=>{
          if(i!==3){
          row.children[2].style.display="none";
          
          row.children[1].innerHTML=row.children[2].firstChild.value;
          
          row.children[1].style.display="block";
          row.children[1].style.paddingBottom="6%";
          
          }
          i++;
        })
        
        document.querySelector(".fileUploadButton").style.display="none";
        
        document.querySelectorAll("tr")[5].children[1].innerHTML=document.querySelector("input[name=tickets]").value;

       

        edit.style.display="block";
        update.style.display="none";
        updateState=false;

        }


    }



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
          imageError=true;
          
        }
        else{
          
          document.querySelector(".proof").style.display="none";
          
          var formData=new FormData();
          formData.append('proof',proof.files[0])
          
          $.ajax({
            method:'POST',
            data:formData,
            url:'/upload',
            processData:false,
            contentType:false,
            success:function(res){
              
              proofImg.src='/'+res.fileName;
              
              document.querySelector(".fileName").innerHTML=proof.value;
              imageError=false;
            },
            error:function(res){
              imageError=true;
            }
          })
          


        }


})



  document.querySelector(".form").addEventListener("submit",(e)=>{


        e.preventDefault();
        


        if(updateState===true){
          document.querySelector(".msg").style.display="block";
          document.querySelector(".msg").innerHTML='Save Changes Before Submitting Form!'
        }

        else{

         let data={
          name:fullName.value,
          mobile:mobile.value,
          email:email.value,
          proof:proofImg.src,
          type:select.value,
          tickets:tickets.value
        };
        
        $.ajax({
          method:'POST',
          url:'/preview',
          contentType:'application/json',
          data:JSON.stringify(data),
          success:function(res){
            
            document.querySelector(".alert-warning").style.display="none";
            window.location.href='/success';
          },
          error:function(err){
            
            document.querySelector(".alert-warning").style.display="block";
            document.querySelector(".alert-warning").innerHTML="Failed to submit the form. Try again!"
            
          }
        })



       }






});