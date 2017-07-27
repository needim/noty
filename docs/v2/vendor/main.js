/* global variables */
var classicLayout = false;
var portfolioKeyword;
var $container, $blog_container;

window.anim = {};
window.anim.open = 'flipInX';
window.anim.close = 'flipOutX';


(function ($) {
	
	
	/* DOCUMENT LOAD */
	$(function() {

		new Share(".sharer-btn", {
			title: 'NOTY - a jQuery Notification Plugin',
			description: 'notyjs is a jQuery plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.',
			image: 'http://ned.im/noty/v2/images/projects/noty-v2-logo.png',
			networks: {
				pinterest: {
					enabled: false
				},
				facebook: {
					load_sdk: true,
					app_id: '198259823578303',
					title: 'NOTY - a jQuery Notification Plugin',
				  	caption: 'NOTY is a jquery plugin which is have too many options for display notification',
				  	description: 'NOTYJS is a jQuery plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.',
				  	image: 'http://ned.im/noty/v2/images/projects/noty-v2-logo.png'
				},
				twitter: {
					description: 'NOTYJS - a jQuery Notification Plugin &num;notyjs &num;jquery &num;notification &num;plugin'
				}
			}
		});

        $('#anim-open').on('change', function (e) {
            window.anim.open = $(this).val();
        });

        $('#anim-close').on('change', function (e) {
            window.anim.close = $(this).val();
        });

        $('.runner').on('click', function (e) {

            var notes = [];

            notes['alert'] = 'Best check yo self, you\'re not looking too good.';
            notes['error'] = 'Change a few things up and try submitting again.';
            notes['success'] = 'You successfully read this important alert message.';
            notes['information'] = 'This alert needs your attention, but it\'s not super important.';
            notes['warning'] = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';
            notes['confirm'] = 'Do you want to continue?';

            e.preventDefault();

            var self = $(this);

            if (self.data('layout') == 'inline') {
                $(self.data('custom')).noty({
                    text        : notes[self.data('type')],
                    type        : self.data('type'),
                    theme       : 'relax',
                    dismissQueue: true,
                    animation   : {
                        open  : 'animated bounceInRight',
                        close : 'animated bounceOutRight'
                    },
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
                theme       : 'relax',
                dismissQueue: true,
                layout      : self.data('layout'),
                animation   : {
                    open  : 'animated ' + window.anim.open,
                    close : 'animated ' + window.anim.close
                },
                buttons     : (self.data('type') != 'confirm') ? false : [
                    {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {

                        // this = button element
                        // $noty = $noty element

                        $noty.close();
                        noty({force: true, theme: 'relax', animation: {
                            open  : 'animated ' + window.anim.open,
                            close : 'animated ' + window.anim.close
                        }, text: 'You clicked "Ok" button', type: 'success', layout: self.data('layout')});
                    }
                    },
                    {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                        $noty.close();
                        noty({force: true, theme: 'relax', animation: {
                            open  : 'animated bounceIn',
                            close : 'animated bounceOut'
                        }, text: 'You clicked "Cancel" button', type: 'error', layout: self.data('layout')});
                    }
                    }
                ]
            });
            return false;
        });
		
		// ------------------------------
		// remove click delay on touch devices
		FastClick.attach(document.body);
		// ------------------------------
		
		// ------------------------------
		// Rotating Words
		var rotate_words = $('.rotate-words');
		if(rotate_words.length && Modernizr.csstransforms) {
			rotate_words.find('span').eq(0).addClass('active');
			setInterval(function(){
				next_word_index = rotate_words.find('.active').next().length ? rotate_words.find('.active').next().index() : 0;
				rotate_words.find('.active').addClass('rotate-out').removeClass('rotate-in active');
				rotate_words.find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
			},3000);
		}
		// ------------------------------
		
		
		// ------------------------------
		/* LATEST TWEETS WIDGET
		  * ### HOW TO CREATE A VALID ID TO USE: ###
		  * Go to www.twitter.com and sign in as normal, go to your settings page.
		  * Go to "Widgets" on the left hand side.
		  * Create a new widget for what you need eg "user timeline" or "search" etc. 
		  * Feel free to check "exclude replies" if you dont want replies in results.
		  * Now go back to settings page, and then go back to widgets page, you should
		  * see the widget you just created. Click edit.
		  * Now look at the URL in your web browser, you will see a long number like this:
		  * 345735908357048478
		  * Use this as your ID below instead!
		  */
		var latest_tweets = $('#latest-tweets');
		if(latest_tweets.length) {
			twitterFetcher.fetch(latest_tweets.attr("data-twitterId"), '', latest_tweets.attr("data-tweet-count"), true, false, true, '', false, handleTweets);
		}
		function handleTweets(tweets){
		  var x = tweets.length;
		  var n = 0;
		  var html = '<ul>';
		  while(n < x) {
			html += '<li>' + tweets[n] + '</li>';
			n++;
		  }
		  html += '</ul>';
		  latest_tweets.html(html);
		}	
		// ------------------------------  
		
		
		
		// ------------------------------
		// SEARCH
		$('.search-link').click(function() {
			$(this).toggleClass('active');
			$('.header-search').slideToggle();
		});
		// ------------------------------
		
		
			
		// ------------------------------
		// ONE PAGE LAYOUT FUNCTIONS
		if($('html').hasClass('one-page-layout')) {
			
			// ------------------------------
			// PORTFOLIO DETAILS
			// if url contains a portfolio detail url
			portfolioKeyword = $('section.portfolio').attr('id');
			initialize();
			var detailUrl = giveDetailUrl();
			// ------------------------------
			
			
			// ------------------------------
			// LAYOUT DETECT
			var pagesCount = $('.wrapper > section').length;
			var isIE11 = !!navigator.userAgent.match(/Trident\/7\./); 
			classicLayout = $('html').attr('data-classic-layout') === 'true';
			classicLayout = classicLayout || ($('html').attr('data-mobile-only-classic-layout') === 'true' && $(window).width() < 768);
			classicLayout = classicLayout || !Modernizr.csstransforms3d ||  pagesCount < 3 || isIE11;
			if(classicLayout) {
				$('html').addClass('classic-layout');	
				setActivePage();
				setTimeout(function() { setMasonry(); }, 600);
				setTimeout(function() { setBlogMasonry(); }, 600);	
				$.address.change(function() {
					setActivePage();
					initializeMap();
					setTimeout(function() { setMasonry(); }, 100);
					setTimeout(function() { setBlogMasonry(); }, 100);	
					});
			}
			// initialize triple layout
			$.initTripleLayout(); 
			// ------------------------------
			
			
			// FULL BROWSER BACK BUTTON SUPPORT 
			$.address.change(function() {
					var detailUrl = giveDetailUrl();
					if(detailUrl != -1 ) {
						showProjectDetails(detailUrl);
					} else {
						if ($.address.path().indexOf("/"+ portfolioKeyword)!=-1) {
							hideProjectDetails(true,false);
						}
					}
				}); 
		}
		// ------------------------------	
		
		
		
		
		// ------------------------------
		// PORTFOLIO FILTERING - ISOTOPE
		// cache container
		$container = $('.portfolio-items');
		if($container.length) {
			$container.imagesLoaded(function() {
				
				// initialize isotope
				$container.isotope({
				  itemSelector : '.hentry',
				  layoutMode : $(this).attr('data-layout')
				});
				
				setMasonry();
				$(window).resize(function() {
					setMasonry();
					setTimeout(function() { setMasonry(); }, 400);	
				});
				
				// filter items when filter link is clicked
				$('#filters a').click(function(){
				  var selector = $(this).attr('data-filter');
				  setMasonry();
				  $container.isotope({ filter: selector });
				  $(this).parent().addClass('current').siblings().removeClass('current');
				  return false;
				});
				
			});
		}
		// ------------------------------
		
		
		
		
		
		// ------------------------------
		// BLOG MASONRY LAYOUT
		// cache container
		$blog_container = $('.latest-posts');
		if($blog_container.length) {
			$blog_container.imagesLoaded(function() {
				
				// initialize isotope
				$blog_container.isotope({
				  itemSelector : '.hentry',
				  layoutMode : $(this).attr('data-layout')
				});
				
				setBlogMasonry();
				$(window).resize(function() {
					setTimeout(function() { setBlogMasonry(); }, 600);	
				});
				
			});
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// SETUP
		setup();
		// ------------------------------
		
		
		
		// ------------------------------
		// PORTFOLIO DETAILS
		// Show details
		$(".one-page-layout a.ajax").live('click',function() {
			
			var returnVal;
			var url = $(this).attr('href');
			var baseUrl = $.address.baseURL();
			
			if(url.indexOf(baseUrl) != -1) { // full url
				var total = url.length;
				detailUrl = url.slice(baseUrl.length+1, total);	
			} else { // relative url
				detailUrl = url;
			}
			
			$.address.path(portfolioKeyword + '/' + detailUrl );
			
			return false;
			
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// FORM VALIDATION
		// comment form validation fix
		$('#commentform').addClass('validate-form');
		$('#commentform').find('input,textarea').each(function(index, element) {
            if($(this).attr('aria-required') == "true") {
				$(this).addClass('required');
			}
			if($(this).attr('name') == "email") {
				$(this).addClass('email');
			}
		});
		
		// validate form
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		// ------------------------------
		
		
		// ------------------------------
		// FILL SKILL BARS
		fillBars();
		// ------------------------------
		
		
		
		// ------------------------------
		/* TOOLTIPS */
		$('.tooltip').each(function(index, element) {
        	$(this).tooltipster({
			position: $(this).attr('data-tooltip-pos'),
			fixedWidth : 300,
			offsetX : 8,
			animation : "grow",
			delay : 50
			});
	 
        });	
		// ------------------------------
		
		
		
		// ------------------------------
		// GOOGLE MAP
		/*
			custom map with google api
			check out the link below for more information about api usage
			https://developers.google.com/maps/documentation/javascript/examples/marker-simple
		*/
		function initializeMap() {
			if($('.map').length) {
				var mapCanvas = $('#map-canvas');
				var myLatlng = new google.maps.LatLng(mapCanvas.data("latitude"),mapCanvas.data("longitude"));
				var mapOptions = {
					zoom: mapCanvas.data("zoom"),
					center: myLatlng
				}
				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				
				var marker = new google.maps.Marker({
				  position: myLatlng,
				  map: map
		  	});
			}
		  
		}
		google.maps.event.addDomListener(window, 'load', initializeMap);
		// ------------------------------
		
		
	});
	// DOCUMENT READY
	

	
	// WINDOW ONLOAD
	window.onload = function() {

		$('.container').css('visibility', 'visible');
		wdtLoading.done();

		setTimeout(function() {
			noty({
	            text     : '<div><img width="100" src="http://needim.github.io/noty/v2/images/projects/noty-v2-logo.png" alt="noty" style="float: right"/> <strong>Hi!</strong> <br /> noty v2.3.0 released!</div>',
	            layout   : 'topRight',
	            type     : 'warning',
	            theme    : 'relax',
	            timeout  : 5000,
	            closeWith: ['click'],
	            animation   : {
	                open  : 'animated bounceInRight',
	                close : 'animated bounceOutRight'
	            }
	        });
		}, 2000);
	};
	// WINDOW ONLOAD	
	
	
	
	// ------------------------------
	// ------------------------------
		// FUNCTIONS
	// ------------------------------
	// ------------------------------
	
	
	// ------------------------------
	// INITIALIZE
	var inAnimation, outAnimation;
	function initialize() {
		inAnimation = $('html').attr('data-inAnimation');
		outAnimation = $('html').attr('data-outAnimation');
	}
	// ------------------------------
	
	
	// ------------------------------
	// SETUP : plugins
	function setup() {
		// ------------------------------
		// LIGHTBOX
		setupLigtbox();
		// ------------------------------
		
		
		
		// ------------------------------
		// CODE PRETTIFY
		if($('.prettyprint').length) {
			window.prettyPrint && prettyPrint();
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// TABS
		$('.tabs').each(function() {
			if(!$(this).find('.tab-titles li a.active').length) {
				$(this).find('.tab-titles li:first-child a').addClass('active');
				$(this).find('.tab-content > div:first-child').show();
			} else {
				$(this).find('.tab-content > div').eq($(this).find('.tab-titles li a.active').parent().index()).show();	
			}
		});
		
		$('.tabs .tab-titles li a').click(function() {
			if($(this).hasClass('active')) { return; }
			$(this).parent().siblings().find('a').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs').find('.tab-content > div').hide().eq($(this).parent().index()).show();
			return false;
		});
		// ------------------------------
		
		
		// ------------------------------
		// TOGGLES
		var toggleSpeed = 300;
		$('.toggle h4.active + .toggle-content').show();
	
		$('.toggle h4').click(function() {
			if($(this).hasClass('active')) { 
				$(this).removeClass('active');
				$(this).next('.toggle-content').stop(true,true).slideUp(toggleSpeed);
			} else {
				
				$(this).addClass('active');
				$(this).next('.toggle-content').stop(true,true).slideDown(toggleSpeed);
				
				//accordion
				if($(this).parents('.toggle-group').hasClass('accordion')) {
					$(this).parent().siblings().find('h4').removeClass('active');
					$(this).parent().siblings().find('.toggle-content').stop(true,true).slideUp(toggleSpeed);
				}
				
			}
			return false;
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// RESPONSIVE VIDEOS
		if($('.media-wrap, .portfolio-single').length) {
			$(".media-wrap, .portfolio-single").fitVids();
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// UNIFORM
		$("select:not([multiple]), input:checkbox, input:radio, input:file").uniform();
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
			$('html').addClass('android');
		}
		// ------------------------------
		
		
		
		// ------------------------------
		/* FLEX SLIDER */
		// cache container
		var $flexslider = $('.flexslider');
		if($flexslider.length) {
			
			$flexslider.each(function() {
			
				//wait for images
				$(this).imagesLoaded(function() {
					
					//remove loading
					$(this).find('.loading').remove();
					
					//setup slider
					$(this).flexslider({ 
						smoothHeight: true,
						slideshow: $(this).attr('data-autoplay') != "false",
						slideshowSpeed: $(this).attr('data-interval'), 
						animationSpeed : $(this).attr('data-animationSpeed'),
						animation: $(this).attr('data-animation'), 
						direction : $(this).attr('data-direction'),
						directionNav : $(this).attr('data-directionNav') != "false",
						controlNav : $(this).attr('data-controlNav') != "false",
						randomize : $(this).attr('data-randomize') == "true",
						startAt : $(this).attr('data-startAt') != null ? parseInt($(this).attr('data-startAt')) : 0,
						animationLoop : $(this).attr('data-animationLoop') != "false",
						pauseOnHover : $(this).attr('data-pauseOnHover') != "false",
						reverse : $(this).attr('data-reverse') == "true",
						prevText: "",
						nextText: "",
						start: function(slider) {
								$('.slides li img').click(function(event){
									event.preventDefault();
									slider.flexAnimate(slider.getTarget("next"));
								});
							}
						});
					
				});
			
			});
		}
		// ------------------------------
		
		
		// ------------------------------
		/* MEDIAELEMENT.JS - self hosted html5 video and audio player */
		if($('video,audio').length) {
			$('video,audio').mediaelementplayer({ audioHeight: 50 });	
		}
		// ------------------------------
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// CHANGE PAGE
	function setActivePage() {
		
			$('.page').removeClass('active').hide();
			var path = $.address.path();
			path = path.slice(1, path.length);
			path = giveDetailUrl() != -1 ? portfolioKeyword : path;
			if(path == "") {  // if hash tag doesnt exists - go to first page
				var firstPage = $('.vs-nav li').first().find('a').attr('href');
				path = firstPage.slice(2,firstPage.length);
				$.address.path(path);
				return false;
				}
			
			// show page
			$('#'+ path).fadeIn();
			$('.page.active').hide();
			$('#'+ path).addClass('active');
			setCurrentMenuItem();
			
			if(path.indexOf(portfolioKeyword) != -1) {
				setTimeout(function() { setMasonry(); }, 100);
			} 
			$("body").scrollTop(0);

	}	
	// ------------------------------
	
	
	// ------------------------------
	// PORTFOLIO MASONRY LAYOUT : change the number of masonry columns based on the current container's width
	function setMasonry() {
		
		var itemPerRow = 4;
		var containerW = $container.width();
		var items = $container.children('.hentry');
		var columns, columnWidth;
		var viewports = [ {
				width : 1300,
				columns : itemPerRow
			}, {
				width : 900,
				columns : itemPerRow-1
			}, {
				width : 480,
				columns : itemPerRow - 2
			}, { 
				width : 0,
				columns : itemPerRow - 3
			} ];
	
		for( var i = 0, len = viewports.length; i < len; ++i ) {
	
			var viewport = viewports[i];
	
			if( containerW > viewport.width ) {
	
				columns = viewport.columns;
				break;
	
			}
		}
	
		// set the widths (%) for each of item
		items.each(function(index, element) {
			var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
			var itemWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
			$(this).css( 'width', itemWidth + '%' );
		});
	
		columnWidth = Math.floor( containerW / columns );
		$container.isotope( 'reLayout' ).isotope( 'option', { masonry: { columnWidth: columnWidth } } );
	
	}
	// ------------------------------
	
	
	
	
	
	// ------------------------------
	// BLOG MASONRY LAYOUT : change the number of masonry columns based on the current container's width
	function setBlogMasonry() {
		
		var itemPerRow = 4;
		var containerW = $blog_container.width();
		var items = $blog_container.children('.hentry');
		var columns, columnWidth;
		var viewports = [ {
				width : 1300,
				columns : itemPerRow
			}, {
				width : 900,
				columns : itemPerRow-1
			}, {
				width : 480,
				columns : itemPerRow - 2
			}, { 
				width : 0,
				columns : itemPerRow - 3
			} ];
	
		for( var i = 0, len = viewports.length; i < len; ++i ) {
	
			var viewport = viewports[i];
	
			if( containerW > viewport.width ) {
	
				columns = viewport.columns;
				break;
	
			}
		}
	
		// set the widths (%) for each of item
		items.each(function(index, element) {
			var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
			var itemWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
			$(this).css( 'width', itemWidth + '%' );
		});
	
		columnWidth = Math.floor( containerW / columns );
		$blog_container.isotope( 'reLayout' ).isotope( 'option', { masonry: { columnWidth: columnWidth } } );
	
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// FILL PROGRESS BARS
	function fillBars() {
		$('.bar').each(function() {
			 var bar = $(this);
			 bar.find('.progress').css('width', bar.attr('data-percent') + '%' );
			});
	}	
	// ------------------------------	
	
	
	
	// ------------------------------
	// LIGHTBOX
	function setupLigtbox() {
		
		//html5 validate fix
		$('.lightbox').each(function(index, element) {
			$(this).attr('rel', $(this).attr('data-lightbox-gallery'));
		});
		
		if($("a[rel^='fancybox']").length) {
			$("a[rel^='fancybox']").fancybox({
				centerOnScroll : true,
				padding : 10,
				margin : 44,
				width : 640,
				height : 360,
				transitionOut : 'none',
				overlayColor : '#BEBD97',
				overlayOpacity : '.6',
				onStart : function() {
					$( 'body' ).addClass( 'lightbox-active' );
				},
				onClosed : function() {
					$( 'body' ).removeClass( 'lightbox-active' );
				},
				onComplete : function() {
					if ($(this).attr('href').indexOf("soundcloud.com") >= 0) {
						$('#fancybox-content').height(166);
					}
				}
			});
		}	
	}
	// ------------------------------	
	
	
	
	
	
	// ------------------------------
	// SET CURRENT MENU ITEM
	function setCurrentMenuItem() {
		var activePageId = $('.page.active').attr('id');
		// set default nav menu
		$('.vs-nav a[href$=' + activePageId +']').parent().addClass('current_page_item').siblings().removeClass('current_page_item');
	}	
	// ------------------------------
	
	
	// ------------------------------
	// AJAX PORTFOLIO DETAILS
	var pActive;
	
	function showProjectDetails(url) {
		
		showLoader();
		
		var p = $('.p-overlay:not(.active)').first();
		pActive = $('.p-overlay.active');
		
		if(pActive.length) {
			hideProjectDetails();	  
		}
		
		// ajax : fill data
		p.empty().load(url + ' .portfolio-single', function() {	
			// wait for images to be loaded
			p.imagesLoaded(function() {
				
				hideLoader();
				
				$('html').addClass('p-overlay-on');
				
				$("body").scrollTop(0);
								
				// setup plugins
				setup();
				
				if(Modernizr.csstransforms && Modernizr.csstransforms3d) { // modern browser
				p.removeClass('animated '+ outAnimation + " " + inAnimation ).addClass('animated '+ inAnimation).show();
				} else { //old browser
					p.fadeIn();	
				}
				p.addClass('active');
				
			});
		});
	}
	
	function hideProjectDetails(forever, safeClose) {
		
		$("body").scrollTop(0);
		
		// close completely by back link.
		if(forever) {
			pActive = $('.p-overlay.active');
			
			$('html').removeClass('p-overlay-on');
			
			if(!safeClose) {
				// remove detail url
				$.address.path(portfolioKeyword);
			}
		}
		
		pActive.removeClass('active');
		
		if(Modernizr.csstransforms && Modernizr.csstransforms3d) { // modern browser
			pActive.removeClass('animated '+ inAnimation).addClass('animated '+ outAnimation);
			setTimeout(function() { pActive.hide().removeClass(outAnimation).empty(); } ,1010)
		} else { //old browser
			pActive.fadeOut().empty();	
		}
	}
	
	function giveDetailUrl() {
	
		var address = $.address.value();
		var detailUrl;
		
		if (address.indexOf("/"+ portfolioKeyword + "/")!=-1 && address.length > portfolioKeyword.length + 2 ) {
			var total = address.length;
			detailUrl = address.slice(portfolioKeyword.length+2,total);
		} else {
			detailUrl = -1;	
		}
		return detailUrl;
	}
	// ------------------------------
	
	// ------------------------------
	// AJAX LOADER
	function showLoader() {
		$('body').removeClass('loaded');
	}
	function hideLoader() {
		$('windo').addClass('loaded');
	}
	// ------------------------------

})(jQuery);