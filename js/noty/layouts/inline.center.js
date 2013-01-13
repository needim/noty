;(function($) {

	$.noty.layouts.inline_center = {
		name: 'inline_center',
		options: {},
		container: {
			object: '<ul id="noty_inline_layout_container" />',
			selector: 'ul#noty_inline_layout_container',
			style: function() {
				$(this).parent().css({position: 'relative'});
				

				
				$(this).css({
					position: 'absolute',
					width: '310px',
					height: 'auto',
					margin: 0,
					padding: 0,
					listStyleType: 'none',
					zIndex: 10000000
				});

				// getting hidden height
				var dupe = $(this).clone().css({visibility:"hidden", display:"block", position:"absolute", top: 0, left: 0}).attr('id', 'dupe');
				$("body").append(dupe);
				dupe.find('.i-am-closing-now').remove();
				dupe.find('li').css('display', 'block');
				var actual_height = dupe.height();
				dupe.remove();

				if ($(this).hasClass('i-am-new')) {
					$(this).css({
						left: ($(this).parent().width() - $(this).outerWidth(false)) / 2 + 'px',
						top: ($(this).parent().outerHeight(false) - actual_height) / 2 + $(this).parent().scrollTop() + 'px'
					});
				} else {
					$(this).animate({
						left: ($(this).parent().width() - $(this).outerWidth(false)) / 2 + 'px',
						top: ($(this).parent().outerHeight(false) - $(this).parent().scrollTop() - actual_height) / 2 + $(this).parent().scrollTop() + 'px'
					}, 500);
				}
			}
		},
		parent: {
			object: '<li />',
			selector: 'li',
			css: {}
		},
		css: {
			display: 'none'
		},
		addClass: ''
	};

})(jQuery);