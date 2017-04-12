$(function () {
  if ($('.prettyprint').length) {
    window.prettyPrint && prettyPrint();
  }

  new Noty({
    text   : '<div class="text-center">Wubba, lubba, dub, dub! <strong>v3.0.0 released!</strong></div>',
    type   : 'information',
    theme  : 'mint',
    layout : 'topRight',
    timeout: 4000
  }).show();

  var $activeLink = $('a[href$="' + window.location.pathname + '"]');
  if ($activeLink) {
    $('.top-links a').removeClass('active');
    $activeLink.addClass('active');
  }

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
    title      : 'NOTY - a jQuery Notification Plugin',
    description: 'notyjs is a jQuery plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.',
    image      : 'http://ned.im/noty/images/projects/noty-v2-logo.png',
    networks   : {
      pinterest: {
        enabled: false
      },
      facebook : {
        load_sdk   : true,
        app_id     : '198259823578303',
        title      : 'NOTY - a jQuery Notification Plugin',
        caption    : 'NOTY is a jquery plugin which is have too many options for display notification',
        description: 'NOTYJS is a jQuery plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.',
        image      : 'http://ned.im/noty/images/projects/noty-v2-logo.png'
      },
      twitter  : {
        description: 'NOTYJS - a jQuery Notification Plugin &num;notyjs &num;jquery &num;notification &num;plugin'
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