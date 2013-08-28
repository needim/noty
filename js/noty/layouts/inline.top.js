;(function($) {

	$.noty.layouts.inline_top = {
		name: 'inline_top',
		options: {},
		container: {
			object: '<ul id="noty_inline_layout_container" />',
			selector: 'ul#noty_inline_layout_container',
			style: function() {
				$(this).parent().css({position: 'relative'});
				
				$(this).css({
					position: 'absolute',
					top: $(this).parent().scrollTop() + 'px',
					left: '5%',
					width: '90%',
					height: 'auto',
					margin: 0,
					padding: 0,
					listStyleType: 'none',
					zIndex: 9999999
				});
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