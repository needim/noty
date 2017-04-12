/*global describe, it, before */

import chai from 'chai';

const Noty = require('../lib/noty.js');
require('jsdom-global')();

chai.expect();

const expect = chai.expect;

let n;

describe('NOTY - Default options check', () => {
  before(() => {
    n = new Noty();
  });
  describe('type', () => {
    it('should be alert', () => {
      expect(n.options.type).to.be.equal('alert');
    });
  });
  describe('layout', () => {
    it('should be topRight', () => {
      expect(n.options.layout).to.be.equal('topRight');
    });
  });
  describe('theme', () => {
    it('should be mint', () => {
      expect(n.options.theme).to.be.equal('mint');
    });
  });
  describe('text', () => {
    it('should be empty', () => {
      expect(n.options.text).to.be.equal('');
    });
  });
  describe('timeout', () => {
    it('should be false', () => {
      expect(n.options.timeout).to.be.equal(false);
    });
  });
  describe('progressBar', () => {
    it('should be true', () => {
      expect(n.options.progressBar).to.be.equal(true);
    });
  });
  describe('closeWith', () => {
    it('should be array', () => {
      expect(n.options.closeWith).to.be.instanceof(Array);
    });
    it('should contain click', () => {
      expect(n.options.closeWith[0]).to.be.equal('click');
    });
    it('should not have second elem', () => {
      expect(n.options.closeWith[1]).to.be.an('undefined');
    });
  });
  describe('animation', () => {
    it('should be object', () => {
      expect(n.options.animation).to.be.instanceof(Object);
    });
    it('should contain open', () => {
      expect(n.options.animation.open).to.not.be.an('undefined');
    });
    it('should contain close', () => {
      expect(n.options.animation.close).to.not.be.an('undefined');
    });
    it('open should be noty_effects_open', () => {
      expect(n.options.animation.open).to.be.equal('noty_effects_open');
    });
    it('close should be noty_effects_close', () => {
      expect(n.options.animation.close).to.be.equal('noty_effects_close');
    });
  });
  describe('id', () => {
    it('length should be 45', () => {
      expect(n.id.length).to.be.equal(45);
    });
  });
  describe('force', () => {
    it('should be false', () => {
      expect(n.options.force).to.be.equal(false);
    });
  });
  describe('killer', () => {
    it('should be false', () => {
      expect(n.options.killer).to.be.equal(false);
    });
  });
  describe('queue', () => {
    it('should be global', () => {
      expect(n.options.queue).to.be.equal('global');
    });
  });
  describe('container', () => {
    it('should be false', () => {
      expect(n.options.container).to.be.equal(false);
    });
  });
  describe('buttons', () => {
    it('should be array', () => {
      expect(n.options.buttons).to.be.instanceof(Array);
    });
    it('should not contain any item', () => {
      expect(n.options.buttons.length).to.be.equal(0);
    });
  });
});