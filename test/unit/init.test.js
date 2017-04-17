$(function () {
  'use strict'

  function fakeEvent (el, e) {
    if (document.createEvent) {
      var event = document.createEvent('HTMLEvents')
      event.initEvent(e, true, false)
      el.dispatchEvent(event)
    } else {
      el.fireEvent(e)
    }
  }

  Noty.overrideDefaults({
    text: 'Noty Test Suite'
  })

  QUnit.module('Initializing')
  QUnit.test('should be defined', function (assert) {
    assert.expect(1)
    assert.ok(Noty, 'Noty is defined')
  })

  QUnit.test('should return a Noty object', function (assert) {
    assert.expect(11)

    var n = new Noty()
    assert.ok(n instanceof Noty, 'returns Noty object')
    assert.ok(n.options, 'has accessible properties')
    assert.strictEqual(n.id.length, 45, 'has auto generated ID')
    assert.strictEqual(n.closed, false, '.closed should be false')
    assert.strictEqual(n.shown, false, '.shown should be false')
    assert.strictEqual(n.closeTimer, -1, '.closeTimer should be -1')
    assert.strictEqual(n.barDom, null, '.barDom should be null')
    assert.strictEqual(n.layoutDom, null, '.layoutDom should be null')
    assert.strictEqual(n.progressDom, null, '.progressDom should be null')
    assert.strictEqual(n.hasSound, false, '.hasSound should be false')
    assert.strictEqual(n.soundPlayed, false, '.soundPlayed should be false')
  })

  QUnit.module('Callbacks')
  QUnit.test('beforeShow - should not be in the dom when beforeShow fired', function (assert) {
    assert.expect(2)
    var done = assert.async()

    new Noty()
      .on('beforeShow', function () {
        assert.ok(true, 'beforeShow fired')
        assert.strictEqual($('#' + this.id).length, 0, 'noty not in the document')
        done()
      }).show().close()
  })

  QUnit.test('onShow - should insert into dom when show method is called', function (assert) {
    assert.expect(2)
    var done = assert.async()

    new Noty()
      .on('onShow', function () {
        assert.strictEqual($('#' + this.id).length, 1, 'noty inserted into dom')
        assert.ok(true, 'onShow fired')
        done()
      }).show().close()
  })

  QUnit.test('afterShow - should fire event', function (assert) {
    assert.expect(2)
    var done = assert.async()

    new Noty()
      .on('afterShow', function () {
        assert.ok(true, 'afterShow fired')
        assert.strictEqual($('#' + this.id).length, 1, 'noty in the dom')
        done()
      }).show()
  })

  QUnit.test('preventing - should not fire afterShow when show was prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    new Noty()
      .on('onShow', function () {
        this.close()
        assert.ok(true, 'onShow event fired')
        done()
      })
      .on('afterShow', function () {
        assert.ok(false, 'afterShow event fired')
      }).show().close()
  })

  QUnit.test('onClose - should fire event', function (assert) {
    assert.expect(2)
    var done = assert.async()

    new Noty()
      .on('onClose', function () {
        assert.ok(true, 'onClose fired')
        assert.strictEqual($('#' + this.id).length, 1, 'noty in the dom')
        done()
      }).show().close()
  })

  QUnit.test('onTemplate - ', function (assert) {
    assert.expect(2)
    var done = assert.async()

    new Noty().on('onTemplate', function () {
      assert.ok(true, 'onTemplate fired')
      this.barDom.innerHTML = 'changed'
      assert.strictEqual(this.barDom.innerHTML, 'changed', 'noty.barDom can be modified')
      done()
    }).show().close()
  })

  QUnit.test('onHover', function (assert) {
    assert.expect(1)
    var done = assert.async()

    new Noty()
      .on('onHover', function () {
        assert.ok(true, 'onHover fired')
        done()
      })
      .on('afterShow', function () {
        fakeEvent($('#' + this.id)[0], 'mouseenter')
      }).show()
  })

  // @todo - [needim] - modal cases
  // @todo - [needim] - Killer cases

  QUnit.module('CloseWith')
  QUnit.test('click', function (assert) {
    assert.expect(1)
    var done = assert.async()

    new Noty({closeWith: ['click']})
      .on('afterShow', function () {
        fakeEvent($('#' + this.id)[0], 'click')
      })
      .on('afterClose', function () {
        assert.ok(true, 'closed by clicking')
        done()
      }).show()
  })

  QUnit.test('button', function (assert) {
    assert.expect(1)
    var done = assert.async()

    new Noty({closeWith: ['button']})
      .on('afterShow', function () {
        fakeEvent($('#' + this.id).find('.noty_close_button')[0], 'click')
      })
      .on('afterClose', function () {
        assert.ok(true, 'closed by x button')
        done()
      }).show()
  })

  // @todo - [needim] - backdrop && modal

  QUnit.module('API')
  QUnit.test('stop() & resume()', function (assert) {
    assert.expect(3)
    var done = assert.async()

    new Noty({timeout: 2000})
      .on('afterShow', function () {
        assert.ok(this.options.timeout === 2000, 'has correct timeout')
        var t = this
        setTimeout(function () {
          t.stop()
          assert.ok(t.closeTimer === -1, 'timer stopped')
          t.resume()
          setTimeout(function () {
            assert.ok(t.closeTimer, 'timer started')
            done()
          }, 250)
        }, 250)
      }).show()
  })
  QUnit.test('setTimeout()', function (assert) {
    assert.expect(2)
    var done = assert.async()

    new Noty({timeout: 2000})
      .on('afterShow', function () {
        this.setTimeout(3000)

        assert.ok(this.options.timeout === 3000,
          'timeout override after show() called')

        done()
      }).show()

    assert.ok(new Noty().setTimeout(3000).options.timeout === 3000,
      'timeout overrided before show()')

  })
  QUnit.test('setText()', function (assert) {
    assert.expect(3)
    var done = assert.async()

    new Noty({text: 'Rick'})
      .on('afterShow', function () {
        this.setText('Morty', true)

        assert.ok(this.options.text === 'Morty',
          'text override after show() called')
        assert.ok($('#' + this.id).find('.noty_body').text() === 'Morty',
          'text changed correctly')

        done()
      }).show()

    assert.ok(new Noty().setText('Morty', true).options.text === 'Morty',
      'text override before show()')
  })
  QUnit.test('setType()', function (assert) {
    assert.expect(4)
    var done = assert.async()

    new Noty()
      .on('afterShow', function () {
        this.setType('warning', true)
        var $d = $('#' + this.id)

        assert.equal(this.options.type, 'warning',
          'type override after show() called')
        assert.ok($d.hasClass('noty_type__warning'),
          'new type changed correctly')
        assert.notOk($d.hasClass('noty_type__alert'),
          'old type removed correctly')

        done()
      }).show()

    assert.ok(new Noty().setType('warning', true).options.type === 'warning', 'type override before show()')
  })
  QUnit.test('setTheme()', function (assert) {
    assert.expect(4)
    var done = assert.async()

    new Noty({theme: 'mint'})
      .on('afterShow', function () {
        this.setTheme('relax', true)
        var $d = $('#' + this.id)
        assert.equal(this.options.theme, 'relax',
          'theme override after show() called')
        assert.ok($d.hasClass('noty_theme__relax'),
          'new theme changed correctly')
        assert.notOk($d.hasClass('noty_theme__mint'),
          'old theme removed correctly')
        done()
      }).show()

    assert.ok(new Noty({theme: 'mint'}).setTheme('relax', true).options.theme === 'relax', 'theme override before show()')
  })
  QUnit.test('close()', function (assert) {
    assert.expect(2)
    var done = assert.async()

    new Noty()
      .on('onClose', function () {
        assert.ok(true, 'onClose fired')
      })
      .on('afterClose', function () {
        assert.ok(true, 'afterClose fired')
        done()
      }).show().close()
  })

  QUnit.module('API Static')
  QUnit.test('overrideDefaults()', function (assert) {
    assert.expect(1)
    var obj = {
      timeout: 3000,
      theme: 'relax',
      layout: 'topCenter',
      progressBar: false,
      closeWith: ['button'],
      animation: {
        open: null,
        close: null
      },
      force: true,
      sounds: {
        sources: ['audio_file.wav'],
        volume: .3,
        conditions: ['docHidden']
      },
      titleCount: {
        conditions: ['docHidden']
      }
    }
    Noty.overrideDefaults(obj)

    var n = new Noty()
    assert.deepEqual(obj, {
      timeout: n.options.timeout,
      theme: n.options.theme,
      layout: n.options.layout,
      progressBar: n.options.progressBar,
      closeWith: n.options.closeWith,
      animation: n.options.animation,
      force: n.options.force,
      sounds: n.options.sounds,
      titleCount: n.options.titleCount
    }, 'override ok')

  })
  QUnit.test('setMaxVisible()', function (assert) {
    assert.expect(2)

    var showed = 0
    Noty.setMaxVisible(1)

    new Noty().on('beforeShow', function () {
      showed++
    }).show()
    new Noty().on('beforeShow', function () {
      showed++
    }).show()

    assert.equal(showed, 1,
      'global queue maxVisible 1 ok')

    var customShowed = 0
    Noty.setMaxVisible(1, 'customQueue')

    new Noty({queue: 'customQueue'})
      .on('beforeShow', function () {
        customShowed++
      }).show()
    new Noty({queue: 'customQueue'})
      .on('beforeShow', function () {
        customShowed++
      }).show()

    assert.equal(customShowed, 1,
      'custom queue maxVisible 1 ok')

  })
  QUnit.test('closeAll()', function (assert) {
    assert.expect(4)

    Noty.setMaxVisible(8)
    Noty.setMaxVisible(8, 'customQueue')

    var closed = 0

    new Noty().on('onClose', function () {
      closed++
    }).show()
    new Noty().on('onClose', function () {
      closed++
    }).show()

    Noty.closeAll()

    var closedCustom = 0
    new Noty({queue: 'customQueueClose'}).on('onClose', function () {
      closedCustom++
    }).show()
    new Noty({queue: 'customQueueClose'}).on('onClose', function () {
      closedCustom++
    }).show()
    var notClose = true
    var noClose = new Noty({queue: 'otherCustomQueueClose'}).on('onClose', function () {
      notClose = false
    }).show()

    var notCloseTheNonKillable = true
    var nonKillable = new Noty({queue: 'customQueueClose', closeWith: [], timeout: false}).on('onClose', function () {
      notCloseTheNonKillable = false
    }).show()

    Noty.closeAll('customQueueClose')

    assert.equal(closed, 2,
      'closeAll closes all notifications')
    assert.equal(closedCustom, 2,
      'closeAll closes custom queue notifications')
    assert.equal(notClose, true,
      'closeAll should not close the other queue notifications')
    assert.equal(notCloseTheNonKillable, true,
      'closeAll should not close the non-Killable notifications')

    nonKillable.close() // this needs individual close
    noClose.close() // this needs individual close
  })
  QUnit.test('button()', function (assert) {
    assert.expect(13)

    var btn = Noty.button('buttonText')
    assert.ok(btn.dom,
      'button has dom object')
    assert.ok(btn.dom.innerHTML === 'buttonText',
      'button innerHTML is ok')
    assert.equal(btn.id.length, 48,
      'button has a generated ID')
    assert.equal(btn.cb, undefined,
      'button has a no cb function')
    assert.ok($(btn.dom).hasClass('noty_btn'),
      'button has a default class (noty_btn)')
    assert.equal(btn.dom.attributes.length, 2,
      'button has 2 default attributes (id, class)')

    var btnCB = function () {}
    var btn2 = Noty.button('buttonText', 'btn1 btn2', btnCB, {id: 'myButtonID', 'data-rick': 30})
    assert.ok(btn2.dom,
      'button2 has dom object')
    assert.ok(btn2.dom.innerHTML === 'buttonText',
      'button2 innerHTML is ok')
    assert.equal(btn2.id, 'myButtonID',
      'button2 has given ID')
    assert.equal(btn2.cb, btnCB,
      'button2 has given cb function')
    assert.ok($(btn2.dom).hasClass('btn1 btn2'),
      'button2 has given classes')
    assert.notOk($(btn2.dom).hasClass('noty_btn'),
      'button2 has no default class')
    assert.equal(btn2.dom.attributes.length, 3,
      'button2 has given attributes')
  })
  QUnit.test('version()', function (assert) {
    assert.expect(1)
    assert.equal(typeof Noty.version(), 'string',
      'returns version string')
  })

  // @todo - [needim] - sounds
  // @todo - [needim] - titleCount
})
