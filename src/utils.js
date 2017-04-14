import * as API from 'api'

export const animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'

export function inArray (needle, haystack, argStrict) {
  let key
  let strict = !!argStrict

  if (strict) {
    for (key in haystack) {
      if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
        return true
      }
    }
  } else {
    for (key in haystack) {
      if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
        return true
      }
    }
  }
  return false
}

export function stopPropagation (evt) {
  evt = evt || window.event

  if (typeof evt.stopPropagation !== 'undefined') {
    evt.stopPropagation()
  } else {
    evt.cancelBubble = true
  }
}

export const deepExtend = function (out) {
  out = out || {}

  for (let i = 1; i < arguments.length; i++) {
    let obj = arguments[i]

    if (!obj) continue

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          out[key] = obj[key]
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          out[key] = deepExtend(out[key], obj[key])
        } else {
          out[key] = obj[key]
        }
      }
    }
  }

  return out
}

export function generateID (prefix = '') {
  let id = `noty_${prefix}_`

  id += 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0
    let v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })

  return id
}

export function outerHeight (el) {
  let height = el.offsetHeight
  let style = window.getComputedStyle(el)

  height += parseInt(style.marginTop) + parseInt(style.marginBottom)
  return height
}

export let css = (function () {
  let cssPrefixes = ['Webkit', 'O', 'Moz', 'ms']
  let cssProps = {}

  function camelCase (string) {
    return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
      return letter.toUpperCase()
    })
  }

  function getVendorProp (name) {
    let style = document.body.style
    if (name in style) return name

    let i = cssPrefixes.length
    let capName = name.charAt(0).toUpperCase() + name.slice(1)
    let vendorName

    while (i--) {
      vendorName = cssPrefixes[i] + capName
      if (vendorName in style) return vendorName
    }

    return name
  }

  function getStyleProp (name) {
    name = camelCase(name)
    return cssProps[name] || (cssProps[name] = getVendorProp(name))
  }

  function applyCss (element, prop, value) {
    prop = getStyleProp(prop)
    element.style[prop] = value
  }

  return function (element, properties) {
    let args = arguments
    let prop
    let value

    if (args.length === 2) {
      for (prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          value = properties[prop]
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value)
        }
      }
    } else {
      applyCss(element, args[1], args[2])
    }
  }
})()

export function addListener (el, events, cb, useCapture = false) {
  events = events.split(' ')
  for (let i = 0; i < events.length; i++) {
    if (document.addEventListener) {
      el.addEventListener(events[i], cb, useCapture)
    } else if (document.attachEvent) {
      el.attachEvent('on' + events[i], cb)
    }
  }
}

export function hasClass (element, name) {
  let list = typeof element === 'string' ? element : classList(element)
  return list.indexOf(' ' + name + ' ') >= 0
}

export function addClass (element, name) {
  let oldList = classList(element)
  let newList = oldList + name

  if (hasClass(oldList, name)) return

  // Trim the opening space.
  element.className = newList.substring(1)
}

export function removeClass (element, name) {
  let oldList = classList(element)
  let newList

  if (!hasClass(element, name)) return

  // Replace the class name.
  newList = oldList.replace(' ' + name + ' ', ' ')

  // Trim the opening and closing spaces.
  element.className = newList.substring(1, newList.length - 1)
}

export function remove (element) {
  element.parentNode.removeChild(element)
}

export function classList (element) {
  return (' ' + ((element && element.className) || '') + ' ').replace(/\s+/gi, ' ')
}

export function visibilityChangeFlow () {
  function stopAll () {
    Object.keys(API.Store).forEach((id) => {
      if (API.Store.hasOwnProperty(id)) {
        setTimeout(function () {
          API.Store[id].stop()
        }, 100)
      }
    })
  }

  function resumeAll () {
    Object.keys(API.Store).forEach((id) => {
      if (API.Store.hasOwnProperty(id)) {
        setTimeout(function () {
          API.Store[id].resume()
        }, 100)
      }
    })
  }

  addListener(window, 'blur', stopAll)
  addListener(window, 'focus', resumeAll)
}
