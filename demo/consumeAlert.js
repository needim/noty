$(document).ready(function(){
  var alertOld = window.alert;
  var wait = false;
  
  window.alert = function(text){
    noty({layout : 'topRight', theme : 'noty_theme_default', type : 'success', text: text, timeout : 1000,
      onShow :function(){
        console.log("show alert");
      },onClose :function(){
        console.log("hide alert");
      }
    });
  };
  
  console.log("before call");
  alert("bonjour");
  console.log("after call");
  
});