import test from 'ava'
import browserEnv from 'browser-env'
require('jsdom-global')()

const Noty = require('../lib/noty.js')

browserEnv()

const n = new Noty()

const Defaults = {
  type: 'alert',
  layout: 'topRight',
  theme: 'mint',
  text: '',
  timeout: false,
  progressBar: true,
  closeWith: ['click'],
  animation: {
    open: 'noty_effects_open',
    close: 'noty_effects_close'
  },
  id: false,
  force: false,
  killer: false,
  queue: 'global',
  container: false,
  buttons: [],
  callbacks: {
    beforeShow: null,
    onShow: null,
    afterShow: null,
    onClose: null,
    afterClose: null,
    onHover: null,
    onTemplate: null
  }
}

test('defaultValues', t => {
  t.deepEqual(n.options, Defaults)
})

test('defaultID', t => {
  t.is(n.id.length, 45)
})

test('closed should be false', t => {
  t.is(n.closed, false)
})

test('shown should be false', t => {
  t.is(n.shown, false)
})

const beforeShow = () => {
  return 'beforeShowCB'
}

n.on('beforeShow', beforeShow)
test('must have a function in beforeShow listener', t => {
  t.is(n.listeners.beforeShow[0], beforeShow)
})

test.todo('write tests for other callbacks')

test('Insert to DOM', t => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  t.is(document.querySelector('div'), div)
})
