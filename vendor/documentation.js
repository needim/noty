$(function () {
  if ($('.prettyprint').length) {
    window.prettyPrint && prettyPrint();
  }

  var $activeLink = $('a[href$="' + window.location.pathname + '"]');
  if ($activeLink) {
    $('.top-links a').removeClass('active');
    $activeLink.addClass('active');
  }

  var velocityShow = function () {
    var n = this;
    Velocity(n.barDom, {
      left  : 450,
      scaleY: 2
    }, {
      duration: 0
    });
    Velocity(n.barDom, {
      left  : 0,
      scaleY: 1
    }, {
      easing: [8, 8]
    });
  };

  var velocityClose = function () {
    var n = this;
    Velocity(n.barDom, {
      left: '+=-50'
    }, {
      easing  : [8, 8, 2],
      duration: 350
    });
    Velocity(n.barDom, {
      left  : 450,
      scaleY: .2,
      height: 0,
      margin: 0
    }, {
      easing  : [8, 8],
      complete: function () {
        n.barDom.parentNode.removeChild(n.barDom);
      }
    });
  };

  var mojsShow = function () {
    var n = this;
    var Timeline = new mojs.Timeline();
    var body = new mojs.Html({
      el        : n.barDom,
      x         : {500: 0, delay: 0, duration: 500, easing: 'elastic.out'},
      isForce3d : true,
      onComplete: function () {
        n.resume();
      }
    });

    var parent = new mojs.Shape({
      parent: n.barDom,
      width      : 200,
      height     : n.barDom.getBoundingClientRect().height,
      radius     : 0,
      x          : {[150]: -150},
      duration   : 1.2 * 500,
      isShowStart: true
    });

    n.barDom.style['overflow'] = 'visible';
    parent.el.style['overflow'] = 'hidden';

    var burst = new mojs.Burst({
      parent  : parent.el,
      count   : 10,
      top     : n.barDom.getBoundingClientRect().height + 75,
      degree  : 90,
      radius  : 75,
      angle   : {[-90]: 40},
      children: {
        fill     : '#EBD761',
        delay    : 'stagger(500, -50)',
        radius   : 'rand(8, 25)',
        direction: -1,
        isSwirl  : true
      }
    });

    const fadeBurst = new mojs.Burst({
      parent  : parent.el,
      count   : 2,
      degree  : 0,
      angle   : 75,
      radius  : {0: 100},
      top     : '90%',
      children: {
        fill     : '#EBD761',
        pathScale: [.65, 1],
        radius   : 'rand(12, 15)',
        direction: [-1, 1],
        delay    : .8 * 500,
        isSwirl  : true
      }
    });

    Timeline.add(body, burst, fadeBurst, parent);
    Timeline.play();
  };

  var mojsClose = function () {
    var n = this;
    new mojs.Html({
      el        : n.barDom,
      x         : {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
      skewY     : {0: 10, delay: 10, duration: 500, easing: 'cubic.out'},
      isForce3d : true,
      onComplete: function () {
        n.barDom.parentNode.removeChild(n.barDom); // removing noty's dom from document
      }
    }).play();
  };

  var bouncejsShow = function () {
    var n = this;
    new Bounce()
        .translate({
          from: {x: 450, y: 0}, to: {x: 0, y: 0},
          easing                  : "bounce",
          duration                : 1000,
          bounces                 : 4,
          stiffness               : 3
        })
        .scale({
          from: {x: 1.2, y: 1}, to: {x: 1, y: 1},
          easing                  : "bounce",
          duration                : 1000,
          delay                   : 100,
          bounces                 : 4,
          stiffness               : 1
        })
        .scale({
          from: {x: 1, y: 1.2}, to: {x: 1, y: 1},
          easing                  : "bounce",
          duration                : 1000,
          delay                   : 100,
          bounces                 : 6,
          stiffness               : 1
        })
        .applyTo(n.barDom, {
          onComplete: function () {
            n.resume();
          }
        });
  };

  var bouncejsClose = function () {
    var n = this;
    new Bounce()
        .translate({
          from: {x: 0, y: 0}, to: {x: 450, y: 0},
          easing                : "bounce",
          duration              : 500,
          bounces               : 4,
          stiffness             : 1
        })
        .applyTo(n.barDom, {
          onComplete: function () {
            n.barDom.parentNode.removeChild(n.barDom);
          }
        });
  };


  setTimeout(function () {
    new Noty({
      text   : '<div class="text-center">Wubba, lubba, dub, dub! <strong>v3.0.1 released!</strong></div>',
      type   : 'information',
      theme  : 'mint',
      layout : 'topRight',
      timeout: 4000,
      animation: {
        open: mojsShow,
        close: mojsClose
      }
    }).show();
  }, 2000);

  var types = ['alert', 'warning', 'success', 'information', 'error'];

  $('#run-example-velocity').on('click', function (e) {
    e.preventDefault();

    var type = types[Math.floor(Math.random() * types.length)];
    var notes = [];
    notes['alert'] = 'Best check yo self, you\'re not looking too good.';
    notes['error'] = 'Change a few things up and try submitting again.';
    notes['success'] = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning'] = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';

    new Noty({
      text     : notes[type],
      type     : type,
      timeout  : 5000,
      animation: {
        open : velocityShow,
        close: velocityClose
      }
    }).show();

    return false;
  });

  $('#run-example-mojs').on('click', function (e) {
    e.preventDefault();

    var type = types[Math.floor(Math.random() * types.length)];
    var notes = [];
    notes['alert'] = 'Best check yo self, you\'re not looking too good.';
    notes['error'] = 'Change a few things up and try submitting again.';
    notes['success'] = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning'] = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';

    new Noty({
      text     : notes[type],
      type     : type,
      timeout  : 5000,
      animation: {
        open : mojsShow,
        close: mojsClose
      }
    }).show();

    return false;
  });

  $('#run-example-bouncejs').on('click', function (e) {
    e.preventDefault();

    var type = types[Math.floor(Math.random() * types.length)];
    var notes = [];
    notes['alert'] = 'Best check yo self, you\'re not looking too good.';
    notes['error'] = 'Change a few things up and try submitting again.';
    notes['success'] = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning'] = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';

    new Noty({
      text     : notes[type],
      type     : type,
      timeout  : 5000,
      animation: {
        open : bouncejsShow,
        close: bouncejsClose
      }
    }).show();

    return false;
  });

  $('.runner').on('click', function (e) {

    var notes = [];

    var layout = $('select#layout').val();
    var type = $('select#type').val();

    notes['alert'] = 'Best check yo self, you\'re not looking too good.';
    notes['error'] = 'Change a few things up and try submitting again.';
    notes['success'] = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning'] = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';
    notes['confirm'] = 'Do you want to continue?';

    e.preventDefault();

    var self = $(this);

    if (layout == 'inline') {

      new Noty({
        text     : notes[type],
        type     : type,
        timeout  : 3000,
        container: '.custom-container'
      }).show();

      return false;
    }

    new Noty({
      text   : notes[type],
      type   : type,
      timeout: 3000,
      layout : layout
    }).show();

    return false;
  });

  var $themeContainer = $('.theme-container');
  if ($themeContainer.length) {

    Noty.setMaxVisible(999999);

    $.each($themeContainer, function (i, v) {
      var $themeContainer = $(v);
      var theme = $themeContainer.data('theme');

      generatePreview(theme, 'alert');
      generatePreview(theme, 'success');
      generatePreview(theme, 'warning');
      generatePreview(theme, 'error');
      generatePreview(theme, 'information');
      generatePreview(theme, 'confirm');

    });
  }

  function generatePreview (theme, type) {
    var notes = [];
    notes['alert'] = 'Best check yo self, you\'re not looking too good.';
    notes['error'] = 'Change a few things up and try submitting again.';
    notes['success'] = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning'] = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';
    notes['confirm'] = 'Do you want to continue?';
    new Noty({
      text     : notes[type],
      type     : type == 'confirm' ? 'alert' : type,
      theme    : theme,
      closeWith: ['button'],
      timeout  : false,
      container: '.theme-container-' + theme + ' .preview-container',
      buttons  : type == 'confirm' ? [
        Noty.button('YES', 'button', function () {
        }, {id: 'button1', 'data-status': 'ok'}),

        Noty.button('NO', 'button', function () {
        })
      ] : []
    }).show();
  }

  new Share(".sharer-btn", {
    ui         : {
      flyout: 'bottom center'
    },
    title      : 'NOTY - a Notification Plugin',
    description: 'NOTY is a notification plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.',
    image      : 'http://ned.im/noty/images/projects/noty-v2-logo.png',
    networks   : {
      pinterest: {
        enabled: false
      },
      facebook : {
        load_sdk   : true,
        app_id     : '198259823578303',
        title      : 'NOTY - a Notification Plugin',
        caption    : 'NOTY is a notification plugin which is have too many options for display notification',
        description: 'NOTY is a notification plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.',
        image      : 'http://ned.im/noty/img/projects/noty-v3-logo.png'
      },
      twitter  : {
        description: 'NOTY - a Notification Plugin &num;notyjs &num;notification &num;plugin'
      }
    }
  });


  var $releasesContainer = $('.releases-wrapper');
  if ($releasesContainer.length) {

    var github = function () {
      return [
        {
          // strike-through
          // NOTE: showdown already replaced "~" with "~T", so we need to adjust accordingly.
          type   : 'lang',
          regex  : '(~T){2}([^~]+)(~T){2}',
          replace: function (match, prefix, content) {
            return '<del>' + content + '</del>';
          }
        }
      ];
    };

    var issueLinker = {
      type   : 'lang',
      regex  : '#[0-9]+',
      replace: function (match, prefix, content) {
        console.log(match);
        return '<a class="imp issue" target="_blank" href="https://github.com/needim/noty/issues/' + match.substr(1) + '">' + match + '</a>';
      }
    };

    showdown.extension('issueLinker', issueLinker);

    var converter = new showdown.Converter({extensions: ['issueLinker']});

    converter.setOption('tasklists', true);
    converter.setOption('simpleLineBreaks', true);

    $.getJSON("releases", function (data) {
      var items = [];
      $.each(data, function (key, val) {
        var entry = "<li><h3>" + val.tag_name + "</h3>";
        entry += "<p>";
        entry += converter.makeHtml(val.body);
        entry += "</p>";
        entry += "</li>";
        items.push(entry);
      });

      $("<ul/>", {
        "class": "release-list",
        html   : items.join("")
      }).appendTo($releasesContainer);
    });

  }


});