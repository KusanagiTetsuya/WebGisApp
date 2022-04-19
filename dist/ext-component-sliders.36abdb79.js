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
})({"app-assets/js/scripts/extensions/ext-component-sliders.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*=========================================================================================
	File Name: ext-component-sliders.js
	Description: noUiSlider is a lightweight JavaScript range slider library.
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: PIXINVENT
	Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
  'use strict'; // RTL Support

  var _colorOptions;

  var direction = 'ltr';

  if ($('html').data('textdirection') == 'rtl') {
    direction = 'rtl';
  }
  /********************************************
   *				Slider values				*
   ********************************************/
  // Handles


  var handlesSlider = document.getElementById('slider-handles'),
      snapSlider = document.getElementById('slider-snap'),
      tapSlider = document.getElementById('tap'),
      dragSlider = document.getElementById('drag'),
      dragFixedSlider = document.getElementById('drag-fixed'),
      hoverSlider = document.getElementById('hover'),
      field = document.getElementById('hover-val'),
      dragTapSlider = document.getElementById('combined'),
      pipsRange = document.getElementById('pips-range');

  if (_typeof(handlesSlider) !== undefined && handlesSlider !== null) {
    noUiSlider.create(handlesSlider, {
      start: [4000, 8000],
      direction: direction,
      range: {
        min: [2000],
        max: [10000]
      }
    });
  } // Snapping between steps


  if (_typeof(snapSlider) !== undefined && snapSlider !== null) {
    noUiSlider.create(snapSlider, {
      start: [0, 500],
      direction: direction,
      snap: true,
      connect: true,
      range: {
        min: 0,
        '10%': 50,
        '20%': 100,
        '30%': 150,
        '40%': 500,
        '50%': 800,
        max: 1000
      }
    });
  }
  /************************************************
   *				Slider behaviour				*
   ************************************************/
  // Tap


  if (_typeof(tapSlider) !== undefined && tapSlider !== null) {
    noUiSlider.create(tapSlider, {
      start: [20, 40],
      direction: direction,
      behaviour: 'tap',
      connect: true,
      range: {
        min: 10,
        max: 50
      }
    });
  } // Drag


  if (_typeof(dragSlider) !== undefined && dragSlider !== null) {
    noUiSlider.create(dragSlider, {
      start: [40, 60],
      direction: direction,
      behaviour: 'drag',
      connect: true,
      range: {
        min: 20,
        max: 80
      }
    });
  } // Fixed dragging


  if (_typeof(dragFixedSlider) !== undefined && dragFixedSlider !== null) {
    noUiSlider.create(dragFixedSlider, {
      start: [40, 60],
      direction: direction,
      behaviour: 'drag-fixed',
      connect: true,
      range: {
        min: 20,
        max: 80
      }
    });
  } // Hover


  if (_typeof(hoverSlider) !== undefined && hoverSlider !== null) {
    noUiSlider.create(hoverSlider, {
      start: 20,
      direction: direction,
      behaviour: 'hover-snap',
      range: {
        min: 0,
        max: 100
      }
    });
    hoverSlider.noUiSlider.on('hover', function (value) {
      field.innerHTML = value;
    });
  } // Combined options


  if (_typeof(dragTapSlider) !== undefined && dragTapSlider !== null) {
    noUiSlider.create(dragTapSlider, {
      start: [40, 60],
      direction: direction,
      behaviour: 'drag-tap',
      connect: true,
      range: {
        min: 20,
        max: 80
      }
    });
  }
  /****************************************************
   *				Slider Scales / Pips				*
   ****************************************************/


  if (_typeof(pipsRange) !== undefined && pipsRange !== null) {
    // Range
    noUiSlider.create(pipsRange, {
      start: 10,
      step: 10,
      range: {
        min: 0,
        max: 100
      },
      tooltips: true,
      direction: direction,
      pips: {
        mode: 'steps',
        stepped: true,
        density: 5
      }
    });
  }
  /********************************************
   *				Slider Colors				*
   ********************************************/


  var defaultColorSlider = document.getElementById('default-color-slider'),
      secondaryColorSlider = document.getElementById('secondary-color-slider'),
      successColorSlider = document.getElementById('success-color-slider'),
      infoColorSlider = document.getElementById('info-color-slider'),
      warningColorSlider = document.getElementById('warning-color-slider'),
      dangerColorSlider = document.getElementById('danger-color-slider');
  var colorOptions = (_colorOptions = {
    start: [40, 60],
    connect: true,
    behaviour: 'drag'
  }, _defineProperty(_colorOptions, "connect", true), _defineProperty(_colorOptions, "step", 10), _defineProperty(_colorOptions, "tooltips", true), _defineProperty(_colorOptions, "range", {
    min: 0,
    max: 100
  }), _defineProperty(_colorOptions, "pips", {
    mode: 'steps',
    stepped: true,
    density: 5
  }), _defineProperty(_colorOptions, "direction", direction), _colorOptions);

  if (_typeof(defaultColorSlider) !== undefined && defaultColorSlider !== null) {
    noUiSlider.create(defaultColorSlider, colorOptions);
  }

  if (_typeof(secondaryColorSlider) !== undefined && secondaryColorSlider !== null) {
    noUiSlider.create(secondaryColorSlider, colorOptions);
  }

  if (_typeof(successColorSlider) !== undefined && successColorSlider !== null) {
    noUiSlider.create(successColorSlider, colorOptions);
  }

  if (_typeof(infoColorSlider) !== undefined && infoColorSlider !== null) {
    noUiSlider.create(infoColorSlider, colorOptions);
  }

  if (_typeof(warningColorSlider) !== undefined && warningColorSlider !== null) {
    noUiSlider.create(warningColorSlider, colorOptions);
  }

  if (_typeof(dangerColorSlider) !== undefined && dangerColorSlider !== null) {
    noUiSlider.create(dangerColorSlider, colorOptions);
  }
  /********************************************
   *				Vertical Slider				*
   ********************************************/
  // Default


  var verticalSlider = document.getElementById('slider-vertical'),
      connectUpperSlider = document.getElementById('connect-upper'),
      tooltipSlider = document.getElementById('slider-tooltips'),
      verticalLimitSlider = document.getElementById('vertical-limit');

  if (_typeof(verticalSlider) !== undefined && verticalSlider !== null) {
    verticalSlider.style.height = '200px';
    noUiSlider.create(verticalSlider, {
      start: 20,
      direction: direction,
      orientation: 'vertical',
      range: {
        min: 0,
        max: 100
      }
    });
  } // Connect to upper


  if (_typeof(connectUpperSlider) !== undefined && connectUpperSlider !== null) {
    connectUpperSlider.style.height = '200px';
    noUiSlider.create(connectUpperSlider, {
      start: 30,
      direction: direction,
      orientation: 'vertical',
      connect: 'upper',
      range: {
        min: 0,
        max: 100
      }
    });
  } // Tooltips


  if (_typeof(tooltipSlider) !== undefined && tooltipSlider !== null) {
    tooltipSlider.style.height = '200px';
    noUiSlider.create(tooltipSlider, {
      start: [20, 80],
      direction: direction,
      orientation: 'vertical',
      tooltips: [wNumb({
        decimals: 1
      }), wNumb({
        decimals: 1
      })],
      range: {
        min: 0,
        max: 100
      }
    });
  } // Limit


  if (_typeof(verticalLimitSlider) !== undefined && verticalLimitSlider !== null) {
    verticalLimitSlider.style.height = '200px';
    noUiSlider.create(verticalLimitSlider, {
      start: [40, 60],
      direction: direction,
      orientation: 'vertical',
      limit: 40,
      behaviour: 'drag',
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }
  /****************************************************
   *				 Slider With Input				*
   ****************************************************/


  var select = document.getElementById('slider-select'),
      sliderWithInput = document.getElementById('slider-with-input'),
      inputNumber = document.getElementById('slider-input-number');

  if (_typeof(sliderWithInput) !== undefined && sliderWithInput !== null) {
    noUiSlider.create(sliderWithInput, {
      start: [10, 30],
      direction: direction,
      connect: true,
      range: {
        min: -20,
        max: 40
      }
    });
    sliderWithInput.noUiSlider.on('update', function (values, handle) {
      var value = values[handle];

      if (handle) {
        inputNumber.value = value;
      } else {
        select.value = Math.round(value);
      }
    });
  }

  if (_typeof(sliderWithInput) !== undefined && sliderWithInput !== null) {
    // Append the option elements
    for (var i = -20; i <= 40; i++) {
      var option = document.createElement('option');
      option.text = i;
      option.value = i;
      select.appendChild(option);
    }

    select.addEventListener('change', function () {
      sliderWithInput.noUiSlider.set([this.value, null]);
    });
  }

  if (_typeof(inputNumber) !== undefined && inputNumber !== null) {
    inputNumber.addEventListener('change', function () {
      sliderWithInput.noUiSlider.set([null, this.value]);
    });
  }
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/extensions/ext-component-sliders.js"], null)
//# sourceMappingURL=/ext-component-sliders.36abdb79.js.map