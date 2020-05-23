
var ctx = document.getElementById('pieChart').getContext('2d');


document.body.addEventListener("click",(e)=>{

  if(e.target.classList.contains('navItem')&&e.target.classList.contains('navActive'))
  {

  }
  else if(e.target.classList.contains('navItem')){

    var current=document.querySelector(".navActive");
    current.classList.remove('navActive');
    e.target.classList.add('navActive');

    var currentBodyElem=current.innerHTML;
    var targetBodyElem=e.target.innerHTML;


    var targetBlock=document.getElementById(targetBodyElem);
    var currentBlock=document.getElementById(currentBodyElem);

    targetBlock.classList.add('activeBlock');
    targetBlock.classList.remove('inactiveBlock');
    currentBlock.classList.remove('activeBlock');
    currentBlock.classList.add('inactiveBlock');

    setTimeout(()=>{

      targetBlock.style.opacity=1;
      currentBlock.style.opacity=0;

    },200)



  }



})


function analysis(){
  
$.ajax({
  method:'GET',
  url:'/admin/analysis',
  success:function(res){
    
    document.querySelector(".pieError").style.display="none";
    
   var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {

      labels:['Self','Group','Corporate','Others'],


      datasets:[{
        label:'Registration Types',
        backgroundColor:[
          'rgb(255,99,132)',
          'rgb(132,92,255)',
          'rgb(92,255,132)',
          'rgb(25,120,230)'
          ],
        borderColor:'rgb(0,0,0)',
        data:[res.self,res.group,res.corporate,res.others]
      }]

    },

    options: {}
   })
  
  },
  error:function(err){
    document.querySelector(".pieError").style.display="block";
  }

});

}


function entries(){


$.ajax({
  method:'GET',
  url:'/admin/entries',
  success:function(res){
    
    document.querySelector(".entriesError").style.display="none";
    document.querySelector(".statsError").style.display="none";
    
    document.querySelector("#totalEntries").innerHTML=res.totalEntries;
    document.querySelector("#totalTickets").innerHTML=res.totalTickets;
    document.querySelector("#notReviewed").innerHTML=res.notReviewed;
    document.querySelector('#acceptedApplications').innerHTML=res.acceptedApplications;
    document.querySelector("#rejectedApplications").innerHTML=res.rejectedApplications;
    document.querySelector("#totalEntriesStat").innerHTML=res.totalEntries;
    document.querySelector("#totalTicketsStat").innerHTML=res.totalTickets;
    document.querySelector("#notReviewedStat").innerHTML=res.notReviewed;
    
    let i=0;
    
    res.names.forEach((name)=>{
      
      var row=document.createElement("tr");
      
      var status=document.createElement("td");
      var name=document.createElement("td");
      var id=document.createElement("td");
      var date=document.createElement("td");
      var link=document.createElement("th");
      var linkItem=document.createElement("a");
      
    
      
      id.innerHTML=res.ids[i];
      status.innerHTML=res.statuses[i];
      name.innerHTML=res.names[i];
      date.innerHTML=res.dates[i];
    
      linkItem.href="/admin/"+res.ids[i];
      linkItem.innerHTML="View";
      
      
      if(status.innerHTML==="Under Review"){
        status.classList.add("alert-warning");
      }
      else if(status.innerHTML==="Accepted"){
        status.classList.add("alert-success");
      }
      else{
        status.classList.add("alert-danger");
      }
      
      
      link.appendChild(linkItem);
      
      row.appendChild(link);
      row.appendChild(id);
      row.appendChild(date);
      row.appendChild(name);
      row.appendChild(status);
      
      i++;
      
      var refElement=document.querySelector(".tbody");
      
      refElement.appendChild(row);
      
    })
    
  },
  
  error:function(err){
    
    document.querySelector(".entriesError").style.display="block";
    document.querySelector(".statsError").style.display="block";
  }
  
  
})

}

entries();
analysis();

var message=document.querySelector('#Privileges div');

document.querySelector('.deleteAllEntries').addEventListener("click",(e)=>{

  
  $.ajax({
    method:'DELETE',
    url:'/admin/deleteAll',
    success:function(res){
  
      document.querySelector(".privilegesError").style.display="none";
      
      message.classList.add('alert-success');
      message.innerHTML=res.msg;
      
      entries();
      analysis();
      
      var parent=document.querySelector(".tbody");
      var children=document.querySelectorAll(".tbody tr");
      
      children.forEach((child)=>{
        parent.removeChild(child);
      });
      
      
    },
    
    error:function(err){
      document.querySelector(".privilegesError").style.display="block";
    }

  })


})



if(disabledOption===true){


    document.querySelector('.disable').innerHTML='Enable Application/Form';
    document.querySelector('.disable-msg').innerHTML='Enabling the Application/Form will make it go live! Are you sure you want to enable the application/form?'

    url='/admin/disable';

}
else{

    document.querySelector('.disable').innerHTML='Disable Application/Form';
    document.querySelector('.disable-msg').innerHTML='Disabling the Application will prevent Users from viewing or submitting applications. Are you sure you want to disable this form/application?'


}




document.querySelector('.disableApplication').addEventListener('click',()=>{

  var url;

  if(document.querySelector('.disable').innerHTML==='Disable Application/Form'){


    document.querySelector('.disable').innerHTML='Enable Application/Form';
    document.querySelector('.disable-msg').innerHTML='Enabling the Application/Form will make it go live! Are you sure you want to enable the application/form?'

    url='/admin/disable';

  }
  else{

    document.querySelector('.disable').innerHTML='Disable Application/Form';
    document.querySelector('.disable-msg').innerHTML='Disabling the Application will prevent Users from viewing or submitting applications. Are you sure you want to disable this form/application?'

    url='/admin/enable';

   }


  $.ajax({
    method:'PUT',
    url:url,
    success:function(res){
      
      document.querySelector(".privilegesError").style.display="none";

      message.classList.add("alert-success");
      message.innerHTML=res.msg;
    },
    
    error:function(err){
      
      document.querySelector(".privilegesError").style.display="block";
      
      
    }

  })


});




