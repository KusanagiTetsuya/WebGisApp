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
})({"app-assets/js/scripts/pages/dashboard-ecommerce.js":[function(require,module,exports) {
/*=========================================================================================
    File Name: dashboard-ecommerce.js
    Description: dashboard ecommerce page content with Apexchart Examples
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(window).on('load', function () {
  'use strict';

  var $barColor = '#f3f3f3';
  var $trackBgColor = '#EBEBEB';
  var $textMutedColor = '#b9b9c3';
  var $budgetStrokeColor2 = '#dcdae3';
  var $goalStrokeColor2 = '#51e5a8';
  var $strokeColor = '#ebe9f1';
  var $textHeadingColor = '#5e5873';
  var $earningsStrokeColor2 = '#28c76f66';
  var $earningsStrokeColor3 = '#28c76f33';
  var $statisticsOrderChart = document.querySelector('#statistics-order-chart');
  var $statisticsProfitChart = document.querySelector('#statistics-profit-chart');
  var $earningsChart = document.querySelector('#earnings-chart');
  var $revenueReportChart = document.querySelector('#revenue-report-chart');
  var $budgetChart = document.querySelector('#budget-chart');
  var $browserStateChartPrimary = document.querySelector('#browser-state-chart-primary');
  var $browserStateChartWarning = document.querySelector('#browser-state-chart-warning');
  var $browserStateChartSecondary = document.querySelector('#browser-state-chart-secondary');
  var $browserStateChartInfo = document.querySelector('#browser-state-chart-info');
  var $browserStateChartDanger = document.querySelector('#browser-state-chart-danger');
  var $goalOverviewChart = document.querySelector('#goal-overview-radial-bar-chart');
  var statisticsOrderChartOptions;
  var statisticsProfitChartOptions;
  var earningsChartOptions;
  var revenueReportChartOptions;
  var budgetChartOptions;
  var browserStatePrimaryChartOptions;
  var browserStateWarningChartOptions;
  var browserStateSecondaryChartOptions;
  var browserStateInfoChartOptions;
  var browserStateDangerChartOptions;
  var goalOverviewChartOptions;
  var statisticsOrderChart;
  var statisticsProfitChart;
  var earningsChart;
  var revenueReportChart;
  var budgetChart;
  var browserStatePrimaryChart;
  var browserStateDangerChart;
  var browserStateInfoChart;
  var browserStateSecondaryChart;
  var browserStateWarningChart;
  var goalOverviewChart;
  var isRtl = $('html').attr('data-textdirection') === 'rtl'; // On load Toast

  setTimeout(function () {
    toastr['success']('You have successfully logged in to Vuexy. Now you can start to explore!', '👋 Welcome John Doe!', {
      closeButton: true,
      tapToDismiss: false,
      rtl: isRtl
    });
  }, 2000); //------------ Statistics Bar Chart ------------
  //----------------------------------------------

  statisticsOrderChartOptions = {
    chart: {
      height: 70,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: -15,
        bottom: -15
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        startingShape: 'rounded',
        colors: {
          backgroundBarColors: [$barColor, $barColor, $barColor, $barColor, $barColor],
          backgroundBarRadius: 5
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [window.colors.solid.warning],
    series: [{
      name: '2020',
      data: [45, 85, 65, 45, 65]
    }],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };
  statisticsOrderChart = new ApexCharts($statisticsOrderChart, statisticsOrderChartOptions);
  statisticsOrderChart.render(); //------------ Statistics Line Chart ------------
  //-----------------------------------------------

  statisticsProfitChartOptions = {
    chart: {
      height: 70,
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    grid: {
      borderColor: $trackBgColor,
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: -30,
        bottom: -10
      }
    },
    stroke: {
      width: 3
    },
    colors: [window.colors.solid.info],
    series: [{
      data: [0, 20, 5, 30, 15, 45]
    }],
    markers: {
      size: 2,
      colors: window.colors.solid.info,
      strokeColors: window.colors.solid.info,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [{
        seriesIndex: 0,
        dataPointIndex: 5,
        fillColor: '#ffffff',
        strokeColor: window.colors.solid.info,
        size: 5
      }],
      shape: 'circle',
      radius: 2,
      hover: {
        size: 3
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '0px'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };
  statisticsProfitChart = new ApexCharts($statisticsProfitChart, statisticsProfitChartOptions);
  statisticsProfitChart.render(); //--------------- Earnings Chart ---------------
  //----------------------------------------------

  earningsChartOptions = {
    chart: {
      type: 'donut',
      height: 120,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [53, 16, 31],
    legend: {
      show: false
    },
    comparedResult: [2, -3, 8],
    labels: ['App', 'Service', 'Product'],
    stroke: {
      width: 0
    },
    colors: [$earningsStrokeColor2, $earningsStrokeColor3, window.colors.solid.success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter: function formatter(val) {
                return parseInt(val) + '%';
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: 'App',
              formatter: function formatter(w) {
                return '53%';
              }
            }
          }
        }
      }
    },
    responsive: [{
      breakpoint: 1325,
      options: {
        chart: {
          height: 100
        }
      }
    }, {
      breakpoint: 1200,
      options: {
        chart: {
          height: 120
        }
      }
    }, {
      breakpoint: 1045,
      options: {
        chart: {
          height: 100
        }
      }
    }, {
      breakpoint: 992,
      options: {
        chart: {
          height: 120
        }
      }
    }]
  };
  earningsChart = new ApexCharts($earningsChart, earningsChartOptions);
  earningsChart.render(); //------------ Revenue Report Chart ------------
  //----------------------------------------------

  revenueReportChartOptions = {
    chart: {
      height: 230,
      stacked: true,
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '17%',
        endingShape: 'rounded'
      },
      distributed: true
    },
    colors: [window.colors.solid.primary, window.colors.solid.warning],
    series: [{
      name: 'Earning',
      data: [95, 177, 284, 256, 105, 63, 168, 218, 72]
    }, {
      name: 'Expense',
      data: [-145, -80, -60, -180, -100, -60, -85, -75, -100]
    }],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    grid: {
      padding: {
        top: -20,
        bottom: -10
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: $textMutedColor,
          fontSize: '0.86rem'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: $textMutedColor,
          fontSize: '0.86rem'
        }
      }
    }
  };
  revenueReportChart = new ApexCharts($revenueReportChart, revenueReportChartOptions);
  revenueReportChart.render(); //---------------- Budget Chart ----------------
  //----------------------------------------------

  budgetChartOptions = {
    chart: {
      height: 80,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      type: 'line',
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      dashArray: [0, 5],
      width: [2]
    },
    colors: [window.colors.solid.primary, $budgetStrokeColor2],
    series: [{
      data: [61, 48, 69, 52, 60, 40, 79, 60, 59, 43, 62]
    }, {
      data: [20, 10, 30, 15, 23, 0, 25, 15, 20, 5, 27]
    }],
    tooltip: {
      enabled: false
    }
  };
  budgetChart = new ApexCharts($budgetChart, budgetChartOptions);
  budgetChart.render(); //------------ Browser State Charts ------------
  //----------------------------------------------
  // State Primary Chart

  browserStatePrimaryChartOptions = {
    chart: {
      height: 30,
      width: 30,
      type: 'radialBar'
    },
    grid: {
      show: false,
      padding: {
        left: -15,
        right: -15,
        top: -12,
        bottom: -15
      }
    },
    colors: [window.colors.solid.primary],
    series: [54.4],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '22%'
        },
        track: {
          background: $trackBgColor
        },
        dataLabels: {
          showOn: 'always',
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    }
  };
  browserStatePrimaryChart = new ApexCharts($browserStateChartPrimary, browserStatePrimaryChartOptions);
  browserStatePrimaryChart.render(); // State Warning Chart

  browserStateWarningChartOptions = {
    chart: {
      height: 30,
      width: 30,
      type: 'radialBar'
    },
    grid: {
      show: false,
      padding: {
        left: -15,
        right: -15,
        top: -12,
        bottom: -15
      }
    },
    colors: [window.colors.solid.warning],
    series: [6.1],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '22%'
        },
        track: {
          background: $trackBgColor
        },
        dataLabels: {
          showOn: 'always',
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    }
  };
  browserStateWarningChart = new ApexCharts($browserStateChartWarning, browserStateWarningChartOptions);
  browserStateWarningChart.render(); // State Secondary Chart 1

  browserStateSecondaryChartOptions = {
    chart: {
      height: 30,
      width: 30,
      type: 'radialBar'
    },
    grid: {
      show: false,
      padding: {
        left: -15,
        right: -15,
        top: -12,
        bottom: -15
      }
    },
    colors: [window.colors.solid.secondary],
    series: [14.6],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '22%'
        },
        track: {
          background: $trackBgColor
        },
        dataLabels: {
          showOn: 'always',
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    }
  };
  browserStateSecondaryChart = new ApexCharts($browserStateChartSecondary, browserStateSecondaryChartOptions);
  browserStateSecondaryChart.render(); // State Info Chart

  browserStateInfoChartOptions = {
    chart: {
      height: 30,
      width: 30,
      type: 'radialBar'
    },
    grid: {
      show: false,
      padding: {
        left: -15,
        right: -15,
        top: -12,
        bottom: -15
      }
    },
    colors: [window.colors.solid.info],
    series: [4.2],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '22%'
        },
        track: {
          background: $trackBgColor
        },
        dataLabels: {
          showOn: 'always',
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    }
  };
  browserStateInfoChart = new ApexCharts($browserStateChartInfo, browserStateInfoChartOptions);
  browserStateInfoChart.render(); // State Danger Chart

  browserStateDangerChartOptions = {
    chart: {
      height: 30,
      width: 30,
      type: 'radialBar'
    },
    grid: {
      show: false,
      padding: {
        left: -15,
        right: -15,
        top: -12,
        bottom: -15
      }
    },
    colors: [window.colors.solid.danger],
    series: [8.4],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '22%'
        },
        track: {
          background: $trackBgColor
        },
        dataLabels: {
          showOn: 'always',
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    stroke: {
      lineCap: 'round'
    }
  };
  browserStateDangerChart = new ApexCharts($browserStateChartDanger, browserStateDangerChartOptions);
  browserStateDangerChart.render(); //------------ Goal Overview Chart ------------
  //---------------------------------------------

  goalOverviewChartOptions = {
    chart: {
      height: 245,
      type: 'radialBar',
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1
      }
    },
    colors: [$goalStrokeColor2],
    plotOptions: {
      radialBar: {
        offsetY: -10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '77%'
        },
        track: {
          background: $strokeColor,
          strokeWidth: '50%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            color: $textHeadingColor,
            fontSize: '2.86rem',
            fontWeight: '600'
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [window.colors.solid.success],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    series: [83],
    stroke: {
      lineCap: 'round'
    },
    grid: {
      padding: {
        bottom: 30
      }
    }
  };
  goalOverviewChart = new ApexCharts($goalOverviewChart, goalOverviewChartOptions);
  goalOverviewChart.render();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61317" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/js/scripts/pages/dashboard-ecommerce.js"], null)
//# sourceMappingURL=/dashboard-ecommerce.58f02fce.js.map