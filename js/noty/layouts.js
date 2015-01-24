function decorateCenterVert() {
    // getting hidden height
    var dupe = $(this).clone().css({visibility: "hidden", display: "block", position: "absolute", top: 0, left: 0});
    $("body").append(dupe);
    dupe.find('.i-am-closing-now').remove();
    dupe.find('li').css('display', 'block');
    var top = ($(window).height() - dupe.height()) / 2;
    dupe.remove();

    if($(this).hasClass('i-am-new')) {
        $(this).css('top', top);
    }
    else {
        $(this).animate({top: top}, 500);
    }
}


function addLayout(name, decorator) {
    $.noty.layouts[name] = {
        name: name,
        options: {},
        container: {
            object  : '<ul class="noty_layout_container noty_' + name + '_layout_container" />',
            selector: 'ul.noty_' + name + '_layout_container',
            style: decorator || function () {}
        },
        parent: {
            object: '<li />',
            selector: 'li',
            css: {}
        },
        css      : {
            display: 'none',
        },
        addClass : ''
    };
}


addLayout('bottom');
addLayout('bottomCenter');
addLayout('bottomLeft');
addLayout('bottomRight');
addLayout('center', decorateCenterVert);
addLayout('centerLeft', decorateCenterVert);
addLayout('centerRight', decorateCenterVert);
addLayout('inline');
addLayout('top');
addLayout('topCenter');
addLayout('topLeft');
addLayout('topRight');
