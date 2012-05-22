$(document).ready(function(){
  /*var alertOld = window.alert;
  var wait = false;
  
  window.alert = function(text){
    noty({layout : 'topRight', theme : 'noty_theme_default', type : 'success', text: text, timeout : 1000,
      onShow :function(){
        console.log(new Date().getTime()+" : start show alert");
      },onShown :function(){
        console.log(new Date().getTime()+" : end show alert");
      },onClose :function(){
        console.log(new Date().getTime()+" : start hide alert");
      },onClosed :function(){
        console.log(new Date().getTime()+" : end hide alert");
      }
    });
  };
  
  console.log("before call");
  alert("bonjour");
  console.log("after call");*/
  
  
  alert("bonjour 1");
  $.noty.consumeAlert({layout : 'topRight', type : 'success'});
  alert("bonjour 2");
  $.noty.consumeAlert({layout : 'top', type : 'alert'});
  alert("bonjour 3");
  $.noty.stopConsumeAlert();
  alert("bonjour 4");
  
});
