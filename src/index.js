/* global VERSION */

import 'noty.scss'
import Promise from 'es6-promise'
import * as Utils from 'utils'
import * as API from 'api'
import { NotyButton } from 'button'
import { Push } from 'push'

export default class Noty {
  /**
   * @param {object} options
   * @return {Noty}
   */
  constructor (options = {}) {
    this.options = Utils.deepExtend({}, API.Defaults, options)

    if (API.Store[this.options.id]) {
      return API.Store[this.options.id]
    }

    this.id = this.options.id || Utils.generateID('bar')
    this.closeTimer = -1
    this.barDom = null
    this.layoutDom = null
    this.progressDom = null
    this.showing = false
    this.shown = false
    this.closed = false
    this.closing = false
    this.killable = this.options.timeout || this.options.closeWith.length > 0
    this.hasSound = this.options.sounds.sources.length > 0
    this.soundPlayed = false
    this.listeners = {
      beforeShow: [],
      onShow: [],
      afterShow: [],
      onClose: [],
      afterClose: [],
      onClick: [],
      onHover: [],
      onTemplate: []
    }
    this.promises = {
      show: null,
      close: null
    }
    this.on('beforeShow', this.options.callbacks.beforeShow)
    this.on('onShow', this.options.callbacks.onShow)
    this.on('afterShow', this.options.callbacks.afterShow)
    this.on('onClose', this.options.callbacks.onClose)
    this.on('afterClose', this.options.callbacks.afterClose)
    this.on('onClick', this.options.callbacks.onClick)
    this.on('onHover', this.options.callbacks.onHover)
    this.on('onTemplate', this.options.callbacks.onTemplate)

    return this
  }

  /**
   * @param {string} eventName
   * @param {function} cb
   * @return {Noty}
   */
  on (eventName, cb = () => {}) {
    if (typeof cb === 'function' && this.listeners.hasOwnProperty(eventName)) {
      this.listeners[eventName].push(cb)
    }

    return this
  }

  /**
   * @return {Noty}
   */
  show () {
    if (this.showing || this.shown) {
      return this // preventing multiple show
    }

    if (this.options.killer === true) {
      Noty.closeAll()
    } else if (typeof this.options.killer === 'string') {
      Noty.closeAll(this.options.killer)
    }

    let queueCounts = API.getQueueCounts(this.options.queue)

    if (
      queueCounts.current >= queueCounts.maxVisible ||
      (API.PageHidden && this.options.visibilityControl)
    ) {
      API.addToQueue(this)

      if (
        API.PageHidden &&
        this.hasSound &&
        Utils.inArray('docHidden', this.options.sounds.conditions)
      ) {
        Utils.createAudioElements(this)
      }

      if (
        API.PageHidden &&
        Utils.inArray('docHidden', this.options.titleCount.conditions)
      ) {
        API.docTitle.increment()
      }

      return this
    }

    API.Store[this.id] = this

    API.fire(this, 'beforeShow')

    this.showing = true

    if (this.closing) {
      this.showing = false
      return this
    }

    API.build(this)
    API.handleModal(this)

    if (this.options.force) {
      this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild)
    } else {
      this.layoutDom.appendChild(this.barDom)
    }

    if (
      this.hasSound &&
      !this.soundPlayed &&
      Utils.inArray('docVisible', this.options.sounds.conditions)
    ) {
      Utils.createAudioElements(this)
    }

    if (Utils.inArray('docVisible', this.options.titleCount.conditions)) {
      API.docTitle.increment()
    }

    this.shown = true
    this.closed = false

    // bind button events if any
    if (API.hasButtons(this)) {
      Object.keys(this.options.buttons).forEach(key => {
        const btn = this.barDom.querySelector(
          `#${this.options.buttons[key].id}`
        )
        Utils.addListener(btn, 'click', e => {
          Utils.stopPropagation(e)
          this.options.buttons[key].cb(this)
        })
      })
    }

    this.progressDom = this.barDom.querySelector('.noty_progressbar')

    if (Utils.inArray('click', this.options.closeWith)) {
      Utils.addClass(this.barDom, 'noty_close_with_click')
      Utils.addListener(
        this.barDom,
        'click',
        e => {
          Utils.stopPropagation(e)
          API.fire(this, 'onClick')
          this.close()
        },
        false
      )
    }

    Utils.addListener(
      this.barDom,
      'mouseenter',
      () => {
        API.fire(this, 'onHover')
      },
      false
    )

    if (this.options.timeout) Utils.addClass(this.barDom, 'noty_has_timeout')
    if (this.options.progressBar) {
      Utils.addClass(this.barDom, 'noty_has_progressbar')
    }

    if (Utils.inArray('button', this.options.closeWith)) {
      Utils.addClass(this.barDom, 'noty_close_with_button')

      const closeButton = document.createElement('div')
      Utils.addClass(closeButton, 'noty_close_button')
      closeButton.innerHTML = '×'
      this.barDom.appendChild(closeButton)

      Utils.addListener(
        closeButton,
        'click',
        e => {
          Utils.stopPropagation(e)
          this.close()
        },
        false
      )
    }

    API.fire(this, 'onShow')

    if (this.options.animation.open === null) {
      this.promises.show = new Promise(resolve => {
        resolve()
      })
    } else if (typeof this.options.animation.open === 'function') {
      this.promises.show = new Promise(this.options.animation.open.bind(this))
    } else {
      Utils.addClass(this.barDom, this.options.animation.open)
      this.promises.show = new Promise(resolve => {
        Utils.addListener(this.barDom, Utils.animationEndEvents, () => {
          Utils.removeClass(this.barDom, this.options.animation.open)
          resolve()
        })
      })
    }

    this.promises.show.then(() => {
      const _t = this
      setTimeout(
        () => {
          API.openFlow(_t)
        },
        100
      )
    })

    return this
  }

  /**
   * @return {Noty}
   */
  stop () {
    API.dequeueClose(this)
    return this
  }

  /**
   * @return {Noty}
   */
  resume () {
    API.queueClose(this)
    return this
  }

  /**
   * @param {int|boolean} ms
   * @return {Noty}
   */
  setTimeout (ms) {
    this.stop()
    this.options.timeout = ms

    if (this.barDom) {
      if (this.options.timeout) {
        Utils.addClass(this.barDom, 'noty_has_timeout')
      } else {
        Utils.removeClass(this.barDom, 'noty_has_timeout')
      }

      const _t = this
      setTimeout(
        function () {
          // ugly fix for progressbar display bug
          _t.resume()
        },
        100
      )
    }

    return this
  }

  /**
   * @param {string} html
   * @param {boolean} optionsOverride
   * @return {Noty}
   */
  setText (html, optionsOverride = false) {
    if (this.barDom) {
      this.barDom.querySelector('.noty_body').innerHTML = html
    }

    if (optionsOverride) this.options.text = html

    return this
  }

  /**
   * @param {string} type
   * @param {boolean} optionsOverride
   * @return {Noty}
   */
  setType (type, optionsOverride = false) {
    if (this.barDom) {
      let classList = Utils.classList(this.barDom).split(' ')

      classList.forEach(c => {
        if (c.substring(0, 11) === 'noty_type__') {
          Utils.removeClass(this.barDom, c)
        }
      })

      Utils.addClass(this.barDom, `noty_type__${type}`)
    }

    if (optionsOverride) this.options.type = type

    return this
  }

  /**
   * @param {string} theme
   * @param {boolean} optionsOverride
   * @return {Noty}
   */
  setTheme (theme, optionsOverride = false) {
    if (this.barDom) {
      let classList = Utils.classList(this.barDom).split(' ')

      classList.forEach(c => {
        if (c.substring(0, 12) === 'noty_theme__') {
          Utils.removeClass(this.barDom, c)
        }
      })

      Utils.addClass(this.barDom, `noty_theme__${theme}`)
    }

    if (optionsOverride) this.options.theme = theme

    return this
  }

  /**
   * @return {Noty}
   */
  close () {
    if (this.closed) return this

    if (!this.shown) {
      // it's in the queue
      API.removeFromQueue(this)
      return this
    }

    API.fire(this, 'onClose')

    this.closing = true

    if (this.options.animation.close === null || this.options.animation.close === false) {
      this.promises.close = new Promise(resolve => {
        resolve()
      })
    } else if (typeof this.options.animation.close === 'function') {
      this.promises.close = new Promise(
        this.options.animation.close.bind(this)
      )
    } else {
      Utils.addClass(this.barDom, this.options.animation.close)
      this.promises.close = new Promise(resolve => {
        Utils.addListener(this.barDom, Utils.animationEndEvents, () => {
          if (this.options.force) {
            Utils.remove(this.barDom)
          } else {
            API.ghostFix(this)
          }
          resolve()
        })
      })
    }

    this.promises.close.then(() => {
      API.closeFlow(this)
      API.handleModalClose(this)
    })

    this.closed = true

    return this
  }

  // API functions

  /**
   * @param {boolean|string} queueName
   * @return {Noty}
   */
  static closeAll (queueName = false) {
    Object.keys(API.Store).forEach(id => {
      if (queueName) {
        if (
          API.Store[id].options.queue === queueName && API.Store[id].killable
        ) {
          API.Store[id].close()
        }
      } else if (API.Store[id].killable) {
        API.Store[id].close()
      }
    })
    return this
  }

  /**
   * @param {string} queueName
   * @return {Noty}
   */
  static clearQueue (queueName = 'global') {
    if (API.Queues.hasOwnProperty(queueName)) {
      API.Queues[queueName].queue = []
    }
    return this
  }

  /**
   * @return {API.Queues}
   */
  static get Queues () {
    return API.Queues
  }

  /**
   * @return {API.PageHidden}
   */
  static get PageHidden () {
    return API.PageHidden
  }

  /**
   * @param {Object} obj
   * @return {Noty}
   */
  static overrideDefaults (obj) {
    API.Defaults = Utils.deepExtend({}, API.Defaults, obj)
    return this
  }

  /**
   * @param {int} amount
   * @param {string} queueName
   * @return {Noty}
   */
  static setMaxVisible (amount = API.DefaultMaxVisible, queueName = 'global') {
    if (!API.Queues.hasOwnProperty(queueName)) {
      API.Queues[queueName] = {maxVisible: amount, queue: []}
    }

    API.Queues[queueName].maxVisible = amount
    return this
  }

  /**
   * @param {string} innerHtml
   * @param {String} classes
   * @param {Function} cb
   * @param {Object} attributes
   * @return {NotyButton}
   */
  static button (innerHtml, classes = null, cb, attributes = {}) {
    return new NotyButton(innerHtml, classes, cb, attributes)
  }

  /**
   * @return {string}
   */
  static version () {
    return VERSION
  }

  /**
   * @param {String} workerPath
   * @return {Push}
   */
  static Push (workerPath) {
    return new Push(workerPath)
  }
}

// Document visibility change controller
if (typeof window !== 'undefined') {
  Utils.visibilityChangeFlow()
}
