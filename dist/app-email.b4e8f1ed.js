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
})({"app-assets/js/scripts/pages/app-email.js":[function(require,module,exports) {
/*=========================================================================================
    File Name: app-email.js
    Description: Email Page js
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
'use strict';

$(function () {
  // Register Quill Fonts
  var Font = Quill.import('formats/font');
  Font.whitelist = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'];
  Quill.register(Font, true);
  var compose = $('.compose-email'),
      composeModal = $('#compose-mail'),
      menuToggle = $('.menu-toggle'),
      sidebarToggle = $('.sidebar-toggle'),
      sidebarLeft = $('.sidebar-left'),
      sidebarMenuList = $('.sidebar-menu-list'),
      emailAppList = $('.email-app-list'),
      emailUserList = $('.email-user-list'),
      emailUserListInput = $('.email-user-list .custom-checkbox'),
      emailScrollArea = $('.email-scroll-area'),
      emailTo = $('#email-to'),
      emailCC = $('#emailCC'),
      emailBCC = $('#emailBCC'),
      toggleCC = $('.toggle-cc'),
      toggleBCC = $('.toggle-bcc'),
      wrapperCC = $('.cc-wrapper'),
      wrapperBCC = $('.bcc-wrapper'),
      emailDetails = $('.email-app-details'),
      listGroupMsg = $('.list-group-messages'),
      goBack = $('.go-back'),
      favoriteStar = $('.email-application .email-favorite'),
      userActions = $('.user-action'),
      mailDelete = $('.mail-delete'),
      mailUnread = $('.mail-unread'),
      emailSearch = $('#email-search'),
      editorEl = $('#message-editor .editor'),
      overlay = $('.body-content-overlay'),
      isRtl = $('html').attr('data-textdirection') === 'rtl';
  var assetPath = '../../../app-assets/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  } // Toggle BCC on mount


  if (wrapperBCC.length) {
    wrapperBCC.toggle();
  } // Toggle CC on mount


  if (wrapperCC) {
    wrapperCC.toggle();
  } // Toggle BCC input


  if (toggleBCC.length) {
    toggleBCC.on('click', function () {
      wrapperBCC.toggle();
    });
  } // Toggle CC input


  if (toggleCC.length) {
    toggleCC.on('click', function () {
      wrapperCC.toggle();
    });
  } // if it is not touch device


  if (!$.app.menu.is_touch_device()) {
    // Email left Sidebar
    if ($(sidebarMenuList).length > 0) {
      var sidebar_menu_list = new PerfectScrollbar(sidebarMenuList[0]);
    } // User list scroll


    if ($(emailUserList).length > 0) {
      var users_list = new PerfectScrollbar(emailUserList[0]);
    } // Email detail section


    if ($(emailScrollArea).length > 0) {
      var users_list = new PerfectScrollbar(emailScrollArea[0]);
    }
  } // if it is a touch device
  else {
    $(sidebarMenuList).css('overflow', 'scroll');
    $(emailUserList).css('overflow', 'scroll');
    $(emailScrollArea).css('overflow', 'scroll');
  } // Email to user select


  function renderGuestAvatar(option) {
    if (!option.id) {
      return option.text;
    }

    var avatarImg = feather.icons['user'].toSvg({
      class: 'mr-0'
    });

    if ($(option.element).data('avatar')) {
      avatarImg = "<img src='" + assetPath + 'images/avatars/' + $(option.element).data('avatar') + "' alt='avatar' />";
    }

    var $avatar = "<div class='d-flex flex-wrap align-items-center'>" + "<div class='avatar avatar-sm my-0 mr-50'>" + "<span class='avatar-content'>" + avatarImg + '</span>' + '</div>' + option.text + '</div>';
    return $avatar;
  }

  if (emailTo.length) {
    emailTo.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select value',
      dropdownParent: emailTo.parent(),
      closeOnSelect: false,
      templateResult: renderGuestAvatar,
      templateSelection: renderGuestAvatar,
      tags: true,
      tokenSeparators: [',', ' '],
      escapeMarkup: function escapeMarkup(es) {
        return es;
      }
    });
  }

  if (emailCC.length) {
    emailCC.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select value',
      dropdownParent: emailCC.parent(),
      closeOnSelect: false,
      templateResult: renderGuestAvatar,
      templateSelection: renderGuestAvatar,
      tags: true,
      tokenSeparators: [',', ' '],
      escapeMarkup: function escapeMarkup(es) {
        return es;
      }
    });
  }

  if (emailBCC.length) {
    emailBCC.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'Select value',
      dropdownParent: emailBCC.parent(),
      closeOnSelect: false,
      templateResult: renderGuestAvatar,
      templateSelection: renderGuestAvatar,
      tags: true,
      tokenSeparators: [',', ' '],
      escapeMarkup: function escapeMarkup(es) {
        return es;
      }
    });
  } // compose email


  if (compose.length) {
    compose.on('click', function () {
      // showing rightSideBar
      overlay.removeClass('show'); // hiding left sidebar

      sidebarLeft.removeClass('show'); // all input forms

      $('.compose-form input').val('');
      emailTo.val([]).trigger('change');
      emailCC.val([]).trigger('change');
      emailBCC.val([]).trigger('change');
      wrapperCC.hide();
      wrapperBCC.hide(); // quill editor content

      var quill_editor = $('.compose-form .ql-editor');
      quill_editor[0].innerHTML = '';
    });
  } // Main menu toggle should hide app menu


  if (menuToggle.length) {
    menuToggle.on('click', function (e) {
      sidebarLeft.removeClass('show');
      overlay.removeClass('show');
    });
  } // Email sidebar toggle


  if (sidebarToggle.length) {
    sidebarToggle.on('click', function (e) {
      e.stopPropagation();
      sidebarLeft.toggleClass('show');
      overlay.addClass('show');
    });
  } // Overlay Click


  if (overlay.length) {
    overlay.on('click', function (e) {
      sidebarLeft.removeClass('show');
      overlay.removeClass('show');
    });
  } // Email Right sidebar toggle


  if (emailUserList.find('li').length) {
    emailUserList.find('li').on('click', function (e) {
      emailDetails.toggleClass('show');
    });
  } // Add class active on click of sidebar list


  if (listGroupMsg.find('a').length) {
    listGroupMsg.find('a').on('click', function () {
      if (listGroupMsg.find('a').hasClass('active')) {
        listGroupMsg.find('a').removeClass('active');
      }

      $(this).addClass('active');
    });
  } // Email detail view back button click


  if (goBack.length) {
    goBack.on('click', function (e) {
      e.stopPropagation();
      emailDetails.removeClass('show');
    });
  } // Favorite star click


  if (favoriteStar.length) {
    favoriteStar.on('click', function (e) {
      $(this).find('svg').toggleClass('favorite');
      e.stopPropagation(); // show toast only have favorite class

      if ($(this).find('svg').hasClass('favorite')) {
        toastr['success']('Updated mail to favorite', 'Favorite Mail ⭐️', {
          closeButton: true,
          tapToDismiss: false,
          rtl: isRtl
        });
      }
    });
  } // For app sidebar on small screen


  if ($(window).width() > 768) {
    if (overlay.hasClass('show')) {
      overlay.removeClass('show');
    }
  } // single checkbox select


  if (emailUserListInput.length) {
    emailUserListInput.on('click', function (e) {
      e.stopPropagation();
    });
    emailUserListInput.find('input').on('change', function (e) {
      e.stopPropagation();
      var $this = $(this);

      if ($this.is(':checked')) {
        $this.closest('.media').addClass('selected-row-bg');
      } else {
        $this.closest('.media').removeClass('selected-row-bg');
      }
    });
  } // select all


  $(document).on('click', '.email-app-list .selectAll input', function () {
    if ($(this).is(':checked')) {
      userActions.find('.custom-checkbox input').prop('checked', this.checked).closest('.media').addClass('selected-row-bg');
    } else {
      userActions.find('.custom-checkbox input').prop('checked', '').closest('.media').removeClass('selected-row-bg');
    }
  }); // Delete selected Mail from list

  if (mailDelete.length) {
    mailDelete.on('click', function () {
      if (userActions.find('.custom-checkbox input:checked').length) {
        userActions.find('.custom-checkbox input:checked').closest('.media').remove();
        emailAppList.find('.selectAll input').prop('checked', false);
        toastr['error']('You have removed email.', 'Mail Deleted!', {
          closeButton: true,
          tapToDismiss: false,
          rtl: isRtl
        });
        userActions.find('.custom-checkbox input').prop('checked', '');
      }
    });
  } // Mark mail unread


  if (mailUnread.length) {
    mailUnread.on('click', function () {
      userActions.find('.custom-checkbox input:checked').closest('.media').removeClass('mail-read');
    });
  } // Filter


  if (emailSearch.length) {
    emailSearch.on('keyup', function () {
      var value = $(this).val().toLowerCase();

      if (value !== '') {
        emailUserList.find('.email-media-list li').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
        var tbl_row = emailUserList.find('.email-media-list li:visible').length; //Check if table has row or not

        if (tbl_row == 0) {
          emailUserList.find('.no-results').addClass('show');
          emailUserList.animate({
            scrollTop: '0'
          }, 500);
        } else {
          if (emailUserList.find('.no-results').hasClass('show')) {
            emailUserList.find('.no-results').removeClass('show');
          }
        }
      } else {
        // If filter box is empty
        emailUserList.find('.email-media-list li').show();

        if (emailUserList.find('.no-results').hasClass('show')) {
          emailUserList.find('.no-results').removeClass('show');
        }
      }
    });
  } // Email compose Editor


  if (editorEl.length) {
    var emailEditor = new Quill(editorEl[0], {
      bounds: '#message-editor .editor',
      modules: {
        formula: true,
        syntax: true,
        toolbar: '.compose-editor-toolbar'
      },
      placeholder: 'Message',
      theme: 'snow'
    });
  } // On navbar search and bookmark Icon click, hide compose mail


  $('.nav-link-search, .bookmark-star').on('click', function () {
    composeModal.modal('hide');
  });
});
$(window).on('resize', function () {
  var sidebarLeft = $('.sidebar-left'); // remove show classes from sidebar and overlay if size is > 992

  if ($(window).width() > 768) {
    if ($('.app-content .body-content-overlay').hasClass('show')) {
      sidebarLeft.removeClass('show');
      $('.app-content .body-content-overlay').removeClass('show');
    }
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61883" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/pages/app-email.js"], null)
//# sourceMappingURL=/app-email.b4e8f1ed.js.map