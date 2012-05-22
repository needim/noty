$(document).ready(function(){
  notyAlertWithButtons('topLeft', 'noty_theme_default');
  notyAlertWithButtons('topLeft', 'noty_theme_twitter');
  notyAlertWithButtons('topRight', 'noty_theme_mitgux');
  notyAlertWithButtons('bottomLeft', 'noty_theme_facebook');
  notyAlertWithButtons('bottomRight', 'noty_theme_growl');
});

function notyAlertWithButtons(layout, theme){
  noty({layout : layout, theme : theme, type : 'notification', text: 'alert with buttons',
    buttons: [
      {type: 'btn btn-primary', text: 'Ok', click: function($noty) {
          $noty.close();
          noty({force: true, layout : layout, theme : theme, text: 'You clicked "Ok" button', type: 'success'});
        }
      },
      {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {
          $noty.close();
          noty({force: true, layout : layout, theme : theme, text: 'You clicked "Cancel" button', type: 'error'});
        }
      }
    ], closable: false, timeout: false
  });
}