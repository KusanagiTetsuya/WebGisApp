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
})({"app-assets/js/scripts/pages/app-invoice.js":[function(require,module,exports) {
/*=========================================================================================
    File Name: app-invoice.js
    Description: app-invoice Javascripts
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
   Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
  'use strict';

  var applyChangesBtn = $('.btn-apply-changes'),
      discount,
      tax1,
      tax2,
      discountInput,
      tax1Input,
      tax2Input,
      sourceItem = $('.source-item'),
      date = new Date(),
      datepicker = $('.date-picker'),
      dueDate = $('.due-date-picker'),
      select2 = $('.invoiceto'),
      countrySelect = $('#customer-country'),
      btnAddNewItem = $('.btn-add-new '),
      adminDetails = {
    'App Design': 'Designed UI kit & app pages.',
    'App Customization': 'Customization & Bug Fixes.',
    'ABC Template': 'Bootstrap 4 admin template.',
    'App Development': 'Native App Development.'
  },
      customerDetails = {
    shelby: {
      name: 'Thomas Shelby',
      company: 'Shelby Company Limited',
      address: 'Small Heath, Birmingham',
      pincode: 'B10 0HF',
      country: 'UK',
      tel: 'Tel: 718-986-6062',
      email: 'peakyFBlinders@gmail.com'
    },
    hunters: {
      name: 'Dean Winchester',
      company: 'Hunters Corp',
      address: '951  Red Hawk Road Minnesota,',
      pincode: '56222',
      country: 'USA',
      tel: 'Tel: 763-242-9206',
      email: 'waywardSon@gmail.com'
    }
  }; // init date picker

  if (datepicker.length) {
    datepicker.each(function () {
      $(this).flatpickr({
        defaultDate: date
      });
    });
  }

  if (dueDate.length) {
    dueDate.flatpickr({
      defaultDate: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5)
    });
  } // Country Select2


  if (countrySelect.length) {
    countrySelect.select2({
      placeholder: 'Select country',
      dropdownParent: countrySelect.parent()
    });
  } // Close select2 on modal open


  $(document).on('click', '.add-new-customer', function () {
    select2.select2('close');
  }); // Select2

  if (select2.length) {
    select2.select2({
      placeholder: 'Select Customer',
      dropdownParent: $('.invoice-customer')
    });
    select2.on('change', function () {
      var $this = $(this),
          renderDetails = '<div class="customer-details mt-1">' + '<p class="mb-25">' + customerDetails[$this.val()].name + '</p>' + '<p class="mb-25">' + customerDetails[$this.val()].company + '</p>' + '<p class="mb-25">' + customerDetails[$this.val()].address + '</p>' + '<p class="mb-25">' + customerDetails[$this.val()].country + '</p>' + '<p class="mb-0">' + customerDetails[$this.val()].tel + '</p>' + '<p class="mb-0">' + customerDetails[$this.val()].email + '</p>' + '</div>';
      $('.row-bill-to').find('.customer-details').remove();
      $('.row-bill-to').find('.col-bill-to').append(renderDetails);
    });
    select2.on('select2:open', function () {
      if (!$(document).find('.add-new-customer').length) {
        $(document).find('.select2-results__options').before('<div class="add-new-customer btn btn-flat-success cursor-pointer rounded-0 text-left mb-50 p-50 w-100" data-toggle="modal" data-target="#add-new-customer-sidebar">' + feather.icons['plus'].toSvg({
          class: 'font-medium-1 mr-50'
        }) + '<span class="align-middle">Add New Customer</span></div>');
      }
    });
  } // Repeater init


  if (sourceItem.length) {
    sourceItem.on('submit', function (e) {
      e.preventDefault();
    });
    sourceItem.repeater({
      show: function show() {
        $(this).slideDown();
      },
      hide: function hide(e) {
        $(this).slideUp();
      }
    });
  } // Prevent dropdown from closing on tax change


  $(document).on('click', '.tax-select', function (e) {
    e.stopPropagation();
  }); // On tax change update it's value value

  function updateValue(listener, el) {
    listener.closest('.repeater-wrapper').find(el).text(listener.val());
  } // Apply item changes btn


  if (applyChangesBtn.length) {
    $(document).on('click', '.btn-apply-changes', function (e) {
      var $this = $(this);
      tax1Input = $this.closest('.dropdown-menu').find('#tax-1-input');
      tax2Input = $this.closest('.dropdown-menu').find('#tax-2-input');
      discountInput = $this.closest('.dropdown-menu').find('#discount-input');
      tax1 = $this.closest('.repeater-wrapper').find('.tax-1');
      tax2 = $this.closest('.repeater-wrapper').find('.tax-2');
      discount = $('.discount');

      if (tax1Input.val() !== null) {
        updateValue(tax1Input, tax1);
      }

      if (tax2Input.val() !== null) {
        updateValue(tax2Input, tax2);
      }

      if (discountInput.val().length) {
        var finalValue = discountInput.val() <= 100 ? discountInput.val() : 100;
        $this.closest('.repeater-wrapper').find(discount).text(finalValue + '%');
      }
    });
  } // Item details select onchange


  $(document).on('change', '.item-details', function () {
    var $this = $(this),
        value = adminDetails[$this.val()];

    if ($this.next('textarea').length) {
      $this.next('textarea').val(value);
    } else {
      $this.after('<textarea class="form-control mt-2" rows="2">' + value + '</textarea>');
    }
  });

  if (btnAddNewItem.length) {
    btnAddNewItem.on('click', function () {
      if (feather) {
        // featherSVG();
        feather.replace({
          width: 14,
          height: 14
        });
      }
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/pages/app-invoice.js"], null)
//# sourceMappingURL=/app-invoice.c69804db.js.map