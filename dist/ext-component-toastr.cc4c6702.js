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
})({"app-assets/js/scripts/extensions/ext-component-toastr.js":[function(require,module,exports) {
/*=========================================================================================
	File Name: ext-component-toastr.js
	Description: Toastr notifications
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
  'use strict';

  var isRtl = $('html').attr('data-textdirection') === 'rtl',
      typeSuccess = $('#type-success'),
      typeInfo = $('#type-info'),
      typeWarning = $('#type-warning'),
      typeError = $('#type-error'),
      positionTopLeft = $('#position-top-left'),
      positionTopCenter = $('#position-top-center'),
      positionTopRight = $('#position-top-right'),
      positionTopFull = $('#position-top-full'),
      positionBottomLeft = $('#position-bottom-left'),
      positionBottomCenter = $('#position-bottom-center'),
      positionBottomRight = $('#position-bottom-right'),
      positionBottomFull = $('#position-bottom-full'),
      progressBar = $('#progress-bar'),
      clearToastBtn = $('#clear-toast-btn'),
      fastDuration = $('#fast-duration'),
      slowDuration = $('#slow-duration'),
      toastrTimeout = $('#timeout'),
      toastrSticky = $('#sticky'),
      slideToast = $('#slide-toast'),
      fadeToast = $('#fade-toast'),
      clearToastObj; // Success Type

  typeSuccess.on('click', function () {
    toastr['success']('👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.', 'Success!', {
      closeButton: true,
      tapToDismiss: false,
      rtl: isRtl
    });
  }); // Info Type

  typeInfo.on('click', function () {
    toastr['info']('👋 Chupa chups biscuit brownie gummi sugar plum caramels.', 'Info!', {
      closeButton: true,
      tapToDismiss: false,
      rtl: isRtl
    });
  }); // Warning Type

  typeWarning.on('click', function () {
    toastr['warning']('👋 Icing cake pudding carrot cake jujubes tiramisu chocolate cake.', 'Warning!', {
      closeButton: true,
      tapToDismiss: false,
      rtl: isRtl
    });
  }); // Error Type

  typeError.on('click', function () {
    toastr['error']('👋 Jelly-o marshmallow marshmallow cotton candy dessert candy.', 'Error!', {
      closeButton: true,
      tapToDismiss: false,
      rtl: isRtl
    });
  }); // Progress Bar

  progressBar.on('click', function () {
    toastr['success']('👋 Chocolate oat cake jelly oat cake candy jelly beans pastry.', 'Progress Bar', {
      closeButton: true,
      tapToDismiss: false,
      progressBar: true,
      rtl: isRtl
    });
  }); // Close Toast On Button Click

  clearToastBtn.on('click', function () {
    if (!clearToastObj) {
      clearToastObj = toastr['info']('Ready for the vacation?<br /><br /><button type="button" class="btn btn-info btn-sm clear">Yes</button>', 'Family Trip', {
        closeButton: true,
        timeOut: 0,
        extendedTimeOut: 0,
        tapToDismiss: false,
        rtl: isRtl
      });
    }

    if (clearToastObj.find('.clear').length) {
      clearToastObj.delegate('.clear', 'click', function () {
        toastr.clear(clearToastObj, {
          force: true
        });
        clearToastObj = undefined;
      });
    }
  }); // Position Top Left

  positionTopLeft.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Top Left!', {
      positionClass: 'toast-top-left',
      rtl: isRtl
    });
  }); // Position Top Center

  positionTopCenter.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Top Center!', {
      positionClass: 'toast-top-center',
      rtl: isRtl
    });
  }); // Position Top Right

  positionTopRight.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Top Right!', {
      positionClass: 'toast-top-right',
      rtl: isRtl
    });
  }); // Position Top Full Width

  positionTopFull.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Top Full Width!', {
      positionClass: 'toast-top-full-width',
      rtl: isRtl
    });
  }); // Position Bottom Left

  positionBottomLeft.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Bottom Left!', {
      positionClass: 'toast-bottom-left',
      rtl: isRtl
    });
  }); // Position Bottom Center

  positionBottomCenter.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Bottom Center!', {
      positionClass: 'toast-bottom-center',
      rtl: isRtl
    });
  }); // Position Bottom Right

  positionBottomRight.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Bottom Right!', {
      positionClass: 'toast-bottom-right',
      rtl: isRtl
    });
  }); // Position Bottom Full Width

  positionBottomFull.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Bottom Full Width!', {
      positionClass: 'toast-bottom-full-width',
      rtl: isRtl
    });
  }); // Fast Duration

  fastDuration.on('click', function () {
    toastr['success']('Have fun storming the castle!', 'Fast Duration', {
      showDuration: 500,
      rtl: isRtl
    });
  }); // Slow Duration

  slowDuration.on('click', function () {
    toastr['warning']('Have fun storming the castle!', 'Slow Duration', {
      hideDuration: 3000,
      rtl: isRtl
    });
  }); // Timeout

  toastrTimeout.on('click', function () {
    toastr['error']('I do not think that word means what you think it means.', 'Timeout!', {
      timeOut: 5000,
      rtl: isRtl
    });
  }); // Sticky

  toastrSticky.on('click', function () {
    toastr['info']('I do not think that word means what you think it means.', 'Sticky!', {
      timeOut: 0,
      rtl: isRtl
    });
  }); // Slide Down / Slide Up

  slideToast.on('click', function () {
    toastr['success']('I do not think that word means what you think it means.', 'Slide Down / Slide Up!', {
      showMethod: 'slideDown',
      hideMethod: 'slideUp',
      timeOut: 2000,
      rtl: isRtl
    });
  }); // Fade In / Fade Out

  fadeToast.on('click', function () {
    toastr['success']('I do not think that word means what you think it means.', 'Slide Down / Slide Up!', {
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
      timeOut: 2000,
      rtl: isRtl
    });
  });
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/extensions/ext-component-toastr.js"], null)
//# sourceMappingURL=/ext-component-toastr.cc4c6702.js.map