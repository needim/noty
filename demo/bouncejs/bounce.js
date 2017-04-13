/**
 * Bounce.js 0.8.2
 * MIT license
 */
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Bounce=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Component, EasingClasses, Matrix4D;

Matrix4D = _dereq_("../math/matrix4d");

EasingClasses = {
  bounce: _dereq_("../easing/bounce"),
  sway: _dereq_("../easing/sway"),
  hardbounce: _dereq_("../easing/hardbounce"),
  hardsway: _dereq_("../easing/hardsway")
};

Component = (function() {
  Component.prototype.easing = "bounce";

  Component.prototype.duration = 1000;

  Component.prototype.delay = 0;

  Component.prototype.from = null;

  Component.prototype.to = null;

  function Component(options) {
    options || (options = {});
    if (options.easing != null) {
      this.easing = options.easing;
    }
    if (options.duration != null) {
      this.duration = options.duration;
    }
    if (options.delay != null) {
      this.delay = options.delay;
    }
    if (options.from != null) {
      this.from = options.from;
    }
    if (options.to != null) {
      this.to = options.to;
    }
    this.easingObject = new EasingClasses[this.easing](options);
  }

  Component.prototype.calculateEase = function(ratio) {
    return this.easingObject.calculate(ratio);
  };

  Component.prototype.getMatrix = function() {
    return new Matrix4D().identity();
  };

  Component.prototype.getEasedMatrix = function(ratio) {
    return this.getMatrix();
  };

  Component.prototype.serialize = function() {
    var key, serialized, value, _ref;
    serialized = {
      type: this.constructor.name.toLowerCase(),
      easing: this.easing,
      duration: this.duration,
      delay: this.delay,
      from: this.from,
      to: this.to
    };
    _ref = this.easingObject.serialize();
    for (key in _ref) {
      value = _ref[key];
      serialized[key] = value;
    }
    return serialized;
  };

  return Component;

})();

module.exports = Component;


},{"../easing/bounce":6,"../easing/hardbounce":7,"../easing/hardsway":8,"../easing/sway":10,"../math/matrix4d":13}],2:[function(_dereq_,module,exports){
var Component, Matrix4D, Rotate, Vector2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Matrix4D = _dereq_("../math/matrix4d");

Vector2D = _dereq_("../math/vector2d");

Component = _dereq_("./index");

Rotate = (function(_super) {
  __extends(Rotate, _super);

  Rotate.prototype.from = 0;

  Rotate.prototype.to = 90;

  function Rotate() {
    Rotate.__super__.constructor.apply(this, arguments);
    this.diff = this.to - this.from;
  }

  Rotate.prototype.getMatrix = function(degrees) {
    var c, radians, s;
    radians = (degrees / 180) * Math.PI;
    c = Math.cos(radians);
    s = Math.sin(radians);
    return new Matrix4D([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  };

  Rotate.prototype.getEasedMatrix = function(ratio) {
    var easedAngle, easedRatio;
    easedRatio = this.calculateEase(ratio);
    easedAngle = this.from + this.diff * easedRatio;
    return this.getMatrix(easedAngle);
  };

  return Rotate;

})(Component);

module.exports = Rotate;


},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],3:[function(_dereq_,module,exports){
var Component, Matrix4D, Scale, Vector2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Matrix4D = _dereq_("../math/matrix4d");

Vector2D = _dereq_("../math/vector2d");

Component = _dereq_("./index");

Scale = (function(_super) {
  __extends(Scale, _super);

  Scale.prototype.from = {
    x: 0.5,
    y: 0.5
  };

  Scale.prototype.to = {
    x: 1,
    y: 1
  };

  function Scale() {
    Scale.__super__.constructor.apply(this, arguments);
    this.fromVector = new Vector2D(this.from.x, this.from.y);
    this.toVector = new Vector2D(this.to.x, this.to.y);
    this.diff = this.toVector.clone().subtract(this.fromVector);
  }

  Scale.prototype.getMatrix = function(x, y) {
    var z;
    z = 1;
    return new Matrix4D([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
  };

  Scale.prototype.getEasedMatrix = function(ratio) {
    var easedRatio, easedVector;
    easedRatio = this.calculateEase(ratio);
    easedVector = this.fromVector.clone().add(this.diff.clone().multiply(easedRatio));
    return this.getMatrix(easedVector.x, easedVector.y);
  };

  return Scale;

})(Component);

module.exports = Scale;


},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],4:[function(_dereq_,module,exports){
var Component, Matrix4D, Skew, Vector2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Matrix4D = _dereq_("../math/matrix4d");

Vector2D = _dereq_("../math/vector2d");

Component = _dereq_("./index");

Skew = (function(_super) {
  __extends(Skew, _super);

  Skew.prototype.from = {
    x: 0,
    y: 0
  };

  Skew.prototype.to = {
    x: 20,
    y: 0
  };

  function Skew() {
    Skew.__super__.constructor.apply(this, arguments);
    this.fromVector = new Vector2D(this.from.x, this.from.y);
    this.toVector = new Vector2D(this.to.x, this.to.y);
    this.diff = this.toVector.clone().subtract(this.fromVector);
  }

  Skew.prototype.getMatrix = function(degreesX, degreesY) {
    var radiansX, radiansY, tx, ty;
    radiansX = (degreesX / 180) * Math.PI;
    radiansY = (degreesY / 180) * Math.PI;
    tx = Math.tan(radiansX);
    ty = Math.tan(radiansY);
    return new Matrix4D([1, tx, 0, 0, ty, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  };

  Skew.prototype.getEasedMatrix = function(ratio) {
    var easedRatio, easedVector;
    easedRatio = this.calculateEase(ratio);
    easedVector = this.fromVector.clone().add(this.diff.clone().multiply(easedRatio));
    return this.getMatrix(easedVector.x, easedVector.y);
  };

  return Skew;

})(Component);

module.exports = Skew;


},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],5:[function(_dereq_,module,exports){
var Component, Matrix4D, Translate, Vector2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Matrix4D = _dereq_("../math/matrix4d");

Vector2D = _dereq_("../math/vector2d");

Component = _dereq_("./index");

Translate = (function(_super) {
  __extends(Translate, _super);

  Translate.prototype.from = {
    x: 0,
    y: 0
  };

  Translate.prototype.to = {
    x: 0,
    y: 0
  };

  function Translate() {
    Translate.__super__.constructor.apply(this, arguments);
    this.fromVector = new Vector2D(this.from.x, this.from.y);
    this.toVector = new Vector2D(this.to.x, this.to.y);
    this.diff = this.toVector.clone().subtract(this.fromVector);
  }

  Translate.prototype.getMatrix = function(x, y) {
    var z;
    z = 0;
    return new Matrix4D([1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
  };

  Translate.prototype.getEasedMatrix = function(ratio) {
    var easedRatio, easedVector;
    easedRatio = this.calculateEase(ratio);
    easedVector = this.fromVector.clone().add(this.diff.clone().multiply(easedRatio));
    return this.getMatrix(easedVector.x, easedVector.y);
  };

  return Translate;

})(Component);

module.exports = Translate;


},{"../math/matrix4d":13,"../math/vector2d":14,"./index":1}],6:[function(_dereq_,module,exports){
var BounceEasing, Easing,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Easing = _dereq_("./index");

BounceEasing = (function(_super) {
  __extends(BounceEasing, _super);

  BounceEasing.prototype.bounces = 4;

  BounceEasing.prototype.stiffness = 3;

  function BounceEasing(options) {
    var threshold;
    if (options == null) {
      options = {};
    }
    BounceEasing.__super__.constructor.apply(this, arguments);
    if (options.stiffness != null) {
      this.stiffness = options.stiffness;
    }
    if (options.bounces != null) {
      this.bounces = options.bounces;
    }
    this.alpha = this.stiffness / 100;
    threshold = 0.005 / Math.pow(10, this.stiffness);
    this.limit = Math.floor(Math.log(threshold) / -this.alpha);
    this.omega = this.calculateOmega(this.bounces, this.limit);
  }

  BounceEasing.prototype.calculate = function(ratio) {
    var t;
    if (ratio >= 1) {
      return 1;
    }
    t = ratio * this.limit;
    return 1 - this.exponent(t) * this.oscillation(t);
  };

  BounceEasing.prototype.calculateOmega = function(bounces, limit) {
    return (this.bounces + 0.5) * Math.PI / this.limit;
  };

  BounceEasing.prototype.exponent = function(t) {
    return Math.pow(Math.E, -this.alpha * t);
  };

  BounceEasing.prototype.oscillation = function(t) {
    return Math.cos(this.omega * t);
  };

  BounceEasing.prototype.serialize = function() {
    return {
      stiffness: this.stiffness,
      bounces: this.bounces
    };
  };

  return BounceEasing;

})(Easing);

module.exports = BounceEasing;


},{"./index":9}],7:[function(_dereq_,module,exports){
var BounceEasing, HardBounceEasing,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BounceEasing = _dereq_("./bounce");

HardBounceEasing = (function(_super) {
  __extends(HardBounceEasing, _super);

  function HardBounceEasing() {
    return HardBounceEasing.__super__.constructor.apply(this, arguments);
  }

  HardBounceEasing.prototype.oscillation = function(t) {
    return Math.abs(Math.cos(this.omega * t));
  };

  return HardBounceEasing;

})(BounceEasing);

module.exports = HardBounceEasing;


},{"./bounce":6}],8:[function(_dereq_,module,exports){
var HardSwayEasing, SwayEasing,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SwayEasing = _dereq_("./sway");

HardSwayEasing = (function(_super) {
  __extends(HardSwayEasing, _super);

  function HardSwayEasing() {
    return HardSwayEasing.__super__.constructor.apply(this, arguments);
  }

  HardSwayEasing.prototype.oscillation = function(t) {
    return Math.abs(Math.sin(this.omega * t));
  };

  return HardSwayEasing;

})(SwayEasing);

module.exports = HardSwayEasing;


},{"./sway":10}],9:[function(_dereq_,module,exports){
var Easing, MathHelpers;

MathHelpers = _dereq_("../math/helpers");

Easing = (function() {
  function Easing() {}

  Easing.prototype.calculate = function(ratio) {
    return ratio;
  };

  Easing.prototype.serialize = function() {
    return {};
  };

  Easing.prototype.findOptimalKeyPoints = function(threshold, resolution) {
    var area, halfway, i, keyPoint, keyPoints, loops, result, values;
    if (threshold == null) {
      threshold = 1.0;
    }
    if (resolution == null) {
      resolution = 1000;
    }
    keyPoints = [0];
    values = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= resolution ? _i < resolution : _i > resolution; i = 0 <= resolution ? ++_i : --_i) {
        _results.push(this.calculate(i / resolution));
      }
      return _results;
    }).call(this);
    keyPoints = keyPoints.concat(MathHelpers.findTurningPoints(values));
    keyPoints.push(resolution - 1);
    i = 0;
    loops = 1000;
    while (loops--) {
      if (i === keyPoints.length - 1) {
        break;
      }
      area = MathHelpers.areaBetweenLineAndCurve(values, keyPoints[i], keyPoints[i + 1]);
      if (area <= threshold) {
        i++;
      } else {
        halfway = Math.round(keyPoints[i] + (keyPoints[i + 1] - keyPoints[i]) / 2);
        keyPoints.splice(i + 1, 0, halfway);
      }
    }
    if (loops === 0) {
      return [];
    }
    return result = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = keyPoints.length; _i < _len; _i++) {
        keyPoint = keyPoints[_i];
        _results.push(keyPoint / (resolution - 1));
      }
      return _results;
    })();
  };

  return Easing;

})();

module.exports = Easing;


},{"../math/helpers":12}],10:[function(_dereq_,module,exports){
var BounceEasing, SwayEasing,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BounceEasing = _dereq_("./bounce");

SwayEasing = (function(_super) {
  __extends(SwayEasing, _super);

  function SwayEasing() {
    return SwayEasing.__super__.constructor.apply(this, arguments);
  }

  SwayEasing.prototype.calculate = function(ratio) {
    var t;
    if (ratio >= 1) {
      return 0;
    }
    t = ratio * this.limit;
    return this.exponent(t) * this.oscillation(t);
  };

  SwayEasing.prototype.calculateOmega = function(bounces, limit) {
    return this.bounces * Math.PI / this.limit;
  };

  SwayEasing.prototype.oscillation = function(t) {
    return Math.sin(this.omega * t);
  };

  return SwayEasing;

})(BounceEasing);

module.exports = SwayEasing;


},{"./bounce":6}],11:[function(_dereq_,module,exports){
var Bounce, ComponentClasses, Matrix4D;

Matrix4D = _dereq_("./math/matrix4d");

ComponentClasses = {
  scale: _dereq_("./components/scale"),
  rotate: _dereq_("./components/rotate"),
  translate: _dereq_("./components/translate"),
  skew: _dereq_("./components/skew")
};

Bounce = (function() {
  Bounce.FPS = 30;

  Bounce.counter = 1;

  Bounce.prototype.components = null;

  Bounce.prototype.duration = 0;

  function Bounce() {
    this.components = [];
  }

  Bounce.prototype.scale = function(options) {
    return this.addComponent(new ComponentClasses["scale"](options));
  };

  Bounce.prototype.rotate = function(options) {
    return this.addComponent(new ComponentClasses["rotate"](options));
  };

  Bounce.prototype.translate = function(options) {
    return this.addComponent(new ComponentClasses["translate"](options));
  };

  Bounce.prototype.skew = function(options) {
    return this.addComponent(new ComponentClasses["skew"](options));
  };

  Bounce.prototype.addComponent = function(component) {
    this.components.push(component);
    this.updateDuration();
    return this;
  };

  Bounce.prototype.serialize = function() {
    var component, serialized, _i, _len, _ref;
    serialized = [];
    _ref = this.components;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      serialized.push(component.serialize());
    }
    return serialized;
  };

  Bounce.prototype.deserialize = function(serialized) {
    var options, _i, _len;
    for (_i = 0, _len = serialized.length; _i < _len; _i++) {
      options = serialized[_i];
      this.addComponent(new ComponentClasses[options.type](options));
    }
    return this;
  };

  Bounce.prototype.updateDuration = function() {
    return this.duration = this.components.map(function(component) {
      return component.duration + component.delay;
    }).reduce(function(a, b) {
      return Math.max(a, b);
    });
  };

  Bounce.prototype.define = function(name) {
    this.name = name || Bounce.generateName();
    this.styleElement = document.createElement("style");
    this.styleElement.innerHTML = this.getKeyframeCSS({
      name: this.name,
      prefix: true
    });
    document.body.appendChild(this.styleElement);
    return this;
  };

  Bounce.prototype.applyTo = function(elements, options) {
    var css, deferred, element, prefix, prefixes, _i, _j, _len, _len1, _ref;
    if (options == null) {
      options = {};
    }
    this.define();
    if (!elements.length) {
      elements = [elements];
    }
    prefixes = this.getPrefixes();
    deferred = null;
    if (window.jQuery && window.jQuery.Deferred) {
      deferred = new window.jQuery.Deferred();
    }
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      _ref = prefixes.animation;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        prefix = _ref[_j];
        css = [this.name, "" + this.duration + "ms", "linear", "both"];
        if (options.loop) {
          css.push("infinite");
        }
        element.style["" + prefix + "animation"] = css.join(" ");
      }
    }
    if (!options.loop) {
      setTimeout(((function(_this) {
        return function() {
          if (options.remove) {
            _this.remove();
          }
          if (typeof options.onComplete === "function") {
            options.onComplete();
          }
          if (deferred) {
            return deferred.resolve();
          }
        };
      })(this)), this.duration);
    }
    return deferred;
  };

  Bounce.prototype.remove = function() {
    var _ref;
    if (!this.styleElement) {
      return;
    }
    if (this.styleElement.remove) {
      return this.styleElement.remove();
    } else {
      return (_ref = this.styleElement.parentNode) != null ? _ref.removeChild(this.styleElement) : void 0;
    }
  };

  Bounce.prototype.getPrefixes = function(force) {
    var prefixes, style;
    prefixes = {
      transform: [""],
      animation: [""]
    };
    style = document.createElement("dummy").style;
    if (force || (!("transform" in style) && "webkitTransform" in style)) {
      prefixes.transform = ["-webkit-", ""];
    }
    if (force || (!("animation" in style) && "webkitAnimation" in style)) {
      prefixes.animation = ["-webkit-", ""];
    }
    return prefixes;
  };

  Bounce.prototype.getKeyframeCSS = function(options) {
    var animations, key, keyframeList, keyframes, matrix, prefix, prefixes, transformString, transforms, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (options == null) {
      options = {};
    }
    this.name = options.name || Bounce.generateName();
    prefixes = {
      transform: [""],
      animation: [""]
    };
    if (options.prefix || options.forcePrefix) {
      prefixes = this.getPrefixes(options.forcePrefix);
    }
    keyframeList = [];
    keyframes = this.getKeyframes(options);
    _ref = this.keys;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      matrix = keyframes[key];
      transformString = "matrix3d" + matrix;
      transforms = [];
      _ref1 = prefixes.transform;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        prefix = _ref1[_j];
        transforms.push("" + prefix + "transform: " + transformString + ";");
      }
      keyframeList.push("" + (Math.round(key * 100 * 100) / 100) + "% { " + (transforms.join(" ")) + " }");
    }
    animations = [];
    _ref2 = prefixes.animation;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      prefix = _ref2[_k];
      animations.push("@" + prefix + "keyframes " + this.name + " { \n  " + (keyframeList.join("\n  ")) + " \n}");
    }
    return animations.join("\n\n");
  };

  Bounce.prototype.getKeyframes = function(options) {
    var component, componentKeys, currentTime, frames, i, key, keyframes, keys, matrix, ratio, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1;
    if (options == null) {
      options = {};
    }
    keys = [0, 1];
    if (options.optimized) {
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        componentKeys = component.easingObject.findOptimalKeyPoints().map((function(_this) {
          return function(key) {
            return (key * component.duration / _this.duration) + (component.delay / _this.duration);
          };
        })(this));
        if (component.delay) {
          componentKeys.push((component.delay / this.duration) - 0.001);
        }
        keys = keys.concat(componentKeys);
      }
    } else {
      frames = Math.round((this.duration / 1000) * Bounce.FPS);
      for (i = _j = 0; 0 <= frames ? _j <= frames : _j >= frames; i = 0 <= frames ? ++_j : --_j) {
        keys.push(i / frames);
      }
    }
    keys = keys.sort(function(a, b) {
      return a - b;
    });
    this.keys = [];
    keyframes = {};
    for (_k = 0, _len1 = keys.length; _k < _len1; _k++) {
      key = keys[_k];
      if (keyframes[key]) {
        continue;
      }
      matrix = new Matrix4D().identity();
      _ref1 = this.components;
      for (_l = 0, _len2 = _ref1.length; _l < _len2; _l++) {
        component = _ref1[_l];
        currentTime = key * this.duration;
        if ((component.delay - currentTime) > 1e-8) {
          continue;
        }
        ratio = (key - component.delay / this.duration) / (component.duration / this.duration);
        matrix.multiply(component.getEasedMatrix(ratio));
      }
      this.keys.push(key);
      keyframes[key] = matrix.transpose().toFixed(3);
    }
    return keyframes;
  };

  Bounce.generateName = function() {
    return "animation-" + (Bounce.counter++);
  };

  Bounce.isSupported = function() {
    var property, propertyIsSupported, propertyList, propertyLists, style, _i, _j, _len, _len1;
    style = document.createElement("dummy").style;
    propertyLists = [["transform", "webkitTransform"], ["animation", "webkitAnimation"]];
    for (_i = 0, _len = propertyLists.length; _i < _len; _i++) {
      propertyList = propertyLists[_i];
      propertyIsSupported = false;
      for (_j = 0, _len1 = propertyList.length; _j < _len1; _j++) {
        property = propertyList[_j];
        propertyIsSupported || (propertyIsSupported = property in style);
      }
      if (!propertyIsSupported) {
        return false;
      }
    }
    return true;
  };

  return Bounce;

})();

module.exports = Bounce;


},{"./components/rotate":2,"./components/scale":3,"./components/skew":4,"./components/translate":5,"./math/matrix4d":13}],12:[function(_dereq_,module,exports){
var MathHelpers;

MathHelpers = (function() {
  function MathHelpers() {}

  MathHelpers.prototype.sign = function(value) {
    if (value < 0) {
      return -1;
    }
    return 1;
  };

  MathHelpers.prototype.findTurningPoints = function(values) {
    var i, signA, signB, turningPoints, _i, _ref;
    turningPoints = [];
    for (i = _i = 1, _ref = values.length - 1; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
      signA = this.sign(values[i] - values[i - 1]);
      signB = this.sign(values[i + 1] - values[i]);
      if (signA !== signB) {
        turningPoints.push(i);
      }
    }
    return turningPoints;
  };

  MathHelpers.prototype.areaBetweenLineAndCurve = function(values, start, end) {
    var area, curveValue, i, length, lineValue, yEnd, yStart, _i;
    length = end - start;
    yStart = values[start];
    yEnd = values[end];
    area = 0;
    for (i = _i = 0; 0 <= length ? _i <= length : _i >= length; i = 0 <= length ? ++_i : --_i) {
      curveValue = values[start + i];
      lineValue = yStart + (i / length) * (yEnd - yStart);
      area += Math.abs(lineValue - curveValue);
    }
    return area;
  };

  return MathHelpers;

})();

module.exports = new MathHelpers;


},{}],13:[function(_dereq_,module,exports){
var Matrix4D;

Matrix4D = (function() {
  Matrix4D.prototype._array = null;

  function Matrix4D(array) {
    this._array = (array != null ? array.slice(0) : void 0) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  Matrix4D.prototype.equals = function(matrix) {
    return this.toString() === matrix.toString();
  };

  Matrix4D.prototype.identity = function() {
    this.setArray([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return this;
  };

  Matrix4D.prototype.multiply = function(matrix) {
    var i, j, k, res, value, _i, _j, _k;
    res = new Matrix4D;
    for (i = _i = 0; _i < 4; i = ++_i) {
      for (j = _j = 0; _j < 4; j = ++_j) {
        for (k = _k = 0; _k < 4; k = ++_k) {
          value = res.get(i, j) + this.get(i, k) * matrix.get(k, j);
          res.set(i, j, value);
        }
      }
    }
    return this.copy(res);
  };

  Matrix4D.prototype.transpose = function() {
    var a;
    a = this.getArray();
    this.setArray([a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]]);
    return this;
  };

  Matrix4D.prototype.get = function(row, column) {
    return this.getArray()[row * 4 + column];
  };

  Matrix4D.prototype.set = function(row, column, value) {
    return this._array[row * 4 + column] = value;
  };

  Matrix4D.prototype.copy = function(matrix) {
    this._array = matrix.getArray();
    return this;
  };

  Matrix4D.prototype.clone = function() {
    return new Matrix4D(this.getArray());
  };

  Matrix4D.prototype.getArray = function() {
    return this._array.slice(0);
  };

  Matrix4D.prototype.setArray = function(array) {
    this._array = array;
    return this;
  };

  Matrix4D.prototype.toString = function() {
    return "(" + (this.getArray().join(", ")) + ")";
  };

  Matrix4D.prototype.toFixed = function(n) {
    var value;
    this._array = (function() {
      var _i, _len, _ref, _results;
      _ref = this._array;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        _results.push(parseFloat(value.toFixed(n)));
      }
      return _results;
    }).call(this);
    return this;
  };

  return Matrix4D;

})();

module.exports = Matrix4D;


},{}],14:[function(_dereq_,module,exports){
var Vector2D;

Vector2D = (function() {
  Vector2D.prototype.x = 0;

  Vector2D.prototype.y = 0;

  function Vector2D(x, y) {
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
  }

  Vector2D.prototype.add = function(vector) {
    if (!Vector2D.isVector2D(vector)) {
      return this._addScalar(vector);
    }
    this.x += vector.x;
    this.y += vector.y;
    return this;
  };

  Vector2D.prototype._addScalar = function(n) {
    this.x += n;
    this.y += n;
    return this;
  };

  Vector2D.prototype.subtract = function(vector) {
    if (!Vector2D.isVector2D(vector)) {
      return this._subtractScalar(vector);
    }
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  };

  Vector2D.prototype._subtractScalar = function(n) {
    return this._addScalar(-n);
  };

  Vector2D.prototype.multiply = function(vector) {
    if (!Vector2D.isVector2D(vector)) {
      return this._multiplyScalar(vector);
    }
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  };

  Vector2D.prototype._multiplyScalar = function(n) {
    this.x *= n;
    this.y *= n;
    return this;
  };

  Vector2D.prototype.divide = function(vector) {
    if (!Vector2D.isVector2D(vector)) {
      return this._divideScalar(vector);
    }
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
  };

  Vector2D.prototype._divideScalar = function(n) {
    return this._multiplyScalar(1 / n);
  };

  Vector2D.prototype.clone = function() {
    return new Vector2D(this.x, this.y);
  };

  Vector2D.prototype.copy = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  };

  Vector2D.prototype.equals = function(vector) {
    return vector.x === this.x && vector.y === this.y;
  };

  Vector2D.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")";
  };

  Vector2D.prototype.toFixed = function(n) {
    this.x = parseFloat(this.x.toFixed(n));
    this.y = parseFloat(this.y.toFixed(n));
    return this;
  };

  Vector2D.prototype.toArray = function() {
    return [this.x, this.y];
  };

  Vector2D.isVector2D = function(item) {
    return item instanceof Vector2D;
  };

  return Vector2D;

})();

module.exports = Vector2D;


},{}]},{},[11])
(11)
});