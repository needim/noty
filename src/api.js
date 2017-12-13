import * as Utils from 'utils'

export let PageHidden = false
export let DocModalCount = 0

const DocTitleProps = {
  originalTitle: null,
  count: 0,
  changed: false,
  timer: -1
}

export const docTitle = {
  increment: () => {
    DocTitleProps.count++

    docTitle._update()
  },

  decrement: () => {
    DocTitleProps.count--

    if (DocTitleProps.count <= 0) {
      docTitle._clear()
      return
    }

    docTitle._update()
  },

  _update: () => {
    let title = document.title

    if (!DocTitleProps.changed) {
      DocTitleProps.originalTitle = title
      document.title = `(${DocTitleProps.count}) ${title}`
      DocTitleProps.changed = true
    } else {
      document.title = `(${DocTitleProps.count}) ${DocTitleProps.originalTitle}`
    }
  },

  _clear: () => {
    if (DocTitleProps.changed) {
      DocTitleProps.count = 0
      document.title = DocTitleProps.originalTitle
      DocTitleProps.changed = false
    }
  }
}

export const DefaultMaxVisible = 5

export const Queues = {
  global: {
    maxVisible: DefaultMaxVisible,
    queue: []
  }
}

export const Store = {}

export let Defaults = {
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
    onClick: null,
    onHover: null,
    onTemplate: null
  },
  sounds: {
    sources: [],
    volume: 1,
    conditions: []
  },
  titleCount: {
    conditions: []
  },
  modal: false,
  visibilityControl: false
}

/**
 * @param {string} queueName
 * @return {object}
 */
export function getQueueCounts (queueName = 'global') {
  let count = 0
  let max = DefaultMaxVisible

  if (Queues.hasOwnProperty(queueName)) {
    max = Queues[queueName].maxVisible
    Object.keys(Store).forEach(i => {
      if (Store[i].options.queue === queueName && !Store[i].closed) count++
    })
  }

  return {
    current: count,
    maxVisible: max
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function addToQueue (ref) {
  if (!Queues.hasOwnProperty(ref.options.queue)) {
    Queues[ref.options.queue] = {maxVisible: DefaultMaxVisible, queue: []}
  }

  Queues[ref.options.queue].queue.push(ref)
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function removeFromQueue (ref) {
  if (Queues.hasOwnProperty(ref.options.queue)) {
    const queue = []
    Object.keys(Queues[ref.options.queue].queue).forEach(i => {
      if (Queues[ref.options.queue].queue[i].id !== ref.id) {
        queue.push(Queues[ref.options.queue].queue[i])
      }
    })
    Queues[ref.options.queue].queue = queue
  }
}

/**
 * @param {string} queueName
 * @return {void}
 */
export function queueRender (queueName = 'global') {
  if (Queues.hasOwnProperty(queueName)) {
    const noty = Queues[queueName].queue.shift()

    if (noty) noty.show()
  }
}

/**
 * @return {void}
 */
export function queueRenderAll () {
  Object.keys(Queues).forEach(queueName => {
    queueRender(queueName)
  })
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function ghostFix (ref) {
  const ghostID = Utils.generateID('ghost')
  let ghost = document.createElement('div')
  ghost.setAttribute('id', ghostID)
  Utils.css(ghost, {
    height: Utils.outerHeight(ref.barDom) + 'px'
  })

  ref.barDom.insertAdjacentHTML('afterend', ghost.outerHTML)

  Utils.remove(ref.barDom)
  ghost = document.getElementById(ghostID)
  Utils.addClass(ghost, 'noty_fix_effects_height')
  Utils.addListener(ghost, Utils.animationEndEvents, () => {
    Utils.remove(ghost)
  })
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function build (ref) {
  findOrCreateContainer(ref)

  const markup = `<div class="noty_body">${ref.options.text}</div>${buildButtons(ref)}<div class="noty_progressbar"></div>`

  ref.barDom = document.createElement('div')
  ref.barDom.setAttribute('id', ref.id)
  Utils.addClass(
    ref.barDom,
    `noty_bar noty_type__${ref.options.type} noty_theme__${ref.options.theme}`
  )

  ref.barDom.innerHTML = markup

  fire(ref, 'onTemplate')
}

/**
 * @param {Noty} ref
 * @return {boolean}
 */
export function hasButtons (ref) {
  return !!(ref.options.buttons && Object.keys(ref.options.buttons).length)
}

/**
 * @param {Noty} ref
 * @return {string}
 */
function buildButtons (ref) {
  if (hasButtons(ref)) {
    let buttons = document.createElement('div')
    Utils.addClass(buttons, 'noty_buttons')

    Object.keys(ref.options.buttons).forEach(key => {
      buttons.appendChild(ref.options.buttons[key].dom)
    })

    ref.options.buttons.forEach(btn => {
      buttons.appendChild(btn.dom)
    })
    return buttons.outerHTML
  }
  return ''
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function handleModal (ref) {
  if (ref.options.modal) {
    if (DocModalCount === 0) {
      createModal(ref)
    }

    DocModalCount++
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function handleModalClose (ref) {
  if (ref.options.modal && DocModalCount > 0) {
    DocModalCount--

    if (DocModalCount <= 0) {
      const modal = document.querySelector('.noty_modal')

      if (modal) {
        Utils.removeClass(modal, 'noty_modal_open')
        Utils.addClass(modal, 'noty_modal_close')
        Utils.addListener(modal, Utils.animationEndEvents, () => {
          Utils.remove(modal)
        })
      }
    }
  }
}

/**
 * @return {void}
 */
function createModal () {
  const body = document.querySelector('body')
  const modal = document.createElement('div')
  Utils.addClass(modal, 'noty_modal')
  body.insertBefore(modal, body.firstChild)
  Utils.addClass(modal, 'noty_modal_open')

  Utils.addListener(modal, Utils.animationEndEvents, () => {
    Utils.removeClass(modal, 'noty_modal_open')
  })
}

/**
 * @param {Noty} ref
 * @return {void}
 */
function findOrCreateContainer (ref) {
  if (ref.options.container) {
    ref.layoutDom = document.querySelector(ref.options.container)
    return
  }

  const layoutID = `noty_layout__${ref.options.layout}`
  ref.layoutDom = document.querySelector(`div#${layoutID}`)

  if (!ref.layoutDom) {
    ref.layoutDom = document.createElement('div')
    ref.layoutDom.setAttribute('id', layoutID)
    ref.layoutDom.setAttribute('role', 'alert')
    ref.layoutDom.setAttribute('aria-live', 'polite')
    Utils.addClass(ref.layoutDom, 'noty_layout')
    document.querySelector('body').appendChild(ref.layoutDom)
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function queueClose (ref) {
  if (ref.options.timeout) {
    if (ref.options.progressBar && ref.progressDom) {
      Utils.css(ref.progressDom, {
        transition: `width ${ref.options.timeout}ms linear`,
        width: '0%'
      })
    }

    clearTimeout(ref.closeTimer)

    ref.closeTimer = setTimeout(
      () => {
        ref.close()
      },
      ref.options.timeout
    )
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function dequeueClose (ref) {
  if (ref.options.timeout && ref.closeTimer) {
    clearTimeout(ref.closeTimer)
    ref.closeTimer = -1

    if (ref.options.progressBar && ref.progressDom) {
      Utils.css(ref.progressDom, {
        transition: 'width 0ms linear',
        width: '100%'
      })
    }
  }
}

/**
 * @param {Noty} ref
 * @param {string} eventName
 * @return {void}
 */
export function fire (ref, eventName) {
  if (ref.listeners.hasOwnProperty(eventName)) {
    ref.listeners[eventName].forEach(cb => {
      if (typeof cb === 'function') {
        cb.apply(ref)
      }
    })
  }
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function openFlow (ref) {
  fire(ref, 'afterShow')
  queueClose(ref)

  Utils.addListener(ref.barDom, 'mouseenter', () => {
    dequeueClose(ref)
  })

  Utils.addListener(ref.barDom, 'mouseleave', () => {
    queueClose(ref)
  })
}

/**
 * @param {Noty} ref
 * @return {void}
 */
export function closeFlow (ref) {
  delete Store[ref.id]
  ref.closing = false
  fire(ref, 'afterClose')

  Utils.remove(ref.barDom)

  if (
    ref.layoutDom.querySelectorAll('.noty_bar').length === 0 &&
    !ref.options.container
  ) {
    Utils.remove(ref.layoutDom)
  }

  if (
    Utils.inArray('docVisible', ref.options.titleCount.conditions) ||
    Utils.inArray('docHidden', ref.options.titleCount.conditions)
  ) {
    docTitle.decrement()
  }

  queueRender(ref.options.queue)
}
