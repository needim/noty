/**
 * jQuery Noty Plugin v0.1
 * Authors: Nedim Arabacı (http://ned.im), Muhittin Özer (http://muhittinozer.com)
 * 
 * http://needim.github.com/noty/
 *
 * Licensed under the MIT licenses:
 * http://www.opensource.org/licenses/mit-license.php
 *
 **/
(function($) {
	$.noty = function(options) {

		var base = this;

		base.init = function() {

			base.options = $.extend({}, $.noty.defaultOptions, options);
			base.options.id = 'noty_'+new Date().getTime();
			
			base.options.layout = 'noty_layout_'+base.options.layout;
			base.options.type = 'noty_'+base.options.type;

			// Push notification to queue
			if (jQuery.inArray(base.options.layout, $.noty.growls) == -1) {
				if (base.options.force) {
					$.noty.queue.unshift({options: base.options});
				} else {
					$.noty.queue.push({options: base.options});
				}
				base.render();
			} else {
				base.render({options: base.options});
			}

		};

		// Render the queue
		base.render = function(noty) {

			if ($.noty.available || (jQuery.type(noty) === 'object')) {

				$.noty.available = (jQuery.type(noty) === 'object') ? $.noty.available : false;

				// Get noty from queue
				var notification = (jQuery.type(noty) === 'object') ? noty : $.noty.queue.shift();

				if (jQuery.type(notification) === 'object') {

					// Layout spesific container settings
					if (jQuery.inArray(base.options.layout, $.noty.growls) > -1) {
						if ($("ul.noty_container."+notification.options.layout).length > 0) {
							base.$noty_container = $("ul.noty_container."+notification.options.layout);
						} else {
							base.$noty_container = $('<ul/>').addClass('noty_container').addClass(notification.options.layout);
							$("body").prepend(base.$noty_container);
						}
						base.$notyContainer = $('<li/>');
						base.$noty_container.prepend(base.$notyContainer);

					} else {
						base.$notyContainer = $("body");
					}
					base.$bar 		= $('<div/>').addClass('noty_bar');
					base.$message = $('<div/>').addClass('noty_message');
					base.$text 		= $('<div/>').addClass('noty_text');
					base.$close 	= $('<div/>').addClass('noty_close');

					base.$message.append(base.$text).append(base.$close);
					base.$bar.append(base.$message);

					var $noty = base.$bar;
					$noty.data('noty_options', notification.options);

					// Basic layout settings
					$noty.addClass(notification.options.layout).addClass(notification.options.type).addClass(notification.options.theme);
					
					// Message and style settings
					$noty.find('.noty_text').html(notification.options.text).css({textAlign: notification.options.textAlign});

					// Closable option
					(notification.options.closable) ? $noty.addClass('noty_closable').find('.noty_close').show() : $noty.find('.noty_close').remove();

					// Bind close event to button 
					$noty.find('.noty_close').bind('click', function() { $noty.triggerHandler('noty.close'); });

					// If we have a button we must disable closeOnSelfClick option
					if (notification.options.buttons) {
						notification.options.closeOnSelfClick = false;
					}

					// Close on self click
					if (notification.options.closeOnSelfClick) {
						$noty.find('.noty_message').bind('click', function() { $noty.triggerHandler('noty.close'); }).css('cursor', 'pointer');
					}

					// Close on self click
					if (notification.options.closeOnSelfOver) {
						$noty.find('.noty_message').bind('mouseover', function() { $noty.triggerHandler('noty.close'); }).css('cursor', 'pointer');
					}

					// is Modal? 
					if (notification.options.modal) {
						$('<div />').addClass('noty_modal').addClass(notification.options.theme).prependTo($('body')).fadeIn('fast');
					}

					// Prepend noty to container
					base.$notyContainer.prepend($noty);
					
					$noty.close = function() {
						this.trigger('noty.close');
					};
					
					// Bind close event
					$noty.one('noty.close', function(event) {
						var options = $noty.data('noty_options');

						// Modal Cleaning
						if (options.modal) {
							$('.noty_modal').fadeOut('fast', function() { $(this).remove(); });
						}

						$noty.stop().animate(
								$noty.data('noty_options').animateClose,
								$noty.data('noty_options').speed,
								$noty.data('noty_options').easing,
								$noty.data('noty_options').onClose)
						.promise().done(function() {

							// Layout spesific cleaning
							if (jQuery.inArray(base.options.layout, $.noty.growls) > -1) {
								$noty.parent().remove();
							} else {
								$noty.remove();
								
								// queue render
								$.noty.available = true;
								base.render();
							}

						});
					});

					// Set buttons if available
					if (notification.options.buttons) {
						$buttons = $('<div/>').addClass('noty_buttons');
						$noty.find('.noty_text').append($buttons);

						$.each(notification.options.buttons, function(i, button) {
							bclass = (button.type) ? button.type : 'gray';
							$button = $('<button/>').addClass(bclass).html(button.text).appendTo($noty.find('.noty_buttons'))
							.bind("click", function() {
								if ($.isFunction(button.click)) {
									button.click.call($button, $noty);
								}
							});
						});
					}
					
					// topCenter and center specific options
					if (notification.options.layout == 'noty_layout_topCenter' || notification.options.layout == 'noty_layout_center') {
						$noty.css({
							'left': ($(window).width() - $noty.outerWidth()) / 2 + 'px'
						});
					}

					// Start the show
					$noty.animate(
							notification.options.animateOpen,
							notification.options.speed,
							notification.options.easing,
							notification.options.onShow);

					// If noty is have a timeout option
					if (notification.options.timeout) {
						$noty.delay(notification.options.timeout).promise().done(function() { $noty.triggerHandler('noty.close'); });
					}

				} else {
					// Queue is over
					$.noty.available = true;
				}

			}
		};

		// Run initializer
		base.init();
	};

	$.noty.queue = [];
	$.noty.growls = ['noty_layout_topLeft', 'noty_layout_topRight', 'noty_layout_bottomLeft', 'noty_layout_bottomRight'];
	
	$.noty.clearQueue = function () {
		$.noty.queue = [];
	};

	$.noty.close = function () {
		$('.noty_bar:first').trigger('noty.close');
	};

	$.noty.closeAll = function () {
		$.noty.clearQueue();
		$('.noty_bar').trigger('noty.close');
	};

	$.noty.available = true;
	$.noty.defaultOptions = {
		layout : "top",
		theme : "noty_theme_default",
		animateOpen : {height: 'toggle'},
		animateClose : {height: 'toggle'},
		easing : 'swing',
		text : "null",
		textAlign : "center",
		type : "alert",
		speed : 500,
		timeout : 5000,
		closable : false,
		closeOnSelfClick : true,
		closeOnSelfOver : false,
		force : false,
		onShow : false,
		onClose : false,
		buttons : false,
		modal : false
	};

	$.fn.noty = function(options) {
		return new $.noty(options);
	};

})(jQuery);

// Helper
function noty(options) {
	jQuery.fn.noty(options);
}