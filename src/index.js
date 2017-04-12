/* global VERSION */

import 'noty.scss';
import * as Utils from 'utils';
import * as API from 'api';
import { NotyButton } from 'button';

export default class Noty {
  constructor (options = {}) {
    this.options = Utils.deepExtend({}, API.Defaults, options);
    this.id = this.options.id || Utils.generateID('bar');
    this.closeTimer = -1;
    this.barDom = null;
    this.layoutDom = null;
    this.progressDom = null;
    this.shown = false;
    this.closed = false;
    this.listeners = {
      beforeShow: [],
      onShow    : [],
      afterShow : [],
      onClose   : [],
      afterClose: [],
      onHover   : [],
      onTemplate: []
    };

    this.on('beforeShow', this.options.callbacks.beforeShow);
    this.on('onShow', this.options.callbacks.onShow);
    this.on('afterShow', this.options.callbacks.afterShow);
    this.on('onClose', this.options.callbacks.onClose);
    this.on('afterClose', this.options.callbacks.afterClose);
    this.on('onHover', this.options.callbacks.onHover);
    this.on('onTemplate', this.options.callbacks.onTemplate);

    return this;
  }

  on (eventName, cb = () => {}) {
    if (typeof cb == 'function' && this.listeners.hasOwnProperty(eventName))
      this.listeners[eventName].push(cb);

    return this;
  }

  show () {
    if (this.options.killer === true) {
      Noty.closeAll();
    } else if (typeof this.options.killer == 'string') {
      Noty.closeAll(this.options.killer);
    } else {
      let queueCounts = API.getQueueCounts(this.options.queue);

      if (queueCounts.current >= queueCounts.maxVisible) {
        API.addToQueue(this);
        return this;
      }
    }

    API.Store[this.id] = this;

    API.fire(this, 'beforeShow');

    API.build(this);

    if (this.options.force)
      this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild);
    else
      this.layoutDom.appendChild(this.barDom);

    this.shown = true;
    this.closed = false;

    // bind button events if any
    if (API.hasButtons(this)) {
      Object.keys(this.options.buttons).forEach((key) => {
        const btn = this.barDom.querySelector(`#${this.options.buttons[key].id}`);
        Utils.addListener(btn, 'click', (e) => {
          Utils.stopPropagation(e);
          this.options.buttons[key].cb();
        });
      });
    }

    this.progressDom = this.barDom.querySelector('.noty_progressbar');

    if (Utils.inArray('click', this.options.closeWith)) {
      Utils.addClass(this.barDom, 'noty_close_with_click');
      Utils.addListener(this.barDom, 'click', (e) => {
        Utils.stopPropagation(e);
        this.close();
      }, false);
    }

    Utils.addListener(this.barDom, 'mouseenter', () => {
      API.fire(this, 'onHover');
    }, false);

    if (Utils.inArray('button', this.options.closeWith)) {
      Utils.addClass(this.barDom, 'noty_close_with_button');

      let closeButton = document.createElement('div');
      Utils.addClass(closeButton, 'noty_close_button');
      closeButton.innerHTML = '×';
      this.barDom.appendChild(closeButton);

      Utils.addListener(closeButton, 'click', (e) => {
        Utils.stopPropagation(e);
        this.close();
      }, false);
    }

    API.fire(this, 'onShow');
    Utils.addClass(this.barDom, this.options.animation.open);

    Utils.addListener(this.barDom, Utils.animationEndEvents, () => {
      Utils.removeClass(this.barDom, this.options.animation.open);
      API.fire(this, 'afterShow');
      API.queueClose(this);

      Utils.addListener(this.barDom, 'mouseenter', () => {
        API.dequeueClose(this);
      });

      Utils.addListener(this.barDom, 'mouseleave', () => {
        API.queueClose(this);
      });
    });

    return this;
  }

  stop () {
    API.dequeueClose(this);
    return this;
  }

  resume () {
    API.queueClose(this);
    return this;
  }

  setText (html, optionsOverride = false) {
    this.barDom.querySelector('.noty_body').innerHTML = html;

    if (optionsOverride)
      this.options.text = html;

    return this;
  }

  setType (type, optionsOverride = false) {
    const oldClass = `noty_type__${this.options.type}`;
    const newClass = `noty_type__${type}`;
    Utils.removeClass(this.barDom, oldClass);
    Utils.addClass(this.barDom, newClass);

    if (optionsOverride)
      this.options.type = type;

    return this;
  }

  setTheme (theme, optionsOverride = false) {
    const oldClass = `noty_theme__${this.options.theme}`;
    const newClass = `noty_theme__${theme}`;
    Utils.removeClass(this.barDom, oldClass);
    Utils.addClass(this.barDom, newClass);

    if (optionsOverride)
      this.options.theme = theme;

    return this;
  }

  /**
   * @return {Noty}
   */
  close () {
    if (this.closed)
      return this;

    if (!this.shown) { // it's in the queue
      API.removeFromQueue(this);
      return this;
    }

    API.fire(this, 'onClose');

    Utils.addClass(this.barDom, this.options.animation.close);

    this.closed = true;

    Utils.addListener(this.barDom, Utils.animationEndEvents, () => {
      if (this.options.force) {
        Utils.remove(this.barDom);
      } else {
        API.ghostFix(this);
      }
      delete API.Store[this.id];
      API.fire(this, 'afterClose');

      if (this.layoutDom.querySelectorAll('.noty_bar').length == 0 && !this.options.container)
        Utils.remove(this.layoutDom);

      API.queueRender(this.options.queue);
    });

    return this;
  }

  // API functions

  /**
   * @param {boolean|string} queueName
   * @return {Noty}
   */
  static closeAll (queueName = false) {
    Object.keys(API.Store).forEach((id) => {
      if (queueName) {
        if (API.Store[id].options.queue == queueName)
          API.Store[id].close();
      } else {
        API.Store[id].close();
      }
    });
    return this;
  }

  /**
   * @param {Object} obj
   * @return {Noty}
   */
  static overrideDefaults (obj) {
    API.Defaults = Utils.deepExtend({}, API.Defaults, obj);
    return this;
  }

  /**
   * @param {int} amount
   * @param {string} queueName
   * @return {Noty}
   */
  static setMaxVisible (amount = API.DefaultMaxVisible, queueName = 'global') {
    if (!API.Queues.hasOwnProperty(queueName))
      API.Queues[queueName] = {maxVisible: amount, queue: []};

    API.Queues[queueName].maxVisible = amount;
    return this;
  }

  /**
   * @param {string} innerHtml
   * @param {String} classes
   * @param {Function} cb
   * @param {Object} attributes
   * @return {NotyButton}
   */
  static button (innerHtml, classes = null, cb, attributes = {}) {
    return new NotyButton(innerHtml, classes, cb, attributes);
  }

  static version () {
    return VERSION;
  }
}

// Document visibility change controller
Utils.visibilityChangeFlow();
