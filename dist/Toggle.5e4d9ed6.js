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
})({"scripts/Toggle.js":[function(require,module,exports) {
/*=========================================================================================
  File Name: customizer.js
  Description: Template customizer js.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
(function (window, document, $) {
  'use strict';

  var html = $('html'),
      body = $('body'),
      // appContent = $('.app-content'),
  mainMenu = $('.main-menu'),
      menuType = body.attr('data-menu'),
      footer = $('.footer'),
      navbar = $('.header-navbar'),
      horizontalNavbar = $('.horizontal-menu-wrapper .header-navbar'),
      navBarShadow = $('.header-navbar-shadow'),
      collapseSidebar = $('#collapse-sidebar-switch'),
      contentWrapper = $('.content-wrapper'),
      contentAreaWrapper = $('.content-area-wrapper'),
      customizer = $('.customizer'),
      flag = 0; // Customizer toggle & close button click events  [Remove customizer code from production]

  $('.customizer-toggle1').on('click', function (e) {
    e.preventDefault();
    $(customizer).toggleClass('open');
  });
  $('.customizer-close').on('click', function () {
    $(customizer).removeClass('open');
  }); // Customizer toggle & close button click events  [Remove customizer code from production]

  $('.customizer-toggle2').on('click', function (e) {
    e.preventDefault();
    $(customizer).toggleClass('open');
  });
  $('.customizer-close').on('click', function () {
    $(customizer).removeClass('open');
  }); // perfect scrollbar for customizer

  if ($('.customizer-content').length > 0) {
    var customizer_content = new PerfectScrollbar('.customizer-content');
  }
  /***** Skin Options *****/


  $('.layout-name').on('click', function () {
    var $this = $(this);
    var currentLayout = $this.data('layout');
    html.removeClass('dark-layout bordered-layout semi-dark-layout').addClass(currentLayout);

    if (currentLayout === '') {
      mainMenu.removeClass('menu-dark').addClass('menu-light');
      navbar.removeClass('navbar-dark').addClass('navbar-light');
    } else if (currentLayout === 'dark-layout') {
      mainMenu.removeClass('menu-light').addClass('menu-dark');
      navbar.removeClass('navbar-light').addClass('navbar-dark');
    } else if (currentLayout === 'semi-dark-layout') {
      mainMenu.removeClass('menu-light').addClass('menu-dark');
      navbar.removeClass('navbar-dark').addClass('navbar-light');
    } else {
      mainMenu.removeClass('menu-dark').addClass('menu-light');
      navbar.removeClass('navbar-dark').addClass('navbar-light');
    } // $('.horizontal-menu .header-navbar.navbar-fixed').css({
    //   background: 'inherit',
    //   'box-shadow': 'inherit'
    // });
    // $('.horizontal-menu .horizontal-menu-wrapper.header-navbar').css('background', 'inherit');

  }); // Default Skin Selected Based on Current Layout

  var layout = html.data('layout');
  $(".layout-name[data-layout='" + layout + "']").prop('checked', true);
  collapseSidebar.on('click', function () {
    $('.modern-nav-toggle').trigger('click');
    $('.main-menu').trigger('mouseleave');
  }); // checks if main menu is collapsed by default

  if (body.hasClass('menu-collapsed')) {
    collapseSidebar.prop('checked', true);
  } else {
    collapseSidebar.prop('checked', false);
  }
  /***** Navbar Color Options *****/


  $('#customizer-navbar-colors .color-box').on('click', function () {
    var $this = $(this);
    $this.siblings().removeClass('selected');
    $this.addClass('selected');
    var navbarColor = $this.data('navbar-color'); // changes navbar colors

    if (navbarColor) {
      body.find(navbar).removeClass('bg-primary bg-secondary bg-success bg-danger bg-info bg-warning bg-dark').addClass(navbarColor + ' navbar-dark');
    } else {
      body.find(navbar).removeClass('bg-primary bg-secondary bg-success bg-danger bg-info bg-warning bg-dark navbar-dark');
    }

    if (html.hasClass('dark-layout')) {
      navbar.addClass('navbar-dark');
    }
  });
  /***** Navbar Type *****/

  if (body.hasClass('horizontal-menu')) {
    $('.collapse_menu').removeClass('d-none');
    $('.collapse_sidebar').addClass('d-none');
    $('.menu_type').removeClass('d-none');
    $('.navbar_type').addClass('d-none'); // Hides hidden option in Horizontal layout

    $('#nav-type-hidden').closest('div').css('display', 'none');
    $('#customizer-navbar-colors').hide();
    $('.customizer-menu').attr('style', 'display: none !important').next('hr').hide();
    $('.navbar-type-text').text('Nav Menu Types');
  } // Hides Navbar


  $('#nav-type-hidden').on('click', function () {
    navbar.addClass('d-none');
    navBarShadow.addClass('d-none');
    body.removeClass('navbar-static navbar-floating navbar-sticky').addClass('navbar-hidden');
  }); // changes to Static navbar

  $('#nav-type-static').on('click', function () {
    if (body.hasClass('horizontal-layout')) {
      horizontalNavbar.removeClass('d-none floating-nav fixed-top navbar-fixed container-xxl');
      body.removeClass('navbar-hidden navbar-floating navbar-sticky').addClass('navbar-static');
    } else {
      navBarShadow.addClass('d-none');

      if (menuType === 'horizontal-menu') {
        horizontalNavbar.removeClass('d-none floating-nav fixed-top container-xxl').addClass('navbar-static-top');
      } else {
        navbar.removeClass('d-none floating-nav fixed-top container-xxl').addClass('navbar-static-top');
      }

      body.removeClass('navbar-hidden navbar-floating navbar-sticky').addClass('navbar-static');
    }
  }); // change to floating navbar

  $('#nav-type-floating').on('click', function () {
    var $class;

    if (body.hasClass('horizontal-layout')) {
      if ($('#layout-width-full').prop('checked')) {
        $class = "floating-nav";
      } else {
        $class = "floating-nav container-xxl";
      }

      horizontalNavbar.removeClass('d-none fixed-top navbar-static-top').addClass($class);
      body.removeClass('navbar-static navbar-hidden navbar-sticky').addClass('navbar-floating');
    } else {
      if ($('#layout-width-full').prop('checked')) {
        $class = "floating-nav";
      } else {
        $class = "floating-nav container-xxl p-0";
      }

      navBarShadow.removeClass('d-none');

      if (menuType === 'horizontal-menu') {
        horizontalNavbar.removeClass('d-none navbar-static-top fixed-top').addClass($class);
      } else {
        navbar.removeClass('d-none navbar-static-top fixed-top').addClass($class);
      }

      body.removeClass('navbar-static navbar-hidden navbar-sticky').addClass('navbar-floating');
    }
  }); // changes to Static navbar

  $('#nav-type-sticky').on('click', function () {
    if (body.hasClass('horizontal-layout')) {
      horizontalNavbar.removeClass('d-none floating-nav navbar-static-top navbar-fixed container-xxl').addClass('fixed-top');
      body.removeClass('navbar-static navbar-floating navbar-hidden').addClass('navbar-sticky');
    } else {
      navBarShadow.addClass('d-none');

      if (menuType === 'horizontal-menu') {
        horizontalNavbar.removeClass('d-none floating-nav navbar-static-top').addClass('fixed-top');
      } else {
        navbar.removeClass('d-none floating-nav navbar-static-top container-xxl').addClass('fixed-top');
      }

      body.removeClass('navbar-static navbar-floating navbar-hidden').addClass('navbar-sticky');
    }
  });
  /***** Layout Width Options *****/
  // Check current Layout width and show selected layout width accordingly

  if (contentWrapper.hasClass('container-xxl') || contentAreaWrapper.hasClass('container-xxl')) {
    $('#layout-width-boxed').prop('checked', true);
  } else {
    $('#layout-width-full').prop('checked', true);
  } // Full Width Layout


  $('#layout-width-full').on('click', function () {
    contentWrapper.removeClass('container-xxl p-0');
    contentAreaWrapper.removeClass('container-xxl p-0');
    navbar.removeClass('container-xxl p-0');
  }); // Boxed Layout

  $('#layout-width-boxed').on('click', function () {
    contentWrapper.addClass('container-xxl p-0');
    contentAreaWrapper.addClass('container-xxl p-0');

    if (navbar.hasClass('floating-nav')) {
      $('.floating-nav').addClass('container-xxl p-0');
    }
  });
  /***** Footer Type *****/
  // Hides footer

  $('#footer-type-hidden').on('click', function () {
    footer.addClass('d-none');
    body.removeClass('footer-static footer-fixed').addClass('footer-hidden');
  }); // changes to Static footer

  $('#footer-type-static').on('click', function () {
    body.removeClass('footer-fixed');
    footer.removeClass('d-none').addClass('footer-static');
    body.removeClass('footer-hidden footer-fixed').addClass('footer-static');
  }); // changes to Sticky footer

  $('#footer-type-sticky').on('click', function () {
    body.removeClass('footer-static footer-hidden').addClass('footer-fixed');
    footer.removeClass('d-none footer-static');
  }); // Unison.on('change', function (bp) {
  //   if (menuType === 'horizontal-menu' && flag > 0) {
  //     if (bp.name === 'xl') {
  //       $('#nav-type-floating').trigger('click');
  //     }
  //   }
  //   flag++;
  // });
})(window, document, jQuery);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61933" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/Toggle.js"], null)
//# sourceMappingURL=/Toggle.5e4d9ed6.js.map