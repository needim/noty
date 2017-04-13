import test from 'ava';
import browserEnv from 'browser-env';
require('jsdom-global')();

const Noty = require('../lib/noty.js');

browserEnv();

const n = new Noty();

const beforeShow = () => {
  return 'beforeShowCB';
};

n.on('beforeShow', beforeShow);
test('must have a function in beforeShow listener', t => {
  t.is(n.listeners.beforeShow[0], beforeShow);
});

test.todo('write tests for other callbacks');

