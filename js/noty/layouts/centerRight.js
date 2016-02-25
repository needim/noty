$.noty.layouts.centerRight = {
    name     : 'centerRight',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_centerRight_layout_container" />',
        selector: 'ul#noty_centerRight_layout_container',
        style   : function( options ) {
            var parent = options.within ? $(this).parent()[0] : window;

            $(this).css({
                right        : 20,
                position     : options.within ? 'absolute' : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            // getting hidden height
            var dupe = $(this).clone().css({visibility: "hidden", display: "block", position: "absolute", top: 0, left: 0}).attr('id', 'dupe');
            $("body").append(dupe);
            dupe.find('.i-am-closing-now').remove();
            dupe.find('li').css('display', 'block');
            var actual_height = dupe.height();
            dupe.remove();

            if($(this).hasClass('i-am-new')) {
                $(this).css({
                    top: ($(parent).height() - actual_height) / 2 + 'px'
                });
            }
            else {
                $(this).animate({
                    top: ($(parent).height() - actual_height) / 2 + 'px'
                }, 500);
            }

            if(parent.innerWidth < 600) {
                $(this).css({
                    right: 5
                });
            }

        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};
