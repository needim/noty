$(function () {
  if ($('.prettyprint').length) {
    window.prettyPrint && prettyPrint();
  }

  noty({
    text: '<strong>v2.4.0 released!</strong><br> Basic inline timeout <strong>progress bar</strong> added',
    type: 'information',
    theme: 'metroui',
    layout: 'topRight',
    timeout: 4000,
    progressBar: true,
    animation   : {
      open : 'animated fadeInDown',
      close: 'animated fadeOutUp'
    }
  });

  var $activeLink = $('a[href$="' + window.location.pathname + '"]');
  if ($activeLink) {
    $('.top-links a').removeClass('active');
    $activeLink.addClass('active');
  }

  $('.runner').on('click', function (e) {

    var notes = [];

    var layout = $('select#layout').val();
    var type   = $('select#type').val();

    notes['alert']       = 'Best check yo self, you\'re not looking too good.';
    notes['error']       = 'Change a few things up and try submitting again.';
    notes['success']     = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning']     = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';
    notes['confirm']     = 'Do you want to continue?';

    e.preventDefault();

    var self = $(this);

    if (layout == 'inline') {
      $('.custom-container').noty({
        text        : notes[type],
        type        : type,
        theme       : 'relax',
        timeout     : 3000,
        progressBar : true,
        dismissQueue: true,
        animation   : {
          open : 'animated fadeInDown',
          close: 'animated fadeOutUp'
        },
        buttons     : (type != 'confirm') ? false : [
          {
            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {

            // this = button element
            // $noty = $noty element

            $noty.close();
            $('.custom-container').noty({force: true, text: 'You clicked "Ok" button', type: 'success'});
          }
          },
          {
            addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
            $noty.close();
            $('.custom-container').noty({force: true, text: 'You clicked "Cancel" button', type: 'error'});
          }
          }
        ]
      });
      return false;
    }

    noty({
      text        : notes[type],
      type        : type,
      theme       : 'relax',
      dismissQueue: true,
      timeout     : 3000,
      progressBar : true,
      layout      : layout,
      animation   : {
        open : 'animated fadeInDown',
        close: 'animated fadeOutUp'
      },
      buttons     : (type != 'confirm') ? false : [
        {
          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {

          // this = button element
          // $noty = $noty element

          $noty.close();
          noty({
            force  : true, theme: 'relax', animation: {
              open : 'animated fadeInDown',
              close: 'animated fadeOutUp'
            }, text: 'You clicked "Ok" button', type: 'success', layout: layout
          });
        }
        },
        {
          addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
          $noty.close();
          noty({
            force  : true, theme: 'relax', animation: {
              open : 'animated fadeInDown',
              close: 'animated fadeOutUp'
            }, text: 'You clicked "Cancel" button', type: 'error', layout: layout
          });
        }
        }
      ]
    });
    return false;
  });

  var $themeContainer = $('.theme-container');
  if ($themeContainer.length) {
    $.each($themeContainer, function (i, v) {
      var $themeContainer   = $(v);
      var theme             = $themeContainer.data('theme');
      var $previewContainer = $themeContainer.find('.preview-container');

      generatePreview($previewContainer, theme, 'alert');
      generatePreview($previewContainer, theme, 'success');
      generatePreview($previewContainer, theme, 'warning');
      generatePreview($previewContainer, theme, 'error');
      generatePreview($previewContainer, theme, 'information');
      generatePreview($previewContainer, theme, 'confirm');

    });
  }

  function generatePreview($container, theme, type) {
    var notes            = [];
    notes['alert']       = 'Best check yo self, you\'re not looking too good.';
    notes['error']       = 'Change a few things up and try submitting again.';
    notes['success']     = 'You successfully read this important alert message.';
    notes['information'] = 'This alert needs your attention, but it\'s not super important.';
    notes['warning']     = '<strong>Warning!</strong> <br /> Best check yo self, you\'re not looking too good.';
    notes['confirm']     = 'Do you want to continue?';
    $container.noty({
      text        : notes[type],
      type        : type,
      theme       : theme,
      dismissQueue: true,
      force       : true,
      closeWith   : [],
      maxVisible  : 99999999,
      animation   : {
        open  : {height: 'toggle'},
        close : {height: 'toggle'},
        easing: 'swing',
        speed : 500
      },
      buttons     : (type != 'confirm') ? false : [
        {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {}},
        {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {}}
      ]
    });
  }

  new Share(".sharer-btn", {
    ui         : {
      flyout: 'bottom center'
    },
    title      : 'NOTY - a jQuery Notification Plugin',
    description: 'notyjs is a jQuery plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.',
    image      : 'http://ned.im/noty/v2/images/projects/noty-v2-logo.png',
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
        image      : 'http://ned.im/noty/v2/images/projects/noty-v2-logo.png'
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
        return '<a class="imp issue" target="_blank" href="https://github.com/needim/noty/v2/issues/' + match.substr(1) + '">' + match + '</a>';
      }
    };

    showdown.extension('issueLinker', issueLinker);

    var converter = new showdown.Converter({extensions: ['issueLinker']});

    converter.setOption('tasklists', true);
    converter.setOption('simpleLineBreaks', true);

    $.getJSON("../releases", function (data) {
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