(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Minibed", [], factory);
	else if(typeof exports === 'object')
		exports["Minibed"] = factory();
	else
		root["Minibed"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.CreateDOM = CreateDOM;
exports.inArray = inArray;
exports.stopPropagation = stopPropagation;
exports.generateID = generateID;
exports.outerHeight = outerHeight;
exports.addListener = addListener;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.remove = remove;
exports.classList = classList;
exports.getExtension = getExtension;
exports.fixHTML = fixHTML;
exports.isTouchDevice = isTouchDevice;
exports.MBResizable = MBResizable;
/* GLOBAL XMLHttpRequest, XDomainRequest */
var animationEndEvents = exports.animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

function CreateDOM(tagName) {
  var _this = this;

  var parts = tagName.split('.');
  tagName = parts.shift();

  this.el = document.createElement(tagName);

  parts.forEach(function (c) {
    addClass(_this.el, c);
  });

  this.class = function (name) {
    addClass(_this.el, name);
    return _this;
  };

  this.setAttr = function (attr, val) {
    _this.el.setAttribute(attr, val);
    return _this;
  };

  this.html = function (val) {
    _this.el.innerHTML = val;
    return _this;
  };

  this.dom = function () {
    return _this.el;
  };

  this.append = function (el) {
    _this.el.appendChild(el);
    return _this;
  };

  return this;
}

function inArray(needle, haystack, argStrict) {
  var key = void 0;
  var strict = !!argStrict;

  if (strict) {
    for (key in haystack) {
      if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
        return true;
      }
    }
  }
  return false;
}

function stopPropagation(evt) {
  evt = evt || window.event;

  if (typeof evt.stopPropagation !== 'undefined') {
    evt.stopPropagation();
  } else {
    evt.cancelBubble = true;
  }
}

var deepExtend = exports.deepExtend = function deepExtend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          out[key] = obj[key];
        } else if (_typeof(obj[key]) === 'object' && obj[key] !== null) {
          out[key] = deepExtend(out[key], obj[key]);
        } else {
          out[key] = obj[key];
        }
      }
    }
  }

  return out;
};

function generateID() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var id = 'minibed_' + prefix + '_';

  id += 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });

  return id;
}

function outerHeight(el) {
  var height = el.offsetHeight;
  var style = window.getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

var css = exports.css = function () {
  var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];
  var cssProps = {};

  function camelCase(string) {
    return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
      return letter.toUpperCase();
    });
  }

  function getVendorProp(name) {
    var style = document.body.style;
    if (name in style) return name;

    var i = cssPrefixes.length;
    var capName = name.charAt(0).toUpperCase() + name.slice(1);
    var vendorName = void 0;

    while (i--) {
      vendorName = cssPrefixes[i] + capName;
      if (vendorName in style) return vendorName;
    }

    return name;
  }

  function getStyleProp(name) {
    name = camelCase(name);
    return cssProps[name] || (cssProps[name] = getVendorProp(name));
  }

  function applyCss(element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }

  return function (element, properties) {
    var args = arguments;
    var prop = void 0;
    var value = void 0;

    if (args.length === 2) {
      for (prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) {
            applyCss(element, prop, value);
          }
        }
      }
    } else {
      applyCss(element, args[1], args[2]);
    }
  };
}();

function addListener(el, events, cb) {
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  events = events.split(' ');
  for (var i = 0; i < events.length; i++) {
    if (document.addEventListener) {
      el.addEventListener(events[i], cb, useCapture);
    } else if (document.attachEvent) {
      el.attachEvent('on' + events[i], cb);
    }
  }
}

function hasClass(element, name) {
  var list = typeof element === 'string' ? element : classList(element);
  return list.indexOf(' ' + name + ' ') >= 0;
}

function addClass(element, name) {
  var oldList = classList(element);
  var newList = oldList + name;

  if (hasClass(oldList, name)) return;

  // Trim the opening space.
  element.className = newList.substring(1);
}

function removeClass(element, name) {
  var oldList = classList(element);
  var newList = void 0;

  if (!hasClass(element, name)) return;

  // Replace the class name.
  newList = oldList.replace(' ' + name + ' ', ' ');

  // Trim the opening and closing spaces.
  element.className = newList.substring(1, newList.length - 1);
}

function remove(element) {
  if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function classList(element) {
  return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
}

function getExtension(fileName) {
  return fileName.match(/\.([^.]+)$/)[1];
}

function fixHTML(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.innerHTML;
}

var Request = exports.Request = function Request(url, callback, failCallback) {
  var xmlHttp = new window.XMLHttpRequest();

  // @see http://blogs.msdn.com/b/ie/archive/2012/02/09/cors-for-xhr-in-ie10.aspx
  // @see http://bionicspirit.com/blog/2011/03/24/cross-domain-requests.html
  // @see http://msdn.microsoft.com/en-us/library/ie/cc288060(v=vs.85).aspx
  if ('withCredentials' in xmlHttp) {
    // for Chrome, Firefox, Opera
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200 || xmlHttp.status === 304) {
          callback(xmlHttp.responseText);
        } else {
          setTimeout(failCallback, 0);
        }
      }
    };

    xmlHttp.open('GET', url, true);
    xmlHttp.send();
  } else {
    // for IE
    var xdr = new window.XDomainRequest();
    xdr.onerror = function () {
      setTimeout(failCallback, 0);
    };
    xdr.ontimeout = function () {
      setTimeout(failCallback, 0);
    };
    xdr.onload = function () {
      callback(xdr.responseText);
    };

    xdr.open('get', url);
    xdr.send();
  }
};

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function MBResizable(el) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var self = this;
  this.el = el;

  var handle = new CreateDOM('div.resizable-handle').el;
  el.appendChild(handle);

  addListener(handle, 'mousedown', initResizeable, false);
  addListener(handle, 'touchstart', initResizeable, false);

  function initResizeable(e) {
    e.preventDefault();

    try {
      e = e.touches[0] ? e.touches[0] : e;
    } catch (err) {}

    self.startX = e.clientX;
    self.startY = e.clientY;
    self.startWidth = parseInt(document.defaultView.getComputedStyle(self.el, null).width, 10);
    self.startHeight = parseInt(document.defaultView.getComputedStyle(self.el, null).height, 10);

    addListener(window, 'mousemove', onDrag, false);
    addListener(window, 'mouseup', stopDrag, false);

    addListener(window, 'touchmove', onTouchMove, false);
    addListener(window, 'touchend', onTouchEnd, false);
  }

  function onTouchMove(e) {
    onDrag(e.touches[0]);
  }

  function onTouchEnd(e) {
    if (e.touches.length === 0) {
      stopDrag(e.changedTouches[0]);
    }
  }

  function onDrag(e) {
    self.el.style.height = self.startHeight + e.clientY - self.startY + 'px';
    cb();
  }

  function stopDrag() {
    window.removeEventListener('mousemove', onDrag, false);
    window.removeEventListener('mouseup', stopDrag, false);
    window.removeEventListener('touchmove', onTouchMove, false);
    window.removeEventListener('touchend', onTouchEnd, false);
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Defaults = exports.Includes = exports.FileTypes = undefined;
exports.build = build;

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var FileTypes = exports.FileTypes = {
  html: ['html'],
  css: ['css', 'sass', 'scss', 'less'],
  js: ['js', 'es6']
};

var Includes = exports.Includes = {
  normalize: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/6.0.0/normalize.min.css',
  reset: 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'
};

var Defaults = exports.Defaults = {
  theme: 'dark',
  editorTheme: 'minibed-dark',
  id: false,
  container: false,
  files: {
    html: [],
    js: [],
    css: []
  },
  external: {
    js: [],
    css: []
  },
  settings: {
    readOnly: false, // true, nocursor, false
    scrollLock: false,
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2,
    js: {
      preprocessor: 'none' // babel, typescript, coffeescript, livescript
    },
    css: {
      preprocessor: 'none', // less, sass, scss, stylus, postcss
      base: 'normalize', // reset, none
      prefixing: 'none', // autoprefixer
      imports: [] // susy, compass, bourbon etc. NOT IMPLEMENTED YET
    },
    html: {
      preprocessor: 'none' // haml, markdown, slim, pug
    }
  }
};

var PreprocessorNames = {
  sass: 'SASS',
  scss: 'SCSS',
  less: 'LESS',
  stylus: 'Stylus',
  babel: 'Babel',
  coffeescript: 'CoffeeScript',
  livescript: 'LiveScript',
  typescript: 'TypeScript',
  haml: 'Haml',
  slim: 'Slim',
  pug: 'Pug'
};
/**
 * @param {Minibed} ref
 * @return {void}
 */
function build(ref) {
  findOrCreateContainer(ref);

  ref.wrapper = document.createElement('div');
  ref.wrapper.setAttribute('id', ref.id);
  Utils.addClass(ref.wrapper, 'minibed_bed minibed_theme__' + ref.options.theme);

  if (ref.options.notes.length > 0) {
    Utils.addClass(ref.wrapper, 'minibed_has_footer');
  }

  buildHeader(ref);
  buildContents(ref);
  buildFooter(ref);
}

function getProcessorNameFor(ref, lang) {
  var name = PreprocessorNames[ref.options.settings[lang].preprocessor];
  if (name === undefined) {
    if (lang === 'js') {
      return 'JavaScript';
    } else if (lang === 'css') {
      return 'CSS';
    } else {
      return 'HTML';
    }
  }

  return name;
}

/**
 * @param {Minibed} ref
 * @return {void}
 */
function buildHeader(ref) {
  var tabs = new Utils.CreateDOM('div.minibed_tabs');
  var foundActive = false;

  var logo = new Utils.CreateDOM('a.minibed_logo').setAttr('href', 'http://ned.im/minibed').html('minibed');
  tabs.append(logo.el);

  if (ref.has.html) {
    var tabsHTML = new Utils.CreateDOM('div.minibed_tab.minibed_tabs_html');
    tabsHTML.setAttr('data-lang', 'htmlmixed');
    tabsHTML.setAttr('data-multiple', ref.options.files.html.length > 1);

    if (!foundActive) {
      tabsHTML.class('minibed_active');
      foundActive = true;
    }

    var current = new Utils.CreateDOM('div.minibed_tabs_current').setAttr('data-current', ref.options.files.html[0]).html(getProcessorNameFor(ref, 'html'));
    tabsHTML.append(current.el);

    if (ref.options.files.html.length > 1) {
      var dropdown = new Utils.CreateDOM('div.minibed_tabs_dropdown');

      var i = 0;
      ref.options.files.html.forEach(function (file) {
        var tab = new Utils.CreateDOM('div.minibed_dropdown_item').html(getShortName(file)).setAttr('data-file', file);

        if (i === 0) {
          tab.class('minibed_selected_tab');
        }

        dropdown.append(tab.el);
        i++;
      });
      tabsHTML.append(dropdown.el);
    }

    tabs.append(tabsHTML.el);
  }

  if (ref.has.css) {
    var tabsCSS = new Utils.CreateDOM('div.minibed_tab.minibed_tabs_css');
    tabsCSS.setAttr('data-lang', 'css');
    tabsCSS.setAttr('data-multiple', ref.options.files.css.length > 1);

    if (!foundActive) {
      tabsCSS.class('minibed_active');
      foundActive = true;
    }

    var _current = new Utils.CreateDOM('div.minibed_tabs_current').setAttr('data-current', ref.options.files.css[0]).html(getProcessorNameFor(ref, 'css'));
    tabsCSS.append(_current.el);

    if (ref.options.files.css.length > 1) {
      var _dropdown = new Utils.CreateDOM('div.minibed_tabs_dropdown');

      var _i = 0;
      ref.options.files.css.forEach(function (file) {
        var tab = new Utils.CreateDOM('div.minibed_dropdown_item').html(getShortName(file)).setAttr('data-file', file);

        if (_i === 0) {
          tab.class('minibed_selected_tab');
        }

        _dropdown.append(tab.el);
        _i++;
      });
      tabsCSS.append(_dropdown.el);
    }

    tabs.append(tabsCSS.el);
  }

  if (ref.has.js) {
    var tabsJS = new Utils.CreateDOM('div.minibed_tab.minibed_tabs_js');
    tabsJS.setAttr('data-lang', 'javascript');
    tabsJS.setAttr('data-multiple', ref.options.files.js.length > 1);

    if (!foundActive) {
      tabsJS.class('minibed_active');
    }

    var _current2 = new Utils.CreateDOM('div.minibed_tabs_current').setAttr('data-current', ref.options.files.js[0]).html(getProcessorNameFor(ref, 'js'));
    tabsJS.append(_current2.el);

    if (ref.options.files.js.length > 1) {
      var _dropdown2 = new Utils.CreateDOM('div.minibed_tabs_dropdown');

      var _i2 = 0;
      ref.options.files.js.forEach(function (file) {
        var tab = new Utils.CreateDOM('div.minibed_dropdown_item').html(getShortName(file)).setAttr('data-file', file);

        if (_i2 === 0) {
          tab.class('minibed_selected_tab');
        }

        _dropdown2.append(tab.el);
        _i2++;
      });
      tabsJS.append(_dropdown2.el);
    }

    tabs.append(tabsJS.el);
  }

  var result = new Utils.CreateDOM('div.minibed_tab_result').html('<div class="minibed_checkbox-result"><input type="checkbox" id="minibed_checkbox-result" value="on"><label for="minibed_checkbox-result"></label> Live </div>');

  tabs.append(result.el);

  ref.wrapper.appendChild(tabs.el);
}

function getShortName(name) {
  var parts = name.split('/');
  return parts[parts.length - 1];
}

/**
 * @param {Minibed} ref
 * @return {void}
 */
function buildContents(ref) {
  var tabContents = new Utils.CreateDOM('div.minibed_tab_contents');
  var foundActive = false;

  ref.loading = new Utils.CreateDOM('div.minibed_loading');
  tabContents.append(ref.loading.el);

  if (ref.has.html) {
    var i = 0;
    ref.options.files.html.forEach(function (file) {
      var tabContent = new Utils.CreateDOM('textarea.minibed_tab_content').setAttr('data-file', file).setAttr('data-loaded', 'no').setAttr('data-lang', 'htmlmixed');

      if (i === 0) {
        tabContent.class('minibed_selected_content');
      }

      if (!foundActive) {
        tabContent.class('minibed_active_tab');
        foundActive = true;
      }

      tabContents.append(tabContent.el);
      i++;
    });
  }

  if (ref.has.css) {
    var _i3 = 0;
    ref.options.files.css.forEach(function (file) {
      var tabContent = new Utils.CreateDOM('textarea.minibed_tab_content').setAttr('data-file', file).setAttr('data-loaded', 'no').setAttr('data-lang', 'css');

      if (_i3 === 0) {
        tabContent.class('minibed_selected_content');
      }

      if (!foundActive) {
        tabContent.class('minibed_active_tab');
        foundActive = true;
      }

      tabContents.append(tabContent.el);
      _i3++;
    });
  }

  if (ref.has.js) {
    var _i4 = 0;
    ref.options.files.js.forEach(function (file) {
      var tabContent = new Utils.CreateDOM('textarea.minibed_tab_content').setAttr('data-file', file).setAttr('data-loaded', 'no').setAttr('data-lang', 'javascript');

      if (_i4 === 0) {
        tabContent.class('minibed_selected_content');
      }

      if (!foundActive) {
        tabContent.class('minibed_active_tab');
        foundActive = true;
      }

      tabContents.append(tabContent.el);
      _i4++;
    });
  }

  var resultFrame = new Utils.CreateDOM('iframe.minibed_result_frame').setAttr('src', 'about:blank').setAttr('name', ref.id);
  tabContents.append(resultFrame.el);

  ref.wrapper.appendChild(tabContents.el);
}

/**
 * @param {Minibed} ref
 * @return {void}
 */
function buildFooter(ref) {
  if (ref.options.notes.length > 0) {
    var footer = new Utils.CreateDOM('div.minibed_footer');

    ref.options.notes.forEach(function (note) {
      var p = new Utils.CreateDOM('p.minibed_footer_note').html(note);

      footer.append(p.el);
    });

    ref.wrapper.appendChild(footer.el);
  }
}

/**
 * @param {Minibed} ref
 * @return {void}
 */
function findOrCreateContainer(ref) {
  if (ref.options.container) {
    ref.container = document.querySelector(ref.options.container);
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global VERSION, CodeMirror */

__webpack_require__(2);

var _api = __webpack_require__(1);

var API = _interopRequireWildcard(_api);

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Minibed = function () {
  /**
   * @param {object} options
   * @return {Minibed}
   */
  function Minibed() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Minibed);

    this.options = Utils.deepExtend({}, API.Defaults, options);
    this.id = this.options.id || Utils.generateID('bed');
    this.liveTimeout = -1;
    this.isLive = false;
    this.heightSetted = false;
    this.resizer = null;

    this.loading = null;
    this.wrapper = null;
    this.container = null;
    this.liveButton = null;

    this.has = {
      html: false,
      css: false,
      js: false
    };

    Object.keys(this.options.files).forEach(function (type) {
      if (_this.options.files.hasOwnProperty(type)) {
        for (var i = 0; i < _this.options.files[type].length; i++) {
          var ext = Utils.getExtension(_this.options.files[type][i]);
          if (Utils.inArray(ext, API.FileTypes.html)) {
            _this.has.html = true;
            continue;
          }

          if (Utils.inArray(ext, API.FileTypes.js)) {
            _this.has.js = true;
            continue;
          }

          if (Utils.inArray(ext, API.FileTypes.css)) {
            _this.has.css = true;
          }
        }
      }
    });

    return this;
  }

  /**
   * @return {Minibed}
   */


  _createClass(Minibed, [{
    key: 'show',
    value: function show() {
      API.build(this);

      this.container.appendChild(this.wrapper);
      this.loading = this.container.querySelector('.minibed_loading');

      this.bindEvents();
      this.initEditor();
      return this;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      var self = this;
      var tabs = this.wrapper.querySelectorAll('.minibed_tab');

      tabs.forEach(function (tab) {
        Utils.addListener(tab, 'click', function (e) {
          Utils.stopPropagation(e);

          if (!Utils.hasClass(tab, 'minibed_active')) {
            Utils.removeClass(self.wrapper.querySelector('.minibed_active'), 'minibed_active');
            Utils.addClass(tab, 'minibed_active');
          }

          Utils.removeClass(self.wrapper.querySelector('.minibed_active_tab'), 'minibed_active_tab');
          Utils.removeClass(self.wrapper.querySelector('.minibed_tab_content[data-lang="' + tab.getAttribute('data-lang') + '"]'), 'minibed_selected_content');
          Utils.addClass(self.wrapper.querySelector('.minibed_tab_content[data-file="' + tab.querySelector('.minibed_tabs_current').getAttribute('data-current') + '"]'), 'minibed_active_tab minibed_selected_content');

          self.initEditor();
        });
      });

      this.liveButton = this.wrapper.querySelector('.minibed_tab_result');
      Utils.addListener(this.liveButton, 'click', function () {
        _this2.liveToggle();
      });

      Utils.addListener(this.liveButton.querySelector('label'), 'click', function (e) {
        e.preventDefault();
        return false;
      });

      var dropdownItems = this.wrapper.querySelectorAll('.minibed_dropdown_item');

      dropdownItems.forEach(function (item) {
        Utils.addListener(item, 'click', function (e) {
          Utils.stopPropagation(e);
          if (!Utils.hasClass(item, 'minibed_selected_tab')) {
            Utils.removeClass(item.parentNode.querySelector('.minibed_selected_tab'), 'minibed_selected_tab');
            Utils.addClass(item, 'minibed_selected_tab');
            var curr = item.parentNode.parentNode.querySelector('.minibed_tabs_current');
            curr.setAttribute('data-current', item.getAttribute('data-file'));
            curr.click();
          }
        });
      });
    }
  }, {
    key: 'liveToggle',
    value: function liveToggle() {
      var _this3 = this;

      if (Utils.hasClass(this.liveButton, 'mb_live_active')) {
        Utils.removeClass(this.liveButton, 'mb_live_active');
        Utils.removeClass(this.tabContents, 'minibed_live');
        this.liveButton.querySelector('#minibed_checkbox-result').removeAttribute('checked');
        this.isLive = false;
      } else {
        Utils.addClass(this.liveButton, 'mb_live_active');
        Utils.addClass(this.tabContents, 'minibed_live');
        this.liveButton.querySelector('#minibed_checkbox-result').setAttribute('checked', 'checked');
        this.isLive = true;
        this.run();
      }
      setTimeout(function () {
        _this3.activeEditor.refresh();
      }, 10);
    }
  }, {
    key: 'importCSS',
    value: function importCSS() {
      var styleContent = this.container.querySelector('.minibed_selected_content[data-lang="css"]');
      return styleContent ? '<style type="text/css">' + styleContent.innerHTML + '</style>' : '';
    }
  }, {
    key: 'importHTML',
    value: function importHTML() {
      var htmlContent = this.container.querySelector('.minibed_selected_content[data-lang="htmlmixed"]');
      return htmlContent ? Utils.fixHTML(htmlContent.value) : '';
    }
  }, {
    key: 'importJS',
    value: function importJS() {
      var jsContent = this.container.querySelector('.minibed_selected_content[data-lang="javascript"]');
      return jsContent ? '<script type="text/javascript">' + jsContent.value + '</script>' : '';
    }
  }, {
    key: 'importJSError',
    value: function importJSError() {
      return '<script type="text/javascript">window.onerror = function(msg, source, lineno, colno, error) {\n      console.log(msg, source, lineno, colno, error)\n      parent.document.querySelector(\'.minibed_bed#' + this.id + ' .minibed_result_frame\').style.borderBottomColor = \'#F44336\';\n    }</script>';
    }
  }, {
    key: 'importBaseCSS',
    value: function importBaseCSS() {
      if (this.options.settings.css.base !== 'none') {
        return '<link rel="stylesheet prefetch" href="' + API.Includes[this.options.settings.css.base] + '"/>';
      }
      return '';
    }
  }, {
    key: 'importExternalCSS',
    value: function importExternalCSS() {
      var styles = '';

      if (this.options.external.css.length > 0) {
        this.options.external.css.forEach(function (url) {
          styles += '<link rel="stylesheet prefetch" href="' + url + '"/>';
        });
      }
      return styles;
    }
  }, {
    key: 'importExternalJS',
    value: function importExternalJS() {
      var styles = '';

      if (this.options.external.js.length > 0) {
        this.options.external.js.forEach(function (url) {
          styles += '<script src="' + url + '" type="text/javascript"></script>\n\n\n';
        });
      }

      return styles;
    }
  }, {
    key: 'run',
    value: function run() {
      if (this.isLive) {
        Utils.remove(this.container.querySelector('iframe.minibed_result_frame'));

        var resultFrame = new Utils.CreateDOM('iframe.minibed_result_frame').setAttr('src', 'about:blank').setAttr('name', this.id);
        this.tabContents.appendChild(resultFrame.el);

        var frameTemplate = '<!DOCTYPE html>\n        <html lang="en">\n        <head>\n          <meta charset="UTF-8">\n          <title>minibed <3</title>\n          ' + this.importBaseCSS() + '\n          ' + this.importExternalCSS() + '\n          ' + this.importCSS() + '\n        </head>\n        <body>\n          ' + this.importHTML() + '\n          ' + this.importJSError() + '\n          ' + this.importExternalJS() + '\n          ' + this.importJS() + '\n        </body>\n        </html>';

        var iframe = window.frames[this.id].document;
        iframe.open();
        iframe.write(frameTemplate);
        iframe.close();
      }
    }
  }, {
    key: 'initCodeMirror',
    value: function initCodeMirror() {
      var self = this;

      var mode = this.activeContent.getAttribute('data-lang');

      this.activeEditor = CodeMirror.fromTextArea(this.activeContent, {
        mode: mode,
        tabSize: this.options.settings.tabSize,
        lineNumbers: this.options.settings.lineNumbers,
        lineWrapping: this.options.settings.lineWrapping,
        readOnly: this.options.settings.readOnly,
        styleActiveLine: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        theme: this.options.editorTheme,
        scrollbarStyle: 'simple'
      });

      this.activeEditor.on('change', function () {
        self.activeContent.innerHTML = self.activeEditor.getValue();
        self.activeContent.value = self.activeEditor.getValue();
        clearTimeout(self.liveTimeout);
        self.liveTimeout = setTimeout(function () {
          self.run();
        }, 400);
      });

      this.tabContents = this.wrapper.querySelector('.minibed_tab_contents');

      if (!self.heightSetted) {
        Utils.css(this.tabContents, {
          height: this.tabContents.offsetHeight + 'px'
        });
      }

      var scroller = this.wrapper.querySelector('.CodeMirror-scroll');

      if (this.options.settings.scrollLock && !Utils.isTouchDevice()) {
        Utils.addListener(scroller, 'mousewheel DOMMouseScroll', function (e) {
          var delta = e.wheelDelta || e.originalEvent && e.originalEvent.wheelDelta || -e.detail;
          var bottomOverflow = scroller.scrollTop + scroller.getBoundingClientRect().height - scroller.scrollHeight >= 0;
          var topOverflow = scroller.scrollTop <= 0;
          if (delta < 0 && bottomOverflow || delta > 0 && topOverflow) {
            e.preventDefault();
          }
        });
      }

      Utils.addClass(this.loading, 'hide');

      this.resizer = new Utils.MBResizable(this.wrapper.querySelector('.CodeMirror'), function () {
        self.activeEditor.refresh();
        Utils.css(self.tabContents, {
          height: self.wrapper.querySelector('.CodeMirror').offsetHeight + 'px'
        });
      });

      this.run();
    }
  }, {
    key: 'initEditor',
    value: function initEditor() {
      var self = this;
      Utils.removeClass(this.loading, 'hide');

      if (this.activeEditor) {
        this.activeEditor.toTextArea();
      }

      this.activeContent = this.container.querySelector('.minibed_active_tab');

      if (this.activeContent.getAttribute('data-loaded') === 'yes') {
        this.initCodeMirror();
        return;
      }

      var allFiles = [];
      if (this.has.js) {
        this.options.files.js.forEach(function (file) {
          allFiles.push(file);
        });
      }
      if (this.has.css) {
        this.options.files.css.forEach(function (file) {
          allFiles.push(file);
        });
      }
      if (this.has.html) {
        this.options.files.html.forEach(function (file) {
          allFiles.push(file);
        });
      }

      this.responseCount = 0;

      allFiles.forEach(function (file) {
        Utils.Request(file, function (data) {
          self.responseCount++;
          var textarea = self.wrapper.querySelector('.minibed_tab_content[data-file="' + file + '"]');
          textarea.innerHTML = data;
          textarea.setAttribute('data-loaded', 'yes');
        });
      });

      this.responseCheck = window.setInterval(function () {
        if (self.responseCount === allFiles.length) {
          window.clearInterval(self.responseCheck);
          self.initCodeMirror();
          self.liveToggle();
        }
      }, 100);
    }

    // API functions
    /**
     * @param {Object} obj
     * @return {Minibed}
     */

  }], [{
    key: 'overrideDefaults',
    value: function overrideDefaults(obj) {
      API.Defaults = Utils.deepExtend({}, API.Defaults, obj);
      return this;
    }

    /**
     * @return {string}
     */

  }, {
    key: 'version',
    value: function version() {
      return "0.0.2-beta";
    }
  }]);

  return Minibed;
}();

exports.default = Minibed;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=minibed.js.map