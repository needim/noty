/**
 * triple layout v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 (function ($) {

 	// http://coveroverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}
	var normal_navigate;
	
	$.initTripleLayout = function() {
		
		// don't execute the code if the page is a regular page.
		if(!$('html').hasClass('one-page-layout') || $('html').hasClass('classic-layout'))
			return;

		var container = document.getElementById( 'container' ),
			wrapper = container.querySelector( 'div.wrapper' ),
			sections = Array.prototype.slice.call( wrapper.querySelectorAll( 'section' ) ),
			links = Array.prototype.slice.call( container.querySelectorAll( '.header > .vs-nav > li' ) ),
			sectionsCount = sections.length,
			transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			},
			transEndEventName = transEndEventNames[Modernizr.prefixed( 'transition' )],
			eventtype = mobilecheck() ? 'touchstart' : 'click';

		// add navigation elements
		if(!window.classicLayout) {
			var current = 0,
				isAnimating = false;

			classie.add( container, 'vs-triplelayout' );

			function createNavigation() {
				var navL = document.createElement( 'div' ),
					navR = document.createElement( 'div' ),
					sidenav = document.createElement( 'nav' );

				navL.className = 'vs-sidenav-left';
				navR.className = 'vs-sidenav-right';
				sidenav.className = 'vs-sidenav';
				
				sidenav.appendChild( navL );
				sidenav.appendChild( navR );
				container.insertBefore( sidenav, wrapper.nextSibling );

				navL.addEventListener( eventtype, function() { 
					normal_navigate = true;
					gotoLeftPage();
				});
				navR.addEventListener( eventtype, function() {
					normal_navigate = true;
					gotoRightPage(); 
				});
			}
			
			function gotoLeftPage() {
				var path = $('.vs-nav .vs-nav-left a').attr("href");
				path = path.slice(2, path.length);
				$.address.path(path);	
			}
			
			function gotoRightPage() {
				var path = $('.vs-nav .vs-nav-right a').attr("href");
				path = path.slice(2, path.length);
				$.address.path(path);	
			}
			
			function cleanClasses() {
				sections.forEach( function( el, i ) {
					el.className = '';
				} );
				links.forEach( function( el, i ) {
					el.className = '';
				} );
			}

			function navigate( dir ) {
				if( isAnimating ) {
					return false;
				}
				isAnimating = true;

				var invDir = dir === 'right' ? 'left' : 'right';
				classie.add( container, 'vs-move-' + invDir );
				
				var l = current === 0 ? sectionsCount - 1 : current - 1,
					r = current < sectionsCount - 1 ? current + 1 : 0,
					nextE;

				if( dir === 'right' ) {
					nextE = r < sectionsCount - 1 ? r + 1 : 0;
				}
				else if( dir === 'left' ) {
					nextE = l > 0 ? l - 1 : sectionsCount - 1;
				}

				var nextSection = sections[ nextE ],
					nextLink = links[ nextE ];
				// clean classes
				nextSection.className = '';
				nextLink.className = '';
				classie.add( nextSection, 'vs-' + dir + '-outer' );
				classie.add( nextLink, 'vs-nav-' + dir + '-outer' );

				var onTransitionEndFn = function() {
					nextSection.removeEventListener( transEndEventName, onTransitionEndFn );
					// clean classes
					cleanClasses();
					
					if( dir === 'right' ) {
						classie.add( sections[ current ], 'vs-left' );
						classie.add( sections[ r ], 'vs-current' );
						classie.add( nextSection, 'vs-right' );

						classie.add( links[ current ], 'vs-nav-left' );
						classie.add( links[ r ], 'vs-nav-current' );
						classie.add( nextLink, 'vs-nav-right' );

						current = current < sectionsCount - 1 ? current + 1 : 0;
					}
					else if( dir === 'left' ) {
						classie.add( nextSection, 'vs-left' );
						classie.add( sections[ l ], 'vs-current' );
						classie.add( sections[ current ], 'vs-right' );

						classie.add( nextLink, 'vs-nav-left' );
						classie.add( links[ l ], 'vs-nav-current' );
						classie.add( links[ current ], 'vs-nav-right' );

						current = current > 0 ? current - 1 : sectionsCount - 1;
					}

					classie.remove( container, 'vs-move-' + invDir );
					isAnimating = false;
				}

				nextSection.addEventListener( transEndEventName, onTransitionEndFn );
			}

			// assign the current, left and right classes to the respective sections
			classie.add( sections[ current ], 'vs-current' );
			classie.add( sections[ current + 1 ], 'vs-right' );
			classie.add( sections[ sectionsCount - 1 ], 'vs-left' );
			// same for the header links
			classie.add( links[ current ], 'vs-nav-current' );
			classie.add( links[ current + 1 ], 'vs-nav-right' );
			classie.add( links[ sectionsCount - 1 ], 'vs-nav-left' );

			// create navigation structure
			createNavigation();

			// click / touch events for the links
			links.forEach( function( el, i ) {
				el.addEventListener( eventtype, function( ev ) {
					//ev.preventDefault();
					normal_navigate = true;
					if( classie.has( el, 'vs-nav-right' ) ) {
						//navigate( 'right' );
					}
					else if ( classie.has( el, 'vs-nav-left' ) ) {
						//navigate( 'left' );
					}
					else {
						return false;
					}
				} )
			} );
			
			
			// url deep linking
			$.address.change(function() {
				
				var dir;
				
				// check url
				var url = $.address.path();
				url = url.slice(1, url.length);
				
				// if url doesn't exist go to first page
				if(url == "") {
					var first_page_url = $('.vs-nav li:first a').attr("href");
					url = first_page_url.slice(2, first_page_url.length);
				}
				
				// detect current page
				var current = $('.vs-nav .vs-nav-current a').attr("href");
				current = current.slice(2, current.length);
				
				//get indexes
				var url_index = $('.vs-nav a[href="#/' + url + '"]').parent().index();
				var current_index = $('.vs-nav a[href="#/' + current + '"]').parent().index();
				
				// if something is wrong do nothing - it can get worse :)
				if (url_index == -1 || current_index == -1)
					return;
			
				// find shortest way
				var total = $('.vs-nav li').length;
				
				// calculate bi-directional way
				var bi_dir_way = url_index - current_index;
				
				// calculate circular way
				var circular_way = 0;
				if(url_index > current_index) {
					circular_way = (url_index - total) - current_index;		
				}
				if(current_index > url_index) {
					circular_way = (current_index - total) - url_index;
					circular_way = Math.abs(circular_way);		
				}
				
				// find shortest way
				var shortest_way = Math.abs(bi_dir_way) < Math.abs(circular_way) ? bi_dir_way : circular_way;
				dir = shortest_way < 0 ? "left" : "right";
				shortest_way = Math.abs(shortest_way);
				
				// move to page
				if(!normal_navigate) {
					$('html').addClass('fast-navigate');	
				}
				for(i=0; i<shortest_way; i++) {
					setTimeout(function(){ navigate(dir); } , i * 400)
				}
				if(!normal_navigate) {
					setTimeout(function(){ $('html').removeClass('fast-navigate'); } , shortest_way * 400)
				} else {
					normal_navigate = false;
				}
				
			});
				
				
			
			// add keyboard events
			document.addEventListener( 'keydown', function( ev ) {
				var keyCode = ev.keyCode || ev.which,
					arrow = {
						left: 37,
						right: 39
					};
				switch (keyCode) {
					case arrow.left :
						navigate( 'left' );
						break;
					case arrow.right :
						navigate( 'right' );
						break;
				}
			} );


		}

	}

})(jQuery);