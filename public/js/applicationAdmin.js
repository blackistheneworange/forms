

var statusOuter=document.querySelector("thead");
var status=document.querySelector("thead tr th center").innerHTML;


if(status==="Under Review"){
  statusOuter.classList.add("bg-warning");
}
else if(status==="Accepted"){
  statusOuter.classList.add("bg-success");
  statusOuter.classList.add("text-white")
  document.querySelector(".decider").style.display="none";
}
else if(status==="Rejected"){
  statusOuter.classList.add("bg-danger");
  statusOuter.classList.add("text-white");
  document.querySelector(".decider").style.display="none";
}




document.querySelector(".acceptConfirm").addEventListener("click",(e)=>{
  
  
  $.ajax({
    method:'PUT',
    url:'/admin/acceptApplication',
    dataType:'json',
    data:{id:document.querySelector(".regId").innerHTML},
    
   success:function(res){
    
    
    statusOuter.classList.add("bg-success");
    statusOuter.classList.add("text-white");
     document.querySelector("thead tr th center").innerHTML="Accepted";
    document.querySelector(".decider").style.display="none";
    
   }
   
  });
  
  
});


document.querySelector(".rejectConfirm").addEventListener("click",()=>{
  
  
  const rejectReason=document.querySelector(".rejectReason");
  
  
  if(rejectReason.value===""){
    
    document.querySelector(".alert-danger").style.display="block";
    setTimeout(()=>{
    document.querySelector(".alert-danger").style.opacity=1;
    },50);
    
  }
  else{
    
    var reason=rejectReason.value;
    rejectReason.value="";
    document.querySelector(".alert-danger").style.opacity=0;
    document.querySelector(".alert-danger").style.display="none";
    document.querySelector(".rejectConfirm").setAttribute("data-dismiss","modal");
    setTimeout(()=>{
      document.querySelector(".rejectConfirm").removeAttribute("data-dismiss");
    },50)
    

    
    $.ajax({
      method:'PUT',
      url:'/admin/rejectApplication',
      dataType:'json',
      data:{id:document.querySelector(".regId").innerHTML,reason:reason},

      success:function(res){
      
      document.querySelector(".decider").style.display="none";
      
      document.querySelector("thead tr th center").innerHTML="Rejected";
      statusOuter.classList.add("bg-danger");
      statusOuter.classList.add("text-white");
    
      }
      
    });
    
    
  }
  
  
})

document.querySelector(".rejectReject").addEventListener("click",()=>{
  
  document.querySelector(".alert-danger").style.opacity=0;
  document.querySelector(".alert-danger").style.display="none";
  
  
})


var columnOne=document.querySelectorAll("tbody tr th");
var columnTwo=document.querySelectorAll("tbody tr td");
var i=0;

columnOne.forEach((row)=>{
  
  if(i%2===0){
  row.classList.add("table-secondary")
  columnTwo[i].classList.add("table-secondary");
  }i++;
})