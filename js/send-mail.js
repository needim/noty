/* jQuery Ajax Mail Send Script */

(function ($) {
	
	$(function() {
		
		var contactForm = $( '#contact-form' );
		
		var $alert = $('.site-alert');
		
		contactForm.submit(function()
		{
			if (contactForm.valid())
			{
				NProgress.start();
				var formValues = $(this).serialize();
				
				$.post($(this).attr('action'), formValues, function(data)
				{
					if ( data == 'success' )
					{
						contactForm.clearForm();
					}
					else
					{
						$alert.addClass('error');
					}
					NProgress.done();
					$alert.removeClass('slideOutRight').show().addClass('slideInLeft');
					setTimeout(function() { $alert.removeClass('slideInLeft').addClass('slideOutRight'); },2000)
				});
			}
			
			return false
		});
	
	});
	
	
	$.fn.clearForm = function() {
	  return this.each(function() {
	    var type = this.type, tag = this.tagName.toLowerCase();
	    if (tag == 'form')
	      return $(':input',this).clearForm();
	    if (type == 'text' || type == 'password' || tag == 'textarea')
	      this.value = '';
	    else if (type == 'checkbox' || type == 'radio')
	      this.checked = false;
	    else if (tag == 'select')
	      this.selectedIndex = -1;
	  });
	};

})(jQuery);