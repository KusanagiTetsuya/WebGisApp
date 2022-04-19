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
})({"app-assets/js/scripts/pages/app-user-list.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*=========================================================================================
    File Name: app-user-list.js
    Description: User List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
$(function () {
  'use strict';

  var dtUserTable = $('.user-list-table'),
      newUserSidebar = $('.new-user-modal'),
      newUserForm = $('.add-new-user'),
      statusObj = {
    1: {
      title: 'Pending',
      class: 'badge-light-warning'
    },
    2: {
      title: 'Active',
      class: 'badge-light-success'
    },
    3: {
      title: 'Inactive',
      class: 'badge-light-secondary'
    }
  };
  var assetPath = '../../../app-assets/',
      userView = 'app-user-view.html',
      userEdit = 'app-user-edit.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view';
    userEdit = assetPath + 'app/user/edit';
  } // Users List datatable


  if (dtUserTable.length) {
    var _dtUserTable$DataTabl;

    dtUserTable.DataTable((_dtUserTable$DataTabl = {
      ajax: assetPath + 'data/user-list.json',
      // JSON file to add data
      columns: [// columns according to JSON
      {
        data: 'responsive_id'
      }, {
        data: 'full_name'
      }, {
        data: 'email'
      }, {
        data: 'role'
      }, {
        data: 'current_plan'
      }, {
        data: 'status'
      }, {
        data: ''
      }],
      columnDefs: [{
        // For Responsive
        className: 'control',
        orderable: false,
        responsivePriority: 2,
        targets: 0
      }, {
        // User full name and username
        targets: 1,
        responsivePriority: 4,
        render: function render(data, type, full, meta) {
          var $name = full['full_name'],
              $uname = full['username'],
              $image = full['avatar'];

          if ($image) {
            // For Avatar image
            var $output = '<img src="' + assetPath + 'images/avatars/' + $image + '" alt="Avatar" height="32" width="32">';
          } else {
            // For Avatar badge
            var stateNum = Math.floor(Math.random() * 6) + 1;
            var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
            var $state = states[stateNum],
                $name = full['full_name'],
                $initials = $name.match(/\b\w/g) || [];
            $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
            $output = '<span class="avatar-content">' + $initials + '</span>';
          }

          var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : ''; // Creates full output for row

          var $row_output = '<div class="d-flex justify-content-left align-items-center">' + '<div class="avatar-wrapper">' + '<div class="avatar ' + colorClass + ' mr-1">' + $output + '</div>' + '</div>' + '<div class="d-flex flex-column">' + '<a href="' + userView + '" class="user_name text-truncate"><span class="font-weight-bold">' + $name + '</span></a>' + '<small class="emp_post text-muted">@' + $uname + '</small>' + '</div>' + '</div>';
          return $row_output;
        }
      }, {
        // User Role
        targets: 3,
        render: function render(data, type, full, meta) {
          var $role = full['role'];
          var roleBadgeObj = {
            Subscriber: feather.icons['user'].toSvg({
              class: 'font-medium-3 text-primary mr-50'
            }),
            Author: feather.icons['settings'].toSvg({
              class: 'font-medium-3 text-warning mr-50'
            }),
            Maintainer: feather.icons['database'].toSvg({
              class: 'font-medium-3 text-success mr-50'
            }),
            Editor: feather.icons['edit-2'].toSvg({
              class: 'font-medium-3 text-info mr-50'
            }),
            Admin: feather.icons['slack'].toSvg({
              class: 'font-medium-3 text-danger mr-50'
            })
          };
          return "<span class='text-truncate align-middle'>" + roleBadgeObj[$role] + $role + '</span>';
        }
      }, {
        // User Status
        targets: 5,
        render: function render(data, type, full, meta) {
          var $status = full['status'];
          return '<span class="badge badge-pill ' + statusObj[$status].class + '" text-capitalized>' + statusObj[$status].title + '</span>';
        }
      }, {
        // Actions
        targets: -1,
        title: 'Actions',
        orderable: false,
        render: function render(data, type, full, meta) {
          return '<div class="btn-group">' + '<a class="btn btn-sm dropdown-toggle hide-arrow" data-toggle="dropdown">' + feather.icons['more-vertical'].toSvg({
            class: 'font-small-4'
          }) + '</a>' + '<div class="dropdown-menu dropdown-menu-right">' + '<a href="' + userView + '" class="dropdown-item">' + feather.icons['file-text'].toSvg({
            class: 'font-small-4 mr-50'
          }) + 'Details</a>' + '<a href="' + userEdit + '" class="dropdown-item">' + feather.icons['archive'].toSvg({
            class: 'font-small-4 mr-50'
          }) + 'Edit</a>' + '<a href="javascript:;" class="dropdown-item delete-record">' + feather.icons['trash-2'].toSvg({
            class: 'font-small-4 mr-50'
          }) + 'Delete</a></div>' + '</div>' + '</div>';
        }
      }],
      order: [[2, 'desc']],
      dom: '<"d-flex justify-content-between align-items-center header-actions mx-1 row mt-75"' + '<"col-lg-12 col-xl-6" l>' + '<"col-lg-12 col-xl-6 pl-xl-75 pl-0"<"dt-action-buttons text-xl-right text-lg-left text-md-right text-left d-flex align-items-center justify-content-lg-end align-items-center flex-sm-nowrap flex-wrap mr-1"<"mr-1"f>B>>' + '>t' + '<"d-flex justify-content-between mx-2 row mb-1"' + '<"col-sm-12 col-md-6"i>' + '<"col-sm-12 col-md-6"p>' + '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [{
        text: 'Add New User',
        className: 'add-new btn btn-primary mt-50',
        attr: {
          'data-toggle': 'modal',
          'data-target': '#modals-slide-in'
        },
        init: function init(api, node, config) {
          $(node).removeClass('btn-secondary');
        }
      }],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function header(row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: $.fn.dataTable.Responsive.renderer.tableAll({
            tableClass: 'table',
            columnDefs: [{
              targets: 2,
              visible: false
            }, {
              targets: 3,
              visible: false
            }]
          })
        }
      }
    }, _defineProperty(_dtUserTable$DataTabl, "language", {
      paginate: {
        // remove previous & next text from pagination
        previous: '&nbsp;',
        next: '&nbsp;'
      }
    }), _defineProperty(_dtUserTable$DataTabl, "initComplete", function initComplete() {
      // Adding role filter once table initialized
      this.api().columns(3).every(function () {
        var column = this;
        var select = $('<select id="UserRole" class="form-control text-capitalize mb-md-0 mb-2"><option value=""> Select Role </option></select>').appendTo('.user_role').on('change', function () {
          var val = $.fn.dataTable.util.escapeRegex($(this).val());
          column.search(val ? '^' + val + '$' : '', true, false).draw();
        });
        column.data().unique().sort().each(function (d, j) {
          select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
        });
      }); // Adding plan filter once table initialized

      this.api().columns(4).every(function () {
        var column = this;
        var select = $('<select id="UserPlan" class="form-control text-capitalize mb-md-0 mb-2"><option value=""> Select Plan </option></select>').appendTo('.user_plan').on('change', function () {
          var val = $.fn.dataTable.util.escapeRegex($(this).val());
          column.search(val ? '^' + val + '$' : '', true, false).draw();
        });
        column.data().unique().sort().each(function (d, j) {
          select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
        });
      }); // Adding status filter once table initialized

      this.api().columns(5).every(function () {
        var column = this;
        var select = $('<select id="FilterTransaction" class="form-control text-capitalize mb-md-0 mb-2xx"><option value=""> Select Status </option></select>').appendTo('.user_status').on('change', function () {
          var val = $.fn.dataTable.util.escapeRegex($(this).val());
          column.search(val ? '^' + val + '$' : '', true, false).draw();
        });
        column.data().unique().sort().each(function (d, j) {
          select.append('<option value="' + statusObj[d].title + '" class="text-capitalize">' + statusObj[d].title + '</option>');
        });
      });
    }), _dtUserTable$DataTabl));
  } // Check Validity


  function checkValidity(el) {
    if (el.validate().checkForm()) {
      submitBtn.attr('disabled', false);
    } else {
      submitBtn.attr('disabled', true);
    }
  } // Form Validation


  if (newUserForm.length) {
    newUserForm.validate({
      errorClass: 'error',
      rules: {
        'user-fullname': {
          required: true
        },
        'user-name': {
          required: true
        },
        'user-email': {
          required: true
        }
      }
    });
    newUserForm.on('submit', function (e) {
      var isValid = newUserForm.valid();
      e.preventDefault();

      if (isValid) {
        newUserSidebar.modal('hide');
      }
    });
  } // To initialize tooltip with body container


  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body'
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/pages/app-user-list.js"], null)
//# sourceMappingURL=/app-user-list.72e2e041.js.map