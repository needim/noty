/* 
 * Authors: Nedim Arabacı (http://ned.im), Muhittin Özer (http://muhittinozer.com) 
*/

var note = 'noty - a jquery notification library!';

$(document).ready(function() {

	// EX 1 ======================	
	
	// ex1 - alert
	$('.ex1.alert').click(function() {
		noty({text: note});
	});
	
	// ex1 - error
	$('.ex1.error').click(function() {
		noty({text: note, type: 'error'});
	});
	
	// ex1 - success
	$('.ex1.success').click(function() {
		noty({text: note, type: 'success'});
	});
	
	// ex1 - confirm
	$('.ex1.confirm').click(function() {
		noty({
			text: note, 
			buttons: [
		    {type: 'button green', text: 'Ok', click: function() {noty({force: true, text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'button pink', text: 'Cancel', click: function() {noty({force: true, text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
	});
	
	// EX 2 ======================
	
	// ex2 - alert
	$('.ex2.alert').click(function() {
		noty({layout: 'bottom', text: note});
	});
	
	// ex2 - error
	$('.ex2.error').click(function() {
		noty({layout: 'bottom', text: note, type: 'error'});
	});
	
	// ex2 - success
	$('.ex2.success').click(function() {
		noty({layout: 'bottom', text: note, type: 'success'});
	});
	
	// ex2 - confirm
	$('.ex2.confirm').click(function() {
		noty({
			layout: 'bottom',
			text: note, 
			buttons: [
		    {type: 'button green', text: 'Ok', click: function() {noty({force: true, layout: 'bottom', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'button pink', text: 'Cancel', click: function() {noty({force: true, layout: 'bottom', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
	});
	
	// EX 3 ======================
	
	// ex3 - alert
	$('.ex3.alert').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: note});
	});
	
	// ex3 - error
	$('.ex3.error').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: note, type: 'error'});
	});
	
	// ex3 - success
	$('.ex3.success').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: note, type: 'success'});
	});
	
	// ex3 - confirm
	$('.ex3.confirm').click(function() {
		noty({
			animateOpen: {opacity: 'show'},
			animateClose: {opacity: 'hide'},
			layout: 'center',
			text: note, 
			buttons: [
		    {type: 'button green', text: 'Ok', click: function() {noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'button pink', text: 'Cancel', click: function() {noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
	});
	
	// EX 4 ======================
	
	// ex4 - alert
	$('.ex4.alert').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topLeft', text: note, textAlign: 'left'});
	});
	
	// ex4 - error
	$('.ex4.error').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topLeft', text: note, type: 'error', textAlign: 'left'});
	});
	
	// ex4 - success
	$('.ex4.success').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topLeft', text: note, type: 'success', textAlign: 'left'});
	});
	
	// ex4 - confirm
	$('.ex4.confirm').click(function() {
		noty({
			animateOpen: {opacity: 'show'},
			animateClose: {opacity: 'hide'},
			layout: 'topLeft',
			text: note, 
			buttons: [
		    {type: 'button green', text: 'Ok', click: function() {noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topLeft', text: 'You clicked "Ok" button', type: 'success', textAlign: 'left'});} },
		    {type: 'button pink', text: 'Cancel', click: function() {noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topLeft', text: 'You clicked "Cancel" button', type: 'error', textAlign: 'left'});} }
		    ],
		  closable: false,
		  timeout: false,
		  textAlign: 'left'
		});
	});
	
	// EX 5 ======================
	
	// ex5 - alert
	$('.ex5.alert').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topRight', text: note, textAlign: 'left'});
	});
	
	// ex5 - error
	$('.ex5.error').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topRight', text: note, type: 'error', textAlign: 'left'});
	});
	
	// ex5 - success
	$('.ex5.success').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topRight', text: note, type: 'success', textAlign: 'left'});
	});
	
	// ex5 - confirm
	$('.ex5.confirm').click(function() {
		noty({
			animateOpen: {opacity: 'show'},
			animateClose: {opacity: 'hide'},
			layout: 'topRight',
			text: note, 
			buttons: [
		    {type: 'button green', text: 'Ok', click: function() {noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topRight', text: 'You clicked "Ok" button', type: 'success', textAlign: 'left'});} },
		    {type: 'button pink', text: 'Cancel', click: function() {noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topRight', text: 'You clicked "Cancel" button', type: 'error', textAlign: 'left'});} }
		    ],
		  closable: false,
		  timeout: false,
		  textAlign: 'left'
		});
	});
	
});





















