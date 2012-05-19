$(document).ready(function(){
  //alert('toto');
  /*noty({layout : 'topLeft', theme : 'noty_theme_default', type : 'notification',    text: 'notification with default theme',  timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_default', type : 'warning',         text: 'warning with default theme',         timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_default', type : 'alert',           text: 'alert with default theme',           timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_default', type : 'information',     text: 'information with default theme',     timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_default', type : 'success',         text: 'success with default theme',         timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_default', type : 'error',           text: 'error with default theme',           timeout : false });
  
  noty({layout : 'topLeft', theme : 'noty_theme_twitter', type : 'notification',    text: 'notification with twitter theme',  timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_twitter', type : 'warning',         text: 'warning with twitter theme',       timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_twitter', type : 'alert',           text: 'alert with twitter theme',         timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_twitter', type : 'information',     text: 'information with twitter theme',   timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_twitter', type : 'success',         text: 'success with twitter theme',       timeout : false });
  noty({layout : 'topLeft', theme : 'noty_theme_twitter', type : 'error',           text: 'error with twitter theme',         timeout : false });
  
  noty({layout : 'topRight', theme : 'noty_theme_mitgux', type : 'notification',    text: 'notification with mitgux theme', timeout : false });
  noty({layout : 'topRight', theme : 'noty_theme_mitgux', type : 'warning',         text: 'warning with mitgux theme',      timeout : false });
  noty({layout : 'topRight', theme : 'noty_theme_mitgux', type : 'alert',           text: 'alert with mitgux theme',        timeout : false });
  noty({layout : 'topRight', theme : 'noty_theme_mitgux', type : 'information',     text: 'information with mitgux theme',  timeout : false });
  noty({layout : 'topRight', theme : 'noty_theme_mitgux', type : 'success',         text: 'success with mitgux theme',      timeout : false });
  noty({layout : 'topRight', theme : 'noty_theme_mitgux', type : 'error',           text: 'error with mitgux theme',        timeout : false });
  
  noty({layout : 'bottomLeft', theme : 'noty_theme_facebook', type : 'notification',    text: 'notification with facebook theme', timeout : false });
  noty({layout : 'bottomLeft', theme : 'noty_theme_facebook', type : 'warning',         text: 'warning with facebook theme',      timeout : false });
  noty({layout : 'bottomLeft', theme : 'noty_theme_facebook', type : 'alert',           text: 'alert with facebook theme',        timeout : false });
  noty({layout : 'bottomLeft', theme : 'noty_theme_facebook', type : 'information',     text: 'information with facebook theme',  timeout : false });
  noty({layout : 'bottomLeft', theme : 'noty_theme_facebook', type : 'success',         text: 'success with facebook theme',      timeout : false });
  noty({layout : 'bottomLeft', theme : 'noty_theme_facebook', type : 'error',           text: 'error with facebook theme',        timeout : false });*/
  
  var content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.';
  var title = '<div class="header">This is a sticky notice!</div>';
  var icon = '<div class="icon"><img src="http://s3.amazonaws.com/twitter_production/profile_images/132499022/myface_bigger.jpg"></div>';
  
  noty({layout : 'bottomRight', theme : 'noty_theme_growl', type : 'error', closeButton : true,           text: content,        timeout : false });
  noty({layout : 'bottomRight', theme : 'noty_theme_growl', type : 'error',           text: title+content,        timeout : false });
  noty({layout : 'bottomRight', theme : 'noty_theme_growl', type : 'error',           text: icon+'<div style="margin-left: 58px;">'+title+content+'</div>',        timeout : false });
  noty({layout : 'top', theme : 'noty_theme_growl', type : 'error',           text: icon+'<div style="margin-left: 58px;">'+title+content+'</div>',        timeout : false });
});