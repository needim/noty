$.noty.themes.bootstrapPanel = {
    name    : 'bootstrapPanel',
    modal   : {
        css: {
            position       : 'fixed',
            width          : '100%',
            height         : '100%',
            backgroundColor: '#000',
            zIndex         : 10000,
            opacity        : 0.6,
            display        : 'none',
            left           : 0,
            top            : 0,
            wordBreak      : 'break-all'
        }
    },
    template:
    '<div class="noty_message panel-heading">'+
    '<h3 class="noty_text panel-title"></h3>' +
    '<div class="noty_close close" title="Close" style="position: absolute; top: 10px; right: 10px;">' +
    '<span aria-hidden="true">&times;</span>' +
    '<span class="sr-only">Close</span>' +
    '</div>' +
    '</div>',
    style   : function () {
        /** Create parent DIV for the Bootstrap Progressbar */
        this.$progressBar.wrap('<div class="progress" style="height: 5px; margin-bottom: 0;"></div>');

        var $panelClass = '';
        switch (this.options.type) {
            case 'alert':
                $panelClass = 'default';
                break;
            case 'notification':
                $panelClass = 'primary';
                break;
            case 'warning':
            case 'success':
                $panelClass = this.options.type;
                break;
            case 'error':
                $panelClass = 'danger';
                break;
            case 'information':
                $panelClass = 'info';
                break;
        }
        var $progressBarClass = this.options.type == 'alert' ? 'primary' : $panelClass;
        this.$progressBar.addClass("progress-bar progress-bar-striped active progress-bar-" + $progressBarClass).css({
            position : 'absolute',
            left     : 0,
            bottom   : 0,
            height   : 5,
            width    : '100%'
        }).attr('role', 'progressbar');

        this.$bar.addClass('list-group-item').css('padding', '0px').css('position', 'relative')
        .find('.noty_bar').addClass("panel panel-" + $panelClass).css({marginBottom: '0px'});

        this.$buttons.css({
            textAlign: 'right',
            padding  : '5px'
        }).addClass('panel-body').find('button').css({
            marginLeft: '5px'
        });
    },
    callback: {
        onShow: function () {  },
        onClose: function () {  }
    }
};