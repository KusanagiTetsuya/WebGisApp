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
})({"app-assets/js/scripts/extensions/ext-component-sweet-alerts.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*=========================================================================================
	File Name: ext-component-sweet-alerts.js
	Description: A beautiful replacement for javascript alerts
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
  'use strict';

  var basicAlert = $('#basic-alert'),
      withTitle = $('#with-title'),
      withFooter = $('#footer-alert'),
      htmlAlert = $('#html-alert');
  var positionTopStart = $('#position-top-start'),
      positionTopEnd = $('#position-top-end'),
      positionBottomStart = $('#position-bottom-start'),
      positionBottomEnd = $('#position-bottom-end');
  var bounceIn = $('#bounce-in-animation'),
      fadeIn = $('#fade-in-animation'),
      flipX = $('#flip-x-animation'),
      tada = $('#tada-animation'),
      shake = $('#shake-animation');
  var success = $('#type-success'),
      error = $('#type-error'),
      warning = $('#type-warning'),
      info = $('#type-info');
  var customImage = $('#custom-image'),
      autoClose = $('#auto-close'),
      outsideClick = $('#outside-click'),
      question = $('#prompt-function'),
      ajax = $('#ajax-request');
  var confirmText = $('#confirm-text'),
      confirmColor = $('#confirm-color');
  var assetPath = '../../../app-assets/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  } //--------------- Basic Examples ---------------
  // Basic


  if (basicAlert.length) {
    basicAlert.on('click', function () {
      Swal.fire({
        title: 'Any fool can use a computer',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // With Title


  if (withTitle.length) {
    withTitle.on('click', function () {
      Swal.fire({
        title: 'The Internet?,',
        text: 'That thing is still around?',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // With Footer


  if (withFooter.length) {
    withFooter.on('click', function () {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // HTML Alert


  if (htmlAlert.length) {
    htmlAlert.on('click', function () {
      Swal.fire({
        title: '<strong>HTML <u>example</u></strong>',
        icon: 'info',
        html: 'You can use <b>bold text</b>, ' + '<a href="https://pixinvent.com/" target="_blank">links</a> ' + 'and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: feather.icons['thumbs-up'].toSvg({
          class: 'font-medium-1 mr-50'
        }) + 'Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: feather.icons['thumbs-down'].toSvg({
          class: 'font-medium-1'
        }),
        cancelButtonAriaLabel: 'Thumbs down',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
      });
    });
  } //--------------- Position ---------------
  // Top Start


  if (positionTopStart.length) {
    positionTopStart.on('click', function () {
      Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // Top End


  if (positionTopEnd.length) {
    positionTopEnd.on('click', function () {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // Bottom Start


  if (positionBottomStart.length) {
    positionBottomStart.on('click', function () {
      Swal.fire({
        position: 'bottom-start',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // Bottom End


  if (positionBottomEnd.length) {
    positionBottomEnd.on('click', function () {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } //--------------- Animations ---------------
  // Bounce In


  if (bounceIn.length) {
    bounceIn.on('click', function () {
      Swal.fire({
        title: 'Bounce In Animation',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        buttonsStyling: false
      });
    });
  } // Fade In


  if (fadeIn.length) {
    fadeIn.on('click', function () {
      Swal.fire({
        title: 'Fade In Animation',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        showClass: {
          popup: 'animate__animated animate__fadeIn'
        },
        buttonsStyling: false
      });
    });
  } // FlipX


  if (flipX.length) {
    flipX.on('click', function () {
      Swal.fire({
        title: 'Flip In Animation',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        showClass: {
          popup: 'animate__animated animate__flipInX'
        },
        buttonsStyling: false
      });
    });
  } // Tada


  if (tada.length) {
    tada.on('click', function () {
      Swal.fire({
        title: 'Tada Animation',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        showClass: {
          popup: 'animate__animated animate__tada'
        },
        buttonsStyling: false
      });
    });
  } // Shake


  if (shake.length) {
    shake.on('click', function () {
      Swal.fire({
        title: 'Shake Animation',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        showClass: {
          popup: 'animate__animated animate__shakeX'
        },
        buttonsStyling: false
      });
    });
  } //--------------- Types ---------------
  // Success


  if (success.length) {
    success.on('click', function () {
      Swal.fire({
        title: 'Good job!',
        text: 'You clicked the button!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // Error


  if (error.length) {
    error.on('click', function () {
      Swal.fire({
        title: 'Error!',
        text: ' You clicked the button!',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // Warning


  if (warning.length) {
    warning.on('click', function () {
      Swal.fire({
        title: 'Warning!',
        text: ' You clicked the button!',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // Info


  if (info.length) {
    info.on('click', function () {
      Swal.fire({
        title: 'Info!',
        text: 'You clicked the button!',
        icon: 'info',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } //--------------- Options ---------------
  // Custom Image


  if (customImage.length) {
    customImage.on('click', function () {
      Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: assetPath + 'images/slider/04.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // Auto Close


  if (autoClose.length) {
    autoClose.on('click', function () {
      var timerInterval;
      Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: function didOpen() {
          Swal.showLoading();
          timerInterval = setInterval(function () {
            var content = Swal.getHtmlContainer();

            if (content) {
              var b = content.querySelector('b');

              if (b) {
                b.textContent = Swal.getTimerLeft();
              }
            }
          }, 100);
        },
        willClose: function willClose() {
          clearInterval(timerInterval);
        }
      }).then(function (result) {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer');
        }
      });
    });
  } // Click Outside


  if (outsideClick.length) {
    outsideClick.on('click', function () {
      Swal.fire({
        title: 'Click outside to close!',
        text: 'This is a cool message!',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  } // Question


  if (question.length) {
    question.on('click', function () {
      /* global Swal */
      var steps = ['1', '2', '3'];
      var swalQueueStep = Swal.mixin({
        confirmButtonText: 'Forward',
        cancelButtonText: 'Back',
        progressSteps: steps,
        input: 'text',
        inputAttributes: {
          required: true
        },
        validationMessage: 'This field is required'
      });

      function backAndForth() {
        return _backAndForth.apply(this, arguments);
      }

      function _backAndForth() {
        _backAndForth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var values, currentStep, result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  values = [];
                  currentStep = 0;

                case 2:
                  if (!(currentStep < steps.length)) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 5;
                  return new swalQueueStep({
                    title: 'Question ' + steps[currentStep],
                    showCancelButton: currentStep > 0,
                    currentProgressStep: currentStep
                  });

                case 5:
                  result = _context.sent;

                  if (result.value) {
                    values[currentStep] = result.value;
                    currentStep++;
                  } else if (result.dismiss === 'cancel') {
                    currentStep--;
                  }

                case 7:
                  _context.next = 2;
                  break;

                case 9:
                  Swal.fire(JSON.stringify(values));

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return _backAndForth.apply(this, arguments);
      }

      backAndForth();
    });
  } // Ajax


  if (ajax.length) {
    ajax.on('click', function () {
      Swal.fire({
        title: 'Search for a GitHub user',
        input: 'text',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false,
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: function preConfirm(login) {
          return fetch("//api.github.com/users/".concat(login)).then(function (response) {
            if (!response.ok) {
              throw new Error(response.statusText);
            }

            return response.json();
          }).catch(function (error) {
            Swal.showValidationMessage("Request failed: ".concat(error));
          });
        }
      }).then(function (result) {
        if (result.isConfirmed) {
          Swal.fire({
            title: '' + result.value.login + "'s avatar",
            imageUrl: result.value.avatar_url,
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          });
        }
      });
    });
  } //--------------- Confirm Options ---------------
  // Confirm Text


  if (confirmText.length) {
    confirmText.on('click', function () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        }
      });
    });
  } // Confirm Color


  if (confirmColor.length) {
    confirmColor.on('click', function () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success'
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/extensions/ext-component-sweet-alerts.js"], null)
//# sourceMappingURL=/ext-component-sweet-alerts.b63c3d66.js.map