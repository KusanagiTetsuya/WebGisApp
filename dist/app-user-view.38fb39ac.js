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
})({"app-assets/js/scripts/pages/app-user-view.js":[function(require,module,exports) {
/*=========================================================================================
    File Name: app-user-view.js
    Description: User View page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
  'use strict';

  var dtInvoiceTable = $('.invoice-list-table'),
      assetPath = '../../../app-assets/',
      invoicePreview = 'app-invoice-preview.html',
      invoiceAdd = 'app-invoice-add.html',
      invoiceEdit = 'app-invoice-edit.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    invoicePreview = assetPath + 'app/invoice/preview';
    invoiceAdd = assetPath + 'app/invoice/add';
    invoiceEdit = assetPath + 'app/invoice/edit';
  } // Plan Expiry Year


  $('.nextYear').text(new Date().getFullYear() + 1); // User View datatable
  // datatable

  if (dtInvoiceTable.length) {
    var dtInvoice = dtInvoiceTable.DataTable({
      ajax: assetPath + 'data/invoice-list.json',
      // JSON file to add data
      autoWidth: false,
      columns: [// columns according to JSON
      {
        data: 'responsive_id'
      }, {
        data: 'invoice_id'
      }, {
        data: 'invoice_status'
      }, {
        data: 'issued_date'
      }, {
        data: 'client_name'
      }, {
        data: 'total'
      }, {
        data: 'balance'
      }, {
        data: 'invoice_status'
      }, {
        data: ''
      }],
      columnDefs: [{
        // For Responsive
        className: 'control',
        responsivePriority: 2,
        targets: 0
      }, {
        // Invoice ID
        targets: 1,
        width: '46px',
        render: function render(data, type, full, meta) {
          var $invoiceId = full['invoice_id']; // Creates full output for row

          var $rowOutput = '<a class="font-weight-bold" href="' + invoicePreview + '"> #' + $invoiceId + '</a>';
          return $rowOutput;
        }
      }, {
        // Invoice status
        targets: 2,
        width: '42px',
        render: function render(data, type, full, meta) {
          var $invoiceStatus = full['invoice_status'],
              $dueDate = full['due_date'],
              $balance = full['balance'],
              roleObj = {
            Sent: {
              class: 'bg-light-secondary',
              icon: 'send'
            },
            Paid: {
              class: 'bg-light-success',
              icon: 'check-circle'
            },
            Draft: {
              class: 'bg-light-primary',
              icon: 'save'
            },
            Downloaded: {
              class: 'bg-light-info',
              icon: 'arrow-down-circle'
            },
            'Past Due': {
              class: 'bg-light-danger',
              icon: 'info'
            },
            'Partial Payment': {
              class: 'bg-light-warning',
              icon: 'pie-chart'
            }
          };
          return "<span data-toggle='tooltip' data-html='true' title='<span>" + $invoiceStatus + '<br> <span class="font-weight-bold">Balance:</span> ' + $balance + '<br> <span class="font-weight-bold">Due Date:</span> ' + $dueDate + "</span>'>" + '<div class="avatar avatar-status ' + roleObj[$invoiceStatus].class + '">' + '<span class="avatar-content">' + feather.icons[roleObj[$invoiceStatus].icon].toSvg({
            class: 'avatar-icon'
          }) + '</span>' + '</div>' + '</span>';
        }
      }, {
        // Client name and Service
        targets: 3,
        responsivePriority: 4,
        width: '270px',
        render: function render(data, type, full, meta) {
          var $name = full['client_name'],
              $email = full['email'],
              $image = full['avatar'],
              stateNum = Math.floor(Math.random() * 6),
              states = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'],
              $state = states[stateNum],
              $name = full['client_name'],
              $initials = $name.match(/\b\w/g) || [];
          $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();

          if ($image) {
            // For Avatar image
            var $output = '<img src="' + assetPath + 'images/avatars/' + $image + '" alt="Avatar" width="32" height="32">';
          } else {
            // For Avatar badge
            $output = '<div class="avatar-content">' + $initials + '</div>';
          } // Creates full output for row


          var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : ' ';
          var $rowOutput = '<div class="d-flex justify-content-left align-items-center">' + '<div class="avatar-wrapper">' + '<div class="avatar' + colorClass + 'mr-50">' + $output + '</div>' + '</div>' + '<div class="d-flex flex-column">' + '<span class="user-name font-weight-bold text-truncate">' + $name + '</span>' + '<small class="text-truncate text-muted">' + $email + '</small>' + '</div>' + '</div>';
          return $rowOutput;
        }
      }, {
        // Total Invoice Amount
        targets: 4,
        width: '73px',
        render: function render(data, type, full, meta) {
          var $total = full['total'];
          return '<span class="d-none">' + $total + '</span>$' + $total;
        }
      }, {
        // Due Date
        targets: 5,
        width: '130px',
        render: function render(data, type, full, meta) {
          var $dueDate = new Date(full['due_date']); // Creates full output for row

          var $rowOutput = '<span class="d-none">' + moment($dueDate).format('YYYYMMDD') + '</span>' + moment($dueDate).format('DD MMM YYYY');
          $dueDate;
          return $rowOutput;
        }
      }, {
        // Client Balance/Status
        targets: 6,
        width: '98px',
        render: function render(data, type, full, meta) {
          var $balance = full['balance'];

          if ($balance === 0) {
            var $badge_class = 'badge-light-success';
            return '<span class="badge badge-pill ' + $badge_class + '" text-capitalized> Paid </span>';
          } else {
            return '<span class="d-none">' + $balance + '</span>' + $balance;
          }
        }
      }, {
        targets: 7,
        visible: false
      }, {
        // Actions
        targets: -1,
        title: 'Actions',
        width: '80px',
        orderable: false,
        render: function render(data, type, full, meta) {
          return '<div class="d-flex align-items-center col-actions">' + '<a class="mr-1" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="Send Mail">' + feather.icons['send'].toSvg({
            class: 'font-medium-1'
          }) + '</a>' + '<a class="mr-1" href="' + invoicePreview + '" data-toggle="tooltip" data-placement="top" title="Preview Invoice">' + feather.icons['eye'].toSvg({
            class: 'font-medium-1'
          }) + '</a>' + '<div class="dropdown">' + '<a class="btn btn-sm btn-icon px-0" data-toggle="dropdown">' + feather.icons['more-vertical'].toSvg({
            class: 'font-medium-1'
          }) + '</a>' + '<div class="dropdown-menu dropdown-menu-right">' + '<a href="javascript:void(0);" class="dropdown-item">' + feather.icons['download'].toSvg({
            class: 'font-small-4 mr-50'
          }) + 'Download</a>' + '<a href="' + invoiceEdit + '" class="dropdown-item">' + feather.icons['edit'].toSvg({
            class: 'font-small-4 mr-50'
          }) + 'Edit</a>' + '<a href="javascript:void(0);" class="dropdown-item">' + feather.icons['trash'].toSvg({
            class: 'font-small-4 mr-50'
          }) + 'Delete</a>' + '<a href="javascript:void(0);" class="dropdown-item">' + feather.icons['copy'].toSvg({
            class: 'font-small-4 mr-50'
          }) + 'Duplicate</a>' + '</div>' + '</div>' + '</div>';
        }
      }],
      order: [[1, 'desc']],
      dom: '<"row d-flex justify-content-between align-items-center m-1"' + '<"col-lg-6 d-flex align-items-center"l<"dt-action-buttons text-xl-right text-lg-left text-md-right text-left "B>>' + '<"col-lg-6 d-flex align-items-center justify-content-lg-end flex-wrap pr-lg-1 p-0"f<"invoice_status ml-2">>' + '>t' + '<"d-flex justify-content-between mx-2 row"' + '<"col-sm-12 col-md-6"i>' + '<"col-sm-12 col-md-6"p>' + '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search Invoice',
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
      // Buttons with Dropdown
      buttons: [{
        text: 'Add Record',
        className: 'btn btn-primary btn-add-record ml-2',
        action: function action(e, dt, button, config) {
          window.location = invoiceAdd;
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
              return 'Details of ' + data['client_name'];
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
      },
      initComplete: function initComplete() {
        // $('.dataTables_filter').find('.form-control-sm').removeClass('form-control-sm');
        // $('.dataTables_length .custom-select').removeClass('custom-select-sm').removeClass('form-control-sm');
        $(document).find('[data-toggle="tooltip"]').tooltip(); // Adding role filter once table initialized

        this.api().columns(7).every(function () {
          var column = this;
          var select = $('<select id="UserRole" class="form-control ml-50 text-capitalize"><option value=""> Select Status </option></select>').appendTo('.invoice_status').on('change', function () {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            column.search(val ? '^' + val + '$' : '', true, false).draw();
          });
          column.data().unique().sort().each(function (d, j) {
            select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
          });
        });
      },
      drawCallback: function drawCallback() {
        $(document).find('[data-toggle="tooltip"]').tooltip();
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/pages/app-user-view.js"], null)
//# sourceMappingURL=/app-user-view.38fb39ac.js.map