// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app-assets/vendors/js/extensions/shepherd.min.js":[function(require,module,exports) {
var define;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e10) { throw _e10; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e11) { didErr = true; err = _e11; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Shepherd = e();
}(this, function () {
  "use strict";

  var t = function t(_t2) {
    return function (t) {
      return !!t && "object" == _typeof(t);
    }(_t2) && !function (t) {
      var n = Object.prototype.toString.call(t);
      return "[object RegExp]" === n || "[object Date]" === n || function (t) {
        return t.$$typeof === e;
      }(t);
    }(_t2);
  };

  var e = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;

  function n(t, e) {
    return !1 !== e.clone && e.isMergeableObject(t) ? a((n = t, Array.isArray(n) ? [] : {}), t, e) : t;
    var n;
  }

  function o(t, e, o) {
    return t.concat(e).map(function (t) {
      return n(t, o);
    });
  }

  function r(t) {
    return Object.keys(t).concat(function (t) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function (e) {
        return t.propertyIsEnumerable(e);
      }) : [];
    }(t));
  }

  function i(t, e) {
    try {
      return e in t;
    } catch (t) {
      return !1;
    }
  }

  function s(t, e, o) {
    var s = {};
    return o.isMergeableObject(t) && r(t).forEach(function (e) {
      s[e] = n(t[e], o);
    }), r(e).forEach(function (r) {
      (function (t, e) {
        return i(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
      })(t, r) || (i(t, r) && o.isMergeableObject(e[r]) ? s[r] = function (t, e) {
        if (!e.customMerge) return a;
        var n = e.customMerge(t);
        return "function" == typeof n ? n : a;
      }(r, o)(t[r], e[r], o) : s[r] = n(e[r], o));
    }), s;
  }

  function a(e, r, i) {
    (i = i || {}).arrayMerge = i.arrayMerge || o, i.isMergeableObject = i.isMergeableObject || t, i.cloneUnlessOtherwiseSpecified = n;
    var a = Array.isArray(r);
    return a === Array.isArray(e) ? a ? i.arrayMerge(e, r, i) : s(e, r, i) : n(r, i);
  }

  a.all = function (t, e) {
    if (!Array.isArray(t)) throw new Error("first argument should be an array");
    return t.reduce(function (t, n) {
      return a(t, n, e);
    }, {});
  };

  var l = a;

  function c(t) {
    return t instanceof HTMLElement;
  }

  function p(t) {
    return "function" == typeof t;
  }

  function u(t) {
    return "string" == typeof t;
  }

  function f(t) {
    return void 0 === t;
  }

  var d = /*#__PURE__*/function () {
    function d() {
      _classCallCheck(this, d);
    }

    _createClass(d, [{
      key: "on",
      value: function on(t, e, n) {
        var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
        return f(this.bindings) && (this.bindings = {}), f(this.bindings[t]) && (this.bindings[t] = []), this.bindings[t].push({
          handler: e,
          ctx: n,
          once: o
        }), this;
      }
    }, {
      key: "once",
      value: function once(t, e, n) {
        return this.on(t, e, n, !0);
      }
    }, {
      key: "off",
      value: function off(t, e) {
        var _this = this;

        return f(this.bindings) || f(this.bindings[t]) ? this : (f(e) ? delete this.bindings[t] : this.bindings[t].forEach(function (n, o) {
          n.handler === e && _this.bindings[t].splice(o, 1);
        }), this);
      }
    }, {
      key: "trigger",
      value: function trigger(t) {
        var _this2 = this;

        for (var _len = arguments.length, e = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          e[_key - 1] = arguments[_key];
        }

        return !f(this.bindings) && this.bindings[t] && this.bindings[t].forEach(function (n, o) {
          var r = n.ctx,
              i = n.handler,
              s = n.once,
              a = r || _this2;
          i.apply(a, e), s && _this2.bindings[t].splice(o, 1);
        }), this;
      }
    }]);

    return d;
  }();

  function h(t) {
    var e = Object.getOwnPropertyNames(t.constructor.prototype);

    for (var _n = 0; _n < e.length; _n++) {
      var _o = e[_n],
          _r = t[_o];
      "constructor" !== _o && "function" == typeof _r && (t[_o] = _r.bind(t));
    }

    return t;
  }

  function m(t) {
    var _ref = t.options.advanceOn || {},
        e = _ref.event,
        n = _ref.selector;

    if (!e) return console.error("advanceOn was defined, but no event name was passed.");
    {
      var _o2 = function (t, e) {
        return function (n) {
          if (e.isOpen()) {
            var _o3 = e.el && n.currentTarget === e.el;

            (!f(t) && n.currentTarget.matches(t) || _o3) && e.tour.next();
          }
        };
      }(n, t);

      var _r2;

      try {
        _r2 = document.querySelector(n);
      } catch (t) {}

      if (!f(n) && !_r2) return console.error("No element was found for the selector supplied to advanceOn: ".concat(n));
      _r2 ? (_r2.addEventListener(e, _o2), t.on("destroy", function () {
        return _r2.removeEventListener(e, _o2);
      })) : (document.body.addEventListener(e, _o2, !0), t.on("destroy", function () {
        return document.body.removeEventListener(e, _o2, !0);
      }));
    }
  }

  var g = "top",
      b = "bottom",
      y = "right",
      v = "left",
      x = "auto",
      w = [g, b, y, v],
      $ = "start",
      O = "end",
      E = "clippingParents",
      S = "viewport",
      T = "popper",
      I = "reference",
      j = w.reduce(function (t, e) {
    return t.concat([e + "-" + $, e + "-" + O]);
  }, []),
      _ = [].concat(w, [x]).reduce(function (t, e) {
    return t.concat([e, e + "-" + $, e + "-" + O]);
  }, []),
      A = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

  function L(t) {
    return t ? (t.nodeName || "").toLowerCase() : null;
  }

  function M(t) {
    if (null == t) return window;

    if ("[object Window]" !== t.toString()) {
      var e = t.ownerDocument;
      return e && e.defaultView || window;
    }

    return t;
  }

  function C(t) {
    return t instanceof M(t).Element || t instanceof Element;
  }

  function k(t) {
    return t instanceof M(t).HTMLElement || t instanceof HTMLElement;
  }

  function P(t) {
    return "undefined" != typeof ShadowRoot && (t instanceof M(t).ShadowRoot || t instanceof ShadowRoot);
  }

  var B = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function fn(t) {
      var e = t.state;
      Object.keys(e.elements).forEach(function (t) {
        var n = e.styles[t] || {},
            o = e.attributes[t] || {},
            r = e.elements[t];
        k(r) && L(r) && (Object.assign(r.style, n), Object.keys(o).forEach(function (t) {
          var e = o[t];
          !1 === e ? r.removeAttribute(t) : r.setAttribute(t, !0 === e ? "" : e);
        }));
      });
    },
    effect: function effect(t) {
      var e = t.state,
          n = {
        popper: {
          position: e.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
      return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function () {
        Object.keys(e.elements).forEach(function (t) {
          var o = e.elements[t],
              r = e.attributes[t] || {},
              i = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : n[t]).reduce(function (t, e) {
            return t[e] = "", t;
          }, {});
          k(o) && L(o) && (Object.assign(o.style, i), Object.keys(r).forEach(function (t) {
            o.removeAttribute(t);
          }));
        });
      };
    },
    requires: ["computeStyles"]
  };

  function D(t) {
    return t.split("-")[0];
  }

  function H(t) {
    var e = t.getBoundingClientRect();
    return {
      width: e.width,
      height: e.height,
      top: e.top,
      right: e.right,
      bottom: e.bottom,
      left: e.left,
      x: e.left,
      y: e.top
    };
  }

  function N(t) {
    var e = H(t),
        n = t.offsetWidth,
        o = t.offsetHeight;
    return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - o) <= 1 && (o = e.height), {
      x: t.offsetLeft,
      y: t.offsetTop,
      width: n,
      height: o
    };
  }

  function R(t, e) {
    var n = e.getRootNode && e.getRootNode();
    if (t.contains(e)) return !0;

    if (n && P(n)) {
      var o = e;

      do {
        if (o && t.isSameNode(o)) return !0;
        o = o.parentNode || o.host;
      } while (o);
    }

    return !1;
  }

  function W(t) {
    return M(t).getComputedStyle(t);
  }

  function F(t) {
    return ["table", "td", "th"].indexOf(L(t)) >= 0;
  }

  function q(t) {
    return ((C(t) ? t.ownerDocument : t.document) || window.document).documentElement;
  }

  function V(t) {
    return "html" === L(t) ? t : t.assignedSlot || t.parentNode || (P(t) ? t.host : null) || q(t);
  }

  function Y(t) {
    return k(t) && "fixed" !== W(t).position ? t.offsetParent : null;
  }

  function X(t) {
    for (var e = M(t), n = Y(t); n && F(n) && "static" === W(n).position;) {
      n = Y(n);
    }

    return n && ("html" === L(n) || "body" === L(n) && "static" === W(n).position) ? e : n || function (t) {
      var e = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
      if (-1 !== navigator.userAgent.indexOf("Trident") && k(t) && "fixed" === W(t).position) return null;

      for (var n = V(t); k(n) && ["html", "body"].indexOf(L(n)) < 0;) {
        var o = W(n);
        if ("none" !== o.transform || "none" !== o.perspective || "paint" === o.contain || -1 !== ["transform", "perspective"].indexOf(o.willChange) || e && "filter" === o.willChange || e && o.filter && "none" !== o.filter) return n;
        n = n.parentNode;
      }

      return null;
    }(t) || e;
  }

  function U(t) {
    return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
  }

  var z = Math.max,
      Z = Math.min,
      K = Math.round;

  function G(t, e, n) {
    return z(t, Z(e, n));
  }

  function J(t) {
    return Object.assign({}, {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, t);
  }

  function Q(t, e) {
    return e.reduce(function (e, n) {
      return e[n] = t, e;
    }, {});
  }

  var tt = function tt(t, e) {
    return J("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, {
      placement: e.placement
    })) : t) ? t : Q(t, w));
  };

  var et = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };

  function nt(t) {
    var e,
        n = t.popper,
        o = t.popperRect,
        r = t.placement,
        i = t.offsets,
        s = t.position,
        a = t.gpuAcceleration,
        l = t.adaptive,
        c = t.roundOffsets,
        p = !0 === c ? function (t) {
      var e = t.x,
          n = t.y,
          o = window.devicePixelRatio || 1;
      return {
        x: K(K(e * o) / o) || 0,
        y: K(K(n * o) / o) || 0
      };
    }(i) : "function" == typeof c ? c(i) : i,
        u = p.x,
        f = void 0 === u ? 0 : u,
        d = p.y,
        h = void 0 === d ? 0 : d,
        m = i.hasOwnProperty("x"),
        x = i.hasOwnProperty("y"),
        w = v,
        $ = g,
        O = window;

    if (l) {
      var E = X(n),
          S = "clientHeight",
          T = "clientWidth";
      E === M(n) && "static" !== W(E = q(n)).position && (S = "scrollHeight", T = "scrollWidth"), E = E, r === g && ($ = b, h -= E[S] - o.height, h *= a ? 1 : -1), r === v && (w = y, f -= E[T] - o.width, f *= a ? 1 : -1);
    }

    var I,
        j = Object.assign({
      position: s
    }, l && et);
    return a ? Object.assign({}, j, ((I = {})[$] = x ? "0" : "", I[w] = m ? "0" : "", I.transform = (O.devicePixelRatio || 1) < 2 ? "translate(" + f + "px, " + h + "px)" : "translate3d(" + f + "px, " + h + "px, 0)", I)) : Object.assign({}, j, ((e = {})[$] = x ? h + "px" : "", e[w] = m ? f + "px" : "", e.transform = "", e));
  }

  var ot = {
    passive: !0
  };
  var rt = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };

  function it(t) {
    return t.replace(/left|right|bottom|top/g, function (t) {
      return rt[t];
    });
  }

  var st = {
    start: "end",
    end: "start"
  };

  function at(t) {
    return t.replace(/start|end/g, function (t) {
      return st[t];
    });
  }

  function lt(t) {
    var e = M(t);
    return {
      scrollLeft: e.pageXOffset,
      scrollTop: e.pageYOffset
    };
  }

  function ct(t) {
    return H(q(t)).left + lt(t).scrollLeft;
  }

  function pt(t) {
    var e = W(t),
        n = e.overflow,
        o = e.overflowX,
        r = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + r + o);
  }

  function ut(t, e) {
    var n;
    void 0 === e && (e = []);

    var o = function t(e) {
      return ["html", "body", "#document"].indexOf(L(e)) >= 0 ? e.ownerDocument.body : k(e) && pt(e) ? e : t(V(e));
    }(t),
        r = o === (null == (n = t.ownerDocument) ? void 0 : n.body),
        i = M(o),
        s = r ? [i].concat(i.visualViewport || [], pt(o) ? o : []) : o,
        a = e.concat(s);

    return r ? a : a.concat(ut(V(s)));
  }

  function ft(t) {
    return Object.assign({}, t, {
      left: t.x,
      top: t.y,
      right: t.x + t.width,
      bottom: t.y + t.height
    });
  }

  function dt(t, e) {
    return e === S ? ft(function (t) {
      var e = M(t),
          n = q(t),
          o = e.visualViewport,
          r = n.clientWidth,
          i = n.clientHeight,
          s = 0,
          a = 0;
      return o && (r = o.width, i = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (s = o.offsetLeft, a = o.offsetTop)), {
        width: r,
        height: i,
        x: s + ct(t),
        y: a
      };
    }(t)) : k(e) ? function (t) {
      var e = H(t);
      return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
    }(e) : ft(function (t) {
      var e,
          n = q(t),
          o = lt(t),
          r = null == (e = t.ownerDocument) ? void 0 : e.body,
          i = z(n.scrollWidth, n.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0),
          s = z(n.scrollHeight, n.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0),
          a = -o.scrollLeft + ct(t),
          l = -o.scrollTop;
      return "rtl" === W(r || n).direction && (a += z(n.clientWidth, r ? r.clientWidth : 0) - i), {
        width: i,
        height: s,
        x: a,
        y: l
      };
    }(q(t)));
  }

  function ht(t, e, n) {
    var o = "clippingParents" === e ? function (t) {
      var e = ut(V(t)),
          n = ["absolute", "fixed"].indexOf(W(t).position) >= 0 && k(t) ? X(t) : t;
      return C(n) ? e.filter(function (t) {
        return C(t) && R(t, n) && "body" !== L(t);
      }) : [];
    }(t) : [].concat(e),
        r = [].concat(o, [n]),
        i = r[0],
        s = r.reduce(function (e, n) {
      var o = dt(t, n);
      return e.top = z(o.top, e.top), e.right = Z(o.right, e.right), e.bottom = Z(o.bottom, e.bottom), e.left = z(o.left, e.left), e;
    }, dt(t, i));
    return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
  }

  function mt(t) {
    return t.split("-")[1];
  }

  function gt(t) {
    var e,
        n = t.reference,
        o = t.element,
        r = t.placement,
        i = r ? D(r) : null,
        s = r ? mt(r) : null,
        a = n.x + n.width / 2 - o.width / 2,
        l = n.y + n.height / 2 - o.height / 2;

    switch (i) {
      case g:
        e = {
          x: a,
          y: n.y - o.height
        };
        break;

      case b:
        e = {
          x: a,
          y: n.y + n.height
        };
        break;

      case y:
        e = {
          x: n.x + n.width,
          y: l
        };
        break;

      case v:
        e = {
          x: n.x - o.width,
          y: l
        };
        break;

      default:
        e = {
          x: n.x,
          y: n.y
        };
    }

    var c = i ? U(i) : null;

    if (null != c) {
      var p = "y" === c ? "height" : "width";

      switch (s) {
        case $:
          e[c] = e[c] - (n[p] / 2 - o[p] / 2);
          break;

        case O:
          e[c] = e[c] + (n[p] / 2 - o[p] / 2);
      }
    }

    return e;
  }

  function bt(t, e) {
    void 0 === e && (e = {});

    var n = e,
        o = n.placement,
        r = void 0 === o ? t.placement : o,
        i = n.boundary,
        s = void 0 === i ? E : i,
        a = n.rootBoundary,
        l = void 0 === a ? S : a,
        c = n.elementContext,
        p = void 0 === c ? T : c,
        u = n.altBoundary,
        f = void 0 !== u && u,
        d = n.padding,
        h = void 0 === d ? 0 : d,
        m = J("number" != typeof h ? h : Q(h, w)),
        v = p === T ? I : T,
        x = t.elements.reference,
        $ = t.rects.popper,
        O = t.elements[f ? v : p],
        j = ht(C(O) ? O : O.contextElement || q(t.elements.popper), s, l),
        _ = H(x),
        A = gt({
      reference: _,
      element: $,
      strategy: "absolute",
      placement: r
    }),
        L = ft(Object.assign({}, $, A)),
        M = p === T ? L : _,
        k = {
      top: j.top - M.top + m.top,
      bottom: M.bottom - j.bottom + m.bottom,
      left: j.left - M.left + m.left,
      right: M.right - j.right + m.right
    },
        P = t.modifiersData.offset;

    if (p === T && P) {
      var B = P[r];
      Object.keys(k).forEach(function (t) {
        var e = [y, b].indexOf(t) >= 0 ? 1 : -1,
            n = [g, b].indexOf(t) >= 0 ? "y" : "x";
        k[t] += B[n] * e;
      });
    }

    return k;
  }

  function yt(t, e) {
    void 0 === e && (e = {});
    var n = e,
        o = n.placement,
        r = n.boundary,
        i = n.rootBoundary,
        s = n.padding,
        a = n.flipVariations,
        l = n.allowedAutoPlacements,
        c = void 0 === l ? _ : l,
        p = mt(o),
        u = p ? a ? j : j.filter(function (t) {
      return mt(t) === p;
    }) : w,
        f = u.filter(function (t) {
      return c.indexOf(t) >= 0;
    });
    0 === f.length && (f = u);
    var d = f.reduce(function (e, n) {
      return e[n] = bt(t, {
        placement: n,
        boundary: r,
        rootBoundary: i,
        padding: s
      })[D(n)], e;
    }, {});
    return Object.keys(d).sort(function (t, e) {
      return d[t] - d[e];
    });
  }

  function vt(t, e, n) {
    return void 0 === n && (n = {
      x: 0,
      y: 0
    }), {
      top: t.top - e.height - n.y,
      right: t.right - e.width + n.x,
      bottom: t.bottom - e.height + n.y,
      left: t.left - e.width - n.x
    };
  }

  function xt(t) {
    return [g, y, b, v].some(function (e) {
      return t[e] >= 0;
    });
  }

  function wt(t, e, n) {
    void 0 === n && (n = !1);
    var o,
        r,
        i = q(e),
        s = H(t),
        a = k(e),
        l = {
      scrollLeft: 0,
      scrollTop: 0
    },
        c = {
      x: 0,
      y: 0
    };
    return (a || !a && !n) && (("body" !== L(e) || pt(i)) && (l = (o = e) !== M(o) && k(o) ? {
      scrollLeft: (r = o).scrollLeft,
      scrollTop: r.scrollTop
    } : lt(o)), k(e) ? ((c = H(e)).x += e.clientLeft, c.y += e.clientTop) : i && (c.x = ct(i))), {
      x: s.left + l.scrollLeft - c.x,
      y: s.top + l.scrollTop - c.y,
      width: s.width,
      height: s.height
    };
  }

  function $t(t) {
    var e = new Map(),
        n = new Set(),
        o = [];
    return t.forEach(function (t) {
      e.set(t.name, t);
    }), t.forEach(function (t) {
      n.has(t.name) || function t(r) {
        n.add(r.name), [].concat(r.requires || [], r.requiresIfExists || []).forEach(function (o) {
          if (!n.has(o)) {
            var r = e.get(o);
            r && t(r);
          }
        }), o.push(r);
      }(t);
    }), o;
  }

  var Ot = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };

  function Et() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) {
      e[n] = arguments[n];
    }

    return !e.some(function (t) {
      return !(t && "function" == typeof t.getBoundingClientRect);
    });
  }

  function St(t) {
    void 0 === t && (t = {});
    var e = t,
        n = e.defaultModifiers,
        o = void 0 === n ? [] : n,
        r = e.defaultOptions,
        i = void 0 === r ? Ot : r;
    return function (t, e, n) {
      void 0 === n && (n = i);
      var r,
          s,
          a = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Ot, i),
        modifiersData: {},
        elements: {
          reference: t,
          popper: e
        },
        attributes: {},
        styles: {}
      },
          l = [],
          c = !1,
          p = {
        state: a,
        setOptions: function setOptions(n) {
          u(), a.options = Object.assign({}, i, a.options, n), a.scrollParents = {
            reference: C(t) ? ut(t) : t.contextElement ? ut(t.contextElement) : [],
            popper: ut(e)
          };

          var r,
              s,
              c = function (t) {
            var e = $t(t);
            return A.reduce(function (t, n) {
              return t.concat(e.filter(function (t) {
                return t.phase === n;
              }));
            }, []);
          }((r = [].concat(o, a.options.modifiers), s = r.reduce(function (t, e) {
            var n = t[e.name];
            return t[e.name] = n ? Object.assign({}, n, e, {
              options: Object.assign({}, n.options, e.options),
              data: Object.assign({}, n.data, e.data)
            }) : e, t;
          }, {}), Object.keys(s).map(function (t) {
            return s[t];
          })));

          return a.orderedModifiers = c.filter(function (t) {
            return t.enabled;
          }), a.orderedModifiers.forEach(function (t) {
            var e = t.name,
                n = t.options,
                o = void 0 === n ? {} : n,
                r = t.effect;

            if ("function" == typeof r) {
              var i = r({
                state: a,
                name: e,
                instance: p,
                options: o
              });
              l.push(i || function () {});
            }
          }), p.update();
        },
        forceUpdate: function forceUpdate() {
          if (!c) {
            var t = a.elements,
                e = t.reference,
                n = t.popper;

            if (Et(e, n)) {
              a.rects = {
                reference: wt(e, X(n), "fixed" === a.options.strategy),
                popper: N(n)
              }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach(function (t) {
                return a.modifiersData[t.name] = Object.assign({}, t.data);
              });

              for (var o = 0; o < a.orderedModifiers.length; o++) {
                if (!0 !== a.reset) {
                  var r = a.orderedModifiers[o],
                      i = r.fn,
                      s = r.options,
                      l = void 0 === s ? {} : s,
                      u = r.name;
                  "function" == typeof i && (a = i({
                    state: a,
                    options: l,
                    name: u,
                    instance: p
                  }) || a);
                } else a.reset = !1, o = -1;
              }
            }
          }
        },
        update: (r = function r() {
          return new Promise(function (t) {
            p.forceUpdate(), t(a);
          });
        }, function () {
          return s || (s = new Promise(function (t) {
            Promise.resolve().then(function () {
              s = void 0, t(r());
            });
          })), s;
        }),
        destroy: function destroy() {
          u(), c = !0;
        }
      };
      if (!Et(t, e)) return p;

      function u() {
        l.forEach(function (t) {
          return t();
        }), l = [];
      }

      return p.setOptions(n).then(function (t) {
        !c && n.onFirstUpdate && n.onFirstUpdate(t);
      }), p;
    };
  }

  var Tt = St({
    defaultModifiers: [{
      name: "eventListeners",
      enabled: !0,
      phase: "write",
      fn: function fn() {},
      effect: function effect(t) {
        var e = t.state,
            n = t.instance,
            o = t.options,
            r = o.scroll,
            i = void 0 === r || r,
            s = o.resize,
            a = void 0 === s || s,
            l = M(e.elements.popper),
            c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
        return i && c.forEach(function (t) {
          t.addEventListener("scroll", n.update, ot);
        }), a && l.addEventListener("resize", n.update, ot), function () {
          i && c.forEach(function (t) {
            t.removeEventListener("scroll", n.update, ot);
          }), a && l.removeEventListener("resize", n.update, ot);
        };
      },
      data: {}
    }, {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function fn(t) {
        var e = t.state,
            n = t.name;
        e.modifiersData[n] = gt({
          reference: e.rects.reference,
          element: e.rects.popper,
          strategy: "absolute",
          placement: e.placement
        });
      },
      data: {}
    }, {
      name: "computeStyles",
      enabled: !0,
      phase: "beforeWrite",
      fn: function fn(t) {
        var e = t.state,
            n = t.options,
            o = n.gpuAcceleration,
            r = void 0 === o || o,
            i = n.adaptive,
            s = void 0 === i || i,
            a = n.roundOffsets,
            l = void 0 === a || a,
            c = {
          placement: D(e.placement),
          popper: e.elements.popper,
          popperRect: e.rects.popper,
          gpuAcceleration: r
        };
        null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, nt(Object.assign({}, c, {
          offsets: e.modifiersData.popperOffsets,
          position: e.options.strategy,
          adaptive: s,
          roundOffsets: l
        })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, nt(Object.assign({}, c, {
          offsets: e.modifiersData.arrow,
          position: "absolute",
          adaptive: !1,
          roundOffsets: l
        })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
          "data-popper-placement": e.placement
        });
      },
      data: {}
    }, B, {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function fn(t) {
        var e = t.state,
            n = t.options,
            o = t.name,
            r = n.offset,
            i = void 0 === r ? [0, 0] : r,
            s = _.reduce(function (t, n) {
          return t[n] = function (t, e, n) {
            var o = D(t),
                r = [v, g].indexOf(o) >= 0 ? -1 : 1,
                i = "function" == typeof n ? n(Object.assign({}, e, {
              placement: t
            })) : n,
                s = i[0],
                a = i[1];
            return s = s || 0, a = (a || 0) * r, [v, y].indexOf(o) >= 0 ? {
              x: a,
              y: s
            } : {
              x: s,
              y: a
            };
          }(n, e.rects, i), t;
        }, {}),
            a = s[e.placement],
            l = a.x,
            c = a.y;

        null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[o] = s;
      }
    }, {
      name: "flip",
      enabled: !0,
      phase: "main",
      fn: function fn(t) {
        var e = t.state,
            n = t.options,
            o = t.name;

        if (!e.modifiersData[o]._skip) {
          for (var r = n.mainAxis, i = void 0 === r || r, s = n.altAxis, a = void 0 === s || s, l = n.fallbackPlacements, c = n.padding, p = n.boundary, u = n.rootBoundary, f = n.altBoundary, d = n.flipVariations, h = void 0 === d || d, m = n.allowedAutoPlacements, w = e.options.placement, O = D(w), E = l || (O !== w && h ? function (t) {
            if (D(t) === x) return [];
            var e = it(t);
            return [at(t), e, at(e)];
          }(w) : [it(w)]), S = [w].concat(E).reduce(function (t, n) {
            return t.concat(D(n) === x ? yt(e, {
              placement: n,
              boundary: p,
              rootBoundary: u,
              padding: c,
              flipVariations: h,
              allowedAutoPlacements: m
            }) : n);
          }, []), T = e.rects.reference, I = e.rects.popper, j = new Map(), _ = !0, A = S[0], L = 0; L < S.length; L++) {
            var M = S[L],
                C = D(M),
                k = mt(M) === $,
                P = [g, b].indexOf(C) >= 0,
                B = P ? "width" : "height",
                H = bt(e, {
              placement: M,
              boundary: p,
              rootBoundary: u,
              altBoundary: f,
              padding: c
            }),
                N = P ? k ? y : v : k ? b : g;
            T[B] > I[B] && (N = it(N));
            var R = it(N),
                W = [];

            if (i && W.push(H[C] <= 0), a && W.push(H[N] <= 0, H[R] <= 0), W.every(function (t) {
              return t;
            })) {
              A = M, _ = !1;
              break;
            }

            j.set(M, W);
          }

          if (_) for (var F = function F(t) {
            var e = S.find(function (e) {
              var n = j.get(e);
              if (n) return n.slice(0, t).every(function (t) {
                return t;
              });
            });
            if (e) return A = e, "break";
          }, q = h ? 3 : 1; q > 0 && "break" !== F(q); q--) {
            ;
          }
          e.placement !== A && (e.modifiersData[o]._skip = !0, e.placement = A, e.reset = !0);
        }
      },
      requiresIfExists: ["offset"],
      data: {
        _skip: !1
      }
    }, {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function fn(t) {
        var e = t.state,
            n = t.options,
            o = t.name,
            r = n.mainAxis,
            i = void 0 === r || r,
            s = n.altAxis,
            a = void 0 !== s && s,
            l = n.boundary,
            c = n.rootBoundary,
            p = n.altBoundary,
            u = n.padding,
            f = n.tether,
            d = void 0 === f || f,
            h = n.tetherOffset,
            m = void 0 === h ? 0 : h,
            x = bt(e, {
          boundary: l,
          rootBoundary: c,
          padding: u,
          altBoundary: p
        }),
            w = D(e.placement),
            O = mt(e.placement),
            E = !O,
            S = U(w),
            T = "x" === S ? "y" : "x",
            I = e.modifiersData.popperOffsets,
            j = e.rects.reference,
            _ = e.rects.popper,
            A = "function" == typeof m ? m(Object.assign({}, e.rects, {
          placement: e.placement
        })) : m,
            L = {
          x: 0,
          y: 0
        };

        if (I) {
          if (i || a) {
            var M = "y" === S ? g : v,
                C = "y" === S ? b : y,
                k = "y" === S ? "height" : "width",
                P = I[S],
                B = I[S] + x[M],
                H = I[S] - x[C],
                R = d ? -_[k] / 2 : 0,
                W = O === $ ? j[k] : _[k],
                F = O === $ ? -_[k] : -j[k],
                q = e.elements.arrow,
                V = d && q ? N(q) : {
              width: 0,
              height: 0
            },
                Y = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
                K = Y[M],
                J = Y[C],
                Q = G(0, j[k], V[k]),
                tt = E ? j[k] / 2 - R - Q - K - A : W - Q - K - A,
                et = E ? -j[k] / 2 + R + Q + J + A : F + Q + J + A,
                nt = e.elements.arrow && X(e.elements.arrow),
                ot = nt ? "y" === S ? nt.clientTop || 0 : nt.clientLeft || 0 : 0,
                rt = e.modifiersData.offset ? e.modifiersData.offset[e.placement][S] : 0,
                it = I[S] + tt - rt - ot,
                st = I[S] + et - rt;

            if (i) {
              var at = G(d ? Z(B, it) : B, P, d ? z(H, st) : H);
              I[S] = at, L[S] = at - P;
            }

            if (a) {
              var lt = "x" === S ? g : v,
                  ct = "x" === S ? b : y,
                  pt = I[T],
                  ut = pt + x[lt],
                  ft = pt - x[ct],
                  dt = G(d ? Z(ut, it) : ut, pt, d ? z(ft, st) : ft);
              I[T] = dt, L[T] = dt - pt;
            }
          }

          e.modifiersData[o] = L;
        }
      },
      requiresIfExists: ["offset"]
    }, {
      name: "arrow",
      enabled: !0,
      phase: "main",
      fn: function fn(t) {
        var e,
            n = t.state,
            o = t.name,
            r = t.options,
            i = n.elements.arrow,
            s = n.modifiersData.popperOffsets,
            a = D(n.placement),
            l = U(a),
            c = [v, y].indexOf(a) >= 0 ? "height" : "width";

        if (i && s) {
          var p = tt(r.padding, n),
              u = N(i),
              f = "y" === l ? g : v,
              d = "y" === l ? b : y,
              h = n.rects.reference[c] + n.rects.reference[l] - s[l] - n.rects.popper[c],
              m = s[l] - n.rects.reference[l],
              x = X(i),
              w = x ? "y" === l ? x.clientHeight || 0 : x.clientWidth || 0 : 0,
              $ = h / 2 - m / 2,
              O = p[f],
              E = w - u[c] - p[d],
              S = w / 2 - u[c] / 2 + $,
              T = G(O, S, E),
              I = l;
          n.modifiersData[o] = ((e = {})[I] = T, e.centerOffset = T - S, e);
        }
      },
      effect: function effect(t) {
        var e = t.state,
            n = t.options.element,
            o = void 0 === n ? "[data-popper-arrow]" : n;
        null != o && ("string" != typeof o || (o = e.elements.popper.querySelector(o))) && R(e.elements.popper, o) && (e.elements.arrow = o);
      },
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
    }, {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function fn(t) {
        var e = t.state,
            n = t.name,
            o = e.rects.reference,
            r = e.rects.popper,
            i = e.modifiersData.preventOverflow,
            s = bt(e, {
          elementContext: "reference"
        }),
            a = bt(e, {
          altBoundary: !0
        }),
            l = vt(s, o),
            c = vt(a, r, i),
            p = xt(l),
            u = xt(c);
        e.modifiersData[n] = {
          referenceClippingOffsets: l,
          popperEscapeOffsets: c,
          isReferenceHidden: p,
          hasPopperEscaped: u
        }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
          "data-popper-reference-hidden": p,
          "data-popper-escaped": u
        });
      }
    }]
  });

  function It() {
    return (It = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];

        for (var o in n) {
          Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
      }

      return t;
    }).apply(this, arguments);
  }

  function jt(t) {
    var e = [{
      name: "applyStyles",
      fn: function fn(_ref2) {
        var t = _ref2.state;
        Object.keys(t.elements).forEach(function (e) {
          if ("popper" !== e) return;
          var n = t.attributes[e] || {},
              o = t.elements[e];
          Object.assign(o.style, {
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }), Object.keys(n).forEach(function (t) {
            var e = n[t];
            !1 === e ? o.removeAttribute(t) : o.setAttribute(t, !0 === e ? "" : e);
          });
        });
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !1
      }
    }];
    var n = {
      placement: "top",
      strategy: "fixed",
      modifiers: [{
        name: "focusAfterRender",
        enabled: !0,
        phase: "afterWrite",
        fn: function fn() {
          setTimeout(function () {
            t.el && t.el.focus();
          }, 300);
        }
      }]
    };
    return n = It({}, n, {
      modifiers: Array.from(new Set([].concat(_toConsumableArray(n.modifiers), e)))
    });
  }

  function _t(t) {
    return u(t) && "" !== t ? "-" !== t.charAt(t.length - 1) ? "".concat(t, "-") : t : "";
  }

  function At(t) {
    var e = t.options.attachTo || {},
        n = Object.assign({}, e);

    if (u(e.element)) {
      try {
        n.element = document.querySelector(e.element);
      } catch (t) {}

      n.element || console.error("The element for this Shepherd step was not found ".concat(e.element));
    }

    return n;
  }

  function Lt(t) {
    t.tooltip && t.tooltip.destroy();
    var e = At(t);
    var n = e.element;

    var o = function (t, e) {
      var n = {
        modifiers: [{
          name: "preventOverflow",
          options: {
            altAxis: !0,
            tether: !1
          }
        }, {
          name: "focusAfterRender",
          enabled: !0,
          phase: "afterWrite",
          fn: function fn() {
            setTimeout(function () {
              e.el && e.el.focus();
            }, 300);
          }
        }],
        strategy: "absolute"
      };
      e.isCentered() ? n = jt(e) : n.placement = t.on;
      var o = e.tour && e.tour.options && e.tour.options.defaultStepOptions;
      o && (n = Ct(o, n));
      return n = Ct(e.options, n);
    }(e, t);

    if (t.isCentered()) {
      n = document.body, t.shepherdElementComponent.getElement().classList.add("shepherd-centered");
    }

    return t.tooltip = Tt(n, t.el, o), t.target = e.element, o;
  }

  function Mt() {
    var t = Date.now();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
      var n = (t + 16 * Math.random()) % 16 | 0;
      return t = Math.floor(t / 16), ("x" == e ? n : 3 & n | 8).toString(16);
    });
  }

  function Ct(t, e) {
    if (t.popperOptions) {
      var _n2 = Object.assign({}, e, t.popperOptions);

      if (t.popperOptions.modifiers && t.popperOptions.modifiers.length > 0) {
        var _o4 = t.popperOptions.modifiers.map(function (t) {
          return t.name;
        }),
            _r3 = e.modifiers.filter(function (t) {
          return !_o4.includes(t.name);
        });

        _n2.modifiers = Array.from(new Set([].concat(_toConsumableArray(_r3), _toConsumableArray(t.popperOptions.modifiers))));
      }

      return _n2;
    }

    return e;
  }

  function kt() {}

  function Pt(t, e) {
    for (var _n3 in e) {
      t[_n3] = e[_n3];
    }

    return t;
  }

  function Bt(t) {
    return t();
  }

  function Dt() {
    return Object.create(null);
  }

  function Ht(t) {
    t.forEach(Bt);
  }

  function Nt(t) {
    return "function" == typeof t;
  }

  function Rt(t, e) {
    return t != t ? e == e : t !== e || t && "object" == _typeof(t) || "function" == typeof t;
  }

  var Wt = !1;
  var Ft = new Set();

  function qt(t, e) {
    Wt && Ft.delete(e), e.parentNode !== t && t.appendChild(e);
  }

  function Vt(t, e, n) {
    Wt && Ft.delete(e), (e.parentNode !== t || n && e.nextSibling !== n) && t.insertBefore(e, n || null);
  }

  function Yt(t) {
    Wt ? Ft.add(t) : t.parentNode && t.parentNode.removeChild(t);
  }

  function Xt(t) {
    return document.createElement(t);
  }

  function Ut(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t);
  }

  function zt(t) {
    return document.createTextNode(t);
  }

  function Zt() {
    return zt(" ");
  }

  function Kt(t, e, n, o) {
    return t.addEventListener(e, n, o), function () {
      return t.removeEventListener(e, n, o);
    };
  }

  function Gt(t, e, n) {
    null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }

  function Jt(t, e) {
    var n = Object.getOwnPropertyDescriptors(t.__proto__);

    for (var _o5 in e) {
      null == e[_o5] ? t.removeAttribute(_o5) : "style" === _o5 ? t.style.cssText = e[_o5] : "__value" === _o5 ? t.value = t[_o5] = e[_o5] : n[_o5] && n[_o5].set ? t[_o5] = e[_o5] : Gt(t, _o5, e[_o5]);
    }
  }

  function Qt(t, e, n) {
    t.classList[n ? "add" : "remove"](e);
  }

  var te;

  function ee(t) {
    te = t;
  }

  function ne() {
    if (!te) throw new Error("Function called outside component initialization");
    return te;
  }

  function oe(t) {
    ne().$$.after_update.push(t);
  }

  var re = [],
      ie = [],
      se = [],
      ae = [],
      le = Promise.resolve();
  var ce = !1;

  function pe(t) {
    se.push(t);
  }

  var ue = !1;
  var fe = new Set();

  function de() {
    if (!ue) {
      ue = !0;

      do {
        for (var _t3 = 0; _t3 < re.length; _t3 += 1) {
          var _e2 = re[_t3];
          ee(_e2), he(_e2.$$);
        }

        for (ee(null), re.length = 0; ie.length;) {
          ie.pop()();
        }

        for (var _t4 = 0; _t4 < se.length; _t4 += 1) {
          var _e3 = se[_t4];
          fe.has(_e3) || (fe.add(_e3), _e3());
        }

        se.length = 0;
      } while (re.length);

      for (; ae.length;) {
        ae.pop()();
      }

      ce = !1, ue = !1, fe.clear();
    }
  }

  function he(t) {
    if (null !== t.fragment) {
      t.update(), Ht(t.before_update);
      var _e4 = t.dirty;
      t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, _e4), t.after_update.forEach(pe);
    }
  }

  var me = new Set();
  var ge;

  function be() {
    ge = {
      r: 0,
      c: [],
      p: ge
    };
  }

  function ye() {
    ge.r || Ht(ge.c), ge = ge.p;
  }

  function ve(t, e) {
    t && t.i && (me.delete(t), t.i(e));
  }

  function xe(t, e, n, o) {
    if (t && t.o) {
      if (me.has(t)) return;
      me.add(t), ge.c.push(function () {
        me.delete(t), o && (n && t.d(1), o());
      }), t.o(e);
    }
  }

  function we(t) {
    t && t.c();
  }

  function $e(t, e, n, o) {
    var _t$$$ = t.$$,
        r = _t$$$.fragment,
        i = _t$$$.on_mount,
        s = _t$$$.on_destroy,
        a = _t$$$.after_update;
    r && r.m(e, n), o || pe(function () {
      var e = i.map(Bt).filter(Nt);
      s ? s.push.apply(s, _toConsumableArray(e)) : Ht(e), t.$$.on_mount = [];
    }), a.forEach(pe);
  }

  function Oe(t, e) {
    var n = t.$$;
    null !== n.fragment && (Ht(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = []);
  }

  function Ee(t, e) {
    -1 === t.$$.dirty[0] && (re.push(t), ce || (ce = !0, le.then(de)), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
  }

  function Se(t, e, n, o, r, i) {
    var s = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [-1];
    var a = te;
    ee(t);
    var l = t.$$ = {
      fragment: null,
      ctx: null,
      props: i,
      update: kt,
      not_equal: r,
      bound: Dt(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(a ? a.$$.context : e.context || []),
      callbacks: Dt(),
      dirty: s,
      skip_bound: !1
    };
    var c = !1;

    if (l.ctx = n ? n(t, e.props || {}, function (e, n) {
      var i = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : n;
      return l.ctx && r(l.ctx[e], l.ctx[e] = i) && (!l.skip_bound && l.bound[e] && l.bound[e](i), c && Ee(t, e)), n;
    }) : [], l.update(), c = !0, Ht(l.before_update), l.fragment = !!o && o(l.ctx), e.target) {
      if (e.hydrate) {
        Wt = !0;

        var _t5 = (p = e.target, Array.from(p.childNodes));

        l.fragment && l.fragment.l(_t5), _t5.forEach(Yt);
      } else l.fragment && l.fragment.c();

      e.intro && ve(t.$$.fragment), $e(t, e.target, e.anchor, e.customElement), function () {
        Wt = !1;

        var _iterator = _createForOfIteratorHelper(Ft),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _t6 = _step.value;

            _t6.parentNode.removeChild(_t6);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        Ft.clear();
      }(), de();
    }

    var p;
    ee(a);
  }

  var Te = /*#__PURE__*/function () {
    function Te() {
      _classCallCheck(this, Te);
    }

    _createClass(Te, [{
      key: "$destroy",
      value: function $destroy() {
        Oe(this, 1), this.$destroy = kt;
      }
    }, {
      key: "$on",
      value: function $on(t, e) {
        var n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return n.push(e), function () {
          var t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        };
      }
    }, {
      key: "$set",
      value: function $set(t) {
        var e;
        this.$$set && (e = t, 0 !== Object.keys(e).length) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
      }
    }]);

    return Te;
  }();

  function Ie(t) {
    var e, n, o, r, i;
    return {
      c: function c() {
        Gt(e = Xt("button"), "aria-label", n = t[3] ? t[3] : null), Gt(e, "class", o = "".concat(t[1] || "", " shepherd-button ").concat(t[4] ? "shepherd-button-secondary" : "")), e.disabled = t[2], Gt(e, "tabindex", "0");
      },
      m: function m(n, o) {
        Vt(n, e, o), e.innerHTML = t[5], r || (i = Kt(e, "click", function () {
          Nt(t[0]) && t[0].apply(this, arguments);
        }), r = !0);
      },
      p: function p(r, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            i = _ref4[0];

        t = r, 32 & i && (e.innerHTML = t[5]), 8 & i && n !== (n = t[3] ? t[3] : null) && Gt(e, "aria-label", n), 18 & i && o !== (o = "".concat(t[1] || "", " shepherd-button ").concat(t[4] ? "shepherd-button-secondary" : "")) && Gt(e, "class", o), 4 & i && (e.disabled = t[2]);
      },
      i: kt,
      o: kt,
      d: function d(t) {
        t && Yt(e), r = !1, i();
      }
    };
  }

  function je(t, e, n) {
    var o,
        r,
        i,
        s,
        a,
        l,
        c = e.config,
        u = e.step;
    return t.$$set = function (t) {
      "config" in t && n(6, c = t.config), "step" in t && n(7, u = t.step);
    }, t.$$.update = function () {
      192 & t.$$.dirty && (n(0, o = c.action ? c.action.bind(u.tour) : null), n(1, r = c.classes), n(2, i = !!c.disabled && function (t) {
        return p(t) ? t.call(u) : t;
      }(c.disabled)), n(3, s = c.label), n(4, a = c.secondary), n(5, l = c.text));
    }, [o, r, i, s, a, l, c, u];
  }

  var _e = /*#__PURE__*/function (_Te) {
    _inherits(_e, _Te);

    var _super = _createSuper(_e);

    function _e(t) {
      var _this3;

      _classCallCheck(this, _e);

      _this3 = _super.call(this), Se(_assertThisInitialized(_this3), t, je, Ie, Rt, {
        config: 6,
        step: 7
      });
      return _this3;
    }

    return _createClass(_e);
  }(Te);

  function Ae(t, e, n) {
    var o = t.slice();
    return o[2] = e[n], o;
  }

  function Le(t) {
    var e,
        n,
        o = t[1],
        r = [];

    for (var _e5 = 0; _e5 < o.length; _e5 += 1) {
      r[_e5] = Me(Ae(t, o, _e5));
    }

    var i = function i(t) {
      return xe(r[t], 1, 1, function () {
        r[t] = null;
      });
    };

    return {
      c: function c() {
        for (var _t7 = 0; _t7 < r.length; _t7 += 1) {
          r[_t7].c();
        }

        e = zt("");
      },
      m: function m(t, o) {
        for (var _e6 = 0; _e6 < r.length; _e6 += 1) {
          r[_e6].m(t, o);
        }

        Vt(t, e, o), n = !0;
      },
      p: function p(t, n) {
        if (3 & n) {
          var _s2;

          for (o = t[1], _s2 = 0; _s2 < o.length; _s2 += 1) {
            var _i2 = Ae(t, o, _s2);

            r[_s2] ? (r[_s2].p(_i2, n), ve(r[_s2], 1)) : (r[_s2] = Me(_i2), r[_s2].c(), ve(r[_s2], 1), r[_s2].m(e.parentNode, e));
          }

          for (be(), _s2 = o.length; _s2 < r.length; _s2 += 1) {
            i(_s2);
          }

          ye();
        }
      },
      i: function i(t) {
        if (!n) {
          for (var _t8 = 0; _t8 < o.length; _t8 += 1) {
            ve(r[_t8]);
          }

          n = !0;
        }
      },
      o: function o(t) {
        r = r.filter(Boolean);

        for (var _t9 = 0; _t9 < r.length; _t9 += 1) {
          xe(r[_t9]);
        }

        n = !1;
      },
      d: function d(t) {
        !function (t, e) {
          for (var _n4 = 0; _n4 < t.length; _n4 += 1) {
            t[_n4] && t[_n4].d(e);
          }
        }(r, t), t && Yt(e);
      }
    };
  }

  function Me(t) {
    var e, n;
    return e = new _e({
      props: {
        config: t[2],
        step: t[0]
      }
    }), {
      c: function c() {
        we(e.$$.fragment);
      },
      m: function m(t, o) {
        $e(e, t, o), n = !0;
      },
      p: function p(t, n) {
        var o = {};
        2 & n && (o.config = t[2]), 1 & n && (o.step = t[0]), e.$set(o);
      },
      i: function i(t) {
        n || (ve(e.$$.fragment, t), n = !0);
      },
      o: function o(t) {
        xe(e.$$.fragment, t), n = !1;
      },
      d: function d(t) {
        Oe(e, t);
      }
    };
  }

  function Ce(t) {
    var e,
        n,
        _o6 = t[1] && Le(t);

    return {
      c: function c() {
        e = Xt("footer"), _o6 && _o6.c(), Gt(e, "class", "shepherd-footer");
      },
      m: function m(t, r) {
        Vt(t, e, r), _o6 && _o6.m(e, null), n = !0;
      },
      p: function p(t, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            n = _ref6[0];

        t[1] ? _o6 ? (_o6.p(t, n), 2 & n && ve(_o6, 1)) : ((_o6 = Le(t)).c(), ve(_o6, 1), _o6.m(e, null)) : _o6 && (be(), xe(_o6, 1, 1, function () {
          _o6 = null;
        }), ye());
      },
      i: function i(t) {
        n || (ve(_o6), n = !0);
      },
      o: function o(t) {
        xe(_o6), n = !1;
      },
      d: function d(t) {
        t && Yt(e), _o6 && _o6.d();
      }
    };
  }

  function ke(t, e, n) {
    var o,
        r = e.step;
    return t.$$set = function (t) {
      "step" in t && n(0, r = t.step);
    }, t.$$.update = function () {
      1 & t.$$.dirty && n(1, o = r.options.buttons);
    }, [r, o];
  }

  var Pe = /*#__PURE__*/function (_Te2) {
    _inherits(Pe, _Te2);

    var _super2 = _createSuper(Pe);

    function Pe(t) {
      var _this4;

      _classCallCheck(this, Pe);

      _this4 = _super2.call(this), Se(_assertThisInitialized(_this4), t, ke, Ce, Rt, {
        step: 0
      });
      return _this4;
    }

    return _createClass(Pe);
  }(Te);

  function Be(t) {
    var e, n, o, r, i;
    return {
      c: function c() {
        e = Xt("button"), (n = Xt("span")).textContent = "×", Gt(n, "aria-hidden", "true"), Gt(e, "aria-label", o = t[0].label ? t[0].label : "Close Tour"), Gt(e, "class", "shepherd-cancel-icon"), Gt(e, "type", "button");
      },
      m: function m(o, s) {
        Vt(o, e, s), qt(e, n), r || (i = Kt(e, "click", t[1]), r = !0);
      },
      p: function p(t, _ref7) {
        var _ref8 = _slicedToArray(_ref7, 1),
            n = _ref8[0];

        1 & n && o !== (o = t[0].label ? t[0].label : "Close Tour") && Gt(e, "aria-label", o);
      },
      i: kt,
      o: kt,
      d: function d(t) {
        t && Yt(e), r = !1, i();
      }
    };
  }

  function De(t, e, n) {
    var o = e.cancelIcon,
        r = e.step;
    return t.$$set = function (t) {
      "cancelIcon" in t && n(0, o = t.cancelIcon), "step" in t && n(2, r = t.step);
    }, [o, function (t) {
      t.preventDefault(), r.cancel();
    }, r];
  }

  var He = /*#__PURE__*/function (_Te3) {
    _inherits(He, _Te3);

    var _super3 = _createSuper(He);

    function He(t) {
      var _this5;

      _classCallCheck(this, He);

      _this5 = _super3.call(this), Se(_assertThisInitialized(_this5), t, De, Be, Rt, {
        cancelIcon: 0,
        step: 2
      });
      return _this5;
    }

    return _createClass(He);
  }(Te);

  function Ne(t) {
    var e;
    return {
      c: function c() {
        Gt(e = Xt("h3"), "id", t[1]), Gt(e, "class", "shepherd-title");
      },
      m: function m(n, o) {
        Vt(n, e, o), t[3](e);
      },
      p: function p(t, _ref9) {
        var _ref10 = _slicedToArray(_ref9, 1),
            n = _ref10[0];

        2 & n && Gt(e, "id", t[1]);
      },
      i: kt,
      o: kt,
      d: function d(n) {
        n && Yt(e), t[3](null);
      }
    };
  }

  function Re(t, e, n) {
    var o = e.labelId,
        r = e.element,
        i = e.title;
    return oe(function () {
      p(i) && n(2, i = i()), n(0, r.innerHTML = i, r);
    }), t.$$set = function (t) {
      "labelId" in t && n(1, o = t.labelId), "element" in t && n(0, r = t.element), "title" in t && n(2, i = t.title);
    }, [r, o, i, function (t) {
      ie[t ? "unshift" : "push"](function () {
        n(0, r = t);
      });
    }];
  }

  var We = /*#__PURE__*/function (_Te4) {
    _inherits(We, _Te4);

    var _super4 = _createSuper(We);

    function We(t) {
      var _this6;

      _classCallCheck(this, We);

      _this6 = _super4.call(this), Se(_assertThisInitialized(_this6), t, Re, Ne, Rt, {
        labelId: 1,
        element: 0,
        title: 2
      });
      return _this6;
    }

    return _createClass(We);
  }(Te);

  function Fe(t) {
    var e, n;
    return e = new We({
      props: {
        labelId: t[0],
        title: t[2]
      }
    }), {
      c: function c() {
        we(e.$$.fragment);
      },
      m: function m(t, o) {
        $e(e, t, o), n = !0;
      },
      p: function p(t, n) {
        var o = {};
        1 & n && (o.labelId = t[0]), 4 & n && (o.title = t[2]), e.$set(o);
      },
      i: function i(t) {
        n || (ve(e.$$.fragment, t), n = !0);
      },
      o: function o(t) {
        xe(e.$$.fragment, t), n = !1;
      },
      d: function d(t) {
        Oe(e, t);
      }
    };
  }

  function qe(t) {
    var e, n;
    return e = new He({
      props: {
        cancelIcon: t[3],
        step: t[1]
      }
    }), {
      c: function c() {
        we(e.$$.fragment);
      },
      m: function m(t, o) {
        $e(e, t, o), n = !0;
      },
      p: function p(t, n) {
        var o = {};
        8 & n && (o.cancelIcon = t[3]), 2 & n && (o.step = t[1]), e.$set(o);
      },
      i: function i(t) {
        n || (ve(e.$$.fragment, t), n = !0);
      },
      o: function o(t) {
        xe(e.$$.fragment, t), n = !1;
      },
      d: function d(t) {
        Oe(e, t);
      }
    };
  }

  function Ve(t) {
    var e,
        n,
        _o7,
        r = t[2] && Fe(t),
        _i3 = t[3] && t[3].enabled && qe(t);

    return {
      c: function c() {
        e = Xt("header"), r && r.c(), n = Zt(), _i3 && _i3.c(), Gt(e, "class", "shepherd-header");
      },
      m: function m(t, s) {
        Vt(t, e, s), r && r.m(e, null), qt(e, n), _i3 && _i3.m(e, null), _o7 = !0;
      },
      p: function p(t, _ref11) {
        var _ref12 = _slicedToArray(_ref11, 1),
            o = _ref12[0];

        t[2] ? r ? (r.p(t, o), 4 & o && ve(r, 1)) : ((r = Fe(t)).c(), ve(r, 1), r.m(e, n)) : r && (be(), xe(r, 1, 1, function () {
          r = null;
        }), ye()), t[3] && t[3].enabled ? _i3 ? (_i3.p(t, o), 8 & o && ve(_i3, 1)) : ((_i3 = qe(t)).c(), ve(_i3, 1), _i3.m(e, null)) : _i3 && (be(), xe(_i3, 1, 1, function () {
          _i3 = null;
        }), ye());
      },
      i: function i(t) {
        _o7 || (ve(r), ve(_i3), _o7 = !0);
      },
      o: function o(t) {
        xe(r), xe(_i3), _o7 = !1;
      },
      d: function d(t) {
        t && Yt(e), r && r.d(), _i3 && _i3.d();
      }
    };
  }

  function Ye(t, e, n) {
    var o,
        r,
        i = e.labelId,
        s = e.step;
    return t.$$set = function (t) {
      "labelId" in t && n(0, i = t.labelId), "step" in t && n(1, s = t.step);
    }, t.$$.update = function () {
      2 & t.$$.dirty && (n(2, o = s.options.title), n(3, r = s.options.cancelIcon));
    }, [i, s, o, r];
  }

  var Xe = /*#__PURE__*/function (_Te5) {
    _inherits(Xe, _Te5);

    var _super5 = _createSuper(Xe);

    function Xe(t) {
      var _this7;

      _classCallCheck(this, Xe);

      _this7 = _super5.call(this), Se(_assertThisInitialized(_this7), t, Ye, Ve, Rt, {
        labelId: 0,
        step: 1
      });
      return _this7;
    }

    return _createClass(Xe);
  }(Te);

  function Ue(t) {
    var e;
    return {
      c: function c() {
        Gt(e = Xt("div"), "class", "shepherd-text"), Gt(e, "id", t[1]);
      },
      m: function m(n, o) {
        Vt(n, e, o), t[3](e);
      },
      p: function p(t, _ref13) {
        var _ref14 = _slicedToArray(_ref13, 1),
            n = _ref14[0];

        2 & n && Gt(e, "id", t[1]);
      },
      i: kt,
      o: kt,
      d: function d(n) {
        n && Yt(e), t[3](null);
      }
    };
  }

  function ze(t, e, n) {
    var o = e.descriptionId,
        r = e.element,
        i = e.step;
    return oe(function () {
      var t = i.options.text;
      p(t) && (t = t.call(i)), c(t) ? r.appendChild(t) : n(0, r.innerHTML = t, r);
    }), t.$$set = function (t) {
      "descriptionId" in t && n(1, o = t.descriptionId), "element" in t && n(0, r = t.element), "step" in t && n(2, i = t.step);
    }, [r, o, i, function (t) {
      ie[t ? "unshift" : "push"](function () {
        n(0, r = t);
      });
    }];
  }

  var Ze = /*#__PURE__*/function (_Te6) {
    _inherits(Ze, _Te6);

    var _super6 = _createSuper(Ze);

    function Ze(t) {
      var _this8;

      _classCallCheck(this, Ze);

      _this8 = _super6.call(this), Se(_assertThisInitialized(_this8), t, ze, Ue, Rt, {
        descriptionId: 1,
        element: 0,
        step: 2
      });
      return _this8;
    }

    return _createClass(Ze);
  }(Te);

  function Ke(t) {
    var e, n;
    return e = new Xe({
      props: {
        labelId: t[1],
        step: t[2]
      }
    }), {
      c: function c() {
        we(e.$$.fragment);
      },
      m: function m(t, o) {
        $e(e, t, o), n = !0;
      },
      p: function p(t, n) {
        var o = {};
        2 & n && (o.labelId = t[1]), 4 & n && (o.step = t[2]), e.$set(o);
      },
      i: function i(t) {
        n || (ve(e.$$.fragment, t), n = !0);
      },
      o: function o(t) {
        xe(e.$$.fragment, t), n = !1;
      },
      d: function d(t) {
        Oe(e, t);
      }
    };
  }

  function Ge(t) {
    var e, n;
    return e = new Ze({
      props: {
        descriptionId: t[0],
        step: t[2]
      }
    }), {
      c: function c() {
        we(e.$$.fragment);
      },
      m: function m(t, o) {
        $e(e, t, o), n = !0;
      },
      p: function p(t, n) {
        var o = {};
        1 & n && (o.descriptionId = t[0]), 4 & n && (o.step = t[2]), e.$set(o);
      },
      i: function i(t) {
        n || (ve(e.$$.fragment, t), n = !0);
      },
      o: function o(t) {
        xe(e.$$.fragment, t), n = !1;
      },
      d: function d(t) {
        Oe(e, t);
      }
    };
  }

  function Je(t) {
    var e, n;
    return e = new Pe({
      props: {
        step: t[2]
      }
    }), {
      c: function c() {
        we(e.$$.fragment);
      },
      m: function m(t, o) {
        $e(e, t, o), n = !0;
      },
      p: function p(t, n) {
        var o = {};
        4 & n && (o.step = t[2]), e.$set(o);
      },
      i: function i(t) {
        n || (ve(e.$$.fragment, t), n = !0);
      },
      o: function o(t) {
        xe(e.$$.fragment, t), n = !1;
      },
      d: function d(t) {
        Oe(e, t);
      }
    };
  }

  function Qe(t) {
    var e,
        n,
        o,
        r,
        i = !f(t[2].options.title) || t[2].options.cancelIcon && t[2].options.cancelIcon.enabled,
        s = !f(t[2].options.text),
        a = Array.isArray(t[2].options.buttons) && t[2].options.buttons.length,
        l = i && Ke(t),
        _c = s && Ge(t),
        _p = a && Je(t);

    return {
      c: function c() {
        e = Xt("div"), l && l.c(), n = Zt(), _c && _c.c(), o = Zt(), _p && _p.c(), Gt(e, "class", "shepherd-content");
      },
      m: function m(t, i) {
        Vt(t, e, i), l && l.m(e, null), qt(e, n), _c && _c.m(e, null), qt(e, o), _p && _p.m(e, null), r = !0;
      },
      p: function p(t, _ref15) {
        var _ref16 = _slicedToArray(_ref15, 1),
            r = _ref16[0];

        4 & r && (i = !f(t[2].options.title) || t[2].options.cancelIcon && t[2].options.cancelIcon.enabled), i ? l ? (l.p(t, r), 4 & r && ve(l, 1)) : ((l = Ke(t)).c(), ve(l, 1), l.m(e, n)) : l && (be(), xe(l, 1, 1, function () {
          l = null;
        }), ye()), 4 & r && (s = !f(t[2].options.text)), s ? _c ? (_c.p(t, r), 4 & r && ve(_c, 1)) : ((_c = Ge(t)).c(), ve(_c, 1), _c.m(e, o)) : _c && (be(), xe(_c, 1, 1, function () {
          _c = null;
        }), ye()), 4 & r && (a = Array.isArray(t[2].options.buttons) && t[2].options.buttons.length), a ? _p ? (_p.p(t, r), 4 & r && ve(_p, 1)) : ((_p = Je(t)).c(), ve(_p, 1), _p.m(e, null)) : _p && (be(), xe(_p, 1, 1, function () {
          _p = null;
        }), ye());
      },
      i: function i(t) {
        r || (ve(l), ve(_c), ve(_p), r = !0);
      },
      o: function o(t) {
        xe(l), xe(_c), xe(_p), r = !1;
      },
      d: function d(t) {
        t && Yt(e), l && l.d(), _c && _c.d(), _p && _p.d();
      }
    };
  }

  function tn(t, e, n) {
    var o = e.descriptionId,
        r = e.labelId,
        i = e.step;
    return t.$$set = function (t) {
      "descriptionId" in t && n(0, o = t.descriptionId), "labelId" in t && n(1, r = t.labelId), "step" in t && n(2, i = t.step);
    }, [o, r, i];
  }

  var en = /*#__PURE__*/function (_Te7) {
    _inherits(en, _Te7);

    var _super7 = _createSuper(en);

    function en(t) {
      var _this9;

      _classCallCheck(this, en);

      _this9 = _super7.call(this), Se(_assertThisInitialized(_this9), t, tn, Qe, Rt, {
        descriptionId: 0,
        labelId: 1,
        step: 2
      });
      return _this9;
    }

    return _createClass(en);
  }(Te);

  function nn(t) {
    var e;
    return {
      c: function c() {
        Gt(e = Xt("div"), "class", "shepherd-arrow"), Gt(e, "data-popper-arrow", "");
      },
      m: function m(t, n) {
        Vt(t, e, n);
      },
      d: function d(t) {
        t && Yt(e);
      }
    };
  }

  function on(t) {
    var e,
        n,
        _o8,
        r,
        i,
        s,
        a,
        l,
        _c2 = t[4].options.arrow && t[4].options.attachTo && t[4].options.attachTo.element && t[4].options.attachTo.on && nn();

    _o8 = new en({
      props: {
        descriptionId: t[2],
        labelId: t[3],
        step: t[4]
      }
    });
    var _p2 = [{
      "aria-describedby": r = f(t[4].options.text) ? null : t[2]
    }, {
      "aria-labelledby": i = t[4].options.title ? t[3] : null
    }, t[1], {
      role: "dialog"
    }, {
      tabindex: "0"
    }],
        u = {};

    for (var _t10 = 0; _t10 < _p2.length; _t10 += 1) {
      u = Pt(u, _p2[_t10]);
    }

    return {
      c: function c() {
        e = Xt("div"), _c2 && _c2.c(), n = Zt(), we(_o8.$$.fragment), Jt(e, u), Qt(e, "shepherd-has-cancel-icon", t[5]), Qt(e, "shepherd-has-title", t[6]), Qt(e, "shepherd-element", !0);
      },
      m: function m(r, i) {
        Vt(r, e, i), _c2 && _c2.m(e, null), qt(e, n), $e(_o8, e, null), t[13](e), s = !0, a || (l = Kt(e, "keydown", t[7]), a = !0);
      },
      p: function p(t, _ref17) {
        var _ref18 = _slicedToArray(_ref17, 1),
            a = _ref18[0];

        t[4].options.arrow && t[4].options.attachTo && t[4].options.attachTo.element && t[4].options.attachTo.on ? _c2 || ((_c2 = nn()).c(), _c2.m(e, n)) : _c2 && (_c2.d(1), _c2 = null);
        var l = {};
        4 & a && (l.descriptionId = t[2]), 8 & a && (l.labelId = t[3]), 16 & a && (l.step = t[4]), _o8.$set(l), Jt(e, u = function (t, e) {
          var n = {},
              o = {},
              r = {
            $$scope: 1
          };
          var i = t.length;

          for (; i--;) {
            var _s3 = t[i],
                _a = e[i];

            if (_a) {
              for (var _t11 in _s3) {
                _t11 in _a || (o[_t11] = 1);
              }

              for (var _t12 in _a) {
                r[_t12] || (n[_t12] = _a[_t12], r[_t12] = 1);
              }

              t[i] = _a;
            } else for (var _t13 in _s3) {
              r[_t13] = 1;
            }
          }

          for (var _t14 in o) {
            _t14 in n || (n[_t14] = void 0);
          }

          return n;
        }(_p2, [(!s || 20 & a && r !== (r = f(t[4].options.text) ? null : t[2])) && {
          "aria-describedby": r
        }, (!s || 24 & a && i !== (i = t[4].options.title ? t[3] : null)) && {
          "aria-labelledby": i
        }, 2 & a && t[1], {
          role: "dialog"
        }, {
          tabindex: "0"
        }])), Qt(e, "shepherd-has-cancel-icon", t[5]), Qt(e, "shepherd-has-title", t[6]), Qt(e, "shepherd-element", !0);
      },
      i: function i(t) {
        s || (ve(_o8.$$.fragment, t), s = !0);
      },
      o: function o(t) {
        xe(_o8.$$.fragment, t), s = !1;
      },
      d: function d(n) {
        n && Yt(e), _c2 && _c2.d(), Oe(_o8), t[13](null), a = !1, l();
      }
    };
  }

  var rn = 9,
      sn = 27,
      an = 37,
      ln = 39;

  function cn(t) {
    return t.split(" ").filter(function (t) {
      return !!t.length;
    });
  }

  function pn(t, e, n) {
    var o,
        r,
        i,
        s = e.classPrefix,
        a = e.element,
        l = e.descriptionId,
        c = e.firstFocusableElement,
        p = e.focusableElements,
        f = e.labelId,
        d = e.lastFocusableElement,
        h = e.step,
        m = e.dataStepId;
    var g;
    g = function g() {
      n(1, m = _defineProperty({}, "data-".concat(s, "shepherd-step-id"), h.id)), n(9, p = a.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')), n(8, c = p[0]), n(10, d = p[p.length - 1]);
    }, ne().$$.on_mount.push(g), oe(function () {
      i !== h.options.classes && (function (t) {
        if (u(t)) {
          var _a$classList;

          var _e7 = cn(t);

          _e7.length && (_a$classList = a.classList).remove.apply(_a$classList, _toConsumableArray(_e7));
        }
      }(i), function (t) {
        if (u(t)) {
          var _a$classList2;

          var _e8 = cn(t);

          _e8.length && (_a$classList2 = a.classList).add.apply(_a$classList2, _toConsumableArray(_e8));
        }
      }(i = h.options.classes));
    });
    return t.$$set = function (t) {
      "classPrefix" in t && n(11, s = t.classPrefix), "element" in t && n(0, a = t.element), "descriptionId" in t && n(2, l = t.descriptionId), "firstFocusableElement" in t && n(8, c = t.firstFocusableElement), "focusableElements" in t && n(9, p = t.focusableElements), "labelId" in t && n(3, f = t.labelId), "lastFocusableElement" in t && n(10, d = t.lastFocusableElement), "step" in t && n(4, h = t.step), "dataStepId" in t && n(1, m = t.dataStepId);
    }, t.$$.update = function () {
      16 & t.$$.dirty && (n(5, o = h.options && h.options.cancelIcon && h.options.cancelIcon.enabled), n(6, r = h.options && h.options.title));
    }, [a, m, l, f, h, o, r, function (t) {
      var _h = h,
          e = _h.tour;

      switch (t.keyCode) {
        case rn:
          if (0 === p.length) {
            t.preventDefault();
            break;
          }

          t.shiftKey ? (document.activeElement === c || document.activeElement.classList.contains("shepherd-element")) && (t.preventDefault(), d.focus()) : document.activeElement === d && (t.preventDefault(), c.focus());
          break;

        case sn:
          e.options.exitOnEsc && h.cancel();
          break;

        case an:
          e.options.keyboardNavigation && e.back();
          break;

        case ln:
          e.options.keyboardNavigation && e.next();
      }
    }, c, p, d, s, function () {
      return a;
    }, function (t) {
      ie[t ? "unshift" : "push"](function () {
        n(0, a = t);
      });
    }];
  }

  var un = /*#__PURE__*/function (_Te8) {
    _inherits(un, _Te8);

    var _super8 = _createSuper(un);

    function un(t) {
      var _this10;

      _classCallCheck(this, un);

      _this10 = _super8.call(this), Se(_assertThisInitialized(_this10), t, pn, on, Rt, {
        classPrefix: 11,
        element: 0,
        descriptionId: 2,
        firstFocusableElement: 8,
        focusableElements: 9,
        labelId: 3,
        lastFocusableElement: 10,
        step: 4,
        dataStepId: 1,
        getElement: 12
      });
      return _this10;
    }

    _createClass(un, [{
      key: "getElement",
      get: function get() {
        return this.$$.ctx[12];
      }
    }]);

    return un;
  }(Te);

  var fn,
      dn = (function (t, e) {
    !function () {
      t.exports = {
        polyfill: function polyfill() {
          var t = window,
              e = document;

          if (!("scrollBehavior" in e.documentElement.style && !0 !== t.__forceSmoothScrollPolyfill__)) {
            var n,
                o = t.HTMLElement || t.Element,
                r = 468,
                i = {
              scroll: t.scroll || t.scrollTo,
              scrollBy: t.scrollBy,
              elementScroll: o.prototype.scroll || l,
              scrollIntoView: o.prototype.scrollIntoView
            },
                s = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now,
                a = (n = t.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(n) ? 1 : 0);
            t.scroll = t.scrollTo = function () {
              void 0 !== arguments[0] && (!0 !== c(arguments[0]) ? h.call(t, e.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset) : i.scroll.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != _typeof(arguments[0]) ? arguments[0] : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset));
            }, t.scrollBy = function () {
              void 0 !== arguments[0] && (c(arguments[0]) ? i.scrollBy.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != _typeof(arguments[0]) ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(t, e.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset)));
            }, o.prototype.scroll = o.prototype.scrollTo = function () {
              if (void 0 !== arguments[0]) if (!0 !== c(arguments[0])) {
                var t = arguments[0].left,
                    e = arguments[0].top;
                h.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e);
              } else {
                if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != _typeof(arguments[0]) ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop);
              }
            }, o.prototype.scrollBy = function () {
              void 0 !== arguments[0] && (!0 !== c(arguments[0]) ? this.scroll({
                left: ~~arguments[0].left + this.scrollLeft,
                top: ~~arguments[0].top + this.scrollTop,
                behavior: arguments[0].behavior
              }) : i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop));
            }, o.prototype.scrollIntoView = function () {
              if (!0 !== c(arguments[0])) {
                var n = function (t) {
                  for (; t !== e.body && !1 === f(t);) {
                    t = t.parentNode || t.host;
                  }

                  return t;
                }(this),
                    o = n.getBoundingClientRect(),
                    r = this.getBoundingClientRect();

                n !== e.body ? (h.call(this, n, n.scrollLeft + r.left - o.left, n.scrollTop + r.top - o.top), "fixed" !== t.getComputedStyle(n).position && t.scrollBy({
                  left: o.left,
                  top: o.top,
                  behavior: "smooth"
                })) : t.scrollBy({
                  left: r.left,
                  top: r.top,
                  behavior: "smooth"
                });
              } else i.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
            };
          }

          function l(t, e) {
            this.scrollLeft = t, this.scrollTop = e;
          }

          function c(t) {
            if (null === t || "object" != _typeof(t) || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
            if ("object" == _typeof(t) && "smooth" === t.behavior) return !1;
            throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.");
          }

          function p(t, e) {
            return "Y" === e ? t.clientHeight + a < t.scrollHeight : "X" === e ? t.clientWidth + a < t.scrollWidth : void 0;
          }

          function u(e, n) {
            var o = t.getComputedStyle(e, null)["overflow" + n];
            return "auto" === o || "scroll" === o;
          }

          function f(t) {
            var e = p(t, "Y") && u(t, "Y"),
                n = p(t, "X") && u(t, "X");
            return e || n;
          }

          function d(e) {
            var n,
                o,
                i,
                a,
                l = (s() - e.startTime) / r;
            a = l = l > 1 ? 1 : l, n = .5 * (1 - Math.cos(Math.PI * a)), o = e.startX + (e.x - e.startX) * n, i = e.startY + (e.y - e.startY) * n, e.method.call(e.scrollable, o, i), o === e.x && i === e.y || t.requestAnimationFrame(d.bind(t, e));
          }

          function h(n, o, r) {
            var a,
                c,
                p,
                u,
                f = s();
            n === e.body ? (a = t, c = t.scrollX || t.pageXOffset, p = t.scrollY || t.pageYOffset, u = i.scroll) : (a = n, c = n.scrollLeft, p = n.scrollTop, u = l), d({
              scrollable: a,
              method: u,
              startTime: f,
              startX: c,
              startY: p,
              x: o,
              y: r
            });
          }
        }
      };
    }();
  }(fn = {
    exports: {}
  }, fn.exports), fn.exports);
  dn.polyfill, dn.polyfill();

  var hn = /*#__PURE__*/function (_d2) {
    _inherits(hn, _d2);

    var _super9 = _createSuper(hn);

    function hn(t) {
      var _this11;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, hn);

      return _possibleConstructorReturn(_this11, (_this11 = _super9.call(this, t, e), _this11.tour = t, _this11.classPrefix = _this11.tour.options ? _t(_this11.tour.options.classPrefix) : "", _this11.styles = t.styles, h(_assertThisInitialized(_this11)), _this11._setOptions(e), _assertThisInitialized(_this11)));
    }

    _createClass(hn, [{
      key: "cancel",
      value: function cancel() {
        this.tour.cancel(), this.trigger("cancel");
      }
    }, {
      key: "complete",
      value: function complete() {
        this.tour.complete(), this.trigger("complete");
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.tooltip && (this.tooltip.destroy(), this.tooltip = null), c(this.el) && this.el.parentNode && (this.el.parentNode.removeChild(this.el), this.el = null), this._updateStepTargetOnHide(), this.trigger("destroy");
      }
    }, {
      key: "getTour",
      value: function getTour() {
        return this.tour;
      }
    }, {
      key: "hide",
      value: function hide() {
        this.tour.modal.hide(), this.trigger("before-hide"), this.el && (this.el.hidden = !0), this._updateStepTargetOnHide(), this.trigger("hide");
      }
    }, {
      key: "isCentered",
      value: function isCentered() {
        var t = At(this);
        return !t.element || !t.on;
      }
    }, {
      key: "isOpen",
      value: function isOpen() {
        return Boolean(this.el && !this.el.hidden);
      }
    }, {
      key: "show",
      value: function show() {
        var _this12 = this;

        if (p(this.options.beforeShowPromise)) {
          var _t15 = this.options.beforeShowPromise();

          if (!f(_t15)) return _t15.then(function () {
            return _this12._show();
          });
        }

        this._show();
      }
    }, {
      key: "updateStepOptions",
      value: function updateStepOptions(t) {
        Object.assign(this.options, t), this.shepherdElementComponent && this.shepherdElementComponent.$set({
          step: this
        });
      }
    }, {
      key: "getElement",
      value: function getElement() {
        return this.el;
      }
    }, {
      key: "getTarget",
      value: function getTarget() {
        return this.target;
      }
    }, {
      key: "_createTooltipContent",
      value: function _createTooltipContent() {
        var t = "".concat(this.id, "-description"),
            e = "".concat(this.id, "-label");
        return this.shepherdElementComponent = new un({
          target: this.tour.options.stepsContainer || document.body,
          props: {
            classPrefix: this.classPrefix,
            descriptionId: t,
            labelId: e,
            step: this,
            styles: this.styles
          }
        }), this.shepherdElementComponent.getElement();
      }
    }, {
      key: "_scrollTo",
      value: function _scrollTo(t) {
        var _At = At(this),
            e = _At.element;

        p(this.options.scrollToHandler) ? this.options.scrollToHandler(e) : e instanceof Element && "function" == typeof e.scrollIntoView && e.scrollIntoView(t);
      }
    }, {
      key: "_getClassOptions",
      value: function _getClassOptions(t) {
        var e = this.tour && this.tour.options && this.tour.options.defaultStepOptions,
            n = t.classes ? t.classes : "",
            o = e && e.classes ? e.classes : "",
            r = [].concat(_toConsumableArray(n.split(" ")), _toConsumableArray(o.split(" "))),
            i = new Set(r);
        return Array.from(i).join(" ").trim();
      }
    }, {
      key: "_setOptions",
      value: function _setOptions() {
        var _this13 = this;

        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var e = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
        e = l({}, e || {}), this.options = Object.assign({
          arrow: !0
        }, e, t);
        var n = this.options.when;
        this.options.classes = this._getClassOptions(t), this.destroy(), this.id = this.options.id || "step-".concat(Mt()), n && Object.keys(n).forEach(function (t) {
          _this13.on(t, n[t], _this13);
        });
      }
    }, {
      key: "_setupElements",
      value: function _setupElements() {
        f(this.el) || this.destroy(), this.el = this._createTooltipContent(), this.options.advanceOn && m(this), Lt(this);
      }
    }, {
      key: "_show",
      value: function _show() {
        var _this14 = this;

        this.trigger("before-show"), this._setupElements(), this.tour.modal || this.tour._setupModal(), this.tour.modal.setupForStep(this), this._styleTargetElementForStep(this), this.el.hidden = !1, this.options.scrollTo && setTimeout(function () {
          _this14._scrollTo(_this14.options.scrollTo);
        }), this.el.hidden = !1;
        var t = this.shepherdElementComponent.getElement(),
            e = this.target || document.body;
        e.classList.add("".concat(this.classPrefix, "shepherd-enabled")), e.classList.add("".concat(this.classPrefix, "shepherd-target")), t.classList.add("shepherd-enabled"), this.trigger("show");
      }
    }, {
      key: "_styleTargetElementForStep",
      value: function _styleTargetElementForStep(t) {
        var e = t.target;
        e && (t.options.highlightClass && e.classList.add(t.options.highlightClass), !1 === t.options.canClickTarget && e.classList.add("shepherd-target-click-disabled"));
      }
    }, {
      key: "_updateStepTargetOnHide",
      value: function _updateStepTargetOnHide() {
        var t = this.target || document.body;
        this.options.highlightClass && t.classList.remove(this.options.highlightClass), t.classList.remove("shepherd-target-click-disabled", "".concat(this.classPrefix, "shepherd-enabled"), "".concat(this.classPrefix, "shepherd-target"));
      }
    }]);

    return hn;
  }(d);

  function mn(t) {
    var e, n, o, r, i;
    return {
      c: function c() {
        e = Ut("svg"), Gt(n = Ut("path"), "d", t[2]), Gt(e, "class", o = "".concat(t[1] ? "shepherd-modal-is-visible" : "", " shepherd-modal-overlay-container"));
      },
      m: function m(o, s) {
        Vt(o, e, s), qt(e, n), t[11](e), r || (i = Kt(e, "touchmove", t[3]), r = !0);
      },
      p: function p(t, _ref19) {
        var _ref20 = _slicedToArray(_ref19, 1),
            r = _ref20[0];

        4 & r && Gt(n, "d", t[2]), 2 & r && o !== (o = "".concat(t[1] ? "shepherd-modal-is-visible" : "", " shepherd-modal-overlay-container")) && Gt(e, "class", o);
      },
      i: kt,
      o: kt,
      d: function d(n) {
        n && Yt(e), t[11](null), r = !1, i();
      }
    };
  }

  function gn(t, e, n) {
    var o = e.element,
        r = e.openingProperties;
    Mt();
    var i,
        s = !1,
        a = void 0;
    l();

    function l() {
      n(4, r = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        r: 0
      });
    }

    function c() {
      n(1, s = !1), d();
    }

    function p() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var o = arguments.length > 2 ? arguments[2] : undefined;
      var i = arguments.length > 3 ? arguments[3] : undefined;

      if (i) {
        var _ref21 = function (t, e) {
          var n = t.getBoundingClientRect();
          var o = n.y || n.top,
              r = n.bottom || o + n.height;

          if (e) {
            var _t16 = e.getBoundingClientRect(),
                _n5 = _t16.y || _t16.top,
                _i4 = _t16.bottom || _n5 + _t16.height;

            o = Math.max(o, _n5), r = Math.min(r, _i4);
          }

          return {
            y: o,
            height: Math.max(r - o, 0)
          };
        }(i, o),
            _s4 = _ref21.y,
            _a2 = _ref21.height,
            _i$getBoundingClientR = i.getBoundingClientRect(),
            _l = _i$getBoundingClientR.x,
            _c3 = _i$getBoundingClientR.width,
            _p3 = _i$getBoundingClientR.left;

        n(4, r = {
          width: _c3 + 2 * t,
          height: _a2 + 2 * t,
          x: (_l || _p3) - t,
          y: _s4 - t,
          r: e
        });
      } else l();
    }

    function u() {
      n(1, s = !0);
    }

    var f = function f(t) {
      t.preventDefault();
    };

    function d() {
      a && (cancelAnimationFrame(a), a = void 0), window.removeEventListener("touchmove", f, {
        passive: !1
      });
    }

    return t.$$set = function (t) {
      "element" in t && n(0, o = t.element), "openingProperties" in t && n(4, r = t.openingProperties);
    }, t.$$.update = function () {
      16 & t.$$.dirty && n(2, i = function (_ref22) {
        var t = _ref22.width,
            e = _ref22.height,
            _ref22$x = _ref22.x,
            n = _ref22$x === void 0 ? 0 : _ref22$x,
            _ref22$y = _ref22.y,
            o = _ref22$y === void 0 ? 0 : _ref22$y,
            _ref22$r = _ref22.r,
            r = _ref22$r === void 0 ? 0 : _ref22$r;
        var _window = window,
            i = _window.innerWidth,
            s = _window.innerHeight;
        return "M".concat(i, ",").concat(s, "H0V0H").concat(i, "V").concat(s, "ZM").concat(n + r, ",").concat(o, "a").concat(r, ",").concat(r, ",0,0,0-").concat(r, ",").concat(r, "V").concat(e + o - r, "a").concat(r, ",").concat(r, ",0,0,0,").concat(r, ",").concat(r, "H").concat(t + n - r, "a").concat(r, ",").concat(r, ",0,0,0,").concat(r, "-").concat(r, "V").concat(o + r, "a").concat(r, ",").concat(r, ",0,0,0-").concat(r, "-").concat(r, "Z");
      }(r));
    }, [o, s, i, function (t) {
      t.stopPropagation();
    }, r, function () {
      return o;
    }, l, c, p, function (t) {
      d(), t.tour.options.useModalOverlay ? (function (t) {
        var _t$options = t.options,
            e = _t$options.modalOverlayOpeningPadding,
            n = _t$options.modalOverlayOpeningRadius,
            o = function t(e) {
          if (!e) return null;
          var n = e instanceof HTMLElement && window.getComputedStyle(e).overflowY;
          return "hidden" !== n && "visible" !== n && e.scrollHeight >= e.clientHeight ? e : t(e.parentElement);
        }(t.target),
            r = function r() {
          a = void 0, p(e, n, o, t.target), a = requestAnimationFrame(r);
        };

        r(), window.addEventListener("touchmove", f, {
          passive: !1
        });
      }(t), u()) : c();
    }, u, function (t) {
      ie[t ? "unshift" : "push"](function () {
        n(0, o = t);
      });
    }];
  }

  var bn = /*#__PURE__*/function (_Te9) {
    _inherits(bn, _Te9);

    var _super10 = _createSuper(bn);

    function bn(t) {
      var _this15;

      _classCallCheck(this, bn);

      _this15 = _super10.call(this), Se(_assertThisInitialized(_this15), t, gn, mn, Rt, {
        element: 0,
        openingProperties: 4,
        getElement: 5,
        closeModalOpening: 6,
        hide: 7,
        positionModal: 8,
        setupForStep: 9,
        show: 10
      });
      return _this15;
    }

    _createClass(bn, [{
      key: "getElement",
      get: function get() {
        return this.$$.ctx[5];
      }
    }, {
      key: "closeModalOpening",
      get: function get() {
        return this.$$.ctx[6];
      }
    }, {
      key: "hide",
      get: function get() {
        return this.$$.ctx[7];
      }
    }, {
      key: "positionModal",
      get: function get() {
        return this.$$.ctx[8];
      }
    }, {
      key: "setupForStep",
      get: function get() {
        return this.$$.ctx[9];
      }
    }, {
      key: "show",
      get: function get() {
        return this.$$.ctx[10];
      }
    }]);

    return bn;
  }(Te);

  var yn = new d();
  return Object.assign(yn, {
    Tour: /*#__PURE__*/function (_d3) {
      _inherits(Tour, _d3);

      var _super11 = _createSuper(Tour);

      function Tour() {
        var _this16;

        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Tour);

        return _possibleConstructorReturn(_this16, (_this16 = _super11.call(this, t), h(_assertThisInitialized(_this16)), _this16.options = Object.assign({}, {
          exitOnEsc: !0,
          keyboardNavigation: !0
        }, t), _this16.classPrefix = _t(_this16.options.classPrefix), _this16.steps = [], _this16.addSteps(_this16.options.steps), ["active", "cancel", "complete", "inactive", "show", "start"].map(function (t) {
          (function (t) {
            _this16.on(t, function (e) {
              (e = e || {}).tour = _assertThisInitialized(_this16), yn.trigger(t, e);
            });
          })(t);
        }), _this16._setTourID(), _assertThisInitialized(_this16)));
      }

      _createClass(Tour, [{
        key: "addStep",
        value: function addStep(t, e) {
          var n = t;
          return n instanceof hn ? n.tour = this : n = new hn(this, n), f(e) ? this.steps.push(n) : this.steps.splice(e, 0, n), n;
        }
      }, {
        key: "addSteps",
        value: function addSteps(t) {
          var _this17 = this;

          return Array.isArray(t) && t.forEach(function (t) {
            _this17.addStep(t);
          }), this;
        }
      }, {
        key: "back",
        value: function back() {
          var t = this.steps.indexOf(this.currentStep);
          this.show(t - 1, !1);
        }
      }, {
        key: "cancel",
        value: function cancel() {
          if (this.options.confirmCancel) {
            var _t17 = this.options.confirmCancelMessage || "Are you sure you want to stop the tour?";

            window.confirm(_t17) && this._done("cancel");
          } else this._done("cancel");
        }
      }, {
        key: "complete",
        value: function complete() {
          this._done("complete");
        }
      }, {
        key: "getById",
        value: function getById(t) {
          return this.steps.find(function (e) {
            return e.id === t;
          });
        }
      }, {
        key: "getCurrentStep",
        value: function getCurrentStep() {
          return this.currentStep;
        }
      }, {
        key: "hide",
        value: function hide() {
          var t = this.getCurrentStep();
          if (t) return t.hide();
        }
      }, {
        key: "isActive",
        value: function isActive() {
          return yn.activeTour === this;
        }
      }, {
        key: "next",
        value: function next() {
          var t = this.steps.indexOf(this.currentStep);
          t === this.steps.length - 1 ? this.complete() : this.show(t + 1, !0);
        }
      }, {
        key: "removeStep",
        value: function removeStep(t) {
          var _this18 = this;

          var e = this.getCurrentStep();
          this.steps.some(function (e, n) {
            if (e.id === t) return e.isOpen() && e.hide(), e.destroy(), _this18.steps.splice(n, 1), !0;
          }), e && e.id === t && (this.currentStep = void 0, this.steps.length ? this.show(0) : this.cancel());
        }
      }, {
        key: "show",
        value: function show() {
          var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
          var n = u(t) ? this.getById(t) : this.steps[t];
          n && (this._updateStateBeforeShow(), p(n.options.showOn) && !n.options.showOn() ? this._skipStep(n, e) : (this.trigger("show", {
            step: n,
            previous: this.currentStep
          }), this.currentStep = n, n.show()));
        }
      }, {
        key: "start",
        value: function start() {
          this.trigger("start"), this.focusedElBeforeOpen = document.activeElement, this.currentStep = null, this._setupModal(), this._setupActiveTour(), this.next();
        }
      }, {
        key: "_done",
        value: function _done(t) {
          var e = this.steps.indexOf(this.currentStep);

          if (Array.isArray(this.steps) && this.steps.forEach(function (t) {
            return t.destroy();
          }), function (t) {
            if (t) {
              var _e9 = t.steps;

              _e9.forEach(function (t) {
                t.options && !1 === t.options.canClickTarget && t.options.attachTo && t.target instanceof HTMLElement && t.target.classList.remove("shepherd-target-click-disabled");
              });
            }
          }(this), this.trigger(t, {
            index: e
          }), yn.activeTour = null, this.trigger("inactive", {
            tour: this
          }), this.modal && this.modal.hide(), ("cancel" === t || "complete" === t) && this.modal) {
            var _t18 = document.querySelector(".shepherd-modal-overlay-container");

            _t18 && _t18.remove();
          }

          c(this.focusedElBeforeOpen) && this.focusedElBeforeOpen.focus();
        }
      }, {
        key: "_setupActiveTour",
        value: function _setupActiveTour() {
          this.trigger("active", {
            tour: this
          }), yn.activeTour = this;
        }
      }, {
        key: "_setupModal",
        value: function _setupModal() {
          this.modal = new bn({
            target: this.options.modalContainer || document.body,
            props: {
              classPrefix: this.classPrefix,
              styles: this.styles
            }
          });
        }
      }, {
        key: "_skipStep",
        value: function _skipStep(t, e) {
          var n = this.steps.indexOf(t),
              o = e ? n + 1 : n - 1;
          this.show(o, e);
        }
      }, {
        key: "_updateStateBeforeShow",
        value: function _updateStateBeforeShow() {
          this.currentStep && this.currentStep.hide(), this.isActive() || this._setupActiveTour();
        }
      }, {
        key: "_setTourID",
        value: function _setTourID() {
          var t = this.options.tourName || "tour";
          this.id = "".concat(t, "--").concat(Mt());
        }
      }]);

      return Tour;
    }(d),
    Step: hn
  }), yn;
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61249" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/vendors/js/extensions/shepherd.min.js"], null)
//# sourceMappingURL=/shepherd.min.c0a0c731.js.map