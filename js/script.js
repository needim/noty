/* 
 * Authors: Nedim Arabacı (http://ned.im), Muhittin Özer (http://muhittinozer.com) 
*/

var alert_note = 'Best check yo self, you\'re not looking too good.';
var error_note = 'Change a few things up and try submitting again.';
var success_note = 'You successfully read this important alert message.';
var information_note = 'This alert needs your attention, but it\'s not super important.';
var note = 'Do you want to continue?';

function getCode() {
	var optionsArray = $('#noty_creator').serializeArray();
	var options = {};
	var objects = ['onShow', 'onClose', 'animateOpen', 'animateClose', 'speed', 'timeout'];
	
	$.each(optionsArray, function(index, field) { 
		if (jQuery.inArray(field.name, objects) > -1) {
			options[field.name] = eval("(" + field.value + ')');
		} else {
			if (field.value == 'false') {
				options[field.name] = false;
			} else if (field.value == 'true') {
				options[field.name] = true;
			} else {
				options[field.name] = field.value;
			}
		}
		if ($.noty.defaultOptions.theme != 'noty_theme_default')
			options['theme'] = $.noty.defaultOptions.theme;
	});
	return options;
}

function commit_history() {
	$.getJSON('http://github.com/api/v2/json/commits/list/needim/noty/master?callback=?', function(json) {
		$('#commit-history-json tr').remove();
		$.each(json.commits, function(i, commit) {
			var $col = $('<tr />');
			var $committer = $('<td />').html(commit.committer.name);
			var $link = $('<a />').attr('href', 'https://github.com/needim/noty/commit/' + commit.id).html(commit.message);
			var $url = $('<td />').append($link);
			var $date = $('<td />').html($.format.date(commit.committed_date, "dd.MM.yy hh:mm a"));
			
			$col.append($committer);
			$col.append($url);
			$col.append($date);
			
			$('#commit-history-json').append($col);
		});
	});
}

$(document).ready(function() {
	
	$("select#theme_switcher").val('noty_theme_default');
	$("select#theme_switcher").change(function() {
		$('.noty_theme_default').removeClass('noty_theme_default').addClass($(this).val());
		$('.noty_theme_mitgux').removeClass('noty_theme_mitgux').addClass($(this).val());
		$('.noty_theme_twitter').removeClass('noty_theme_twitter').addClass($(this).val());
		$('.noty_theme_facebook').removeClass('noty_theme_facebook').addClass($(this).val());
		$.noty.defaultOptions.theme = $(this).val();
	});
	
	$('.api-func').click(function(e) {
		try {
			var func = $(this).attr('title');
			eval(func);
		} catch (e) {
			// TODO: handle exception
		}
		e.preventDefault();
	});
	
	$(".cb-enable").live('click', function(){
		var parent = $(this).parents('.switch');
		$('.cb-disable',parent).removeClass('selected');
		$(this).addClass('selected');
		if ($(this).attr('title') == 'noty_theme_mitgux') {
			$.noty.defaultOptions.theme = 'noty_theme_mitgux';
		} else if ($(this).attr('title')) {
			$('#'+$(this).attr('title')).val('true');
		} else {
			$.noty.defaultOptions.modal = true;
		}
	});
	
	$(".cb-disable").live('click', function(){
		var parent = $(this).parents('.switch');
		$('.cb-enable',parent).removeClass('selected');
		$(this).addClass('selected');
		if ($(this).attr('title') == 'noty_theme_mitgux') {
			$.noty.defaultOptions.theme = 'noty_theme_default';
		} else if ($(this).attr('title')) {
			$('#'+$(this).attr('title')).val('false');
		} else {
			$.noty.defaultOptions.modal = false;
		}
	});
	
	$('a.show-div').click(function() {
		var $button = $(this); 
		$('div.content').load($button.attr('href').replace('#', '')+'.html', function() {
			Rainbow.color();
			$('ul a.active').removeClass('active');
			$button.addClass('active');
			if ($button.attr('href') == '#commit-history') commit_history();
		});
	});
	
	if (location.hash) {
		$('a[href='+location.hash+']').trigger('click');
	} else {
		$('a[href=#welcome]').trigger('click');
	}
	
	$('#getCode').live('click', function() {
		var source = getCode();
		$('textarea#getCodeResult').html('noty('+ JSON.stringify(source) +');').slideDown();
	});
	
	$('#runIt').live('click', function() {
		var source = getCode();
		noty(source);
	});
	
	// EX 1 ======================	
	
	// ex1 - alert
	$('.ex1.alert').click(function() {
		noty({text: alert_note, custom: {container: $('#wrapper')}});
		return false;
	});
	
	// ex1 - error
	$('.ex1.error').click(function() {
		noty({text: error_note, type: 'error'});
		return false;
	});
	
	// ex1 - success
	$('.ex1.success').click(function() {
		noty({text: success_note, type: 'success'});
		return false;
	});
	
	// ex1 - information
	$('.ex1.information').click(function() {
		noty({text: information_note, type: 'information'});
		return false;
	});
	
	// ex1 - confirm
	$('.ex1.confirm').click(function() {
		noty({
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {
		    			
		    			// this = button element
		    			// $noty = $noty element
		    	
		    			$noty.close();
		    			noty({force: true, text: 'You clicked "Ok" button', type: 'success'});
		    	}
		    },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {
		    		$noty.close();
			    	noty({force: true, text: 'You clicked "Cancel" button', type: 'error'});
		    	}
		    }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 2 ======================
	
	// ex2 - alert
	$('.ex2.alert').click(function() {
		noty({layout: 'bottom', text: alert_note});
		return false;
	});
	
	// ex2 - error
	$('.ex2.error').click(function() {
		noty({layout: 'bottom', text: error_note, type: 'error'});
		return false;
	});
	
	// ex2 - success
	$('.ex2.success').click(function() {
		noty({layout: 'bottom', text: success_note, type: 'success'});
		return false;
	});
	
	// ex2 - information
	$('.ex2.information').click(function() {
		noty({layout: 'bottom', text: information_note, type: 'information'});
		return false;
	});
	
	// ex2 - confirm
	$('.ex2.confirm').click(function() {
		noty({
			layout: 'bottom',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, layout: 'bottom', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, layout: 'bottom', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 3 ======================
	
	// ex3 - alert
	$('.ex3.alert').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: alert_note});
		return false;
	});
	
	// ex3 - error
	$('.ex3.error').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: error_note, type: 'error'});
		return false;
	});
	
	// ex3 - success
	$('.ex3.success').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: success_note, type: 'success'});
		return false;
	});
	
	// ex3 - information
	$('.ex3.information').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: information_note, type: 'information'});
		return false;
	});
	
	// ex3 - confirm
	$('.ex3.confirm').click(function() {
		noty({
			animateOpen: {opacity: 'show'},
			animateClose: {opacity: 'hide'},
			layout: 'center',
			text: note, 
			buttons: [
		    {type: 'btn btn-mini btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-mini btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'center', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 4 ======================
	
	// ex4 - alert
	$('.ex4.alert').click(function() {
		noty({layout: 'topLeft', text: alert_note});
		return false;
	});
	
	// ex4 - error
	$('.ex4.error').click(function() {
		noty({layout: 'topLeft', text: error_note, type: 'error'});
		return false;
	});
	
	// ex4 - success
	$('.ex4.success').click(function() {
		noty({layout: 'topLeft', text: success_note, type: 'success'});
		return false;
	});
	
	// ex4 - information
	$('.ex4.information').click(function() {
		noty({layout: 'topLeft', text: information_note, type: 'information'});
		return false;
	});
	
	// ex4 - confirm
	$('.ex4.confirm').click(function() {
		noty({
			layout: 'topLeft',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, layout: 'topLeft', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, layout: 'topLeft', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 5 ======================
	
	// ex5 - alert
	$('.ex5.alert').click(function() {
		noty({layout: 'topRight', text: alert_note});
		return false;
	});
	
	// ex5 - error
	$('.ex5.error').click(function() {
		noty({layout: 'topRight', text: error_note, type: 'error'});
		return false;
	});
	
	// ex5 - success
	$('.ex5.success').click(function() {
		noty({layout: 'topRight', text: success_note, type: 'success'});
		return false;
	});
	
	// ex5 - information
	$('.ex5.information').click(function() {
		noty({layout: 'topRight', text: information_note, type: 'information'});
		return false;
	});
	
	// ex5 - confirm
	$('.ex5.confirm').click(function() {
		noty({
			layout: 'topRight',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, layout: 'topRight', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, layout: 'topRight', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 6 ======================
	
	// ex6 - alert
	$('.ex6.alert').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: alert_note});
		return false;
	});
	
	// ex6 - error
	$('.ex6.error').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: error_note, type: 'error'});
		return false;
	});
	
	// ex6 - success
	$('.ex6.success').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: success_note, type: 'success'});
		return false;
	});
	
	// ex6 - information
	$('.ex6.information').click(function() {
		noty({animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: information_note, type: 'information'});
		return false;
	});
	
	// ex6 - confirm
	$('.ex6.confirm').click(function() {
		noty({
			animateOpen: {opacity: 'show'},
			animateClose: {opacity: 'hide'},
			layout: 'topCenter',
			text: note, 
			buttons: [
		    {type: 'btn btn-mini btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-mini btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'topCenter', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// EX 7 ======================
	
	// ex7 - alert
	$('.ex7.alert').click(function() {
		noty({layout: 'bottomLeft', text: alert_note});
		return false;
	});
	
	// ex7 - error
	$('.ex7.error').click(function() {
		noty({layout: 'bottomLeft', text: error_note, type: 'error'});
		return false;
	});
	
	// ex7 - success
	$('.ex7.success').click(function() {
		noty({layout: 'bottomLeft', text: success_note, type: 'success'});
		return false;
	});
	
	// ex7 - information
	$('.ex7.information').click(function() {
		noty({layout: 'bottomLeft', text: information_note, type: 'information'});
		return false;
	});	

	// ex7 - confirm
	$('.ex7.confirm').click(function() {
		noty({
			layout: 'bottomLeft',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, layout: 'bottomLeft', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, layout: 'bottomLeft', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
// EX 8 ======================
	
	// ex8 - alert
	$('.ex8.alert').click(function() {
		noty({layout: 'bottomRight', text: alert_note});
		return false;
	});
	
	// ex8 - error
	$('.ex8.error').click(function() {
		noty({layout: 'bottomRight', text: error_note, type: 'error'});
		return false;
	});
	
	// ex8 - success
	$('.ex8.success').click(function() {
		noty({layout: 'bottomRight', text: success_note, type: 'success'});
		return false;
	});
	
	// ex8 - information
	$('.ex8.information').click(function() {
		noty({layout: 'bottomRight', text: information_note, type: 'information'});
		return false;
	});
	
	// ex8 - confirm
	$('.ex8.confirm').click(function() {
		noty({
			animateOpen: {height: 'toggle'},
			animateClose: {height: 'toggle'},
			layout: 'bottomRight',
			text: note, 
			buttons: [
		    {type: 'btn btn-primary', text: 'Ok', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'bottomRight', text: 'You clicked "Ok" button', type: 'success'});} },
		    {type: 'btn btn-danger', text: 'Cancel', click: function($noty) {$noty.close(); noty({force: true, animateOpen: {opacity: 'show'}, animateClose: {opacity: 'hide'}, layout: 'bottomRight', text: 'You clicked "Cancel" button', type: 'error'});} }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
	// CUSTOM CONTAINER ======================	
	
	// custom_inline - alert
	$('.custom_inline.alert').live('click', function() {
		$('.custom_container').noty({text: alert_note, layout: 'inline'});
		return false;
	});
	
	// custom_inline - error
	$('.custom_inline.error').live('click', function() {
		noty({text: error_note, type: 'error', layout: 'inline', custom: {container: $('.custom_container')}});
		return false;
	});
	
	// custom_inline - success
	$('.custom_inline.success').live('click', function() {
		noty({text: success_note, type: 'success', layout: 'inline', custom: {container: $('.custom_container')}});
		return false;
	});
	
	// custom_inline - information
	$('.custom_inline.information').live('click', function() {
		noty({text: information_note, type: 'information', layout: 'inline', custom: {container: $('.custom_container')}});
		return false;
	});
	
	// custom_inline - confirm
	$('.custom_inline.confirm').live('click', function() {
		noty({
			text: note,
			layout: 'inline', custom: {container: $('.custom_container')},
			buttons: [
		    {type: 'btn btn-mini btn-primary', text: 'Ok', click: function($noty) {
		    			
		    			// this = button element
		    			// $noty = $noty element
		    	
		    			$noty.close();
		    			noty({force: true, text: 'You clicked "Ok" button', type: 'success', layout: 'inline', custom: {container: $('.custom_container')}});
		    	}
		    },
		    {type: 'btn btn-mini btn-danger', text: 'Cancel', click: function($noty) {
		    		$noty.close();
			    	noty({force: true, text: 'You clicked "Cancel" button', type: 'error', layout: 'inline', custom: {container: $('.custom_container')}});
		    	}
		    }
		    ],
		  closable: false,
		  timeout: false
		});
		return false;
	});
	
});