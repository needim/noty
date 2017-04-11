import * as API from 'api';

// shims
HTMLElement.prototype.matches =
    HTMLElement.prototype.matches ||
    HTMLElement.prototype.matchesSelector ||
    HTMLElement.prototype.webkitMatchesSelector ||
    HTMLElement.prototype.mozMatchesSelector ||
    HTMLElement.prototype.msMatchesSelector ||
    HTMLElement.prototype.oMatchesSelector;

export const animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

export function inArray (needle, haystack, argStrict) {
  var key = '';
  var strict = !!argStrict;
  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] == needle) {
        return true
      }
    }
  }
  return false
}

export function stopPropagation (evt) {
  evt = evt || window.event;
  if (typeof evt.stopPropagation !== "undefined") {
    evt.stopPropagation();
  }
  else {
    evt.cancelBubble = true;
  }
}

export const deepExtend = function (out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key]))
          out[key] = obj[key];
        else if (typeof obj[key] === 'object')
          out[key] = deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
};

export function generateID (prefix = '') {
  let id = `noty_${prefix}_`;

  id += 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

  return id;
}

// @todo - [needim] - cross browser test
export function delegate (el, evt, sel, handler) {
  el.addEventListener(evt, function (event) {
    var t = event.target;
    while (t && t !== this) {
      if (t.matches(sel)) {
        handler.call(t, event);
      }
      t = t.parentNode;
    }
  });
}

export function outerHeight (el) {
  var height = el.offsetHeight;
  var style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

export let css = (function () {
  var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
      cssProps    = {};

  function camelCase (string) {
    return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
      return letter.toUpperCase();
    });
  }

  function getVendorProp (name) {
    var style = document.body.style;
    if (name in style) return name;

    var i       = cssPrefixes.length,
        capName = name.charAt(0).toUpperCase() + name.slice(1),
        vendorName;
    while (i--) {
      vendorName = cssPrefixes[i] + capName;
      if (vendorName in style) return vendorName;
    }

    return name;
  }

  function getStyleProp (name) {
    name = camelCase(name);
    return cssProps[name] || (cssProps[name] = getVendorProp(name));
  }

  function applyCss (element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }

  return function (element, properties) {
    var args = arguments,
        prop,
        value;

    if (args.length == 2) {
      for (prop in properties) {
        value = properties[prop];
        if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
      }
    } else {
      applyCss(element, args[1], args[2]);
    }
  }
})();

export function addListener (el, events, cb, useCapture = false) {
  events = events.split(' ');
  for (var i = 0; i < events.length; i++) {
    if (document.addEventListener) {
      el.addEventListener(events[i], cb, useCapture);
    } else if (document.attachEvent) {
      el.attachEvent('on' + events[i], cb);
    }
  }
}

export function removeListener (el, events, cb) {
  events = events.split(' ');
  for (var i = 0; i < events.length; i++) {
    if (document.removeEventListener) {
      el.removeEventListener(events[i], cb, false);
    } else if (document.attachEvent) {
      el.attachEvent('on' + events[i], cb);
    }
  }
}

export function live (eventType, elementQuerySelector, cb) {
  document.addEventListener(eventType, (event) => {
    var qs = document.querySelectorAll(elementQuerySelector);
    if (qs) {
      let el = event.target;
      let index;
      while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) {
        el = el.parentElement;
      }

      if (index > -1) {
        cb.call(el, event);
      }
    }
  });
}

export function findParent (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

export function findChild (el, cls) {
  var children = el.children;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (child.classList.contains(cls)) {
      return child;
    }
  }
}

export function hasClass (element, name) {
  var list = typeof element == 'string' ? element : classList(element);
  return list.indexOf(' ' + name + ' ') >= 0;
}

export function addClass (element, name) {
  var oldList = classList(element),
      newList = oldList + name;

  if (hasClass(oldList, name)) return;

  // Trim the opening space.
  element.className = newList.substring(1);
}

export function removeClass (element, name) {
  var oldList = classList(element),
      newList;

  if (!hasClass(element, name)) return;

  // Replace the class name.
  newList = oldList.replace(' ' + name + ' ', ' ');

  // Trim the opening and closing spaces.
  element.className = newList.substring(1, newList.length - 1);
}

export function remove (element) {
  element.parentNode.removeChild(element);
}

export function classList (element) {
  return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
}

export function visibilityChangeFlow () {
  function stopAll () {
    Object.keys(API.Store).forEach((id) => {
      if (API.Store.hasOwnProperty(id)) {
        setTimeout(function () {
          API.Store[id].stop();
        }, 100);
      }
    });
  }

  function resumeAll () {
    Object.keys(API.Store).forEach((id) => {
      if (API.Store.hasOwnProperty(id)) {
        setTimeout(function () {
          API.Store[id].resume();
        }, 100);
      }
    });
  }

  addListener(window, 'blur', stopAll);
  addListener(window, 'focus', resumeAll);

}
