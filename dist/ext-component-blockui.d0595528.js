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
})({"app-assets/js/scripts/extensions/ext-component-blockui.js":[function(require,module,exports) {
/*=========================================================================================
    File Name: ext-component-blockui.js
    Description: BlockUI
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
  'use strict';

  var section = $('#section-block'),
      sectionBlock = $('.btn-section-block'),
      sectionBlockOverlay = $('.btn-section-block-overlay'),
      sectionBlockSpinner = $('.btn-section-block-spinner'),
      sectionBlockCustom = $('.btn-section-block-custom'),
      sectionBlockMultiple = $('.btn-section-block-multiple'),
      cardSection = $('#card-block'),
      cardBlock = $('.btn-card-block'),
      cardBlockOverlay = $('.btn-card-block-overlay'),
      cardBlockSpinner = $('.btn-card-block-spinner'),
      cardBlockCustom = $('.btn-card-block-custom'),
      cardBlockMultiple = $('.btn-card-block-multiple'),
      pageBlock = $('.btn-page-block'),
      pageBlockOverlay = $('.btn-page-block-overlay'),
      pageBlockSpinner = $('.btn-page-block-spinner'),
      pageBlockCustom = $('.btn-page-block-custom'),
      pageBlockMultiple = $('.btn-page-block-multiple'),
      formSection = $('.form-block'),
      formBlock = $('.btn-form-block'),
      formBlockOverlay = $('.btn-form-block-overlay'),
      formBlockSpinner = $('.btn-form-block-spinner'),
      formBlockCustom = $('.btn-form-block-custom'),
      formBlockMultiple = $('.btn-form-block-multiple'); // Section Blocking
  // --------------------------------------------------------------------
  // Default

  if (sectionBlock.length && section.length) {
    sectionBlock.on('click', function () {
      section.block({
        message: '<div class="spinner-border text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Overlay Color


  if (sectionBlockOverlay.length && section.length) {
    sectionBlockOverlay.on('click', function () {
      section.block({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8
        }
      });
    });
  } // Custom Spinner


  if (sectionBlockSpinner.length && section.length) {
    sectionBlockSpinner.on('click', function () {
      section.block({
        message: '<div class="spinner-grow spinner-grow-sm text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Custom Message


  if (sectionBlockCustom.length && section.length) {
    sectionBlockCustom.on('click', function () {
      section.block({
        message: '<div class="d-flex justify-content-center align-items-center"><p class="mr-50 mb-0">Please wait...</p><div class="spinner-grow spinner-grow-sm text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Multiple Message


  if (sectionBlockMultiple.length && section.length) {
    sectionBlockMultiple.on('click', function () {
      section.block({
        message: '<div class="d-flex justify-content-center align-items-center"><p class="mr-50 mb-0">Please wait...</p> <div class="spinner-grow spinner-grow-sm text-white" role="status"></div>',
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        },
        timeout: 1000,
        onUnblock: function onUnblock() {
          section.block({
            message: '<p class="mb-0">Almost Done...</p>',
            timeout: 1000,
            css: {
              backgroundColor: 'transparent',
              color: '#fff',
              border: '0'
            },
            overlayCSS: {
              opacity: 0.25
            },
            onUnblock: function onUnblock() {
              section.block({
                message: '<div class="p-1 bg-success">Success</div>',
                timeout: 500,
                css: {
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '0'
                },
                overlayCSS: {
                  opacity: 0.25
                }
              });
            }
          });
        }
      });
    });
  } // Card Blocking
  // --------------------------------------------------------------------
  // Default


  if (cardBlock.length && cardSection.length) {
    cardBlock.on('click', function () {
      cardSection.block({
        message: '<div class="spinner-border text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Overlay Color


  if (cardBlockOverlay.length && cardSection.length) {
    cardBlockOverlay.on('click', function () {
      cardSection.block({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8
        }
      });
    });
  } // Custom Spinner


  if (cardBlockSpinner.length && cardSection.length) {
    cardBlockSpinner.on('click', function () {
      cardSection.block({
        message: '<div class="spinner-grow spinner-grow-sm text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Custom Message


  if (cardBlockCustom.length && cardSection.length) {
    cardBlockCustom.on('click', function () {
      cardSection.block({
        message: '<div class="d-flex justify-content-center align-items-center"><p class="mr-50 mb-0">Please wait...</p><div class="spinner-grow spinner-grow-sm text-white" role="status"></div> </div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Multiple Message


  if (cardBlockMultiple.length && cardSection.length) {
    cardBlockMultiple.on('click', function () {
      cardSection.block({
        message: '<div class="d-flex justify-content-center align-items-center"><p class="mr-50 mb-0">Please wait...</p> <div class="spinner-grow spinner-grow-sm text-white" role="status"></div> </div>',
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        },
        timeout: 1000,
        onUnblock: function onUnblock() {
          cardSection.block({
            message: '<p class="mb-0">Almost Done...</p>',
            timeout: 1000,
            css: {
              backgroundColor: 'transparent',
              color: '#fff',
              border: '0'
            },
            overlayCSS: {
              opacity: 0.25
            },
            onUnblock: function onUnblock() {
              cardSection.block({
                message: '<div class="p-1 bg-success">Success</div>',
                timeout: 500,
                css: {
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '0'
                },
                overlayCSS: {
                  opacity: 0.25
                }
              });
            }
          });
        }
      });
    });
  } // Page Blocking
  // --------------------------------------------------------------------
  // Default


  if (pageBlock.length) {
    pageBlock.on('click', function () {
      $.blockUI({
        message: '<div class="spinner-border text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Overlay Color


  if (pageBlockOverlay.length) {
    pageBlockOverlay.on('click', function () {
      $.blockUI({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8
        }
      });
    });
  } // Custom Spinner


  if (pageBlockSpinner.length) {
    pageBlockSpinner.on('click', function () {
      $.blockUI({
        message: '<div class="spinner-grow spinner-grow-sm text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Custom Message


  if (pageBlockCustom.length) {
    pageBlockCustom.on('click', function () {
      $.blockUI({
        message: '<div class="d-flex justify-content-center align-items-center"><p class="mr-50 mb-0">Please wait...</p> <div class="spinner-grow spinner-grow-sm text-white" role="status"></div> </div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Multiple Message


  if (pageBlockMultiple.length) {
    pageBlockMultiple.on('click', function () {
      $.blockUI({
        message: '<div class="d-flex justify-content-center align-items-center"><p class="mr-50 mb-0">Please wait...</p> <div class="spinner-grow spinner-grow-sm text-white" role="status"></div> </div>',
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        },
        timeout: 1000,
        onUnblock: function onUnblock() {
          $.blockUI({
            message: '<p class="mb-0">Almost Done...</p>',
            timeout: 1000,
            css: {
              backgroundColor: 'transparent',
              color: '#fff',
              border: '0'
            },
            overlayCSS: {
              opacity: 0.5
            },
            onUnblock: function onUnblock() {
              $.blockUI({
                message: '<div class="p-1 bg-success">Success</div>',
                timeout: 500,
                css: {
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '0'
                },
                overlayCSS: {
                  opacity: 0.5
                }
              });
            }
          });
        }
      });
    });
  } // Form Blocking
  // --------------------------------------------------------------------
  // Default


  if (formBlock.length && formSection.length) {
    formBlock.on('click', function () {
      formSection.block({
        message: '<div class="spinner-border text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Overlay Color


  if (formBlockOverlay.length && formSection.length) {
    formBlockOverlay.on('click', function () {
      formSection.block({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8
        }
      });
    });
  } // Custom Spinner


  if (formBlockSpinner.length && formSection.length) {
    formBlockSpinner.on('click', function () {
      formSection.block({
        message: '<div class="spinner-grow spinner-grow-sm text-white" role="status"></div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Custom Message


  if (formBlockCustom.length && formSection.length) {
    formBlockCustom.on('click', function () {
      formSection.block({
        message: '<div class="d-flex justify-content-center align-items-center"><p class="mr-50 mb-0">Please wait...</p> <div class="spinner-grow spinner-grow-sm text-white" role="status"></div> </div>',
        timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        }
      });
    });
  } // Multiple Message


  if (formBlockMultiple.length && formSection.length) {
    formBlockMultiple.on('click', function () {
      formSection.block({
        message: '<div class="d-flex justify-content-center align-items-center"><p class="mr-50 mb-0">Please wait...</p> <div class="spinner-grow spinner-grow-sm text-white" role="status"></div> </div>',
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.5
        },
        timeout: 1000,
        onUnblock: function onUnblock() {
          formSection.block({
            message: '<p class="mb-0">Almost Done...</p>',
            timeout: 1000,
            css: {
              backgroundColor: 'transparent',
              color: '#fff',
              border: '0'
            },
            overlayCSS: {
              opacity: 0.25
            },
            onUnblock: function onUnblock() {
              formSection.block({
                message: '<div class="p-1 bg-success">Success</div>',
                timeout: 500,
                css: {
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '0'
                },
                overlayCSS: {
                  opacity: 0.25
                }
              });
            }
          });
        }
      });
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/extensions/ext-component-blockui.js"], null)
//# sourceMappingURL=/ext-component-blockui.d0595528.js.map