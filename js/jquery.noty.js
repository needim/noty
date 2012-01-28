/**
 * jQuery Noty Plugin 0.1
 *
 * Copyright (c) 2011 LMS Co Inc.
 * Authors: Nedim Arabacı (http://ned.im), Muhittin Özer (http://muhittinozer.com)
 * 
 * Created: 31/10/2011
 *
 * Licensed under the MIT licenses:
 * http://www.opensource.org/licenses/mit-license.php
 *
 **/
(function($) { 
	
	$.fn.noty = function(options)
	{
		
		$.fn.noty.defaults = {
			layout: 'top',
			fx: 'slideDown',
			multiple: false,
			text: null,
			type: 'alert',
			closable: true,
			speed: 500,
			timeout: 5000,
			onShow: false,
			onClose: false,
			buttons: false,
			textAlign: 'center'
		};
		
		$.fn.noty.init(options);
		
	};
	
	$.fn.noty.init = function(options)
	{
		$.fn.noty.options = $.extend({}, $.fn.noty.defaults, options);
		var status = 'none';
		
		if ($('#noty_bar').length == 0)
		{
			$("body").prepend("<div id='noty_bar' class='"+ $.fn.noty.options.layout +"'><div id='noty_message'></div><div id='noty_close'></div></div>");
			$.fn.noty.newNoty = false;
			status = 'none';
		}
		else 
		{
			status = $("#noty_bar").css("display");
		}

		$.fn.noty.bar = $("#noty_bar");
		if (status != "none")
		{
			$.fn.noty.close();
			setTimeout(
				function()
				{
					$.fn.noty.newNoty = true;
					$.fn.noty.show();
				}, 
				$.fn.noty.options.speed
			);
			return;
		}
		$.fn.noty.show();
	};
	
	$.fn.noty.render = function()
	{
		$.fn.noty.bar.attr("class", $.fn.noty.options.layout +" "+ $.fn.noty.options.type);
		$.fn.noty.bar.find('#noty_message').html($.fn.noty.options.text).css({
			textAlign: $.fn.noty.options.textAlign
		});

		($.fn.noty.options.closable) ? $.fn.noty.bar.find("#noty_close").show() : $.fn.noty.bar.find("#noty_close").hide();
		var bdefault = ($.fn.noty.options.type == "error") ? 'gray' : '';

		if ($.fn.noty.options.buttons)
		{
			$.fn.noty.bar.find('#noty_message').append("<div id='noty_buttons'></div>");
			for (var i=0; i < $.fn.noty.options.buttons.length; i++)
			{
				var button = $.fn.noty.options.buttons[i];
				var bclass = (button.type) ? button.type : bdefault;
				$('<button/>').addClass(bclass).html(button.text).one("click",button.click).appendTo($.fn.noty.bar.find("#noty_buttons"));
			}
		}
	};
	
	$.fn.noty.show = function()
	{	
		$.fn.noty.render();
		
		if ($.fn.noty.options.fx == "slideDown") 
		{
			$.fn.noty.bar.slideDown($.fn.noty.options.speed, $.fn.noty.options.onShow);
		} 
		else if ($.fn.noty.options.fx == "fadeIn") 
		{
			$.fn.noty.bar.fadeIn($.fn.noty.options.speed, $.fn.noty.options.onShow);
		} 
		else 
		{
			$.fn.noty.bar.show($.fn.noty.options.speed, $.fn.noty.options.onShow);
		}
		
		if($.fn.noty.options.timeout)
		{
			setTimeout(function(){
				if ($.fn.noty.newNoty == false)
				{
					$.fn.noty.close();
				}
			},$.fn.noty.options.timeout);
		}

		$.fn.noty.bar.find("#noty_close").one("click",function(){
			$.fn.noty.close();
		});

	};
	
	$.fn.noty.close = function()
	{
		$.fn.noty.newNoty = false;
		
		if ($.fn.noty.options.fx == "slideDown")
		{
			$.fn.noty.bar.slideUp($.fn.noty.options.speed, $.fn.noty.options.onClose);
		} 
		else if ($.fn.noty.options.fx == "fadeIn") 
		{
			$.fn.noty.bar.fadeOut($.fn.noty.options.speed, $.fn.noty.options.onClose);
		} 
		else 
		{
			$.fn.noty.bar.hide($.fn.noty.options.speed, $.fn.noty.options.onClose);
		}
		
	};
})(jQuery);

function noty(options) 
{
	$.fn.noty(options);
}

function alert(param)
{
	noty({text:param, timeout:false});
}

function message(options)
{
	noty(options);
}