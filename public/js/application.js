var statusOuter=document.querySelector("thead");
var status=document.querySelector("thead tr th center").innerHTML;


if(status==="Under Review"){
  statusOuter.classList.add("bg-warning");
}
else if(status==="Accepted"){
  statusOuter.classList.add("bg-success");
  statusOuter.classList.add("text-white")
  
}
else if(status==="Rejected"){
  statusOuter.classList.add("bg-danger");
  statusOuter.classList.add("text-white");
  
}



document.querySelector(".rejectConfirm").addEventListener("click",(e)=>{

    
    document.querySelector(".rejectConfirm").setAttribute("data-dismiss","modal");
    
    setTimeout(()=>{
      document.querySelector(".rejectConfirm").removeAttribute("data-dismiss")
    },50);
    
    
    $.ajax({
      
      method:'DELETE',
      url:"/delete/"+document.querySelector('.regId').innerHTML,
      
      success:function(res){
        window.location.href="/success";
      },
      
      error:function(err){
        
        document.querySelector(".alert-danger").style.display="block";
        
      }
    
    })


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