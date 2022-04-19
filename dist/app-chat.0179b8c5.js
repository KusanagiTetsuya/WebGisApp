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
})({"app-assets/js/scripts/pages/app-chat.js":[function(require,module,exports) {
/*=========================================================================================
    File Name: app-chat.js
    Description: Chat app js
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
'use strict';

$(function () {
  var chatUsersListWrapper = $('.chat-application .chat-user-list-wrapper'),
      overlay = $('.body-content-overlay'),
      profileSidebar = $('.chat-application .chat-profile-sidebar'),
      profileSidebarArea = $('.chat-application .profile-sidebar-area'),
      profileToggle = $('.chat-application .sidebar-profile-toggle'),
      userProfileToggle = $('.chat-application .user-profile-toggle'),
      userProfileSidebar = $('.user-profile-sidebar'),
      statusRadio = $('.chat-application .user-status input:radio[name=userStatus]'),
      userChats = $('.user-chats'),
      chatsUserList = $('.chat-users-list'),
      chatList = $('.chat-list'),
      contactList = $('.contact-list'),
      sidebarContent = $('.sidebar-content'),
      closeIcon = $('.chat-application .close-icon'),
      sidebarCloseIcon = $('.chat-application .sidebar-close-icon'),
      menuToggle = $('.chat-application .menu-toggle'),
      speechToText = $('.speech-to-text'),
      chatSearch = $('.chat-application #chat-search'); // init ps if it is not touch device

  if (!$.app.menu.is_touch_device()) {
    // Chat user list
    if (chatUsersListWrapper.length > 0) {
      var chatUserList = new PerfectScrollbar(chatUsersListWrapper[0]);
    } // Admin profile left


    if (userProfileSidebar.find('.user-profile-sidebar-area').length > 0) {
      var userScrollArea = new PerfectScrollbar(userProfileSidebar.find('.user-profile-sidebar-area')[0]);
    } // Chat area


    if (userChats.length > 0) {
      var chatsUser = new PerfectScrollbar(userChats[0], {
        wheelPropagation: false
      });
    } // User profile right area


    if (profileSidebarArea.length > 0) {
      var user_profile = new PerfectScrollbar(profileSidebarArea[0]);
    }
  } else {
    chatUsersListWrapper.css('overflow', 'scroll');
    userProfileSidebar.find('.user-profile-sidebar-area').css('overflow', 'scroll');
    userChats.css('overflow', 'scroll');
    profileSidebarArea.css('overflow', 'scroll'); // on user click sidebar close in touch devices

    $(chatsUserList).find('li').on('click', function () {
      $(sidebarContent).removeClass('show');
      $(overlay).removeClass('show');
    });
  } // Chat Profile sidebar & overlay toggle


  if (profileToggle.length) {
    profileToggle.on('click', function () {
      profileSidebar.addClass('show');
      overlay.addClass('show');
    });
  } // Update status by clicking on Radio


  if (statusRadio.length) {
    statusRadio.on('change', function () {
      var $className = 'avatar-status-' + this.value,
          profileHeaderAvatar = $('.header-profile-sidebar .avatar span');
      profileHeaderAvatar.removeClass();
      profileToggle.find('.avatar span').removeClass();
      profileHeaderAvatar.addClass($className + ' avatar-status-lg');
      profileToggle.find('.avatar span').addClass($className);
    });
  } // On Profile close click


  if (closeIcon.length) {
    closeIcon.on('click', function () {
      profileSidebar.removeClass('show');
      userProfileSidebar.removeClass('show');

      if (!sidebarContent.hasClass('show')) {
        overlay.removeClass('show');
      }
    });
  } // On sidebar close click


  if (sidebarCloseIcon.length) {
    sidebarCloseIcon.on('click', function () {
      sidebarContent.removeClass('show');
      overlay.removeClass('show');
    });
  } // User Profile sidebar toggle


  if (userProfileToggle.length) {
    userProfileToggle.on('click', function () {
      userProfileSidebar.addClass('show');
      overlay.addClass('show');
    });
  } // On overlay click


  if (overlay.length) {
    overlay.on('click', function () {
      sidebarContent.removeClass('show');
      overlay.removeClass('show');
      profileSidebar.removeClass('show');
      userProfileSidebar.removeClass('show');
    });
  } // Add class active on click of Chat users list


  if (chatUsersListWrapper.find('ul li').length) {
    chatUsersListWrapper.find('ul li').on('click', function () {
      var $this = $(this),
          startArea = $('.start-chat-area'),
          activeChat = $('.active-chat');

      if (chatUsersListWrapper.find('ul li').hasClass('active')) {
        chatUsersListWrapper.find('ul li').removeClass('active');
      }

      $this.addClass('active');
      $this.find('.badge').remove();

      if (chatUsersListWrapper.find('ul li').hasClass('active')) {
        startArea.addClass('d-none');
        activeChat.removeClass('d-none');
      } else {
        startArea.removeClass('d-none');
        activeChat.addClass('d-none');
      }
    });
  } // auto scroll to bottom of Chat area


  chatsUserList.find('li').on('click', function () {
    userChats.animate({
      scrollTop: userChats[0].scrollHeight
    }, 400);
  }); // Main menu toggle should hide app menu

  if (menuToggle.length) {
    menuToggle.on('click', function (e) {
      sidebarContent.removeClass('show');
      overlay.removeClass('show');
      profileSidebar.removeClass('show');
      userProfileSidebar.removeClass('show');
    });
  } // Chat sidebar toggle


  if ($(window).width() < 991) {
    onClickFn();
  } // Filter


  if (chatSearch.length) {
    chatSearch.on('keyup', function () {
      var value = $(this).val().toLowerCase();

      if (value !== '') {
        // filter chat list
        chatList.find('li:not(.no-results)').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        }); // filter contact list

        contactList.find('li:not(.no-results)').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
        var chat_tbl_row = chatList.find('li:not(.no-results):visible').length,
            contact_tbl_row = contactList.find('li:not(.no-results):visible').length; // check if chat row available

        if (chat_tbl_row == 0) {
          chatList.find('.no-results').addClass('show');
        } else {
          if (chatList.find('.no-results').hasClass('show')) {
            chatList.find('.no-results').removeClass('show');
          }
        } // check if contact row available


        if (contact_tbl_row == 0) {
          contactList.find('.no-results').addClass('show');
        } else {
          if (contactList.find('.no-results').hasClass('show')) {
            contactList.find('.no-results').removeClass('show');
          }
        }
      } else {
        // If filter box is empty
        chatsUserList.find('li').show();

        if (chatUsersListWrapper.find('.no-results').hasClass('show')) {
          chatUsersListWrapper.find('.no-results').removeClass('show');
        }
      }
    });
  }

  if (speechToText.length) {
    // Speech To Text
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

    if (SpeechRecognition !== undefined && SpeechRecognition !== null) {
      var recognition = new SpeechRecognition(),
          listening = false;
      speechToText.on('click', function () {
        var $this = $(this);

        recognition.onspeechstart = function () {
          listening = true;
        };

        if (listening === false) {
          recognition.start();
        }

        recognition.onerror = function (event) {
          listening = false;
        };

        recognition.onresult = function (event) {
          $this.closest('.form-send-message').find('.message').val(event.results[0][0].transcript);
        };

        recognition.onspeechend = function (event) {
          listening = false;
          recognition.stop();
        };
      });
    }
  }
}); // Window Resize

$(window).on('resize', function () {
  if ($(window).width() > 992) {
    if ($('.chat-application .body-content-overlay').hasClass('show')) {
      $('.app-content .sidebar-left').removeClass('show');
      $('.chat-application .body-content-overlay').removeClass('show');
    }
  } // Chat sidebar toggle


  if ($(window).width() < 991) {
    onClickFn();

    if (!$('.chat-application .chat-profile-sidebar').hasClass('show') || !$('.chat-application .sidebar-content').hasClass('show')) {
      $('.sidebar-content').removeClass('show');
      $('.body-content-overlay').removeClass('show');
    }
  }
});
$(document).on('click', '.sidebar-toggle', function () {
  if ($(window).width() < 992) {
    onClickFn();
  }
});

function onClickFn() {
  var sidebarContent = $('.sidebar-content'),
      sidebarToggle = $('.sidebar-toggle'),
      overlay = $('.body-content-overlay');

  if (sidebarToggle.length) {
    sidebarContent.addClass('show');
    overlay.addClass('show');
  }
} // Add message to chat - function call on form submit


function enterChat(source) {
  var message = $('.message').val();

  if (/\S/.test(message)) {
    var html = '<div class="chat-content">' + '<p>' + message + '</p>' + '</div>';
    $('.chat:last-child .chat-body').append(html);
    $('.message').val('');
    $('.user-chats').scrollTop($('.user-chats > .chats').height());
  }
}
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/pages/app-chat.js"], null)
//# sourceMappingURL=/app-chat.0179b8c5.js.map