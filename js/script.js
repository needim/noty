/* 
 * Authors: Nedim Arabacı (http://ned.im)
 */

var notes = [];

notes['alert'] = 'Best check yo self, you\'re not looking too good.';
notes['error'] = 'Change a few things up and try submitting again.';
notes['success'] = 'You successfully read this important alert message.';
notes['information'] = 'This alert needs your attention, but it\'s not super important.';
notes['warning'] = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';
notes['confirm'] = 'Do you want to continue?';

function commit_history() {
	$.getJSON('https://api.github.com/repos/needim/noty/commits?callback=?', function (json) {
		$('#commit-history-json tr').remove();
		$.each(json.data, function (i, data) {
			var $col = $('<tr style="border-bottom: 1px solid #999; text-shadow: none" />');
			var $committer = $('<td valign="top" style="white-space: nowrap;" />').html(data.commit.committer.name);
			var $link = $('<a style="font-weight: bold" />').attr('href', 'https://github.com/needim/noty/commit/' + data.sha).html(data.commit.message);
			var $url = $('<td valign="top" style="padding: 0 10px"/>').append($link);
			var $date = $('<td valign="top" style="text-align: right; white-space: nowrap;" />').html(moment(data.commit.committer.date, "YYYY-MM-DDTHH:mm:ssZ").fromNow());

			$col.append($committer);
			$col.append($url);
			$col.append($date);

			$('#commit-history-json').append($col);
		});
	});
}


$(document).ready(function () {

	noty({
		text     : '<div><img width="100" src="http://needim.github.io/noty/img/noty-v2-logo.png" alt="noty" style="float: right"/> <strong>Hi!</strong> <br /> noty v2.2.2 released!</div>',
		layout   : 'topLeft',
		closeWith: ['click']
	});

	commit_history();

	$('.inner-menu').appendTo($('h4')).fadeIn();

	if (location.hash) {
		$('a[href=' + location.hash + ']').trigger('click');
	} else {
		$('a[href=#welcome]').trigger('click');
	}

	$('.inner-menu a').click(function () {
		var self = $(this);
		$("html, body").animate({ scrollTop: $(self.attr('href')).offset().top - 20 }, 1000);
		window.location.hash = self.attr('href');
		return false;
	});

	$('span.runner').click(function () {

		var self = $(this);

		if (self.data('layout') == 'inline') {
			$(self.data('custom')).noty({
				text        : notes[self.data('type')],
				type        : self.data('type'),
				dismissQueue: true,
				buttons     : (self.data('type') != 'confirm') ? false : [
					{addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {

						// this = button element
						// $noty = $noty element

						$noty.close();
						$(self.data('custom')).noty({force: true, text: 'You clicked "Ok" button', type: 'success'});
					}
					},
					{addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
						$noty.close();
						$(self.data('custom')).noty({force: true, text: 'You clicked "Cancel" button', type: 'error'});
					}
					}
				]
			});
			return false;
		}

		noty({
			text        : notes[self.data('type')],
			type        : self.data('type'),
			dismissQueue: true,
			layout      : self.data('layout'),
			buttons     : (self.data('type') != 'confirm') ? false : [
				{addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {

					// this = button element
					// $noty = $noty element

					$noty.close();
					noty({force: true, text: 'You clicked "Ok" button', type: 'success', layout: self.data('layout')});
				}
				},
				{addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
					$noty.close();
					noty({force: true, text: 'You clicked "Cancel" button', type: 'error', layout: self.data('layout')});
				}
				}
			]
		});
		return false;
	});

});