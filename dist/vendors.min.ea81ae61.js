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
})({"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/jquery/dist/jquery.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
var define;
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{"process":"node_modules/process/browser.js"}],"node_modules/popper.js/dist/esm/popper.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];

  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }

  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;
/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/

var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */


function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  } // NOTE: 1 DOM access here


  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}
/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */


function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */


function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;

    case '#document':
      return element.body;
  } // Firefox want us to check `-x` and `-y` variations as well


  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}
/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */


function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */

function isIE(version) {
  if (version === 11) {
    return isIE11;
  }

  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */


function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

  var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  } // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...


  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }

  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}
/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */


function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}
/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */


function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  } // Here we make sure to give as "start" the element that comes first in the DOM


  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1; // Get common ancestor container

  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  } // one of the nodes is inside shadowDOM, find which one


  var element1root = getRoot(element1);

  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */


function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}
/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */


function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */


function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */


function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */


function getBoundingClientRect(element) {
  var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11

  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }; // subtract scrollbar size from sizes

  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons

  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.

  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };
  return getClientRect(offset);
}
/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */


function isFixed(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }

  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }

  var parentNode = getParentNode(element);

  if (!parentNode) {
    return false;
  }

  return isFixed(parentNode);
}
/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */


function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }

  var el = element.parentElement;

  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }

  return el || document.documentElement;
}
/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */


function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

  var boundaries = {
    top: 0,
    left: 0
  };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference)); // Handle viewport case

  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;

    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));

      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  } // Add paddings


  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return width * height;
}
/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split('-')[1];
  return computedPlacement + (variation ? '-' + variation : '');
}
/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */


function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */


function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */


function getOppositePlacement(placement) {
  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */


function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0]; // Get popper node sizes

  var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  }; // depending by the popper placement we have to compute its offsets slightly differently

  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  } // use `filter` to obtain the same behavior of `find`


  return arr.filter(check)[0];
}
/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  } // use `find` + `indexOf` if `findIndex` isn't supported


  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */


function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }

    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */


function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  }; // compute reference element offsets

  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed; // compute the popper offsets

  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

  data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback

  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */


function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */


function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;

    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }

  return null;
}
/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */


function destroy() {
  this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners(); // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it

  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }

  return this;
}
/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */


function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, {
    passive: true
  });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }

  scrollParents.push(target);
}
/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, {
    passive: true
  }); // Scroll event listener on scroll parents

  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */


function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  }); // Reset state

  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */


function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */


function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = ''; // add unit if the value is numeric and is one of the following

    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }

    element.style[prop] = styles[prop] + unit;
  });
}
/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];

    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */


function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element

  setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}
/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */


function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations

  setStyles(popper, {
    position: options.positionFixed ? 'fixed' : 'absolute'
  });
  return options;
}
/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */


function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;

  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }

  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

  var styles = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed

  var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.

  var left = void 0,
      top = void 0;

  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }

  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }

  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  } // Attributes


  var attributes = {
    'x-placement': data.placement
  }; // Update `data` attributes, styles and arrowStyles

  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */


function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';

    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }

  return isRequired;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function arrow(data, options) {
  var _data$offsets$arrow; // arrow depends on keepTogether in order to work


  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isVertical = ['left', 'right'].indexOf(placement) !== -1;
  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len]; //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //
  // top/left side

  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  } // bottom/right side


  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available

  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
  return data;
}
/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */


function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }

  return variation;
}
/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */


var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

var validPlacements = placements.slice(3);
/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */

function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';
  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;

    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;

    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;

    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1; // flips variation if reference element overflows boundaries

    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom); // flips variation if popper content overflows boundaries

    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future

      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }

  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}
/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */


function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2]; // If it's not a number it's an operator, I guess

  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;

    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;

      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;

    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}
/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */


function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one

  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  }); // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space

  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  } // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.


  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []) // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  }); // Loop trough the offsets arrays and execute the operations

  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */


function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var basePlacement = placement.split('-')[0];
  var offsets = void 0;

  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken

  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  } // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself


  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification

  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed

  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];

      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }

      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];

      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }

      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;
    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */


var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: offset,

    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: preventOverflow,

    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],

    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: arrow,

    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: flip,

    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',

    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',

    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,

    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,

    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,

    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: computeStyle,

    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,

    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',

    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: applyStyle,

    /** @prop {Function} */
    onLoad: applyStyleOnLoad,

    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};
/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */

var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};
/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */
// Utils
// Methods

var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    }; // make update() debounced, so that it only runs at most once-per-tick


    this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

    this.options = _extends({}, Popper.Defaults, options); // init state

    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    }; // get reference and popper elements (allow jQuery wrappers)

    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    }); // Refactoring modifiers' list (Object => Array)

    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    }) // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    }); // fire the first update to position the popper in the right place

    this.update();
    var eventsEnabled = this.options.eventsEnabled;

    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  } // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();
/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;
var _default = Popper;
exports.default = _default;
},{}],"app-assets/vendors/js/vendors.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*! jQuery v3.6.0 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function (e, t) {
  "use strict";

  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e);
  } : t(e);
}("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";

  var n = [],
      i = Object.getPrototypeOf,
      o = n.slice,
      r = n.flat ? function (e) {
    return n.flat.call(e);
  } : function (e) {
    return n.concat.apply([], e);
  },
      a = n.push,
      s = n.indexOf,
      l = {},
      c = l.toString,
      u = l.hasOwnProperty,
      p = u.toString,
      f = p.call(Object),
      h = {},
      d = function d(e) {
    return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item;
  },
      g = function g(e) {
    return null != e && e === e.window;
  },
      m = e.document,
      y = {
    type: !0,
    src: !0,
    nonce: !0,
    noModule: !0
  };

  function v(e, t, n) {
    var i,
        o,
        r = (n = n || m).createElement("script");
    if (r.text = e, t) for (i in y) {
      (o = t[i] || t.getAttribute && t.getAttribute(i)) && r.setAttribute(i, o);
    }
    n.head.appendChild(r).parentNode.removeChild(r);
  }

  function b(e) {
    return null == e ? e + "" : "object" == _typeof(e) || "function" == typeof e ? l[c.call(e)] || "object" : _typeof(e);
  }

  var x = "3.6.0",
      w = function w(e, t) {
    return new w.fn.init(e, t);
  };

  function _(e) {
    var t = !!e && "length" in e && e.length,
        n = b(e);
    return !d(e) && !g(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
  }

  w.fn = w.prototype = {
    jquery: x,
    constructor: w,
    length: 0,
    toArray: function toArray() {
      return o.call(this);
    },
    get: function get(e) {
      return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function pushStack(e) {
      var t = w.merge(this.constructor(), e);
      return t.prevObject = this, t;
    },
    each: function each(e) {
      return w.each(this, e);
    },
    map: function map(e) {
      return this.pushStack(w.map(this, function (t, n) {
        return e.call(t, n, t);
      }));
    },
    slice: function slice() {
      return this.pushStack(o.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    even: function even() {
      return this.pushStack(w.grep(this, function (e, t) {
        return (t + 1) % 2;
      }));
    },
    odd: function odd() {
      return this.pushStack(w.grep(this, function (e, t) {
        return t % 2;
      }));
    },
    eq: function eq(e) {
      var t = this.length,
          n = +e + (e < 0 ? t : 0);
      return this.pushStack(0 <= n && n < t ? [this[n]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    push: a,
    sort: n.sort,
    splice: n.splice
  }, w.extend = w.fn.extend = function () {
    var e,
        t,
        n,
        i,
        o,
        r,
        a = arguments[0] || {},
        s = 1,
        l = arguments.length,
        c = !1;

    for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == _typeof(a) || d(a) || (a = {}), s === l && (a = this, s--); s < l; s++) {
      if (null != (e = arguments[s])) for (t in e) {
        i = e[t], "__proto__" !== t && a !== i && (c && i && (w.isPlainObject(i) || (o = Array.isArray(i))) ? (n = a[t], r = o && !Array.isArray(n) ? [] : o || w.isPlainObject(n) ? n : {}, o = !1, a[t] = w.extend(c, r, i)) : void 0 !== i && (a[t] = i));
      }
    }

    return a;
  }, w.extend({
    expando: "jQuery" + (x + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function error(e) {
      throw new Error(e);
    },
    noop: function noop() {},
    isPlainObject: function isPlainObject(e) {
      var t, n;
      return !(!e || "[object Object]" !== c.call(e) || (t = i(e)) && ("function" != typeof (n = u.call(t, "constructor") && t.constructor) || p.call(n) !== f));
    },
    isEmptyObject: function isEmptyObject(e) {
      var t;

      for (t in e) {
        return !1;
      }

      return !0;
    },
    globalEval: function globalEval(e, t, n) {
      v(e, {
        nonce: t && t.nonce
      }, n);
    },
    each: function each(e, t) {
      var n,
          i = 0;
      if (_(e)) for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++) {
        ;
      } else for (i in e) {
        if (!1 === t.call(e[i], i, e[i])) break;
      }
      return e;
    },
    makeArray: function makeArray(e, t) {
      var n = t || [];
      return null != e && (_(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)), n;
    },
    inArray: function inArray(e, t, n) {
      return null == t ? -1 : s.call(t, e, n);
    },
    merge: function merge(e, t) {
      for (var n = +t.length, i = 0, o = e.length; i < n; i++) {
        e[o++] = t[i];
      }

      return e.length = o, e;
    },
    grep: function grep(e, t, n) {
      for (var i = [], o = 0, r = e.length, a = !n; o < r; o++) {
        !t(e[o], o) !== a && i.push(e[o]);
      }

      return i;
    },
    map: function map(e, t, n) {
      var i,
          o,
          a = 0,
          s = [];
      if (_(e)) for (i = e.length; a < i; a++) {
        null != (o = t(e[a], a, n)) && s.push(o);
      } else for (a in e) {
        null != (o = t(e[a], a, n)) && s.push(o);
      }
      return r(s);
    },
    guid: 1,
    support: h
  }), "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    l["[object " + t + "]"] = t.toLowerCase();
  });

  var k = function (e) {
    var t,
        n,
        i,
        o,
        r,
        a,
        s,
        l,
        c,
        u,
        p,
        f,
        h,
        d,
        g,
        m,
        y,
        v,
        b,
        x = "sizzle" + 1 * new Date(),
        w = e.document,
        _ = 0,
        k = 0,
        E = le(),
        T = le(),
        S = le(),
        C = le(),
        A = function A(e, t) {
      return e === t && (p = !0), 0;
    },
        L = {}.hasOwnProperty,
        O = [],
        N = O.pop,
        M = O.push,
        j = O.push,
        D = O.slice,
        I = function I(e, t) {
      for (var n = 0, i = e.length; n < i; n++) {
        if (e[n] === t) return n;
      }

      return -1;
    },
        P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        R = "[\\x20\\t\\r\\n\\f]",
        H = "(?:\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        q = "\\[" + R + "*(" + H + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + H + "))|)" + R + "*\\]",
        F = ":(" + H + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|.*)\\)|)",
        W = new RegExp(R + "+", "g"),
        z = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
        U = new RegExp("^" + R + "*," + R + "*"),
        B = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
        X = new RegExp(R + "|>"),
        Y = new RegExp(F),
        V = new RegExp("^" + H + "$"),
        $ = {
      ID: new RegExp("^#(" + H + ")"),
      CLASS: new RegExp("^\\.(" + H + ")"),
      TAG: new RegExp("^(" + H + "|[*])"),
      ATTR: new RegExp("^" + q),
      PSEUDO: new RegExp("^" + F),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + P + ")$", "i"),
      needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
    },
        Q = /HTML$/i,
        K = /^(?:input|select|textarea|button)$/i,
        G = /^h\d$/i,
        J = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ee = /[+~]/,
        te = new RegExp("\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\([^\\r\\n\\f])", "g"),
        ne = function ne(e, t) {
      var n = "0x" + e.slice(1) - 65536;
      return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
    },
        ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        oe = function oe(e, t) {
      return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
    },
        re = function re() {
      f();
    },
        ae = xe(function (e) {
      return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
    }, {
      dir: "parentNode",
      next: "legend"
    });

    try {
      j.apply(O = D.call(w.childNodes), w.childNodes), O[w.childNodes.length].nodeType;
    } catch (t) {
      j = {
        apply: O.length ? function (e, t) {
          M.apply(e, D.call(t));
        } : function (e, t) {
          for (var n = e.length, i = 0; e[n++] = t[i++];) {
            ;
          }

          e.length = n - 1;
        }
      };
    }

    function se(e, t, i, o) {
      var r,
          s,
          c,
          u,
          p,
          d,
          y,
          v = t && t.ownerDocument,
          w = t ? t.nodeType : 9;
      if (i = i || [], "string" != typeof e || !e || 1 !== w && 9 !== w && 11 !== w) return i;

      if (!o && (f(t), t = t || h, g)) {
        if (11 !== w && (p = Z.exec(e))) if (r = p[1]) {
          if (9 === w) {
            if (!(c = t.getElementById(r))) return i;
            if (c.id === r) return i.push(c), i;
          } else if (v && (c = v.getElementById(r)) && b(t, c) && c.id === r) return i.push(c), i;
        } else {
          if (p[2]) return j.apply(i, t.getElementsByTagName(e)), i;
          if ((r = p[3]) && n.getElementsByClassName && t.getElementsByClassName) return j.apply(i, t.getElementsByClassName(r)), i;
        }

        if (n.qsa && !C[e + " "] && (!m || !m.test(e)) && (1 !== w || "object" !== t.nodeName.toLowerCase())) {
          if (y = e, v = t, 1 === w && (X.test(e) || B.test(e))) {
            for ((v = ee.test(e) && ye(t.parentNode) || t) === t && n.scope || ((u = t.getAttribute("id")) ? u = u.replace(ie, oe) : t.setAttribute("id", u = x)), s = (d = a(e)).length; s--;) {
              d[s] = (u ? "#" + u : ":scope") + " " + be(d[s]);
            }

            y = d.join(",");
          }

          try {
            return j.apply(i, v.querySelectorAll(y)), i;
          } catch (t) {
            C(e, !0);
          } finally {
            u === x && t.removeAttribute("id");
          }
        }
      }

      return l(e.replace(z, "$1"), t, i, o);
    }

    function le() {
      var e = [];
      return function t(n, o) {
        return e.push(n + " ") > i.cacheLength && delete t[e.shift()], t[n + " "] = o;
      };
    }

    function ce(e) {
      return e[x] = !0, e;
    }

    function ue(e) {
      var t = h.createElement("fieldset");

      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }

    function pe(e, t) {
      for (var n = e.split("|"), o = n.length; o--;) {
        i.attrHandle[n[o]] = t;
      }
    }

    function fe(e, t) {
      var n = t && e,
          i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
      if (i) return i;
      if (n) for (; n = n.nextSibling;) {
        if (n === t) return -1;
      }
      return e ? 1 : -1;
    }

    function he(e) {
      return function (t) {
        return "input" === t.nodeName.toLowerCase() && t.type === e;
      };
    }

    function de(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e;
      };
    }

    function ge(e) {
      return function (t) {
        return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label" in t && t.disabled === e;
      };
    }

    function me(e) {
      return ce(function (t) {
        return t = +t, ce(function (n, i) {
          for (var o, r = e([], n.length, t), a = r.length; a--;) {
            n[o = r[a]] && (n[o] = !(i[o] = n[o]));
          }
        });
      });
    }

    function ye(e) {
      return e && void 0 !== e.getElementsByTagName && e;
    }

    for (t in n = se.support = {}, r = se.isXML = function (e) {
      var t = e && e.namespaceURI,
          n = e && (e.ownerDocument || e).documentElement;
      return !Q.test(t || n && n.nodeName || "HTML");
    }, f = se.setDocument = function (e) {
      var t,
          o,
          a = e ? e.ownerDocument || e : w;
      return a != h && 9 === a.nodeType && a.documentElement && (d = (h = a).documentElement, g = !r(h), w != h && (o = h.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", re, !1) : o.attachEvent && o.attachEvent("onunload", re)), n.scope = ue(function (e) {
        return d.appendChild(e).appendChild(h.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
      }), n.attributes = ue(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), n.getElementsByTagName = ue(function (e) {
        return e.appendChild(h.createComment("")), !e.getElementsByTagName("*").length;
      }), n.getElementsByClassName = J.test(h.getElementsByClassName), n.getById = ue(function (e) {
        return d.appendChild(e).id = x, !h.getElementsByName || !h.getElementsByName(x).length;
      }), n.getById ? (i.filter.ID = function (e) {
        var t = e.replace(te, ne);
        return function (e) {
          return e.getAttribute("id") === t;
        };
      }, i.find.ID = function (e, t) {
        if (void 0 !== t.getElementById && g) {
          var n = t.getElementById(e);
          return n ? [n] : [];
        }
      }) : (i.filter.ID = function (e) {
        var t = e.replace(te, ne);
        return function (e) {
          var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
          return n && n.value === t;
        };
      }, i.find.ID = function (e, t) {
        if (void 0 !== t.getElementById && g) {
          var n,
              i,
              o,
              r = t.getElementById(e);

          if (r) {
            if ((n = r.getAttributeNode("id")) && n.value === e) return [r];

            for (o = t.getElementsByName(e), i = 0; r = o[i++];) {
              if ((n = r.getAttributeNode("id")) && n.value === e) return [r];
            }
          }

          return [];
        }
      }), i.find.TAG = n.getElementsByTagName ? function (e, t) {
        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0;
      } : function (e, t) {
        var n,
            i = [],
            o = 0,
            r = t.getElementsByTagName(e);

        if ("*" === e) {
          for (; n = r[o++];) {
            1 === n.nodeType && i.push(n);
          }

          return i;
        }

        return r;
      }, i.find.CLASS = n.getElementsByClassName && function (e, t) {
        if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e);
      }, y = [], m = [], (n.qsa = J.test(h.querySelectorAll)) && (ue(function (e) {
        var t;
        d.appendChild(e).innerHTML = "<a id='" + x + "'></a><select id='" + x + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + R + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + x + "-]").length || m.push("~="), (t = h.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || m.push("\\[" + R + "*name" + R + "*=" + R + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + x + "+*").length || m.push(".#.+[+~]"), e.querySelectorAll("\\\f"), m.push("[\\r\\n\\f]");
      }), ue(function (e) {
        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
        var t = h.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + R + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), d.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:");
      })), (n.matchesSelector = J.test(v = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ue(function (e) {
        n.disconnectedMatch = v.call(e, "*"), v.call(e, "[s!='']:x"), y.push("!=", F);
      }), m = m.length && new RegExp(m.join("|")), y = y.length && new RegExp(y.join("|")), t = J.test(d.compareDocumentPosition), b = t || J.test(d.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            i = t && t.parentNode;
        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
      } : function (e, t) {
        if (t) for (; t = t.parentNode;) {
          if (t === e) return !0;
        }
        return !1;
      }, A = t ? function (e, t) {
        if (e === t) return p = !0, 0;
        var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return i || (1 & (i = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === i ? e == h || e.ownerDocument == w && b(w, e) ? -1 : t == h || t.ownerDocument == w && b(w, t) ? 1 : u ? I(u, e) - I(u, t) : 0 : 4 & i ? -1 : 1);
      } : function (e, t) {
        if (e === t) return p = !0, 0;
        var n,
            i = 0,
            o = e.parentNode,
            r = t.parentNode,
            a = [e],
            s = [t];
        if (!o || !r) return e == h ? -1 : t == h ? 1 : o ? -1 : r ? 1 : u ? I(u, e) - I(u, t) : 0;
        if (o === r) return fe(e, t);

        for (n = e; n = n.parentNode;) {
          a.unshift(n);
        }

        for (n = t; n = n.parentNode;) {
          s.unshift(n);
        }

        for (; a[i] === s[i];) {
          i++;
        }

        return i ? fe(a[i], s[i]) : a[i] == w ? -1 : s[i] == w ? 1 : 0;
      }), h;
    }, se.matches = function (e, t) {
      return se(e, null, null, t);
    }, se.matchesSelector = function (e, t) {
      if (f(e), n.matchesSelector && g && !C[t + " "] && (!y || !y.test(t)) && (!m || !m.test(t))) try {
        var i = v.call(e, t);
        if (i || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
      } catch (e) {
        C(t, !0);
      }
      return 0 < se(t, h, null, [e]).length;
    }, se.contains = function (e, t) {
      return (e.ownerDocument || e) != h && f(e), b(e, t);
    }, se.attr = function (e, t) {
      (e.ownerDocument || e) != h && f(e);
      var o = i.attrHandle[t.toLowerCase()],
          r = o && L.call(i.attrHandle, t.toLowerCase()) ? o(e, t, !g) : void 0;
      return void 0 !== r ? r : n.attributes || !g ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }, se.escape = function (e) {
      return (e + "").replace(ie, oe);
    }, se.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, se.uniqueSort = function (e) {
      var t,
          i = [],
          o = 0,
          r = 0;

      if (p = !n.detectDuplicates, u = !n.sortStable && e.slice(0), e.sort(A), p) {
        for (; t = e[r++];) {
          t === e[r] && (o = i.push(r));
        }

        for (; o--;) {
          e.splice(i[o], 1);
        }
      }

      return u = null, e;
    }, o = se.getText = function (e) {
      var t,
          n = "",
          i = 0,
          r = e.nodeType;

      if (r) {
        if (1 === r || 9 === r || 11 === r) {
          if ("string" == typeof e.textContent) return e.textContent;

          for (e = e.firstChild; e; e = e.nextSibling) {
            n += o(e);
          }
        } else if (3 === r || 4 === r) return e.nodeValue;
      } else for (; t = e[i++];) {
        n += o(t);
      }

      return n;
    }, (i = se.selectors = {
      cacheLength: 50,
      createPseudo: ce,
      match: $,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function ATTR(e) {
          return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        },
        CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e;
        },
        PSEUDO: function PSEUDO(e) {
          var t,
              n = !e[6] && e[2];
          return $.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && Y.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        }
      },
      filter: {
        TAG: function TAG(e) {
          var t = e.replace(te, ne).toLowerCase();
          return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        },
        CLASS: function CLASS(e) {
          var t = E[e + " "];
          return t || (t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && E(e, function (e) {
            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(e, t, n) {
          return function (i) {
            var o = se.attr(i, e);
            return null == o ? "!=" === t : !t || (o += "", "=" === t ? o === n : "!=" === t ? o !== n : "^=" === t ? n && 0 === o.indexOf(n) : "*=" === t ? n && -1 < o.indexOf(n) : "$=" === t ? n && o.slice(-n.length) === n : "~=" === t ? -1 < (" " + o.replace(W, " ") + " ").indexOf(n) : "|=" === t && (o === n || o.slice(0, n.length + 1) === n + "-"));
          };
        },
        CHILD: function CHILD(e, t, n, i, o) {
          var r = "nth" !== e.slice(0, 3),
              a = "last" !== e.slice(-4),
              s = "of-type" === t;
          return 1 === i && 0 === o ? function (e) {
            return !!e.parentNode;
          } : function (t, n, l) {
            var c,
                u,
                p,
                f,
                h,
                d,
                g = r !== a ? "nextSibling" : "previousSibling",
                m = t.parentNode,
                y = s && t.nodeName.toLowerCase(),
                v = !l && !s,
                b = !1;

            if (m) {
              if (r) {
                for (; g;) {
                  for (f = t; f = f[g];) {
                    if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
                  }

                  d = g = "only" === e && !d && "nextSibling";
                }

                return !0;
              }

              if (d = [a ? m.firstChild : m.lastChild], a && v) {
                for (b = (h = (c = (u = (p = (f = m)[x] || (f[x] = {}))[f.uniqueID] || (p[f.uniqueID] = {}))[e] || [])[0] === _ && c[1]) && c[2], f = h && m.childNodes[h]; f = ++h && f && f[g] || (b = h = 0) || d.pop();) {
                  if (1 === f.nodeType && ++b && f === t) {
                    u[e] = [_, h, b];
                    break;
                  }
                }
              } else if (v && (b = h = (c = (u = (p = (f = t)[x] || (f[x] = {}))[f.uniqueID] || (p[f.uniqueID] = {}))[e] || [])[0] === _ && c[1]), !1 === b) for (; (f = ++h && f && f[g] || (b = h = 0) || d.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++b || (v && ((u = (p = f[x] || (f[x] = {}))[f.uniqueID] || (p[f.uniqueID] = {}))[e] = [_, b]), f !== t));) {
                ;
              }

              return (b -= o) === i || b % i == 0 && 0 <= b / i;
            }
          };
        },
        PSEUDO: function PSEUDO(e, t) {
          var n,
              o = i.pseudos[e] || i.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
          return o[x] ? o(t) : 1 < o.length ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ce(function (e, n) {
            for (var i, r = o(e, t), a = r.length; a--;) {
              e[i = I(e, r[a])] = !(n[i] = r[a]);
            }
          }) : function (e) {
            return o(e, 0, n);
          }) : o;
        }
      },
      pseudos: {
        not: ce(function (e) {
          var t = [],
              n = [],
              i = s(e.replace(z, "$1"));
          return i[x] ? ce(function (e, t, n, o) {
            for (var r, a = i(e, null, o, []), s = e.length; s--;) {
              (r = a[s]) && (e[s] = !(t[s] = r));
            }
          }) : function (e, o, r) {
            return t[0] = e, i(t, null, r, n), t[0] = null, !n.pop();
          };
        }),
        has: ce(function (e) {
          return function (t) {
            return 0 < se(e, t).length;
          };
        }),
        contains: ce(function (e) {
          return e = e.replace(te, ne), function (t) {
            return -1 < (t.textContent || o(t)).indexOf(e);
          };
        }),
        lang: ce(function (e) {
          return V.test(e || "") || se.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(), function (t) {
            var n;

            do {
              if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
            } while ((t = t.parentNode) && 1 === t.nodeType);

            return !1;
          };
        }),
        target: function target(t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id;
        },
        root: function root(e) {
          return e === d;
        },
        focus: function focus(e) {
          return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        },
        enabled: ge(!1),
        disabled: ge(!0),
        checked: function checked(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected;
        },
        selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeType < 6) return !1;
          }

          return !0;
        },
        parent: function parent(e) {
          return !i.pseudos.empty(e);
        },
        header: function header(e) {
          return G.test(e.nodeName);
        },
        input: function input(e) {
          return K.test(e.nodeName);
        },
        button: function button(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t;
        },
        text: function text(e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
        },
        first: me(function () {
          return [0];
        }),
        last: me(function (e, t) {
          return [t - 1];
        }),
        eq: me(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: me(function (e, t) {
          for (var n = 0; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        odd: me(function (e, t) {
          for (var n = 1; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        lt: me(function (e, t, n) {
          for (var i = n < 0 ? n + t : t < n ? t : n; 0 <= --i;) {
            e.push(i);
          }

          return e;
        }),
        gt: me(function (e, t, n) {
          for (var i = n < 0 ? n + t : n; ++i < t;) {
            e.push(i);
          }

          return e;
        })
      }
    }).pseudos.nth = i.pseudos.eq, {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      i.pseudos[t] = he(t);
    }

    for (t in {
      submit: !0,
      reset: !0
    }) {
      i.pseudos[t] = de(t);
    }

    function ve() {}

    function be(e) {
      for (var t = 0, n = e.length, i = ""; t < n; t++) {
        i += e[t].value;
      }

      return i;
    }

    function xe(e, t, n) {
      var i = t.dir,
          o = t.next,
          r = o || i,
          a = n && "parentNode" === r,
          s = k++;
      return t.first ? function (t, n, o) {
        for (; t = t[i];) {
          if (1 === t.nodeType || a) return e(t, n, o);
        }

        return !1;
      } : function (t, n, l) {
        var c,
            u,
            p,
            f = [_, s];

        if (l) {
          for (; t = t[i];) {
            if ((1 === t.nodeType || a) && e(t, n, l)) return !0;
          }
        } else for (; t = t[i];) {
          if (1 === t.nodeType || a) if (u = (p = t[x] || (t[x] = {}))[t.uniqueID] || (p[t.uniqueID] = {}), o && o === t.nodeName.toLowerCase()) t = t[i] || t;else {
            if ((c = u[r]) && c[0] === _ && c[1] === s) return f[2] = c[2];
            if ((u[r] = f)[2] = e(t, n, l)) return !0;
          }
        }

        return !1;
      };
    }

    function we(e) {
      return 1 < e.length ? function (t, n, i) {
        for (var o = e.length; o--;) {
          if (!e[o](t, n, i)) return !1;
        }

        return !0;
      } : e[0];
    }

    function _e(e, t, n, i, o) {
      for (var r, a = [], s = 0, l = e.length, c = null != t; s < l; s++) {
        (r = e[s]) && (n && !n(r, i, o) || (a.push(r), c && t.push(s)));
      }

      return a;
    }

    function ke(e, t, n, i, o, r) {
      return i && !i[x] && (i = ke(i)), o && !o[x] && (o = ke(o, r)), ce(function (r, a, s, l) {
        var c,
            u,
            p,
            f = [],
            h = [],
            d = a.length,
            g = r || function (e, t, n) {
          for (var i = 0, o = t.length; i < o; i++) {
            se(e, t[i], n);
          }

          return n;
        }(t || "*", s.nodeType ? [s] : s, []),
            m = !e || !r && t ? g : _e(g, f, e, s, l),
            y = n ? o || (r ? e : d || i) ? [] : a : m;

        if (n && n(m, y, s, l), i) for (c = _e(y, h), i(c, [], s, l), u = c.length; u--;) {
          (p = c[u]) && (y[h[u]] = !(m[h[u]] = p));
        }

        if (r) {
          if (o || e) {
            if (o) {
              for (c = [], u = y.length; u--;) {
                (p = y[u]) && c.push(m[u] = p);
              }

              o(null, y = [], c, l);
            }

            for (u = y.length; u--;) {
              (p = y[u]) && -1 < (c = o ? I(r, p) : f[u]) && (r[c] = !(a[c] = p));
            }
          }
        } else y = _e(y === a ? y.splice(d, y.length) : y), o ? o(null, a, y, l) : j.apply(a, y);
      });
    }

    function Ee(e) {
      for (var t, n, o, r = e.length, a = i.relative[e[0].type], s = a || i.relative[" "], l = a ? 1 : 0, u = xe(function (e) {
        return e === t;
      }, s, !0), p = xe(function (e) {
        return -1 < I(t, e);
      }, s, !0), f = [function (e, n, i) {
        var o = !a && (i || n !== c) || ((t = n).nodeType ? u(e, n, i) : p(e, n, i));
        return t = null, o;
      }]; l < r; l++) {
        if (n = i.relative[e[l].type]) f = [xe(we(f), n)];else {
          if ((n = i.filter[e[l].type].apply(null, e[l].matches))[x]) {
            for (o = ++l; o < r && !i.relative[e[o].type]; o++) {
              ;
            }

            return ke(1 < l && we(f), 1 < l && be(e.slice(0, l - 1).concat({
              value: " " === e[l - 2].type ? "*" : ""
            })).replace(z, "$1"), n, l < o && Ee(e.slice(l, o)), o < r && Ee(e = e.slice(o)), o < r && be(e));
          }

          f.push(n);
        }
      }

      return we(f);
    }

    return ve.prototype = i.filters = i.pseudos, i.setFilters = new ve(), a = se.tokenize = function (e, t) {
      var n,
          o,
          r,
          a,
          s,
          l,
          c,
          u = T[e + " "];
      if (u) return t ? 0 : u.slice(0);

      for (s = e, l = [], c = i.preFilter; s;) {
        for (a in n && !(o = U.exec(s)) || (o && (s = s.slice(o[0].length) || s), l.push(r = [])), n = !1, (o = B.exec(s)) && (n = o.shift(), r.push({
          value: n,
          type: o[0].replace(z, " ")
        }), s = s.slice(n.length)), i.filter) {
          !(o = $[a].exec(s)) || c[a] && !(o = c[a](o)) || (n = o.shift(), r.push({
            value: n,
            type: a,
            matches: o
          }), s = s.slice(n.length));
        }

        if (!n) break;
      }

      return t ? s.length : s ? se.error(e) : T(e, l).slice(0);
    }, s = se.compile = function (e, t) {
      var n,
          o,
          r,
          s,
          l,
          u,
          p = [],
          d = [],
          m = S[e + " "];

      if (!m) {
        for (t || (t = a(e)), n = t.length; n--;) {
          (m = Ee(t[n]))[x] ? p.push(m) : d.push(m);
        }

        (m = S(e, (o = d, s = 0 < (r = p).length, l = 0 < o.length, u = function u(e, t, n, a, _u) {
          var p,
              d,
              m,
              y = 0,
              v = "0",
              b = e && [],
              x = [],
              w = c,
              k = e || l && i.find.TAG("*", _u),
              E = _ += null == w ? 1 : Math.random() || .1,
              T = k.length;

          for (_u && (c = t == h || t || _u); v !== T && null != (p = k[v]); v++) {
            if (l && p) {
              for (d = 0, t || p.ownerDocument == h || (f(p), n = !g); m = o[d++];) {
                if (m(p, t || h, n)) {
                  a.push(p);
                  break;
                }
              }

              _u && (_ = E);
            }

            s && ((p = !m && p) && y--, e && b.push(p));
          }

          if (y += v, s && v !== y) {
            for (d = 0; m = r[d++];) {
              m(b, x, t, n);
            }

            if (e) {
              if (0 < y) for (; v--;) {
                b[v] || x[v] || (x[v] = N.call(a));
              }
              x = _e(x);
            }

            j.apply(a, x), _u && !e && 0 < x.length && 1 < y + r.length && se.uniqueSort(a);
          }

          return _u && (_ = E, c = w), b;
        }, s ? ce(u) : u))).selector = e;
      }

      return m;
    }, l = se.select = function (e, t, n, o) {
      var r,
          l,
          c,
          u,
          p,
          f = "function" == typeof e && e,
          h = !o && a(e = f.selector || e);

      if (n = n || [], 1 === h.length) {
        if (2 < (l = h[0] = h[0].slice(0)).length && "ID" === (c = l[0]).type && 9 === t.nodeType && g && i.relative[l[1].type]) {
          if (!(t = (i.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return n;
          f && (t = t.parentNode), e = e.slice(l.shift().value.length);
        }

        for (r = $.needsContext.test(e) ? 0 : l.length; r-- && (c = l[r], !i.relative[u = c.type]);) {
          if ((p = i.find[u]) && (o = p(c.matches[0].replace(te, ne), ee.test(l[0].type) && ye(t.parentNode) || t))) {
            if (l.splice(r, 1), !(e = o.length && be(l))) return j.apply(n, o), n;
            break;
          }
        }
      }

      return (f || s(e, h))(o, t, !g, n, !t || ee.test(e) && ye(t.parentNode) || t), n;
    }, n.sortStable = x.split("").sort(A).join("") === x, n.detectDuplicates = !!p, f(), n.sortDetached = ue(function (e) {
      return 1 & e.compareDocumentPosition(h.createElement("fieldset"));
    }), ue(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
    }) || pe("type|href|height|width", function (e, t, n) {
      if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }), n.attributes && ue(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
    }) || pe("value", function (e, t, n) {
      if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
    }), ue(function (e) {
      return null == e.getAttribute("disabled");
    }) || pe(P, function (e, t, n) {
      var i;
      if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
    }), se;
  }(e);

  w.find = k, w.expr = k.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = k.uniqueSort, w.text = k.getText, w.isXMLDoc = k.isXML, w.contains = k.contains, w.escapeSelector = k.escape;

  var E = function E(e, t, n) {
    for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;) {
      if (1 === e.nodeType) {
        if (o && w(e).is(n)) break;
        i.push(e);
      }
    }

    return i;
  },
      T = function T(e, t) {
    for (var n = []; e; e = e.nextSibling) {
      1 === e.nodeType && e !== t && n.push(e);
    }

    return n;
  },
      S = w.expr.match.needsContext;

  function C(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }

  var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

  function L(e, t, n) {
    return d(t) ? w.grep(e, function (e, i) {
      return !!t.call(e, i, e) !== n;
    }) : t.nodeType ? w.grep(e, function (e) {
      return e === t !== n;
    }) : "string" != typeof t ? w.grep(e, function (e) {
      return -1 < s.call(t, e) !== n;
    }) : w.filter(t, e, n);
  }

  w.filter = function (e, t, n) {
    var i = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? w.find.matchesSelector(i, e) ? [i] : [] : w.find.matches(e, w.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, w.fn.extend({
    find: function find(e) {
      var t,
          n,
          i = this.length,
          o = this;
      if ("string" != typeof e) return this.pushStack(w(e).filter(function () {
        for (t = 0; t < i; t++) {
          if (w.contains(o[t], this)) return !0;
        }
      }));

      for (n = this.pushStack([]), t = 0; t < i; t++) {
        w.find(e, o[t], n);
      }

      return 1 < i ? w.uniqueSort(n) : n;
    },
    filter: function filter(e) {
      return this.pushStack(L(this, e || [], !1));
    },
    not: function not(e) {
      return this.pushStack(L(this, e || [], !0));
    },
    is: function is(e) {
      return !!L(this, "string" == typeof e && S.test(e) ? w(e) : e || [], !1).length;
    }
  });
  var O,
      N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (w.fn.init = function (e, t, n) {
    var i, o;
    if (!e) return this;

    if (n = n || O, "string" == typeof e) {
      if (!(i = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : N.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);

      if (i[1]) {
        if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : m, !0)), A.test(i[1]) && w.isPlainObject(t)) for (i in t) {
          d(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
        }
        return this;
      }

      return (o = m.getElementById(i[2])) && (this[0] = o, this.length = 1), this;
    }

    return e.nodeType ? (this[0] = e, this.length = 1, this) : d(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this);
  }).prototype = w.fn, O = w(m);
  var M = /^(?:parents|prev(?:Until|All))/,
      j = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };

  function D(e, t) {
    for (; (e = e[t]) && 1 !== e.nodeType;) {
      ;
    }

    return e;
  }

  w.fn.extend({
    has: function has(e) {
      var t = w(e, this),
          n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) {
          if (w.contains(this, t[e])) return !0;
        }
      });
    },
    closest: function closest(e, t) {
      var n,
          i = 0,
          o = this.length,
          r = [],
          a = "string" != typeof e && w(e);
      if (!S.test(e)) for (; i < o; i++) {
        for (n = this[i]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
            r.push(n);
            break;
          }
        }
      }
      return this.pushStack(1 < r.length ? w.uniqueSort(r) : r);
    },
    index: function index(e) {
      return e ? "string" == typeof e ? s.call(w(e), this[0]) : s.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function add(e, t) {
      return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))));
    },
    addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  }), w.each({
    parent: function parent(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null;
    },
    parents: function parents(e) {
      return E(e, "parentNode");
    },
    parentsUntil: function parentsUntil(e, t, n) {
      return E(e, "parentNode", n);
    },
    next: function next(e) {
      return D(e, "nextSibling");
    },
    prev: function prev(e) {
      return D(e, "previousSibling");
    },
    nextAll: function nextAll(e) {
      return E(e, "nextSibling");
    },
    prevAll: function prevAll(e) {
      return E(e, "previousSibling");
    },
    nextUntil: function nextUntil(e, t, n) {
      return E(e, "nextSibling", n);
    },
    prevUntil: function prevUntil(e, t, n) {
      return E(e, "previousSibling", n);
    },
    siblings: function siblings(e) {
      return T((e.parentNode || {}).firstChild, e);
    },
    children: function children(e) {
      return T(e.firstChild);
    },
    contents: function contents(e) {
      return null != e.contentDocument && i(e.contentDocument) ? e.contentDocument : (C(e, "template") && (e = e.content || e), w.merge([], e.childNodes));
    }
  }, function (e, t) {
    w.fn[e] = function (n, i) {
      var o = w.map(this, t, n);
      return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = w.filter(i, o)), 1 < this.length && (j[e] || w.uniqueSort(o), M.test(e) && o.reverse()), this.pushStack(o);
    };
  });
  var I = /[^\x20\t\r\n\f]+/g;

  function P(e) {
    return e;
  }

  function R(e) {
    throw e;
  }

  function H(e, t, n, i) {
    var o;

    try {
      e && d(o = e.promise) ? o.call(e).done(t).fail(n) : e && d(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(i));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }

  w.Callbacks = function (e) {
    var t, n;
    e = "string" == typeof e ? (t = e, n = {}, w.each(t.match(I) || [], function (e, t) {
      n[t] = !0;
    }), n) : w.extend({}, e);

    var i,
        o,
        r,
        a,
        s = [],
        l = [],
        c = -1,
        u = function u() {
      for (a = a || e.once, r = i = !0; l.length; c = -1) {
        for (o = l.shift(); ++c < s.length;) {
          !1 === s[c].apply(o[0], o[1]) && e.stopOnFalse && (c = s.length, o = !1);
        }
      }

      e.memory || (o = !1), i = !1, a && (s = o ? [] : "");
    },
        p = {
      add: function add() {
        return s && (o && !i && (c = s.length - 1, l.push(o)), function t(n) {
          w.each(n, function (n, i) {
            d(i) ? e.unique && p.has(i) || s.push(i) : i && i.length && "string" !== b(i) && t(i);
          });
        }(arguments), o && !i && u()), this;
      },
      remove: function remove() {
        return w.each(arguments, function (e, t) {
          for (var n; -1 < (n = w.inArray(t, s, n));) {
            s.splice(n, 1), n <= c && c--;
          }
        }), this;
      },
      has: function has(e) {
        return e ? -1 < w.inArray(e, s) : 0 < s.length;
      },
      empty: function empty() {
        return s && (s = []), this;
      },
      disable: function disable() {
        return a = l = [], s = o = "", this;
      },
      disabled: function disabled() {
        return !s;
      },
      lock: function lock() {
        return a = l = [], o || i || (s = o = ""), this;
      },
      locked: function locked() {
        return !!a;
      },
      fireWith: function fireWith(e, t) {
        return a || (t = [e, (t = t || []).slice ? t.slice() : t], l.push(t), i || u()), this;
      },
      fire: function fire() {
        return p.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!r;
      }
    };

    return p;
  }, w.extend({
    Deferred: function Deferred(t) {
      var n = [["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2], ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]],
          i = "pending",
          o = {
        state: function state() {
          return i;
        },
        always: function always() {
          return r.done(arguments).fail(arguments), this;
        },
        catch: function _catch(e) {
          return o.then(null, e);
        },
        pipe: function pipe() {
          var e = arguments;
          return w.Deferred(function (t) {
            w.each(n, function (n, i) {
              var o = d(e[i[4]]) && e[i[4]];
              r[i[1]](function () {
                var e = o && o.apply(this, arguments);
                e && d(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[i[0] + "With"](this, o ? [e] : arguments);
              });
            }), e = null;
          }).promise();
        },
        then: function then(t, i, o) {
          var r = 0;

          function a(t, n, i, o) {
            return function () {
              var s = this,
                  l = arguments,
                  c = function c() {
                var e, c;

                if (!(t < r)) {
                  if ((e = i.apply(s, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
                  c = e && ("object" == _typeof(e) || "function" == typeof e) && e.then, d(c) ? o ? c.call(e, a(r, n, P, o), a(r, n, R, o)) : (r++, c.call(e, a(r, n, P, o), a(r, n, R, o), a(r, n, P, n.notifyWith))) : (i !== P && (s = void 0, l = [e]), (o || n.resolveWith)(s, l));
                }
              },
                  u = o ? c : function () {
                try {
                  c();
                } catch (e) {
                  w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, u.stackTrace), r <= t + 1 && (i !== R && (s = void 0, l = [e]), n.rejectWith(s, l));
                }
              };

              t ? u() : (w.Deferred.getStackHook && (u.stackTrace = w.Deferred.getStackHook()), e.setTimeout(u));
            };
          }

          return w.Deferred(function (e) {
            n[0][3].add(a(0, e, d(o) ? o : P, e.notifyWith)), n[1][3].add(a(0, e, d(t) ? t : P)), n[2][3].add(a(0, e, d(i) ? i : R));
          }).promise();
        },
        promise: function promise(e) {
          return null != e ? w.extend(e, o) : o;
        }
      },
          r = {};
      return w.each(n, function (e, t) {
        var a = t[2],
            s = t[5];
        o[t[1]] = a.add, s && a.add(function () {
          i = s;
        }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), r[t[0]] = function () {
          return r[t[0] + "With"](this === r ? void 0 : this, arguments), this;
        }, r[t[0] + "With"] = a.fireWith;
      }), o.promise(r), t && t.call(r, r), r;
    },
    when: function when(e) {
      var t = arguments.length,
          n = t,
          i = Array(n),
          r = o.call(arguments),
          a = w.Deferred(),
          s = function s(e) {
        return function (n) {
          i[e] = this, r[e] = 1 < arguments.length ? o.call(arguments) : n, --t || a.resolveWith(i, r);
        };
      };

      if (t <= 1 && (H(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || d(r[n] && r[n].then))) return a.then();

      for (; n--;) {
        H(r[n], s(n), a.reject);
      }

      return a.promise();
    }
  });
  var q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  w.Deferred.exceptionHook = function (t, n) {
    e.console && e.console.warn && t && q.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
  }, w.readyException = function (t) {
    e.setTimeout(function () {
      throw t;
    });
  };
  var F = w.Deferred();

  function W() {
    m.removeEventListener("DOMContentLoaded", W), e.removeEventListener("load", W), w.ready();
  }

  w.fn.ready = function (e) {
    return F.then(e).catch(function (e) {
      w.readyException(e);
    }), this;
  }, w.extend({
    isReady: !1,
    readyWait: 1,
    ready: function ready(e) {
      (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0) !== e && 0 < --w.readyWait || F.resolveWith(m, [w]);
    }
  }), w.ready.then = F.then, "complete" === m.readyState || "loading" !== m.readyState && !m.documentElement.doScroll ? e.setTimeout(w.ready) : (m.addEventListener("DOMContentLoaded", W), e.addEventListener("load", W));

  var z = function z(e, t, n, i, o, r, a) {
    var s = 0,
        l = e.length,
        c = null == n;
    if ("object" === b(n)) for (s in o = !0, n) {
      z(e, t, s, n[s], !0, r, a);
    } else if (void 0 !== i && (o = !0, d(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function t(e, _t2, n) {
      return c.call(w(e), n);
    })), t)) for (; s < l; s++) {
      t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
    }
    return o ? e : c ? t.call(e) : l ? t(e[0], n) : r;
  },
      U = /^-ms-/,
      B = /-([a-z])/g;

  function X(e, t) {
    return t.toUpperCase();
  }

  function Y(e) {
    return e.replace(U, "ms-").replace(B, X);
  }

  var V = function V(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };

  function $() {
    this.expando = w.expando + $.uid++;
  }

  $.uid = 1, $.prototype = {
    cache: function cache(e) {
      var t = e[this.expando];
      return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
        value: t,
        configurable: !0
      }))), t;
    },
    set: function set(e, t, n) {
      var i,
          o = this.cache(e);
      if ("string" == typeof t) o[Y(t)] = n;else for (i in t) {
        o[Y(i)] = t[i];
      }
      return o;
    },
    get: function get(e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][Y(t)];
    },
    access: function access(e, t, n) {
      return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
    },
    remove: function remove(e, t) {
      var n,
          i = e[this.expando];

      if (void 0 !== i) {
        if (void 0 !== t) {
          n = (t = Array.isArray(t) ? t.map(Y) : (t = Y(t)) in i ? [t] : t.match(I) || []).length;

          for (; n--;) {
            delete i[t[n]];
          }
        }

        (void 0 === t || w.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
      }
    },
    hasData: function hasData(e) {
      var t = e[this.expando];
      return void 0 !== t && !w.isEmptyObject(t);
    }
  };
  var Q = new $(),
      K = new $(),
      G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      J = /[A-Z]/g;

  function Z(e, t, n) {
    var i, o;
    if (void 0 === n && 1 === e.nodeType) if (i = "data-" + t.replace(J, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(i))) {
      try {
        n = "true" === (o = n) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : G.test(o) ? JSON.parse(o) : o);
      } catch (e) {}

      K.set(e, t, n);
    } else n = void 0;
    return n;
  }

  w.extend({
    hasData: function hasData(e) {
      return K.hasData(e) || Q.hasData(e);
    },
    data: function data(e, t, n) {
      return K.access(e, t, n);
    },
    removeData: function removeData(e, t) {
      K.remove(e, t);
    },
    _data: function _data(e, t, n) {
      return Q.access(e, t, n);
    },
    _removeData: function _removeData(e, t) {
      Q.remove(e, t);
    }
  }), w.fn.extend({
    data: function data(e, t) {
      var n,
          i,
          o,
          r = this[0],
          a = r && r.attributes;

      if (void 0 === e) {
        if (this.length && (o = K.get(r), 1 === r.nodeType && !Q.get(r, "hasDataAttrs"))) {
          for (n = a.length; n--;) {
            a[n] && 0 === (i = a[n].name).indexOf("data-") && (i = Y(i.slice(5)), Z(r, i, o[i]));
          }

          Q.set(r, "hasDataAttrs", !0);
        }

        return o;
      }

      return "object" == _typeof(e) ? this.each(function () {
        K.set(this, e);
      }) : z(this, function (t) {
        var n;
        if (r && void 0 === t) return void 0 !== (n = K.get(r, e)) || void 0 !== (n = Z(r, e)) ? n : void 0;
        this.each(function () {
          K.set(this, e, t);
        });
      }, null, t, 1 < arguments.length, null, !0);
    },
    removeData: function removeData(e) {
      return this.each(function () {
        K.remove(this, e);
      });
    }
  }), w.extend({
    queue: function queue(e, t, n) {
      var i;
      if (e) return t = (t || "fx") + "queue", i = Q.get(e, t), n && (!i || Array.isArray(n) ? i = Q.access(e, t, w.makeArray(n)) : i.push(n)), i || [];
    },
    dequeue: function dequeue(e, t) {
      t = t || "fx";

      var n = w.queue(e, t),
          i = n.length,
          o = n.shift(),
          r = w._queueHooks(e, t);

      "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, function () {
        w.dequeue(e, t);
      }, r)), !i && r && r.empty.fire();
    },
    _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";
      return Q.get(e, n) || Q.access(e, n, {
        empty: w.Callbacks("once memory").add(function () {
          Q.remove(e, [t + "queue", n]);
        })
      });
    }
  }), w.fn.extend({
    queue: function queue(e, t) {
      var n = 2;
      return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var n = w.queue(this, e, t);
        w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e);
      });
    },
    dequeue: function dequeue(e) {
      return this.each(function () {
        w.dequeue(this, e);
      });
    },
    clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    },
    promise: function promise(e, t) {
      var n,
          i = 1,
          o = w.Deferred(),
          r = this,
          a = this.length,
          s = function s() {
        --i || o.resolveWith(r, [r]);
      };

      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) {
        (n = Q.get(r[a], e + "queueHooks")) && n.empty && (i++, n.empty.add(s));
      }

      return s(), o.promise(t);
    }
  });

  var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
      ne = ["Top", "Right", "Bottom", "Left"],
      ie = m.documentElement,
      oe = function oe(e) {
    return w.contains(e.ownerDocument, e);
  },
      re = {
    composed: !0
  };

  ie.getRootNode && (oe = function oe(e) {
    return w.contains(e.ownerDocument, e) || e.getRootNode(re) === e.ownerDocument;
  });

  var ae = function ae(e, t) {
    return "none" === (e = t || e).style.display || "" === e.style.display && oe(e) && "none" === w.css(e, "display");
  };

  function se(e, t, n, i) {
    var o,
        r,
        a = 20,
        s = i ? function () {
      return i.cur();
    } : function () {
      return w.css(e, t, "");
    },
        l = s(),
        c = n && n[3] || (w.cssNumber[t] ? "" : "px"),
        u = e.nodeType && (w.cssNumber[t] || "px" !== c && +l) && te.exec(w.css(e, t));

    if (u && u[3] !== c) {
      for (l /= 2, c = c || u[3], u = +l || 1; a--;) {
        w.style(e, t, u + c), (1 - r) * (1 - (r = s() / l || .5)) <= 0 && (a = 0), u /= r;
      }

      u *= 2, w.style(e, t, u + c), n = n || [];
    }

    return n && (u = +u || +l || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = o)), o;
  }

  var le = {};

  function ce(e, t) {
    for (var n, i, o, r, a, s, l, c = [], u = 0, p = e.length; u < p; u++) {
      (i = e[u]).style && (n = i.style.display, t ? ("none" === n && (c[u] = Q.get(i, "display") || null, c[u] || (i.style.display = "")), "" === i.style.display && ae(i) && (c[u] = (l = a = r = void 0, a = (o = i).ownerDocument, s = o.nodeName, (l = le[s]) || (r = a.body.appendChild(a.createElement(s)), l = w.css(r, "display"), r.parentNode.removeChild(r), "none" === l && (l = "block"), le[s] = l)))) : "none" !== n && (c[u] = "none", Q.set(i, "display", n)));
    }

    for (u = 0; u < p; u++) {
      null != c[u] && (e[u].style.display = c[u]);
    }

    return e;
  }

  w.fn.extend({
    show: function show() {
      return ce(this, !0);
    },
    hide: function hide() {
      return ce(this);
    },
    toggle: function toggle(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        ae(this) ? w(this).show() : w(this).hide();
      });
    }
  });
  var ue,
      pe,
      fe = /^(?:checkbox|radio)$/i,
      he = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      de = /^$|^module$|\/(?:java|ecma)script/i;
  ue = m.createDocumentFragment().appendChild(m.createElement("div")), (pe = m.createElement("input")).setAttribute("type", "radio"), pe.setAttribute("checked", "checked"), pe.setAttribute("name", "t"), ue.appendChild(pe), h.checkClone = ue.cloneNode(!0).cloneNode(!0).lastChild.checked, ue.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!ue.cloneNode(!0).lastChild.defaultValue, ue.innerHTML = "<option></option>", h.option = !!ue.lastChild;
  var ge = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };

  function me(e, t) {
    var n;
    return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && C(e, t) ? w.merge([e], n) : n;
  }

  function ye(e, t) {
    for (var n = 0, i = e.length; n < i; n++) {
      Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"));
    }
  }

  ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, h.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
  var ve = /<|&#?\w+;/;

  function be(e, t, n, i, o) {
    for (var r, a, s, l, c, u, p = t.createDocumentFragment(), f = [], h = 0, d = e.length; h < d; h++) {
      if ((r = e[h]) || 0 === r) if ("object" === b(r)) w.merge(f, r.nodeType ? [r] : r);else if (ve.test(r)) {
        for (a = a || p.appendChild(t.createElement("div")), s = (he.exec(r) || ["", ""])[1].toLowerCase(), l = ge[s] || ge._default, a.innerHTML = l[1] + w.htmlPrefilter(r) + l[2], u = l[0]; u--;) {
          a = a.lastChild;
        }

        w.merge(f, a.childNodes), (a = p.firstChild).textContent = "";
      } else f.push(t.createTextNode(r));
    }

    for (p.textContent = "", h = 0; r = f[h++];) {
      if (i && -1 < w.inArray(r, i)) o && o.push(r);else if (c = oe(r), a = me(p.appendChild(r), "script"), c && ye(a), n) for (u = 0; r = a[u++];) {
        de.test(r.type || "") && n.push(r);
      }
    }

    return p;
  }

  var xe = /^([^.]*)(?:\.(.+)|)/;

  function we() {
    return !0;
  }

  function _e() {
    return !1;
  }

  function ke(e, t) {
    return e === function () {
      try {
        return m.activeElement;
      } catch (e) {}
    }() == ("focus" === t);
  }

  function Ee(e, t, n, i, o, r) {
    var a, s;

    if ("object" == _typeof(t)) {
      for (s in "string" != typeof n && (i = i || n, n = void 0), t) {
        Ee(e, s, n, i, t[s], r);
      }

      return e;
    }

    if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = _e;else if (!o) return e;
    return 1 === r && (a = o, (o = function o(e) {
      return w().off(e), a.apply(this, arguments);
    }).guid = a.guid || (a.guid = w.guid++)), e.each(function () {
      w.event.add(this, t, o, i, n);
    });
  }

  function Te(e, t, n) {
    n ? (Q.set(e, t, !1), w.event.add(e, t, {
      namespace: !1,
      handler: function handler(e) {
        var i,
            r,
            a = Q.get(this, t);

        if (1 & e.isTrigger && this[t]) {
          if (a.length) (w.event.special[t] || {}).delegateType && e.stopPropagation();else if (a = o.call(arguments), Q.set(this, t, a), i = n(this, t), this[t](), a !== (r = Q.get(this, t)) || i ? Q.set(this, t, !1) : r = {}, a !== r) return e.stopImmediatePropagation(), e.preventDefault(), r && r.value;
        } else a.length && (Q.set(this, t, {
          value: w.event.trigger(w.extend(a[0], w.Event.prototype), a.slice(1), this)
        }), e.stopImmediatePropagation());
      }
    })) : void 0 === Q.get(e, t) && w.event.add(e, t, we);
  }

  w.event = {
    global: {},
    add: function add(e, t, n, i, o) {
      var r,
          a,
          s,
          l,
          c,
          u,
          p,
          f,
          h,
          d,
          g,
          m = Q.get(e);
      if (V(e)) for (n.handler && (n = (r = n).handler, o = r.selector), o && w.find.matchesSelector(ie, o), n.guid || (n.guid = w.guid++), (l = m.events) || (l = m.events = Object.create(null)), (a = m.handle) || (a = m.handle = function (t) {
        return void 0 !== w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0;
      }), c = (t = (t || "").match(I) || [""]).length; c--;) {
        h = g = (s = xe.exec(t[c]) || [])[1], d = (s[2] || "").split(".").sort(), h && (p = w.event.special[h] || {}, h = (o ? p.delegateType : p.bindType) || h, p = w.event.special[h] || {}, u = w.extend({
          type: h,
          origType: g,
          data: i,
          handler: n,
          guid: n.guid,
          selector: o,
          needsContext: o && w.expr.match.needsContext.test(o),
          namespace: d.join(".")
        }, r), (f = l[h]) || ((f = l[h] = []).delegateCount = 0, p.setup && !1 !== p.setup.call(e, i, d, a) || e.addEventListener && e.addEventListener(h, a)), p.add && (p.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), o ? f.splice(f.delegateCount++, 0, u) : f.push(u), w.event.global[h] = !0);
      }
    },
    remove: function remove(e, t, n, i, o) {
      var r,
          a,
          s,
          l,
          c,
          u,
          p,
          f,
          h,
          d,
          g,
          m = Q.hasData(e) && Q.get(e);

      if (m && (l = m.events)) {
        for (c = (t = (t || "").match(I) || [""]).length; c--;) {
          if (h = g = (s = xe.exec(t[c]) || [])[1], d = (s[2] || "").split(".").sort(), h) {
            for (p = w.event.special[h] || {}, f = l[h = (i ? p.delegateType : p.bindType) || h] || [], s = s[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = r = f.length; r--;) {
              u = f[r], !o && g !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (f.splice(r, 1), u.selector && f.delegateCount--, p.remove && p.remove.call(e, u));
            }

            a && !f.length && (p.teardown && !1 !== p.teardown.call(e, d, m.handle) || w.removeEvent(e, h, m.handle), delete l[h]);
          } else for (h in l) {
            w.event.remove(e, h + t[c], n, i, !0);
          }
        }

        w.isEmptyObject(l) && Q.remove(e, "handle events");
      }
    },
    dispatch: function dispatch(e) {
      var t,
          n,
          i,
          o,
          r,
          a,
          s = new Array(arguments.length),
          l = w.event.fix(e),
          c = (Q.get(this, "events") || Object.create(null))[l.type] || [],
          u = w.event.special[l.type] || {};

      for (s[0] = l, t = 1; t < arguments.length; t++) {
        s[t] = arguments[t];
      }

      if (l.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, l)) {
        for (a = w.event.handlers.call(this, l, c), t = 0; (o = a[t++]) && !l.isPropagationStopped();) {
          for (l.currentTarget = o.elem, n = 0; (r = o.handlers[n++]) && !l.isImmediatePropagationStopped();) {
            l.rnamespace && !1 !== r.namespace && !l.rnamespace.test(r.namespace) || (l.handleObj = r, l.data = r.data, void 0 !== (i = ((w.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, s)) && !1 === (l.result = i) && (l.preventDefault(), l.stopPropagation()));
          }
        }

        return u.postDispatch && u.postDispatch.call(this, l), l.result;
      }
    },
    handlers: function handlers(e, t) {
      var n,
          i,
          o,
          r,
          a,
          s = [],
          l = t.delegateCount,
          c = e.target;
      if (l && c.nodeType && !("click" === e.type && 1 <= e.button)) for (; c !== this; c = c.parentNode || this) {
        if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
          for (r = [], a = {}, n = 0; n < l; n++) {
            void 0 === a[o = (i = t[n]).selector + " "] && (a[o] = i.needsContext ? -1 < w(o, this).index(c) : w.find(o, this, null, [c]).length), a[o] && r.push(i);
          }

          r.length && s.push({
            elem: c,
            handlers: r
          });
        }
      }
      return c = this, l < t.length && s.push({
        elem: c,
        handlers: t.slice(l)
      }), s;
    },
    addProp: function addProp(e, t) {
      Object.defineProperty(w.Event.prototype, e, {
        enumerable: !0,
        configurable: !0,
        get: d(t) ? function () {
          if (this.originalEvent) return t(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[e];
        },
        set: function set(t) {
          Object.defineProperty(this, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t
          });
        }
      });
    },
    fix: function fix(e) {
      return e[w.expando] ? e : new w.Event(e);
    },
    special: {
      load: {
        noBubble: !0
      },
      click: {
        setup: function setup(e) {
          var t = this || e;
          return fe.test(t.type) && t.click && C(t, "input") && Te(t, "click", we), !1;
        },
        trigger: function trigger(e) {
          var t = this || e;
          return fe.test(t.type) && t.click && C(t, "input") && Te(t, "click"), !0;
        },
        _default: function _default(e) {
          var t = e.target;
          return fe.test(t.type) && t.click && C(t, "input") && Q.get(t, "click") || C(t, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        }
      }
    }
  }, w.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  }, w.Event = function (e, t) {
    if (!(this instanceof w.Event)) return new w.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : _e, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0;
  }, w.Event.prototype = {
    constructor: w.Event,
    isDefaultPrevented: _e,
    isPropagationStopped: _e,
    isImmediatePropagationStopped: _e,
    isSimulated: !1,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = we, e && !this.isSimulated && e.preventDefault();
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = we, e && !this.isSimulated && e.stopPropagation();
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = we, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
    }
  }, w.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    char: !0,
    code: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: !0
  }, w.event.addProp), w.each({
    focus: "focusin",
    blur: "focusout"
  }, function (e, t) {
    w.event.special[e] = {
      setup: function setup() {
        return Te(this, e, ke), !1;
      },
      trigger: function trigger() {
        return Te(this, e), !0;
      },
      _default: function _default() {
        return !0;
      },
      delegateType: t
    };
  }), w.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, t) {
    w.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function handle(e) {
        var n,
            i = e.relatedTarget,
            o = e.handleObj;
        return i && (i === this || w.contains(this, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
      }
    };
  }), w.fn.extend({
    on: function on(e, t, n, i) {
      return Ee(this, e, t, n, i);
    },
    one: function one(e, t, n, i) {
      return Ee(this, e, t, n, i, 1);
    },
    off: function off(e, t, n) {
      var i, o;
      if (e && e.preventDefault && e.handleObj) return i = e.handleObj, w(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;

      if ("object" == _typeof(e)) {
        for (o in e) {
          this.off(o, t, e[o]);
        }

        return this;
      }

      return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = _e), this.each(function () {
        w.event.remove(this, e, n, t);
      });
    }
  });
  var Se = /<script|<style|<link/i,
      Ce = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ae = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  function Le(e, t) {
    return C(e, "table") && C(11 !== t.nodeType ? t : t.firstChild, "tr") && w(e).children("tbody")[0] || e;
  }

  function Oe(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
  }

  function Ne(e) {
    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
  }

  function Me(e, t) {
    var n, i, o, r, a, s;

    if (1 === t.nodeType) {
      if (Q.hasData(e) && (s = Q.get(e).events)) for (o in Q.remove(t, "handle events"), s) {
        for (n = 0, i = s[o].length; n < i; n++) {
          w.event.add(t, o, s[o][n]);
        }
      }
      K.hasData(e) && (r = K.access(e), a = w.extend({}, r), K.set(t, a));
    }
  }

  function je(e, t, n, i) {
    t = r(t);
    var o,
        a,
        s,
        l,
        c,
        u,
        p = 0,
        f = e.length,
        g = f - 1,
        m = t[0],
        y = d(m);
    if (y || 1 < f && "string" == typeof m && !h.checkClone && Ce.test(m)) return e.each(function (o) {
      var r = e.eq(o);
      y && (t[0] = m.call(this, o, r.html())), je(r, t, n, i);
    });

    if (f && (a = (o = be(t, e[0].ownerDocument, !1, e, i)).firstChild, 1 === o.childNodes.length && (o = a), a || i)) {
      for (l = (s = w.map(me(o, "script"), Oe)).length; p < f; p++) {
        c = o, p !== g && (c = w.clone(c, !0, !0), l && w.merge(s, me(c, "script"))), n.call(e[p], c, p);
      }

      if (l) for (u = s[s.length - 1].ownerDocument, w.map(s, Ne), p = 0; p < l; p++) {
        c = s[p], de.test(c.type || "") && !Q.access(c, "globalEval") && w.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? w._evalUrl && !c.noModule && w._evalUrl(c.src, {
          nonce: c.nonce || c.getAttribute("nonce")
        }, u) : v(c.textContent.replace(Ae, ""), c, u));
      }
    }

    return e;
  }

  function De(e, t, n) {
    for (var i, o = t ? w.filter(t, e) : e, r = 0; null != (i = o[r]); r++) {
      n || 1 !== i.nodeType || w.cleanData(me(i)), i.parentNode && (n && oe(i) && ye(me(i, "script")), i.parentNode.removeChild(i));
    }

    return e;
  }

  w.extend({
    htmlPrefilter: function htmlPrefilter(e) {
      return e;
    },
    clone: function clone(e, t, n) {
      var i,
          o,
          r,
          a,
          s,
          l,
          c,
          u = e.cloneNode(!0),
          p = oe(e);
      if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e))) for (a = me(u), i = 0, o = (r = me(e)).length; i < o; i++) {
        s = r[i], "input" === (c = (l = a[i]).nodeName.toLowerCase()) && fe.test(s.type) ? l.checked = s.checked : "input" !== c && "textarea" !== c || (l.defaultValue = s.defaultValue);
      }
      if (t) if (n) for (r = r || me(e), a = a || me(u), i = 0, o = r.length; i < o; i++) {
        Me(r[i], a[i]);
      } else Me(e, u);
      return 0 < (a = me(u, "script")).length && ye(a, !p && me(e, "script")), u;
    },
    cleanData: function cleanData(e) {
      for (var t, n, i, o = w.event.special, r = 0; void 0 !== (n = e[r]); r++) {
        if (V(n)) {
          if (t = n[Q.expando]) {
            if (t.events) for (i in t.events) {
              o[i] ? w.event.remove(n, i) : w.removeEvent(n, i, t.handle);
            }
            n[Q.expando] = void 0;
          }

          n[K.expando] && (n[K.expando] = void 0);
        }
      }
    }
  }), w.fn.extend({
    detach: function detach(e) {
      return De(this, e, !0);
    },
    remove: function remove(e) {
      return De(this, e);
    },
    text: function text(e) {
      return z(this, function (e) {
        return void 0 === e ? w.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
        });
      }, null, e, arguments.length);
    },
    append: function append() {
      return je(this, arguments, function (e) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e);
      });
    },
    prepend: function prepend() {
      return je(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = Le(this, e);
          t.insertBefore(e, t.firstChild);
        }
      });
    },
    before: function before() {
      return je(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    },
    after: function after() {
      return je(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    },
    empty: function empty() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        1 === e.nodeType && (w.cleanData(me(e, !1)), e.textContent = "");
      }

      return this;
    },
    clone: function clone(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return w.clone(this, e, t);
      });
    },
    html: function html(e) {
      return z(this, function (e) {
        var t = this[0] || {},
            n = 0,
            i = this.length;
        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;

        if ("string" == typeof e && !Se.test(e) && !ge[(he.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = w.htmlPrefilter(e);

          try {
            for (; n < i; n++) {
              1 === (t = this[n] || {}).nodeType && (w.cleanData(me(t, !1)), t.innerHTML = e);
            }

            t = 0;
          } catch (e) {}
        }

        t && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function replaceWith() {
      var e = [];
      return je(this, arguments, function (t) {
        var n = this.parentNode;
        w.inArray(this, e) < 0 && (w.cleanData(me(this)), n && n.replaceChild(t, this));
      }, e);
    }
  }), w.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, t) {
    w.fn[e] = function (e) {
      for (var n, i = [], o = w(e), r = o.length - 1, s = 0; s <= r; s++) {
        n = s === r ? this : this.clone(!0), w(o[s])[t](n), a.apply(i, n.get());
      }

      return this.pushStack(i);
    };
  });

  var Ie = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
      Pe = function Pe(t) {
    var n = t.ownerDocument.defaultView;
    return n && n.opener || (n = e), n.getComputedStyle(t);
  },
      Re = function Re(e, t, n) {
    var i,
        o,
        r = {};

    for (o in t) {
      r[o] = e.style[o], e.style[o] = t[o];
    }

    for (o in i = n.call(e), t) {
      e.style[o] = r[o];
    }

    return i;
  },
      He = new RegExp(ne.join("|"), "i");

  function qe(e, t, n) {
    var i,
        o,
        r,
        a,
        s = e.style;
    return (n = n || Pe(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || oe(e) || (a = w.style(e, t)), !h.pixelBoxStyles() && Ie.test(a) && He.test(t) && (i = s.width, o = s.minWidth, r = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = o, s.maxWidth = r)), void 0 !== a ? a + "" : a;
  }

  function Fe(e, t) {
    return {
      get: function get() {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      }
    };
  }

  !function () {
    function t() {
      if (u) {
        c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ie.appendChild(c).appendChild(u);
        var t = e.getComputedStyle(u);
        i = "1%" !== t.top, l = 12 === n(t.marginLeft), u.style.right = "60%", a = 36 === n(t.right), o = 36 === n(t.width), u.style.position = "absolute", r = 12 === n(u.offsetWidth / 3), ie.removeChild(c), u = null;
      }
    }

    function n(e) {
      return Math.round(parseFloat(e));
    }

    var i,
        o,
        r,
        a,
        s,
        l,
        c = m.createElement("div"),
        u = m.createElement("div");
    u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === u.style.backgroundClip, w.extend(h, {
      boxSizingReliable: function boxSizingReliable() {
        return t(), o;
      },
      pixelBoxStyles: function pixelBoxStyles() {
        return t(), a;
      },
      pixelPosition: function pixelPosition() {
        return t(), i;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        return t(), l;
      },
      scrollboxSize: function scrollboxSize() {
        return t(), r;
      },
      reliableTrDimensions: function reliableTrDimensions() {
        var t, n, i, o;
        return null == s && (t = m.createElement("table"), n = m.createElement("tr"), i = m.createElement("div"), t.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", n.style.cssText = "border:1px solid", n.style.height = "1px", i.style.height = "9px", i.style.display = "block", ie.appendChild(t).appendChild(n).appendChild(i), o = e.getComputedStyle(n), s = parseInt(o.height, 10) + parseInt(o.borderTopWidth, 10) + parseInt(o.borderBottomWidth, 10) === n.offsetHeight, ie.removeChild(t)), s;
      }
    }));
  }();
  var We = ["Webkit", "Moz", "ms"],
      ze = m.createElement("div").style,
      Ue = {};

  function Be(e) {
    return w.cssProps[e] || Ue[e] || (e in ze ? e : Ue[e] = function (e) {
      for (var t = e[0].toUpperCase() + e.slice(1), n = We.length; n--;) {
        if ((e = We[n] + t) in ze) return e;
      }
    }(e) || e);
  }

  var Xe = /^(none|table(?!-c[ea]).+)/,
      Ye = /^--/,
      Ve = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      $e = {
    letterSpacing: "0",
    fontWeight: "400"
  };

  function Qe(e, t, n) {
    var i = te.exec(t);
    return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
  }

  function Ke(e, t, n, i, o, r) {
    var a = "width" === t ? 1 : 0,
        s = 0,
        l = 0;
    if (n === (i ? "border" : "content")) return 0;

    for (; a < 4; a += 2) {
      "margin" === n && (l += w.css(e, n + ne[a], !0, o)), i ? ("content" === n && (l -= w.css(e, "padding" + ne[a], !0, o)), "margin" !== n && (l -= w.css(e, "border" + ne[a] + "Width", !0, o))) : (l += w.css(e, "padding" + ne[a], !0, o), "padding" !== n ? l += w.css(e, "border" + ne[a] + "Width", !0, o) : s += w.css(e, "border" + ne[a] + "Width", !0, o));
    }

    return !i && 0 <= r && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - s - .5)) || 0), l;
  }

  function Ge(e, t, n) {
    var i = Pe(e),
        o = (!h.boxSizingReliable() || n) && "border-box" === w.css(e, "boxSizing", !1, i),
        r = o,
        a = qe(e, t, i),
        s = "offset" + t[0].toUpperCase() + t.slice(1);

    if (Ie.test(a)) {
      if (!n) return a;
      a = "auto";
    }

    return (!h.boxSizingReliable() && o || !h.reliableTrDimensions() && C(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === w.css(e, "display", !1, i)) && e.getClientRects().length && (o = "border-box" === w.css(e, "boxSizing", !1, i), (r = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Ke(e, t, n || (o ? "border" : "content"), r, i, a) + "px";
  }

  function Je(e, t, n, i, o) {
    return new Je.prototype.init(e, t, n, i, o);
  }

  w.extend({
    cssHooks: {
      opacity: {
        get: function get(e, t) {
          if (t) {
            var n = qe(e, "opacity");
            return "" === n ? "1" : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {},
    style: function style(e, t, n, i) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var o,
            r,
            a,
            s = Y(t),
            l = Ye.test(t),
            c = e.style;
        if (l || (t = Be(s)), a = w.cssHooks[t] || w.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (o = a.get(e, !1, i)) ? o : c[t];
        "string" == (r = _typeof(n)) && (o = te.exec(n)) && o[1] && (n = se(e, t, o), r = "number"), null != n && n == n && ("number" !== r || l || (n += o && o[3] || (w.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (l ? c.setProperty(t, n) : c[t] = n));
      }
    },
    css: function css(e, t, n, i) {
      var o,
          r,
          a,
          s = Y(t);
      return Ye.test(t) || (t = Be(s)), (a = w.cssHooks[t] || w.cssHooks[s]) && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = qe(e, t, i)), "normal" === o && t in $e && (o = $e[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o;
    }
  }), w.each(["height", "width"], function (e, t) {
    w.cssHooks[t] = {
      get: function get(e, n, i) {
        if (n) return !Xe.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ge(e, t, i) : Re(e, Ve, function () {
          return Ge(e, t, i);
        });
      },
      set: function set(e, n, i) {
        var o,
            r = Pe(e),
            a = !h.scrollboxSize() && "absolute" === r.position,
            s = (a || i) && "border-box" === w.css(e, "boxSizing", !1, r),
            l = i ? Ke(e, t, i, s, r) : 0;
        return s && a && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(r[t]) - Ke(e, t, "border", !1, r) - .5)), l && (o = te.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Qe(0, n, l);
      }
    };
  }), w.cssHooks.marginLeft = Fe(h.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(qe(e, "marginLeft")) || e.getBoundingClientRect().left - Re(e, {
      marginLeft: 0
    }, function () {
      return e.getBoundingClientRect().left;
    })) + "px";
  }), w.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (e, t) {
    w.cssHooks[e + t] = {
      expand: function expand(n) {
        for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) {
          o[e + ne[i] + t] = r[i] || r[i - 2] || r[0];
        }

        return o;
      }
    }, "margin" !== e && (w.cssHooks[e + t].set = Qe);
  }), w.fn.extend({
    css: function css(e, t) {
      return z(this, function (e, t, n) {
        var i,
            o,
            r = {},
            a = 0;

        if (Array.isArray(t)) {
          for (i = Pe(e), o = t.length; a < o; a++) {
            r[t[a]] = w.css(e, t[a], !1, i);
          }

          return r;
        }

        return void 0 !== n ? w.style(e, t, n) : w.css(e, t);
      }, e, t, 1 < arguments.length);
    }
  }), ((w.Tween = Je).prototype = {
    constructor: Je,
    init: function init(e, t, n, i, o, r) {
      this.elem = e, this.prop = n, this.easing = o || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (w.cssNumber[n] ? "" : "px");
    },
    cur: function cur() {
      var e = Je.propHooks[this.prop];
      return e && e.get ? e.get(this) : Je.propHooks._default.get(this);
    },
    run: function run(e) {
      var t,
          n = Je.propHooks[this.prop];
      return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Je.propHooks._default.set(this), this;
    }
  }).init.prototype = Je.prototype, (Je.propHooks = {
    _default: {
      get: function get(e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
      },
      set: function set(e) {
        w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !w.cssHooks[e.prop] && null == e.elem.style[Be(e.prop)] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit);
      }
    }
  }).scrollTop = Je.propHooks.scrollLeft = {
    set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    }
  }, w.easing = {
    linear: function linear(e) {
      return e;
    },
    swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    },
    _default: "swing"
  }, w.fx = Je.prototype.init, w.fx.step = {};
  var Ze,
      et,
      tt,
      nt,
      it = /^(?:toggle|show|hide)$/,
      ot = /queueHooks$/;

  function rt() {
    et && (!1 === m.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(rt) : e.setTimeout(rt, w.fx.interval), w.fx.tick());
  }

  function at() {
    return e.setTimeout(function () {
      Ze = void 0;
    }), Ze = Date.now();
  }

  function st(e, t) {
    var n,
        i = 0,
        o = {
      height: e
    };

    for (t = t ? 1 : 0; i < 4; i += 2 - t) {
      o["margin" + (n = ne[i])] = o["padding" + n] = e;
    }

    return t && (o.opacity = o.width = e), o;
  }

  function lt(e, t, n) {
    for (var i, o = (ct.tweeners[t] || []).concat(ct.tweeners["*"]), r = 0, a = o.length; r < a; r++) {
      if (i = o[r].call(n, t, e)) return i;
    }
  }

  function ct(e, t, n) {
    var i,
        o,
        r = 0,
        a = ct.prefilters.length,
        s = w.Deferred().always(function () {
      delete l.elem;
    }),
        l = function l() {
      if (o) return !1;

      for (var t = Ze || at(), n = Math.max(0, c.startTime + c.duration - t), i = 1 - (n / c.duration || 0), r = 0, a = c.tweens.length; r < a; r++) {
        c.tweens[r].run(i);
      }

      return s.notifyWith(e, [c, i, n]), i < 1 && a ? n : (a || s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c]), !1);
    },
        c = s.promise({
      elem: e,
      props: w.extend({}, t),
      opts: w.extend(!0, {
        specialEasing: {},
        easing: w.easing._default
      }, n),
      originalProperties: t,
      originalOptions: n,
      startTime: Ze || at(),
      duration: n.duration,
      tweens: [],
      createTween: function createTween(t, n) {
        var i = w.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
        return c.tweens.push(i), i;
      },
      stop: function stop(t) {
        var n = 0,
            i = t ? c.tweens.length : 0;
        if (o) return this;

        for (o = !0; n < i; n++) {
          c.tweens[n].run(1);
        }

        return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this;
      }
    }),
        u = c.props;

    for (function (e, t) {
      var n, i, o, r, a;

      for (n in e) {
        if (o = t[i = Y(n)], r = e[n], Array.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (a = w.cssHooks[i]) && ("expand" in a)) for (n in r = a.expand(r), delete e[i], r) {
          (n in e) || (e[n] = r[n], t[n] = o);
        } else t[i] = o;
      }
    }(u, c.opts.specialEasing); r < a; r++) {
      if (i = ct.prefilters[r].call(c, e, u, c.opts)) return d(i.stop) && (w._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
    }

    return w.map(u, lt, c), d(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), w.fx.timer(w.extend(l, {
      elem: e,
      anim: c,
      queue: c.opts.queue
    })), c;
  }

  w.Animation = w.extend(ct, {
    tweeners: {
      "*": [function (e, t) {
        var n = this.createTween(e, t);
        return se(n.elem, e, te.exec(t), n), n;
      }]
    },
    tweener: function tweener(e, t) {
      d(e) ? (t = e, e = ["*"]) : e = e.match(I);

      for (var n, i = 0, o = e.length; i < o; i++) {
        n = e[i], ct.tweeners[n] = ct.tweeners[n] || [], ct.tweeners[n].unshift(t);
      }
    },
    prefilters: [function (e, t, n) {
      var i,
          o,
          r,
          a,
          s,
          l,
          c,
          u,
          p = "width" in t || "height" in t,
          f = this,
          h = {},
          d = e.style,
          g = e.nodeType && ae(e),
          m = Q.get(e, "fxshow");

      for (i in n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
        a.unqueued || s();
      }), a.unqueued++, f.always(function () {
        f.always(function () {
          a.unqueued--, w.queue(e, "fx").length || a.empty.fire();
        });
      })), t) {
        if (o = t[i], it.test(o)) {
          if (delete t[i], r = r || "toggle" === o, o === (g ? "hide" : "show")) {
            if ("show" !== o || !m || void 0 === m[i]) continue;
            g = !0;
          }

          h[i] = m && m[i] || w.style(e, i);
        }
      }

      if ((l = !w.isEmptyObject(t)) || !w.isEmptyObject(h)) for (i in p && 1 === e.nodeType && (n.overflow = [d.overflow, d.overflowX, d.overflowY], null == (c = m && m.display) && (c = Q.get(e, "display")), "none" === (u = w.css(e, "display")) && (c ? u = c : (ce([e], !0), c = e.style.display || c, u = w.css(e, "display"), ce([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === w.css(e, "float") && (l || (f.done(function () {
        d.display = c;
      }), null == c && (u = d.display, c = "none" === u ? "" : u)), d.display = "inline-block")), n.overflow && (d.overflow = "hidden", f.always(function () {
        d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2];
      })), l = !1, h) {
        l || (m ? "hidden" in m && (g = m.hidden) : m = Q.access(e, "fxshow", {
          display: c
        }), r && (m.hidden = !g), g && ce([e], !0), f.done(function () {
          for (i in g || ce([e]), Q.remove(e, "fxshow"), h) {
            w.style(e, i, h[i]);
          }
        })), l = lt(g ? m[i] : 0, i, f), i in m || (m[i] = l.start, g && (l.end = l.start, l.start = 0));
      }
    }],
    prefilter: function prefilter(e, t) {
      t ? ct.prefilters.unshift(e) : ct.prefilters.push(e);
    }
  }), w.speed = function (e, t, n) {
    var i = e && "object" == _typeof(e) ? w.extend({}, e) : {
      complete: n || !n && t || d(e) && e,
      duration: e,
      easing: n && t || t && !d(t) && t
    };
    return w.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in w.fx.speeds ? i.duration = w.fx.speeds[i.duration] : i.duration = w.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
      d(i.old) && i.old.call(this), i.queue && w.dequeue(this, i.queue);
    }, i;
  }, w.fn.extend({
    fadeTo: function fadeTo(e, t, n, i) {
      return this.filter(ae).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, i);
    },
    animate: function animate(e, t, n, i) {
      var o = w.isEmptyObject(e),
          r = w.speed(t, n, i),
          a = function a() {
        var t = ct(this, w.extend({}, e), r);
        (o || Q.get(this, "finish")) && t.stop(!0);
      };

      return a.finish = a, o || !1 === r.queue ? this.each(a) : this.queue(r.queue, a);
    },
    stop: function stop(e, t, n) {
      var i = function i(e) {
        var t = e.stop;
        delete e.stop, t(n);
      };

      return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each(function () {
        var t = !0,
            o = null != e && e + "queueHooks",
            r = w.timers,
            a = Q.get(this);
        if (o) a[o] && a[o].stop && i(a[o]);else for (o in a) {
          a[o] && a[o].stop && ot.test(o) && i(a[o]);
        }

        for (o = r.length; o--;) {
          r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
        }

        !t && n || w.dequeue(this, e);
      });
    },
    finish: function finish(e) {
      return !1 !== e && (e = e || "fx"), this.each(function () {
        var t,
            n = Q.get(this),
            i = n[e + "queue"],
            o = n[e + "queueHooks"],
            r = w.timers,
            a = i ? i.length : 0;

        for (n.finish = !0, w.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) {
          r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
        }

        for (t = 0; t < a; t++) {
          i[t] && i[t].finish && i[t].finish.call(this);
        }

        delete n.finish;
      });
    }
  }), w.each(["toggle", "show", "hide"], function (e, t) {
    var n = w.fn[t];

    w.fn[t] = function (e, i, o) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(st(t, !0), e, i, o);
    };
  }), w.each({
    slideDown: st("show"),
    slideUp: st("hide"),
    slideToggle: st("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (e, t) {
    w.fn[e] = function (e, n, i) {
      return this.animate(t, e, n, i);
    };
  }), w.timers = [], w.fx.tick = function () {
    var e,
        t = 0,
        n = w.timers;

    for (Ze = Date.now(); t < n.length; t++) {
      (e = n[t])() || n[t] !== e || n.splice(t--, 1);
    }

    n.length || w.fx.stop(), Ze = void 0;
  }, w.fx.timer = function (e) {
    w.timers.push(e), w.fx.start();
  }, w.fx.interval = 13, w.fx.start = function () {
    et || (et = !0, rt());
  }, w.fx.stop = function () {
    et = null;
  }, w.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, w.fn.delay = function (t, n) {
    return t = w.fx && w.fx.speeds[t] || t, n = n || "fx", this.queue(n, function (n, i) {
      var o = e.setTimeout(n, t);

      i.stop = function () {
        e.clearTimeout(o);
      };
    });
  }, tt = m.createElement("input"), nt = m.createElement("select").appendChild(m.createElement("option")), tt.type = "checkbox", h.checkOn = "" !== tt.value, h.optSelected = nt.selected, (tt = m.createElement("input")).value = "t", tt.type = "radio", h.radioValue = "t" === tt.value;
  var ut,
      pt = w.expr.attrHandle;
  w.fn.extend({
    attr: function attr(e, t) {
      return z(this, w.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function removeAttr(e) {
      return this.each(function () {
        w.removeAttr(this, e);
      });
    }
  }), w.extend({
    attr: function attr(e, t, n) {
      var i,
          o,
          r = e.nodeType;
      if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? w.prop(e, t, n) : (1 === r && w.isXMLDoc(e) || (o = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? ut : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = w.find.attr(e, t)) ? void 0 : i);
    },
    attrHooks: {
      type: {
        set: function set(e, t) {
          if (!h.radioValue && "radio" === t && C(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t;
          }
        }
      }
    },
    removeAttr: function removeAttr(e, t) {
      var n,
          i = 0,
          o = t && t.match(I);
      if (o && 1 === e.nodeType) for (; n = o[i++];) {
        e.removeAttribute(n);
      }
    }
  }), ut = {
    set: function set(e, t, n) {
      return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n;
    }
  }, w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var n = pt[t] || w.find.attr;

    pt[t] = function (e, t, i) {
      var o,
          r,
          a = t.toLowerCase();
      return i || (r = pt[a], pt[a] = o, o = null != n(e, t, i) ? a : null, pt[a] = r), o;
    };
  });
  var ft = /^(?:input|select|textarea|button)$/i,
      ht = /^(?:a|area)$/i;

  function dt(e) {
    return (e.match(I) || []).join(" ");
  }

  function gt(e) {
    return e.getAttribute && e.getAttribute("class") || "";
  }

  function mt(e) {
    return Array.isArray(e) ? e : "string" == typeof e && e.match(I) || [];
  }

  w.fn.extend({
    prop: function prop(e, t) {
      return z(this, w.prop, e, t, 1 < arguments.length);
    },
    removeProp: function removeProp(e) {
      return this.each(function () {
        delete this[w.propFix[e] || e];
      });
    }
  }), w.extend({
    prop: function prop(e, t, n) {
      var i,
          o,
          r = e.nodeType;
      if (3 !== r && 8 !== r && 2 !== r) return 1 === r && w.isXMLDoc(e) || (t = w.propFix[t] || t, o = w.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t];
    },
    propHooks: {
      tabIndex: {
        get: function get(e) {
          var t = w.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : ft.test(e.nodeName) || ht.test(e.nodeName) && e.href ? 0 : -1;
        }
      }
    },
    propFix: {
      for: "htmlFor",
      class: "className"
    }
  }), h.optSelected || (w.propHooks.selected = {
    get: function get(e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null;
    },
    set: function set(e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    }
  }), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    w.propFix[this.toLowerCase()] = this;
  }), w.fn.extend({
    addClass: function addClass(e) {
      var t,
          n,
          i,
          o,
          r,
          a,
          s,
          l = 0;
      if (d(e)) return this.each(function (t) {
        w(this).addClass(e.call(this, t, gt(this)));
      });
      if ((t = mt(e)).length) for (; n = this[l++];) {
        if (o = gt(n), i = 1 === n.nodeType && " " + dt(o) + " ") {
          for (a = 0; r = t[a++];) {
            i.indexOf(" " + r + " ") < 0 && (i += r + " ");
          }

          o !== (s = dt(i)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    removeClass: function removeClass(e) {
      var t,
          n,
          i,
          o,
          r,
          a,
          s,
          l = 0;
      if (d(e)) return this.each(function (t) {
        w(this).removeClass(e.call(this, t, gt(this)));
      });
      if (!arguments.length) return this.attr("class", "");
      if ((t = mt(e)).length) for (; n = this[l++];) {
        if (o = gt(n), i = 1 === n.nodeType && " " + dt(o) + " ") {
          for (a = 0; r = t[a++];) {
            for (; -1 < i.indexOf(" " + r + " ");) {
              i = i.replace(" " + r + " ", " ");
            }
          }

          o !== (s = dt(i)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    toggleClass: function toggleClass(e, t) {
      var n = _typeof(e),
          i = "string" === n || Array.isArray(e);

      return "boolean" == typeof t && i ? t ? this.addClass(e) : this.removeClass(e) : d(e) ? this.each(function (n) {
        w(this).toggleClass(e.call(this, n, gt(this), t), t);
      }) : this.each(function () {
        var t, o, r, a;
        if (i) for (o = 0, r = w(this), a = mt(e); t = a[o++];) {
          r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
        } else void 0 !== e && "boolean" !== n || ((t = gt(this)) && Q.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Q.get(this, "__className__") || ""));
      });
    },
    hasClass: function hasClass(e) {
      var t,
          n,
          i = 0;

      for (t = " " + e + " "; n = this[i++];) {
        if (1 === n.nodeType && -1 < (" " + dt(gt(n)) + " ").indexOf(t)) return !0;
      }

      return !1;
    }
  });
  var yt = /\r/g;
  w.fn.extend({
    val: function val(e) {
      var t,
          n,
          i,
          o = this[0];
      return arguments.length ? (i = d(e), this.each(function (n) {
        var o;
        1 === this.nodeType && (null == (o = i ? e.call(this, n, w(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = w.map(o, function (e) {
          return null == e ? "" : e + "";
        })), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o));
      })) : o ? (t = w.valHooks[o.type] || w.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof (n = o.value) ? n.replace(yt, "") : null == n ? "" : n : void 0;
    }
  }), w.extend({
    valHooks: {
      option: {
        get: function get(e) {
          var t = w.find.attr(e, "value");
          return null != t ? t : dt(w.text(e));
        }
      },
      select: {
        get: function get(e) {
          var t,
              n,
              i,
              o = e.options,
              r = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              l = a ? r + 1 : o.length;

          for (i = r < 0 ? l : a ? r : 0; i < l; i++) {
            if (((n = o[i]).selected || i === r) && !n.disabled && (!n.parentNode.disabled || !C(n.parentNode, "optgroup"))) {
              if (t = w(n).val(), a) return t;
              s.push(t);
            }
          }

          return s;
        },
        set: function set(e, t) {
          for (var n, i, o = e.options, r = w.makeArray(t), a = o.length; a--;) {
            ((i = o[a]).selected = -1 < w.inArray(w.valHooks.option.get(i), r)) && (n = !0);
          }

          return n || (e.selectedIndex = -1), r;
        }
      }
    }
  }), w.each(["radio", "checkbox"], function () {
    w.valHooks[this] = {
      set: function set(e, t) {
        if (Array.isArray(t)) return e.checked = -1 < w.inArray(w(e).val(), t);
      }
    }, h.checkOn || (w.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  }), h.focusin = "onfocusin" in e;

  var vt = /^(?:focusinfocus|focusoutblur)$/,
      bt = function bt(e) {
    e.stopPropagation();
  };

  w.extend(w.event, {
    trigger: function trigger(t, n, i, o) {
      var r,
          a,
          s,
          l,
          c,
          p,
          f,
          h,
          y = [i || m],
          v = u.call(t, "type") ? t.type : t,
          b = u.call(t, "namespace") ? t.namespace.split(".") : [];

      if (a = h = s = i = i || m, 3 !== i.nodeType && 8 !== i.nodeType && !vt.test(v + w.event.triggered) && (-1 < v.indexOf(".") && (v = (b = v.split(".")).shift(), b.sort()), c = v.indexOf(":") < 0 && "on" + v, (t = t[w.expando] ? t : new w.Event(v, "object" == _typeof(t) && t)).isTrigger = o ? 2 : 3, t.namespace = b.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : w.makeArray(n, [t]), f = w.event.special[v] || {}, o || !f.trigger || !1 !== f.trigger.apply(i, n))) {
        if (!o && !f.noBubble && !g(i)) {
          for (l = f.delegateType || v, vt.test(l + v) || (a = a.parentNode); a; a = a.parentNode) {
            y.push(a), s = a;
          }

          s === (i.ownerDocument || m) && y.push(s.defaultView || s.parentWindow || e);
        }

        for (r = 0; (a = y[r++]) && !t.isPropagationStopped();) {
          h = a, t.type = 1 < r ? l : f.bindType || v, (p = (Q.get(a, "events") || Object.create(null))[t.type] && Q.get(a, "handle")) && p.apply(a, n), (p = c && a[c]) && p.apply && V(a) && (t.result = p.apply(a, n), !1 === t.result && t.preventDefault());
        }

        return t.type = v, o || t.isDefaultPrevented() || f._default && !1 !== f._default.apply(y.pop(), n) || !V(i) || c && d(i[v]) && !g(i) && ((s = i[c]) && (i[c] = null), w.event.triggered = v, t.isPropagationStopped() && h.addEventListener(v, bt), i[v](), t.isPropagationStopped() && h.removeEventListener(v, bt), w.event.triggered = void 0, s && (i[c] = s)), t.result;
      }
    },
    simulate: function simulate(e, t, n) {
      var i = w.extend(new w.Event(), n, {
        type: e,
        isSimulated: !0
      });
      w.event.trigger(i, null, t);
    }
  }), w.fn.extend({
    trigger: function trigger(e, t) {
      return this.each(function () {
        w.event.trigger(e, t, this);
      });
    },
    triggerHandler: function triggerHandler(e, t) {
      var n = this[0];
      if (n) return w.event.trigger(e, t, n, !0);
    }
  }), h.focusin || w.each({
    focus: "focusin",
    blur: "focusout"
  }, function (e, t) {
    var n = function n(e) {
      w.event.simulate(t, e.target, w.event.fix(e));
    };

    w.event.special[t] = {
      setup: function setup() {
        var i = this.ownerDocument || this.document || this,
            o = Q.access(i, t);
        o || i.addEventListener(e, n, !0), Q.access(i, t, (o || 0) + 1);
      },
      teardown: function teardown() {
        var i = this.ownerDocument || this.document || this,
            o = Q.access(i, t) - 1;
        o ? Q.access(i, t, o) : (i.removeEventListener(e, n, !0), Q.remove(i, t));
      }
    };
  });
  var xt = e.location,
      wt = {
    guid: Date.now()
  },
      _t = /\?/;

  w.parseXML = function (t) {
    var n, i;
    if (!t || "string" != typeof t) return null;

    try {
      n = new e.DOMParser().parseFromString(t, "text/xml");
    } catch (t) {}

    return i = n && n.getElementsByTagName("parsererror")[0], n && !i || w.error("Invalid XML: " + (i ? w.map(i.childNodes, function (e) {
      return e.textContent;
    }).join("\n") : t)), n;
  };

  var kt = /\[\]$/,
      Et = /\r?\n/g,
      Tt = /^(?:submit|button|image|reset|file)$/i,
      St = /^(?:input|select|textarea|keygen)/i;

  function Ct(e, t, n, i) {
    var o;
    if (Array.isArray(t)) w.each(t, function (t, o) {
      n || kt.test(e) ? i(e, o) : Ct(e + "[" + ("object" == _typeof(o) && null != o ? t : "") + "]", o, n, i);
    });else if (n || "object" !== b(t)) i(e, t);else for (o in t) {
      Ct(e + "[" + o + "]", t[o], n, i);
    }
  }

  w.param = function (e, t) {
    var n,
        i = [],
        o = function o(e, t) {
      var n = d(t) ? t() : t;
      i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
    };

    if (null == e) return "";
    if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function () {
      o(this.name, this.value);
    });else for (n in e) {
      Ct(n, e[n], t, o);
    }
    return i.join("&");
  }, w.fn.extend({
    serialize: function serialize() {
      return w.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        var e = w.prop(this, "elements");
        return e ? w.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;
        return this.name && !w(this).is(":disabled") && St.test(this.nodeName) && !Tt.test(e) && (this.checked || !fe.test(e));
      }).map(function (e, t) {
        var n = w(this).val();
        return null == n ? null : Array.isArray(n) ? w.map(n, function (e) {
          return {
            name: t.name,
            value: e.replace(Et, "\r\n")
          };
        }) : {
          name: t.name,
          value: n.replace(Et, "\r\n")
        };
      }).get();
    }
  });
  var At = /%20/g,
      Lt = /#.*$/,
      Ot = /([?&])_=[^&]*/,
      Nt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Mt = /^(?:GET|HEAD)$/,
      jt = /^\/\//,
      Dt = {},
      It = {},
      Pt = "*/".concat("*"),
      Rt = m.createElement("a");

  function Ht(e) {
    return function (t, n) {
      "string" != typeof t && (n = t, t = "*");
      var i,
          o = 0,
          r = t.toLowerCase().match(I) || [];
      if (d(n)) for (; i = r[o++];) {
        "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n);
      }
    };
  }

  function qt(e, t, n, i) {
    var o = {},
        r = e === It;

    function a(s) {
      var l;
      return o[s] = !0, w.each(e[s] || [], function (e, s) {
        var c = s(t, n, i);
        return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1);
      }), l;
    }

    return a(t.dataTypes[0]) || !o["*"] && a("*");
  }

  function Ft(e, t) {
    var n,
        i,
        o = w.ajaxSettings.flatOptions || {};

    for (n in t) {
      void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
    }

    return i && w.extend(!0, e, i), e;
  }

  Rt.href = xt.href, w.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: xt.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(xt.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Pt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": JSON.parse,
        "text xml": w.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ajaxSetup(e, t) {
      return t ? Ft(Ft(e, w.ajaxSettings), t) : Ft(w.ajaxSettings, e);
    },
    ajaxPrefilter: Ht(Dt),
    ajaxTransport: Ht(It),
    ajax: function ajax(t, n) {
      "object" == _typeof(t) && (n = t, t = void 0), n = n || {};
      var i,
          o,
          r,
          a,
          s,
          l,
          c,
          u,
          p,
          f,
          h = w.ajaxSetup({}, n),
          d = h.context || h,
          g = h.context && (d.nodeType || d.jquery) ? w(d) : w.event,
          y = w.Deferred(),
          v = w.Callbacks("once memory"),
          b = h.statusCode || {},
          x = {},
          _ = {},
          k = "canceled",
          E = {
        readyState: 0,
        getResponseHeader: function getResponseHeader(e) {
          var t;

          if (c) {
            if (!a) for (a = {}; t = Nt.exec(r);) {
              a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
            }
            t = a[e.toLowerCase() + " "];
          }

          return null == t ? null : t.join(", ");
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return c ? r : null;
        },
        setRequestHeader: function setRequestHeader(e, t) {
          return null == c && (e = _[e.toLowerCase()] = _[e.toLowerCase()] || e, x[e] = t), this;
        },
        overrideMimeType: function overrideMimeType(e) {
          return null == c && (h.mimeType = e), this;
        },
        statusCode: function statusCode(e) {
          var t;
          if (e) if (c) E.always(e[E.status]);else for (t in e) {
            b[t] = [b[t], e[t]];
          }
          return this;
        },
        abort: function abort(e) {
          var t = e || k;
          return i && i.abort(t), T(0, t), this;
        }
      };

      if (y.promise(E), h.url = ((t || h.url || xt.href) + "").replace(jt, xt.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(I) || [""], null == h.crossDomain) {
        l = m.createElement("a");

        try {
          l.href = h.url, l.href = l.href, h.crossDomain = Rt.protocol + "//" + Rt.host != l.protocol + "//" + l.host;
        } catch (t) {
          h.crossDomain = !0;
        }
      }

      if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), qt(Dt, h, n, E), c) return E;

      for (p in (u = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), o = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(At, "+")) : (f = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (_t.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Ot, "$1"), f = (_t.test(o) ? "&" : "?") + "_=" + wt.guid++ + f), h.url = o + f), h.ifModified && (w.lastModified[o] && E.setRequestHeader("If-Modified-Since", w.lastModified[o]), w.etag[o] && E.setRequestHeader("If-None-Match", w.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && E.setRequestHeader("Content-Type", h.contentType), E.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Pt + "; q=0.01" : "") : h.accepts["*"]), h.headers) {
        E.setRequestHeader(p, h.headers[p]);
      }

      if (h.beforeSend && (!1 === h.beforeSend.call(d, E, h) || c)) return E.abort();

      if (k = "abort", v.add(h.complete), E.done(h.success), E.fail(h.error), i = qt(It, h, n, E)) {
        if (E.readyState = 1, u && g.trigger("ajaxSend", [E, h]), c) return E;
        h.async && 0 < h.timeout && (s = e.setTimeout(function () {
          E.abort("timeout");
        }, h.timeout));

        try {
          c = !1, i.send(x, T);
        } catch (t) {
          if (c) throw t;
          T(-1, t);
        }
      } else T(-1, "No Transport");

      function T(t, n, a, l) {
        var p,
            f,
            m,
            x,
            _,
            k = n;

        c || (c = !0, s && e.clearTimeout(s), i = void 0, r = l || "", E.readyState = 0 < t ? 4 : 0, p = 200 <= t && t < 300 || 304 === t, a && (x = function (e, t, n) {
          for (var i, o, r, a, s = e.contents, l = e.dataTypes; "*" === l[0];) {
            l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
          }

          if (i) for (o in s) {
            if (s[o] && s[o].test(i)) {
              l.unshift(o);
              break;
            }
          }
          if (l[0] in n) r = l[0];else {
            for (o in n) {
              if (!l[0] || e.converters[o + " " + l[0]]) {
                r = o;
                break;
              }

              a || (a = o);
            }

            r = r || a;
          }
          if (r) return r !== l[0] && l.unshift(r), n[r];
        }(h, E, a)), !p && -1 < w.inArray("script", h.dataTypes) && w.inArray("json", h.dataTypes) < 0 && (h.converters["text script"] = function () {}), x = function (e, t, n, i) {
          var o,
              r,
              a,
              s,
              l,
              c = {},
              u = e.dataTypes.slice();
          if (u[1]) for (a in e.converters) {
            c[a.toLowerCase()] = e.converters[a];
          }

          for (r = u.shift(); r;) {
            if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l;else if ("*" !== l && l !== r) {
              if (!(a = c[l + " " + r] || c["* " + r])) for (o in c) {
                if ((s = o.split(" "))[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                  !0 === a ? a = c[o] : !0 !== c[o] && (r = s[0], u.unshift(s[1]));
                  break;
                }
              }
              if (!0 !== a) if (a && e.throws) t = a(t);else try {
                t = a(t);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: a ? e : "No conversion from " + l + " to " + r
                };
              }
            }
          }

          return {
            state: "success",
            data: t
          };
        }(h, x, E, p), p ? (h.ifModified && ((_ = E.getResponseHeader("Last-Modified")) && (w.lastModified[o] = _), (_ = E.getResponseHeader("etag")) && (w.etag[o] = _)), 204 === t || "HEAD" === h.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = x.state, f = x.data, p = !(m = x.error))) : (m = k, !t && k || (k = "error", t < 0 && (t = 0))), E.status = t, E.statusText = (n || k) + "", p ? y.resolveWith(d, [f, k, E]) : y.rejectWith(d, [E, k, m]), E.statusCode(b), b = void 0, u && g.trigger(p ? "ajaxSuccess" : "ajaxError", [E, h, p ? f : m]), v.fireWith(d, [E, k]), u && (g.trigger("ajaxComplete", [E, h]), --w.active || w.event.trigger("ajaxStop")));
      }

      return E;
    },
    getJSON: function getJSON(e, t, n) {
      return w.get(e, t, n, "json");
    },
    getScript: function getScript(e, t) {
      return w.get(e, void 0, t, "script");
    }
  }), w.each(["get", "post"], function (e, t) {
    w[t] = function (e, n, i, o) {
      return d(n) && (o = o || i, i = n, n = void 0), w.ajax(w.extend({
        url: e,
        type: t,
        dataType: o,
        data: n,
        success: i
      }, w.isPlainObject(e) && e));
    };
  }), w.ajaxPrefilter(function (e) {
    var t;

    for (t in e.headers) {
      "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
    }
  }), w._evalUrl = function (e, t, n) {
    return w.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      converters: {
        "text script": function textScript() {}
      },
      dataFilter: function dataFilter(e) {
        w.globalEval(e, t, n);
      }
    });
  }, w.fn.extend({
    wrapAll: function wrapAll(e) {
      var t;
      return this[0] && (d(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        for (var e = this; e.firstElementChild;) {
          e = e.firstElementChild;
        }

        return e;
      }).append(this)), this;
    },
    wrapInner: function wrapInner(e) {
      return d(e) ? this.each(function (t) {
        w(this).wrapInner(e.call(this, t));
      }) : this.each(function () {
        var t = w(this),
            n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e);
      });
    },
    wrap: function wrap(e) {
      var t = d(e);
      return this.each(function (n) {
        w(this).wrapAll(t ? e.call(this, n) : e);
      });
    },
    unwrap: function unwrap(e) {
      return this.parent(e).not("body").each(function () {
        w(this).replaceWith(this.childNodes);
      }), this;
    }
  }), w.expr.pseudos.hidden = function (e) {
    return !w.expr.pseudos.visible(e);
  }, w.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, w.ajaxSettings.xhr = function () {
    try {
      return new e.XMLHttpRequest();
    } catch (e) {}
  };
  var Wt = {
    0: 200,
    1223: 204
  },
      zt = w.ajaxSettings.xhr();
  h.cors = !!zt && "withCredentials" in zt, h.ajax = zt = !!zt, w.ajaxTransport(function (t) {
    var _n, i;

    if (h.cors || zt && !t.crossDomain) return {
      send: function send(o, r) {
        var a,
            s = t.xhr();
        if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (a in t.xhrFields) {
          s[a] = t.xhrFields[a];
        }

        for (a in t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) {
          s.setRequestHeader(a, o[a]);
        }

        _n = function n(e) {
          return function () {
            _n && (_n = i = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? r(0, "error") : r(s.status, s.statusText) : r(Wt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
              binary: s.response
            } : {
              text: s.responseText
            }, s.getAllResponseHeaders()));
          };
        }, s.onload = _n(), i = s.onerror = s.ontimeout = _n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function () {
          4 === s.readyState && e.setTimeout(function () {
            _n && i();
          });
        }, _n = _n("abort");

        try {
          s.send(t.hasContent && t.data || null);
        } catch (o) {
          if (_n) throw o;
        }
      },
      abort: function abort() {
        _n && _n();
      }
    };
  }), w.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1);
  }), w.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(e) {
        return w.globalEval(e), e;
      }
    }
  }), w.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
  }), w.ajaxTransport("script", function (e) {
    var t, _n2;

    if (e.crossDomain || e.scriptAttrs) return {
      send: function send(i, o) {
        t = w("<script>").attr(e.scriptAttrs || {}).prop({
          charset: e.scriptCharset,
          src: e.url
        }).on("load error", _n2 = function n(e) {
          t.remove(), _n2 = null, e && o("error" === e.type ? 404 : 200, e.type);
        }), m.head.appendChild(t[0]);
      },
      abort: function abort() {
        _n2 && _n2();
      }
    };
  });
  var Ut,
      Bt = [],
      Xt = /(=)\?(?=&|$)|\?\?/;
  w.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var e = Bt.pop() || w.expando + "_" + wt.guid++;
      return this[e] = !0, e;
    }
  }), w.ajaxPrefilter("json jsonp", function (t, n, i) {
    var o,
        r,
        a,
        s = !1 !== t.jsonp && (Xt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Xt.test(t.data) && "data");
    if (s || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = d(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Xt, "$1" + o) : !1 !== t.jsonp && (t.url += (_t.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function () {
      return a || w.error(o + " was not called"), a[0];
    }, t.dataTypes[0] = "json", r = e[o], e[o] = function () {
      a = arguments;
    }, i.always(function () {
      void 0 === r ? w(e).removeProp(o) : e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, Bt.push(o)), a && d(r) && r(a[0]), a = r = void 0;
    }), "script";
  }), h.createHTMLDocument = ((Ut = m.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ut.childNodes.length), w.parseHTML = function (e, t, n) {
    return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (h.createHTMLDocument ? ((i = (t = m.implementation.createHTMLDocument("")).createElement("base")).href = m.location.href, t.head.appendChild(i)) : t = m), r = !n && [], (o = A.exec(e)) ? [t.createElement(o[1])] : (o = be([e], t, r), r && r.length && w(r).remove(), w.merge([], o.childNodes)));
    var i, o, r;
  }, w.fn.load = function (e, t, n) {
    var i,
        o,
        r,
        a = this,
        s = e.indexOf(" ");
    return -1 < s && (i = dt(e.slice(s)), e = e.slice(0, s)), d(t) ? (n = t, t = void 0) : t && "object" == _typeof(t) && (o = "POST"), 0 < a.length && w.ajax({
      url: e,
      type: o || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      r = arguments, a.html(i ? w("<div>").append(w.parseHTML(e)).find(i) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, r || [e.responseText, t, e]);
      });
    }), this;
  }, w.expr.pseudos.animated = function (e) {
    return w.grep(w.timers, function (t) {
      return e === t.elem;
    }).length;
  }, w.offset = {
    setOffset: function setOffset(e, t, n) {
      var i,
          o,
          r,
          a,
          s,
          l,
          c = w.css(e, "position"),
          u = w(e),
          p = {};
      "static" === c && (e.style.position = "relative"), s = u.offset(), r = w.css(e, "top"), l = w.css(e, "left"), ("absolute" === c || "fixed" === c) && -1 < (r + l).indexOf("auto") ? (a = (i = u.position()).top, o = i.left) : (a = parseFloat(r) || 0, o = parseFloat(l) || 0), d(t) && (t = t.call(e, n, w.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + o), "using" in t ? t.using.call(e, p) : u.css(p);
    }
  }, w.fn.extend({
    offset: function offset(e) {
      if (arguments.length) return void 0 === e ? this : this.each(function (t) {
        w.offset.setOffset(this, e, t);
      });
      var t,
          n,
          i = this[0];
      return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
        top: t.top + n.pageYOffset,
        left: t.left + n.pageXOffset
      }) : {
        top: 0,
        left: 0
      } : void 0;
    },
    position: function position() {
      if (this[0]) {
        var e,
            t,
            n,
            i = this[0],
            o = {
          top: 0,
          left: 0
        };
        if ("fixed" === w.css(i, "position")) t = i.getBoundingClientRect();else {
          for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position");) {
            e = e.parentNode;
          }

          e && e !== i && 1 === e.nodeType && ((o = w(e).offset()).top += w.css(e, "borderTopWidth", !0), o.left += w.css(e, "borderLeftWidth", !0));
        }
        return {
          top: t.top - o.top - w.css(i, "marginTop", !0),
          left: t.left - o.left - w.css(i, "marginLeft", !0)
        };
      }
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        for (var e = this.offsetParent; e && "static" === w.css(e, "position");) {
          e = e.offsetParent;
        }

        return e || ie;
      });
    }
  }), w.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (e, t) {
    var n = "pageYOffset" === t;

    w.fn[e] = function (i) {
      return z(this, function (e, i, o) {
        var r;
        if (g(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === o) return r ? r[t] : e[i];
        r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : e[i] = o;
      }, e, i, arguments.length);
    };
  }), w.each(["top", "left"], function (e, t) {
    w.cssHooks[t] = Fe(h.pixelPosition, function (e, n) {
      if (n) return n = qe(e, t), Ie.test(n) ? w(e).position()[t] + "px" : n;
    });
  }), w.each({
    Height: "height",
    Width: "width"
  }, function (e, t) {
    w.each({
      padding: "inner" + e,
      content: t,
      "": "outer" + e
    }, function (n, i) {
      w.fn[i] = function (o, r) {
        var a = arguments.length && (n || "boolean" != typeof o),
            s = n || (!0 === o || !0 === r ? "margin" : "border");
        return z(this, function (t, n, o) {
          var r;
          return g(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === o ? w.css(t, n, s) : w.style(t, n, o, s);
        }, t, a ? o : void 0, a);
      };
    });
  }), w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    w.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), w.fn.extend({
    bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function unbind(e, t) {
      return this.off(e, null, t);
    },
    delegate: function delegate(e, t, n, i) {
      return this.on(t, e, n, i);
    },
    undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    },
    hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }
  }), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
    w.fn[t] = function (e, n) {
      return 0 < arguments.length ? this.on(t, null, e, n) : this.trigger(t);
    };
  });
  var Yt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  w.proxy = function (e, t) {
    var n, i, r;
    if ("string" == typeof t && (n = e[t], t = e, e = n), d(e)) return i = o.call(arguments, 2), (r = function r() {
      return e.apply(t || this, i.concat(o.call(arguments)));
    }).guid = e.guid = e.guid || w.guid++, r;
  }, w.holdReady = function (e) {
    e ? w.readyWait++ : w.ready(!0);
  }, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = C, w.isFunction = d, w.isWindow = g, w.camelCase = Y, w.type = b, w.now = Date.now, w.isNumeric = function (e) {
    var t = w.type(e);
    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
  }, w.trim = function (e) {
    return null == e ? "" : (e + "").replace(Yt, "");
  }, "function" == typeof define && define.amd && define("jquery", [], function () {
    return w;
  });
  var Vt = e.jQuery,
      $t = e.$;
  return w.noConflict = function (t) {
    return e.$ === w && (e.$ = $t), t && e.jQuery === w && (e.jQuery = Vt), w;
  }, void 0 === t && (e.jQuery = e.$ = w), w;
}), function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t();
}(this, function () {
  "use strict";

  function e(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }

  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
    return t ? n[t] : n;
  }

  function n(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }

  function i(e) {
    if (!e) return document.body;

    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;

      case "#document":
        return e.body;
    }

    var o = t(e),
        r = o.overflow,
        a = o.overflowX,
        s = o.overflowY;
    return /(auto|scroll|overlay)/.test(r + s + a) ? e : i(n(e));
  }

  function o(e) {
    return e && e.referenceNode ? e.referenceNode : e;
  }

  function r(e) {
    return 11 === e ? K : 10 === e ? G : K || G;
  }

  function a(e) {
    if (!e) return document.documentElement;

    for (var n = r(10) ? document.body : null, i = e.offsetParent || null; i === n && e.nextElementSibling;) {
      i = (e = e.nextElementSibling).offsetParent;
    }

    var o = i && i.nodeName;
    return o && "BODY" !== o && "HTML" !== o ? -1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) && "static" === t(i, "position") ? a(i) : i : e ? e.ownerDocument.documentElement : document.documentElement;
  }

  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode);
  }

  function l(e, t) {
    if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
    var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = n ? e : t,
        o = n ? t : e,
        r = document.createRange();
    r.setStart(i, 0), r.setEnd(o, 0);
    var c = r.commonAncestorContainer;
    if (e !== c && t !== c || i.contains(o)) return function (e) {
      var t = e.nodeName;
      return "BODY" !== t && ("HTML" === t || a(e.firstElementChild) === e);
    }(c) ? c : a(c);
    var u = s(e);
    return u.host ? l(u.host, t) : l(e, s(t).host);
  }

  function c(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
        n = "top" === t ? "scrollTop" : "scrollLeft",
        i = e.nodeName;

    if ("BODY" === i || "HTML" === i) {
      var o = e.ownerDocument.documentElement,
          r = e.ownerDocument.scrollingElement || o;
      return r[n];
    }

    return e[n];
  }

  function u(e, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        i = c(t, "top"),
        o = c(t, "left"),
        r = n ? -1 : 1;
    return e.top += i * r, e.bottom += i * r, e.left += o * r, e.right += o * r, e;
  }

  function p(e, t) {
    var n = "x" === t ? "Left" : "Top",
        i = "Left" == n ? "Right" : "Bottom";
    return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + i + "Width"]);
  }

  function f(e, t, n, i) {
    return Y(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], r(10) ? parseInt(n["offset" + e]) + parseInt(i["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0);
  }

  function h(e) {
    var t = e.body,
        n = e.documentElement,
        i = r(10) && getComputedStyle(n);
    return {
      height: f("Height", t, n, i),
      width: f("Width", t, n, i)
    };
  }

  function d(e) {
    return te({}, e, {
      right: e.left + e.width,
      bottom: e.top + e.height
    });
  }

  function g(e) {
    var n = {};

    try {
      if (r(10)) {
        n = e.getBoundingClientRect();
        var i = c(e, "top"),
            o = c(e, "left");
        n.top += i, n.left += o, n.bottom += i, n.right += o;
      } else n = e.getBoundingClientRect();
    } catch (e) {}

    var a = {
      left: n.left,
      top: n.top,
      width: n.right - n.left,
      height: n.bottom - n.top
    },
        s = "HTML" === e.nodeName ? h(e.ownerDocument) : {},
        l = s.width || e.clientWidth || a.width,
        u = s.height || e.clientHeight || a.height,
        f = e.offsetWidth - l,
        g = e.offsetHeight - u;

    if (f || g) {
      var m = t(e);
      f -= p(m, "x"), g -= p(m, "y"), a.width -= f, a.height -= g;
    }

    return d(a);
  }

  function m(e, n) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        a = r(10),
        s = "HTML" === n.nodeName,
        l = g(e),
        c = g(n),
        p = i(e),
        f = t(n),
        h = parseFloat(f.borderTopWidth),
        m = parseFloat(f.borderLeftWidth);
    o && s && (c.top = Y(c.top, 0), c.left = Y(c.left, 0));
    var y = d({
      top: l.top - c.top - h,
      left: l.left - c.left - m,
      width: l.width,
      height: l.height
    });

    if (y.marginTop = 0, y.marginLeft = 0, !a && s) {
      var v = parseFloat(f.marginTop),
          b = parseFloat(f.marginLeft);
      y.top -= h - v, y.bottom -= h - v, y.left -= m - b, y.right -= m - b, y.marginTop = v, y.marginLeft = b;
    }

    return (a && !o ? n.contains(p) : n === p && "BODY" !== p.nodeName) && (y = u(y, n)), y;
  }

  function y(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        n = e.ownerDocument.documentElement,
        i = m(e, n),
        o = Y(n.clientWidth, window.innerWidth || 0),
        r = Y(n.clientHeight, window.innerHeight || 0),
        a = t ? 0 : c(n),
        s = t ? 0 : c(n, "left"),
        l = {
      top: a - i.top + i.marginTop,
      left: s - i.left + i.marginLeft,
      width: o,
      height: r
    };
    return d(l);
  }

  function v(e) {
    var i = e.nodeName;
    if ("BODY" === i || "HTML" === i) return !1;
    if ("fixed" === t(e, "position")) return !0;
    var o = n(e);
    return !!o && v(o);
  }

  function b(e) {
    if (!e || !e.parentElement || r()) return document.documentElement;

    for (var n = e.parentElement; n && "none" === t(n, "transform");) {
      n = n.parentElement;
    }

    return n || document.documentElement;
  }

  function x(e, t, r, a) {
    var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
        c = {
      top: 0,
      left: 0
    },
        u = s ? b(e) : l(e, o(t));
    if ("viewport" === a) c = y(u, s);else {
      var p;
      "scrollParent" === a ? "BODY" === (p = i(n(t))).nodeName && (p = e.ownerDocument.documentElement) : p = "window" === a ? e.ownerDocument.documentElement : a;
      var f = m(p, u, s);
      if ("HTML" !== p.nodeName || v(u)) c = f;else {
        var d = h(e.ownerDocument),
            g = d.height,
            x = d.width;
        c.top += f.top - f.marginTop, c.bottom = g + f.top, c.left += f.left - f.marginLeft, c.right = x + f.left;
      }
    }
    var w = "number" == typeof (r = r || 0);
    return c.left += w ? r : r.left || 0, c.top += w ? r : r.top || 0, c.right -= w ? r : r.right || 0, c.bottom -= w ? r : r.bottom || 0, c;
  }

  function w(e) {
    return e.width * e.height;
  }

  function _(e, t, n, i, o) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var a = x(n, i, r, o),
        s = {
      top: {
        width: a.width,
        height: t.top - a.top
      },
      right: {
        width: a.right - t.right,
        height: a.height
      },
      bottom: {
        width: a.width,
        height: a.bottom - t.bottom
      },
      left: {
        width: t.left - a.left,
        height: a.height
      }
    },
        l = Object.keys(s).map(function (e) {
      return te({
        key: e
      }, s[e], {
        area: w(s[e])
      });
    }).sort(function (e, t) {
      return t.area - e.area;
    }),
        c = l.filter(function (e) {
      var t = e.width,
          i = e.height;
      return t >= n.clientWidth && i >= n.clientHeight;
    }),
        u = 0 < c.length ? c[0].key : l[0].key,
        p = e.split("-")[1];
    return u + (p ? "-" + p : "");
  }

  function k(e, t, n) {
    var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
        r = i ? b(t) : l(t, o(n));
    return m(n, r, i);
  }

  function E(e) {
    var t = e.ownerDocument.defaultView.getComputedStyle(e),
        n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
        i = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
    return {
      width: e.offsetWidth + i,
      height: e.offsetHeight + n
    };
  }

  function T(e) {
    var t = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }

  function S(e, t, n) {
    n = n.split("-")[0];
    var i = E(e),
        o = {
      width: i.width,
      height: i.height
    },
        r = -1 !== ["right", "left"].indexOf(n),
        a = r ? "top" : "left",
        s = r ? "left" : "top",
        l = r ? "height" : "width",
        c = r ? "width" : "height";
    return o[a] = t[a] + t[l] / 2 - i[l] / 2, o[s] = n === s ? t[s] - i[c] : t[T(s)], o;
  }

  function C(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }

  function A(t, n, i) {
    return (void 0 === i ? t : t.slice(0, function (e, t, n) {
      if (Array.prototype.findIndex) return e.findIndex(function (e) {
        return e[t] === n;
      });
      var i = C(e, function (e) {
        return e[t] === n;
      });
      return e.indexOf(i);
    }(t, "name", i))).forEach(function (t) {
      t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
      var i = t.function || t.fn;
      t.enabled && e(i) && (n.offsets.popper = d(n.offsets.popper), n.offsets.reference = d(n.offsets.reference), n = i(n, t));
    }), n;
  }

  function L() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      e.offsets.reference = k(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = _(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = A(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }

  function O(e, t) {
    return e.some(function (e) {
      var n = e.name;
      return e.enabled && n === t;
    });
  }

  function N(e) {
    for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < t.length; i++) {
      var o = t[i],
          r = o ? "" + o + n : e;
      if (void 0 !== document.body.style[r]) return r;
    }

    return null;
  }

  function M() {
    return this.state.isDestroyed = !0, O(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[N("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }

  function j(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }

  function D(e, t, n, o) {
    var r = "BODY" === e.nodeName,
        a = r ? e.ownerDocument.defaultView : e;
    a.addEventListener(t, n, {
      passive: !0
    }), r || D(i(a.parentNode), t, n, o), o.push(a);
  }

  function I(e, t, n, o) {
    n.updateBound = o, j(e).addEventListener("resize", n.updateBound, {
      passive: !0
    });
    var r = i(e);
    return D(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n;
  }

  function P() {
    this.state.eventsEnabled || (this.state = I(this.reference, this.options, this.state, this.scheduleUpdate));
  }

  function R() {
    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = function (e, t) {
      return j(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function (e) {
        e.removeEventListener("scroll", t.updateBound);
      }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
    }(this.reference, this.state));
  }

  function H(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }

  function q(e, t) {
    Object.keys(t).forEach(function (n) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && H(t[n]) && (i = "px"), e.style[n] = t[n] + i;
    });
  }

  function F(e, t, n) {
    var i = C(e, function (e) {
      return e.name === t;
    }),
        o = !!i && e.some(function (e) {
      return e.name === n && e.enabled && e.order < i.order;
    });

    if (!o) {
      var r = "`" + t + "`";
      console.warn("`" + n + "` modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!");
    }

    return o;
  }

  function W(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        n = oe.indexOf(e),
        i = oe.slice(n + 1).concat(oe.slice(0, n));
    return t ? i.reverse() : i;
  }

  function z(e, t, n, i) {
    var o = [0, 0],
        r = -1 !== ["right", "left"].indexOf(i),
        a = e.split(/(\+|\-)/).map(function (e) {
      return e.trim();
    }),
        s = a.indexOf(C(a, function (e) {
      return -1 !== e.search(/,|\s/);
    }));
    a[s] && -1 === a[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
    var l = /\s*,\s*|\s+/,
        c = -1 === s ? [a] : [a.slice(0, s).concat([a[s].split(l)[0]]), [a[s].split(l)[1]].concat(a.slice(s + 1))];
    return (c = c.map(function (e, i) {
      var o = (1 === i ? !r : r) ? "height" : "width",
          a = !1;
      return e.reduce(function (e, t) {
        return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, a = !0, e) : a ? (e[e.length - 1] += t, a = !1, e) : e.concat(t);
      }, []).map(function (e) {
        return function (e, t, n, i) {
          var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
              r = +o[1],
              a = o[2];
          if (!r) return e;

          if (0 === a.indexOf("%")) {
            var s;

            switch (a) {
              case "%p":
                s = n;
                break;

              case "%":
              case "%r":
              default:
                s = i;
            }

            return d(s)[t] / 100 * r;
          }

          return "vh" === a || "vw" === a ? ("vh" === a ? Y(document.documentElement.clientHeight, window.innerHeight || 0) : Y(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r : r;
        }(e, o, t, n);
      });
    })).forEach(function (e, t) {
      e.forEach(function (n, i) {
        H(n) && (o[t] += n * ("-" === e[i - 1] ? -1 : 1));
      });
    }), o;
  }

  var U = Math.min,
      B = Math.floor,
      X = Math.round,
      Y = Math.max,
      V = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
      $ = function () {
    for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1) {
      if (V && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
    }

    return 0;
  }(),
      Q = V && window.Promise ? function (e) {
    var t = !1;
    return function () {
      t || (t = !0, window.Promise.resolve().then(function () {
        t = !1, e();
      }));
    };
  } : function (e) {
    var t = !1;
    return function () {
      t || (t = !0, setTimeout(function () {
        t = !1, e();
      }, $));
    };
  },
      K = V && !(!window.MSInputMethodContext || !document.documentMode),
      G = V && /MSIE 10/.test(navigator.userAgent),
      J = function J(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  },
      Z = function () {
    function e(e, t) {
      for (var n, i = 0; i < t.length; i++) {
        (n = t[i]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
      }
    }

    return function (t, n, i) {
      return n && e(t.prototype, n), i && e(t, i), t;
    };
  }(),
      ee = function ee(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  },
      te = Object.assign || function (e) {
    for (var t, n = 1; n < arguments.length; n++) {
      for (var i in t = arguments[n]) {
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      }
    }

    return e;
  },
      ne = V && /Firefox/i.test(navigator.userAgent),
      ie = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
      oe = ie.slice(3),
      re = "flip",
      ae = "clockwise",
      se = "counterclockwise",
      le = function () {
    function t(n, i) {
      var o = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      J(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(o.update);
      }, this.update = Q(this.update.bind(this)), this.options = te({}, t.Defaults, r), this.state = {
        isDestroyed: !1,
        isCreated: !1,
        scrollParents: []
      }, this.reference = n && n.jquery ? n[0] : n, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(te({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
        o.options.modifiers[e] = te({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
        return te({
          name: e
        }, o.options.modifiers[e]);
      }).sort(function (e, t) {
        return e.order - t.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && e(t.onLoad) && t.onLoad(o.reference, o.popper, o.options, t, o.state);
      }), this.update();
      var a = this.options.eventsEnabled;
      a && this.enableEventListeners(), this.state.eventsEnabled = a;
    }

    return Z(t, [{
      key: "update",
      value: function value() {
        return L.call(this);
      }
    }, {
      key: "destroy",
      value: function value() {
        return M.call(this);
      }
    }, {
      key: "enableEventListeners",
      value: function value() {
        return P.call(this);
      }
    }, {
      key: "disableEventListeners",
      value: function value() {
        return R.call(this);
      }
    }]), t;
  }();

  return le.Utils = ("undefined" == typeof window ? global : window).PopperUtils, le.placements = ie, le.Defaults = {
    placement: "bottom",
    positionFixed: !1,
    eventsEnabled: !0,
    removeOnDestroy: !1,
    onCreate: function onCreate() {},
    onUpdate: function onUpdate() {},
    modifiers: {
      shift: {
        order: 100,
        enabled: !0,
        fn: function fn(e) {
          var t = e.placement,
              n = t.split("-")[0],
              i = t.split("-")[1];

          if (i) {
            var o = e.offsets,
                r = o.reference,
                a = o.popper,
                s = -1 !== ["bottom", "top"].indexOf(n),
                l = s ? "left" : "top",
                c = s ? "width" : "height",
                u = {
              start: ee({}, l, r[l]),
              end: ee({}, l, r[l] + r[c] - a[c])
            };
            e.offsets.popper = te({}, a, u[i]);
          }

          return e;
        }
      },
      offset: {
        order: 200,
        enabled: !0,
        fn: function fn(e, t) {
          var n,
              i = t.offset,
              o = e.placement,
              r = e.offsets,
              a = r.popper,
              s = r.reference,
              l = o.split("-")[0];
          return n = H(+i) ? [+i, 0] : z(i, a, s, l), "left" === l ? (a.top += n[0], a.left -= n[1]) : "right" === l ? (a.top += n[0], a.left += n[1]) : "top" === l ? (a.left += n[0], a.top -= n[1]) : "bottom" === l && (a.left += n[0], a.top += n[1]), e.popper = a, e;
        },
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: !0,
        fn: function fn(e, t) {
          var n = t.boundariesElement || a(e.instance.popper);
          e.instance.reference === n && (n = a(n));
          var i = N("transform"),
              o = e.instance.popper.style,
              r = o.top,
              s = o.left,
              l = o[i];
          o.top = "", o.left = "", o[i] = "";
          var c = x(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
          o.top = r, o.left = s, o[i] = l, t.boundaries = c;
          var u = t.priority,
              p = e.offsets.popper,
              f = {
            primary: function primary(e) {
              var n = p[e];
              return p[e] < c[e] && !t.escapeWithReference && (n = Y(p[e], c[e])), ee({}, e, n);
            },
            secondary: function secondary(e) {
              var n = "right" === e ? "left" : "top",
                  i = p[n];
              return p[e] > c[e] && !t.escapeWithReference && (i = U(p[n], c[e] - ("right" === e ? p.width : p.height))), ee({}, n, i);
            }
          };
          return u.forEach(function (e) {
            var t = -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
            p = te({}, p, f[t](e));
          }), e.offsets.popper = p, e;
        },
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent"
      },
      keepTogether: {
        order: 400,
        enabled: !0,
        fn: function fn(e) {
          var t = e.offsets,
              n = t.popper,
              i = t.reference,
              o = e.placement.split("-")[0],
              r = B,
              a = -1 !== ["top", "bottom"].indexOf(o),
              s = a ? "right" : "bottom",
              l = a ? "left" : "top",
              c = a ? "width" : "height";
          return n[s] < r(i[l]) && (e.offsets.popper[l] = r(i[l]) - n[c]), n[l] > r(i[s]) && (e.offsets.popper[l] = r(i[s])), e;
        }
      },
      arrow: {
        order: 500,
        enabled: !0,
        fn: function fn(e, n) {
          var i;
          if (!F(e.instance.modifiers, "arrow", "keepTogether")) return e;
          var o = n.element;

          if ("string" == typeof o) {
            if (!(o = e.instance.popper.querySelector(o))) return e;
          } else if (!e.instance.popper.contains(o)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;

          var r = e.placement.split("-")[0],
              a = e.offsets,
              s = a.popper,
              l = a.reference,
              c = -1 !== ["left", "right"].indexOf(r),
              u = c ? "height" : "width",
              p = c ? "Top" : "Left",
              f = p.toLowerCase(),
              h = c ? "left" : "top",
              g = c ? "bottom" : "right",
              m = E(o)[u];
          l[g] - m < s[f] && (e.offsets.popper[f] -= s[f] - (l[g] - m)), l[f] + m > s[g] && (e.offsets.popper[f] += l[f] + m - s[g]), e.offsets.popper = d(e.offsets.popper);
          var y = l[f] + l[u] / 2 - m / 2,
              v = t(e.instance.popper),
              b = parseFloat(v["margin" + p]),
              x = parseFloat(v["border" + p + "Width"]),
              w = y - e.offsets.popper[f] - b - x;
          return w = Y(U(s[u] - m, w), 0), e.arrowElement = o, e.offsets.arrow = (ee(i = {}, f, X(w)), ee(i, h, ""), i), e;
        },
        element: "[x-arrow]"
      },
      flip: {
        order: 600,
        enabled: !0,
        fn: function fn(e, t) {
          if (O(e.instance.modifiers, "inner")) return e;
          if (e.flipped && e.placement === e.originalPlacement) return e;
          var n = x(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
              i = e.placement.split("-")[0],
              o = T(i),
              r = e.placement.split("-")[1] || "",
              a = [];

          switch (t.behavior) {
            case re:
              a = [i, o];
              break;

            case ae:
              a = W(i);
              break;

            case se:
              a = W(i, !0);
              break;

            default:
              a = t.behavior;
          }

          return a.forEach(function (s, l) {
            if (i !== s || a.length === l + 1) return e;
            i = e.placement.split("-")[0], o = T(i);
            var c = e.offsets.popper,
                u = e.offsets.reference,
                p = B,
                f = "left" === i && p(c.right) > p(u.left) || "right" === i && p(c.left) < p(u.right) || "top" === i && p(c.bottom) > p(u.top) || "bottom" === i && p(c.top) < p(u.bottom),
                h = p(c.left) < p(n.left),
                d = p(c.right) > p(n.right),
                g = p(c.top) < p(n.top),
                m = p(c.bottom) > p(n.bottom),
                y = "left" === i && h || "right" === i && d || "top" === i && g || "bottom" === i && m,
                v = -1 !== ["top", "bottom"].indexOf(i),
                b = !!t.flipVariations && (v && "start" === r && h || v && "end" === r && d || !v && "start" === r && g || !v && "end" === r && m),
                x = !!t.flipVariationsByContent && (v && "start" === r && d || v && "end" === r && h || !v && "start" === r && m || !v && "end" === r && g),
                w = b || x;
            (f || y || w) && (e.flipped = !0, (f || y) && (i = a[l + 1]), w && (r = function (e) {
              return "end" === e ? "start" : "start" === e ? "end" : e;
            }(r)), e.placement = i + (r ? "-" + r : ""), e.offsets.popper = te({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = A(e.instance.modifiers, e, "flip"));
          }), e;
        },
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport",
        flipVariations: !1,
        flipVariationsByContent: !1
      },
      inner: {
        order: 700,
        enabled: !1,
        fn: function fn(e) {
          var t = e.placement,
              n = t.split("-")[0],
              i = e.offsets,
              o = i.popper,
              r = i.reference,
              a = -1 !== ["left", "right"].indexOf(n),
              s = -1 === ["top", "left"].indexOf(n);
          return o[a ? "left" : "top"] = r[n] - (s ? o[a ? "width" : "height"] : 0), e.placement = T(t), e.offsets.popper = d(o), e;
        }
      },
      hide: {
        order: 800,
        enabled: !0,
        fn: function fn(e) {
          if (!F(e.instance.modifiers, "hide", "preventOverflow")) return e;
          var t = e.offsets.reference,
              n = C(e.instance.modifiers, function (e) {
            return "preventOverflow" === e.name;
          }).boundaries;

          if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
            if (!0 === e.hide) return e;
            e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
          } else {
            if (!1 === e.hide) return e;
            e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
          }

          return e;
        }
      },
      computeStyle: {
        order: 850,
        enabled: !0,
        fn: function fn(e, t) {
          var n = t.x,
              i = t.y,
              o = e.offsets.popper,
              r = C(e.instance.modifiers, function (e) {
            return "applyStyle" === e.name;
          }).gpuAcceleration;
          void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");

          var s,
              l,
              c = void 0 === r ? t.gpuAcceleration : r,
              u = a(e.instance.popper),
              p = g(u),
              f = {
            position: o.position
          },
              h = function (e, t) {
            var n = e.offsets,
                i = n.popper,
                o = n.reference,
                r = X,
                a = function a(e) {
              return e;
            },
                s = r(o.width),
                l = r(i.width),
                c = -1 !== ["left", "right"].indexOf(e.placement),
                u = -1 !== e.placement.indexOf("-"),
                p = t ? c || u || s % 2 == l % 2 ? r : B : a,
                f = t ? r : a;

            return {
              left: p(1 == s % 2 && 1 == l % 2 && !u && t ? i.left - 1 : i.left),
              top: f(i.top),
              bottom: f(i.bottom),
              right: p(i.right)
            };
          }(e, 2 > window.devicePixelRatio || !ne),
              d = "bottom" === n ? "top" : "bottom",
              m = "right" === i ? "left" : "right",
              y = N("transform");

          if (l = "bottom" == d ? "HTML" === u.nodeName ? -u.clientHeight + h.bottom : -p.height + h.bottom : h.top, s = "right" == m ? "HTML" === u.nodeName ? -u.clientWidth + h.right : -p.width + h.right : h.left, c && y) f[y] = "translate3d(" + s + "px, " + l + "px, 0)", f[d] = 0, f[m] = 0, f.willChange = "transform";else {
            var v = "bottom" == d ? -1 : 1,
                b = "right" == m ? -1 : 1;
            f[d] = l * v, f[m] = s * b, f.willChange = d + ", " + m;
          }
          var x = {
            "x-placement": e.placement
          };
          return e.attributes = te({}, x, e.attributes), e.styles = te({}, f, e.styles), e.arrowStyles = te({}, e.offsets.arrow, e.arrowStyles), e;
        },
        gpuAcceleration: !0,
        x: "bottom",
        y: "right"
      },
      applyStyle: {
        order: 900,
        enabled: !0,
        fn: function fn(e) {
          return q(e.instance.popper, e.styles), function (e, t) {
            Object.keys(t).forEach(function (n) {
              !1 === t[n] ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
            });
          }(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && q(e.arrowElement, e.arrowStyles), e;
        },
        onLoad: function onLoad(e, t, n, i, o) {
          var r = k(o, t, e, n.positionFixed),
              a = _(n.placement, r, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);

          return t.setAttribute("x-placement", a), q(t, {
            position: n.positionFixed ? "fixed" : "absolute"
          }), n;
        },
        gpuAcceleration: void 0
      }
    }
  }, le;
}), function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? t(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = {}, e.jQuery, e.Popper);
}(this, function (e, t, n) {
  "use strict";

  function i(e) {
    return e && "object" == _typeof(e) && "default" in e ? e : {
      default: e
    };
  }

  var o = i(t),
      r = i(n);

  function a(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  function s(e, t, n) {
    return t && a(e.prototype, t), n && a(e, n), e;
  }

  function l() {
    return (l = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  var c = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function getUID(e) {
      do {
        e += ~~(1e6 * Math.random());
      } while (document.getElementById(e));

      return e;
    },
    getSelectorFromElement: function getSelectorFromElement(e) {
      var t = e.getAttribute("data-target");

      if (!t || "#" === t) {
        var n = e.getAttribute("href");
        t = n && "#" !== n ? n.trim() : "";
      }

      try {
        return document.querySelector(t) ? t : null;
      } catch (e) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(e) {
      if (!e) return 0;
      var t = o.default(e).css("transition-duration"),
          n = o.default(e).css("transition-delay"),
          i = parseFloat(t),
          r = parseFloat(n);
      return i || r ? (t = t.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(t) + parseFloat(n))) : 0;
    },
    reflow: function reflow(e) {
      return e.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(e) {
      o.default(e).trigger("transitionend");
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean("transitionend");
    },
    isElement: function isElement(e) {
      return (e[0] || e).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(e, t, n) {
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          var o = n[i],
              r = t[i],
              a = r && c.isElement(r) ? "element" : null === (s = r) || void 0 === s ? "" + s : {}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
          if (!new RegExp(o).test(a)) throw new Error(e.toUpperCase() + ': Option "' + i + '" provided type "' + a + '" but expected type "' + o + '".');
        }
      }

      var s;
    },
    findShadowRoot: function findShadowRoot(e) {
      if (!document.documentElement.attachShadow) return null;

      if ("function" == typeof e.getRootNode) {
        var t = e.getRootNode();
        return t instanceof ShadowRoot ? t : null;
      }

      return e instanceof ShadowRoot ? e : e.parentNode ? c.findShadowRoot(e.parentNode) : null;
    },
    jQueryDetection: function jQueryDetection() {
      if (void 0 === o.default) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
      var e = o.default.fn.jquery.split(" ")[0].split(".");
      if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
    }
  };
  c.jQueryDetection(), o.default.fn.emulateTransitionEnd = function (e) {
    var t = this,
        n = !1;
    return o.default(this).one(c.TRANSITION_END, function () {
      n = !0;
    }), setTimeout(function () {
      n || c.triggerTransitionEnd(t);
    }, e), this;
  }, o.default.event.special[c.TRANSITION_END] = {
    bindType: "transitionend",
    delegateType: "transitionend",
    handle: function handle(e) {
      if (o.default(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
    }
  };

  var u = "alert",
      p = o.default.fn[u],
      f = function () {
    function e(e) {
      this._element = e;
    }

    var t = e.prototype;
    return t.close = function (e) {
      var t = this._element;
      e && (t = this._getRootElement(e)), this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t);
    }, t.dispose = function () {
      o.default.removeData(this._element, "bs.alert"), this._element = null;
    }, t._getRootElement = function (e) {
      var t = c.getSelectorFromElement(e),
          n = !1;
      return t && (n = document.querySelector(t)), n || (n = o.default(e).closest(".alert")[0]), n;
    }, t._triggerCloseEvent = function (e) {
      var t = o.default.Event("close.bs.alert");
      return o.default(e).trigger(t), t;
    }, t._removeElement = function (e) {
      var t = this;

      if (o.default(e).removeClass("show"), o.default(e).hasClass("fade")) {
        var n = c.getTransitionDurationFromElement(e);
        o.default(e).one(c.TRANSITION_END, function (n) {
          return t._destroyElement(e, n);
        }).emulateTransitionEnd(n);
      } else this._destroyElement(e);
    }, t._destroyElement = function (e) {
      o.default(e).detach().trigger("closed.bs.alert").remove();
    }, e._jQueryInterface = function (t) {
      return this.each(function () {
        var n = o.default(this),
            i = n.data("bs.alert");
        i || (i = new e(this), n.data("bs.alert", i)), "close" === t && i[t](this);
      });
    }, e._handleDismiss = function (e) {
      return function (t) {
        t && t.preventDefault(), e.close(this);
      };
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }]), e;
  }();

  o.default(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', f._handleDismiss(new f())), o.default.fn[u] = f._jQueryInterface, o.default.fn[u].Constructor = f, o.default.fn[u].noConflict = function () {
    return o.default.fn[u] = p, f._jQueryInterface;
  };

  var h = o.default.fn.button,
      d = function () {
    function e(e) {
      this._element = e, this.shouldAvoidTriggerChange = !1;
    }

    var t = e.prototype;
    return t.toggle = function () {
      var e = !0,
          t = !0,
          n = o.default(this._element).closest('[data-toggle="buttons"]')[0];

      if (n) {
        var i = this._element.querySelector('input:not([type="hidden"])');

        if (i) {
          if ("radio" === i.type) if (i.checked && this._element.classList.contains("active")) e = !1;else {
            var r = n.querySelector(".active");
            r && o.default(r).removeClass("active");
          }
          e && ("checkbox" !== i.type && "radio" !== i.type || (i.checked = !this._element.classList.contains("active")), this.shouldAvoidTriggerChange || o.default(i).trigger("change")), i.focus(), t = !1;
        }
      }

      this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (t && this._element.setAttribute("aria-pressed", !this._element.classList.contains("active")), e && o.default(this._element).toggleClass("active"));
    }, t.dispose = function () {
      o.default.removeData(this._element, "bs.button"), this._element = null;
    }, e._jQueryInterface = function (t, n) {
      return this.each(function () {
        var i = o.default(this),
            r = i.data("bs.button");
        r || (r = new e(this), i.data("bs.button", r)), r.shouldAvoidTriggerChange = n, "toggle" === t && r[t]();
      });
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }]), e;
  }();

  o.default(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (e) {
    var t = e.target,
        n = t;
    if (o.default(t).hasClass("btn") || (t = o.default(t).closest(".btn")[0]), !t || t.hasAttribute("disabled") || t.classList.contains("disabled")) e.preventDefault();else {
      var i = t.querySelector('input:not([type="hidden"])');
      if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) return void e.preventDefault();
      "INPUT" !== n.tagName && "LABEL" === t.tagName || d._jQueryInterface.call(o.default(t), "toggle", "INPUT" === n.tagName);
    }
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
    var t = o.default(e.target).closest(".btn")[0];
    o.default(t).toggleClass("focus", /^focus(in)?$/.test(e.type));
  }), o.default(window).on("load.bs.button.data-api", function () {
    for (var e = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), t = 0, n = e.length; t < n; t++) {
      var i = e[t],
          o = i.querySelector('input:not([type="hidden"])');
      o.checked || o.hasAttribute("checked") ? i.classList.add("active") : i.classList.remove("active");
    }

    for (var r = 0, a = (e = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < a; r++) {
      var s = e[r];
      "true" === s.getAttribute("aria-pressed") ? s.classList.add("active") : s.classList.remove("active");
    }
  }), o.default.fn.button = d._jQueryInterface, o.default.fn.button.Constructor = d, o.default.fn.button.noConflict = function () {
    return o.default.fn.button = h, d._jQueryInterface;
  };

  var g = "carousel",
      m = o.default.fn[g],
      y = {
    interval: 5e3,
    keyboard: !0,
    slide: !1,
    pause: "hover",
    wrap: !0,
    touch: !0
  },
      v = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    slide: "(boolean|string)",
    pause: "(string|boolean)",
    wrap: "boolean",
    touch: "boolean"
  },
      b = {
    TOUCH: "touch",
    PEN: "pen"
  },
      x = function () {
    function e(e, t) {
      this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._element = e, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners();
    }

    var t = e.prototype;
    return t.next = function () {
      this._isSliding || this._slide("next");
    }, t.nextWhenVisible = function () {
      var e = o.default(this._element);
      !document.hidden && e.is(":visible") && "hidden" !== e.css("visibility") && this.next();
    }, t.prev = function () {
      this._isSliding || this._slide("prev");
    }, t.pause = function (e) {
      e || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (c.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
    }, t.cycle = function (e) {
      e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
    }, t.to = function (e) {
      var t = this;
      this._activeElement = this._element.querySelector(".active.carousel-item");

      var n = this._getItemIndex(this._activeElement);

      if (!(e > this._items.length - 1 || e < 0)) if (this._isSliding) o.default(this._element).one("slid.bs.carousel", function () {
        return t.to(e);
      });else {
        if (n === e) return this.pause(), void this.cycle();
        var i = e > n ? "next" : "prev";

        this._slide(i, this._items[e]);
      }
    }, t.dispose = function () {
      o.default(this._element).off(".bs.carousel"), o.default.removeData(this._element, "bs.carousel"), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
    }, t._getConfig = function (e) {
      return e = l({}, y, e), c.typeCheckConfig(g, e, v), e;
    }, t._handleSwipe = function () {
      var e = Math.abs(this.touchDeltaX);

      if (!(e <= 40)) {
        var t = e / this.touchDeltaX;
        this.touchDeltaX = 0, t > 0 && this.prev(), t < 0 && this.next();
      }
    }, t._addEventListeners = function () {
      var e = this;
      this._config.keyboard && o.default(this._element).on("keydown.bs.carousel", function (t) {
        return e._keydown(t);
      }), "hover" === this._config.pause && o.default(this._element).on("mouseenter.bs.carousel", function (t) {
        return e.pause(t);
      }).on("mouseleave.bs.carousel", function (t) {
        return e.cycle(t);
      }), this._config.touch && this._addTouchEventListeners();
    }, t._addTouchEventListeners = function () {
      var e = this;

      if (this._touchSupported) {
        var t = function t(_t3) {
          e._pointerEvent && b[_t3.originalEvent.pointerType.toUpperCase()] ? e.touchStartX = _t3.originalEvent.clientX : e._pointerEvent || (e.touchStartX = _t3.originalEvent.touches[0].clientX);
        },
            n = function n(t) {
          e._pointerEvent && b[t.originalEvent.pointerType.toUpperCase()] && (e.touchDeltaX = t.originalEvent.clientX - e.touchStartX), e._handleSwipe(), "hover" === e._config.pause && (e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
            return e.cycle(t);
          }, 500 + e._config.interval));
        };

        o.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function (e) {
          return e.preventDefault();
        }), this._pointerEvent ? (o.default(this._element).on("pointerdown.bs.carousel", function (e) {
          return t(e);
        }), o.default(this._element).on("pointerup.bs.carousel", function (e) {
          return n(e);
        }), this._element.classList.add("pointer-event")) : (o.default(this._element).on("touchstart.bs.carousel", function (e) {
          return t(e);
        }), o.default(this._element).on("touchmove.bs.carousel", function (t) {
          return function (t) {
            t.originalEvent.touches && t.originalEvent.touches.length > 1 ? e.touchDeltaX = 0 : e.touchDeltaX = t.originalEvent.touches[0].clientX - e.touchStartX;
          }(t);
        }), o.default(this._element).on("touchend.bs.carousel", function (e) {
          return n(e);
        }));
      }
    }, t._keydown = function (e) {
      if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
        case 37:
          e.preventDefault(), this.prev();
          break;

        case 39:
          e.preventDefault(), this.next();
      }
    }, t._getItemIndex = function (e) {
      return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(e);
    }, t._getItemByDirection = function (e, t) {
      var n = "next" === e,
          i = "prev" === e,
          o = this._getItemIndex(t),
          r = this._items.length - 1;

      if ((i && 0 === o || n && o === r) && !this._config.wrap) return t;
      var a = (o + ("prev" === e ? -1 : 1)) % this._items.length;
      return -1 === a ? this._items[this._items.length - 1] : this._items[a];
    }, t._triggerSlideEvent = function (e, t) {
      var n = this._getItemIndex(e),
          i = this._getItemIndex(this._element.querySelector(".active.carousel-item")),
          r = o.default.Event("slide.bs.carousel", {
        relatedTarget: e,
        direction: t,
        from: i,
        to: n
      });

      return o.default(this._element).trigger(r), r;
    }, t._setActiveIndicatorElement = function (e) {
      if (this._indicatorsElement) {
        var t = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
        o.default(t).removeClass("active");

        var n = this._indicatorsElement.children[this._getItemIndex(e)];

        n && o.default(n).addClass("active");
      }
    }, t._updateInterval = function () {
      var e = this._activeElement || this._element.querySelector(".active.carousel-item");

      if (e) {
        var t = parseInt(e.getAttribute("data-interval"), 10);
        t ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = t) : this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    }, t._slide = function (e, t) {
      var n,
          i,
          r,
          a = this,
          s = this._element.querySelector(".active.carousel-item"),
          l = this._getItemIndex(s),
          u = t || s && this._getItemByDirection(e, s),
          p = this._getItemIndex(u),
          f = Boolean(this._interval);

      if ("next" === e ? (n = "carousel-item-left", i = "carousel-item-next", r = "left") : (n = "carousel-item-right", i = "carousel-item-prev", r = "right"), u && o.default(u).hasClass("active")) this._isSliding = !1;else if (!this._triggerSlideEvent(u, r).isDefaultPrevented() && s && u) {
        this._isSliding = !0, f && this.pause(), this._setActiveIndicatorElement(u), this._activeElement = u;
        var h = o.default.Event("slid.bs.carousel", {
          relatedTarget: u,
          direction: r,
          from: l,
          to: p
        });

        if (o.default(this._element).hasClass("slide")) {
          o.default(u).addClass(i), c.reflow(u), o.default(s).addClass(n), o.default(u).addClass(n);
          var d = c.getTransitionDurationFromElement(s);
          o.default(s).one(c.TRANSITION_END, function () {
            o.default(u).removeClass(n + " " + i).addClass("active"), o.default(s).removeClass("active " + i + " " + n), a._isSliding = !1, setTimeout(function () {
              return o.default(a._element).trigger(h);
            }, 0);
          }).emulateTransitionEnd(d);
        } else o.default(s).removeClass("active"), o.default(u).addClass("active"), this._isSliding = !1, o.default(this._element).trigger(h);

        f && this.cycle();
      }
    }, e._jQueryInterface = function (t) {
      return this.each(function () {
        var n = o.default(this).data("bs.carousel"),
            i = l({}, y, o.default(this).data());
        "object" == _typeof(t) && (i = l({}, i, t));
        var r = "string" == typeof t ? t : i.slide;
        if (n || (n = new e(this, i), o.default(this).data("bs.carousel", n)), "number" == typeof t) n.to(t);else if ("string" == typeof r) {
          if (void 0 === n[r]) throw new TypeError('No method named "' + r + '"');
          n[r]();
        } else i.interval && i.ride && (n.pause(), n.cycle());
      });
    }, e._dataApiClickHandler = function (t) {
      var n = c.getSelectorFromElement(this);

      if (n) {
        var i = o.default(n)[0];

        if (i && o.default(i).hasClass("carousel")) {
          var r = l({}, o.default(i).data(), o.default(this).data()),
              a = this.getAttribute("data-slide-to");
          a && (r.interval = !1), e._jQueryInterface.call(o.default(i), r), a && o.default(i).data("bs.carousel").to(a), t.preventDefault();
        }
      }
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }, {
      key: "Default",
      get: function get() {
        return y;
      }
    }]), e;
  }();

  o.default(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", x._dataApiClickHandler), o.default(window).on("load.bs.carousel.data-api", function () {
    for (var e = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), t = 0, n = e.length; t < n; t++) {
      var i = o.default(e[t]);

      x._jQueryInterface.call(i, i.data());
    }
  }), o.default.fn[g] = x._jQueryInterface, o.default.fn[g].Constructor = x, o.default.fn[g].noConflict = function () {
    return o.default.fn[g] = m, x._jQueryInterface;
  };

  var w = "collapse",
      _ = o.default.fn[w],
      k = {
    toggle: !0,
    parent: ""
  },
      E = {
    toggle: "boolean",
    parent: "(string|element)"
  },
      T = function () {
    function e(e, t) {
      this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));

      for (var n = [].slice.call(document.querySelectorAll('[data-toggle="collapse"]')), i = 0, o = n.length; i < o; i++) {
        var r = n[i],
            a = c.getSelectorFromElement(r),
            s = [].slice.call(document.querySelectorAll(a)).filter(function (t) {
          return t === e;
        });
        null !== a && s.length > 0 && (this._selector = a, this._triggerArray.push(r));
      }

      this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
    }

    var t = e.prototype;
    return t.toggle = function () {
      o.default(this._element).hasClass("show") ? this.hide() : this.show();
    }, t.show = function () {
      var t,
          n,
          i = this;

      if (!(this._isTransitioning || o.default(this._element).hasClass("show") || (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (e) {
        return "string" == typeof i._config.parent ? e.getAttribute("data-parent") === i._config.parent : e.classList.contains("collapse");
      })).length && (t = null), t && (n = o.default(t).not(this._selector).data("bs.collapse")) && n._isTransitioning))) {
        var r = o.default.Event("show.bs.collapse");

        if (o.default(this._element).trigger(r), !r.isDefaultPrevented()) {
          t && (e._jQueryInterface.call(o.default(t).not(this._selector), "hide"), n || o.default(t).data("bs.collapse", null));

          var a = this._getDimension();

          o.default(this._element).removeClass("collapse").addClass("collapsing"), this._element.style[a] = 0, this._triggerArray.length && o.default(this._triggerArray).removeClass("collapsed").attr("aria-expanded", !0), this.setTransitioning(!0);
          var s = "scroll" + (a[0].toUpperCase() + a.slice(1)),
              l = c.getTransitionDurationFromElement(this._element);
          o.default(this._element).one(c.TRANSITION_END, function () {
            o.default(i._element).removeClass("collapsing").addClass("collapse show"), i._element.style[a] = "", i.setTransitioning(!1), o.default(i._element).trigger("shown.bs.collapse");
          }).emulateTransitionEnd(l), this._element.style[a] = this._element[s] + "px";
        }
      }
    }, t.hide = function () {
      var e = this;

      if (!this._isTransitioning && o.default(this._element).hasClass("show")) {
        var t = o.default.Event("hide.bs.collapse");

        if (o.default(this._element).trigger(t), !t.isDefaultPrevented()) {
          var n = this._getDimension();

          this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", c.reflow(this._element), o.default(this._element).addClass("collapsing").removeClass("collapse show");
          var i = this._triggerArray.length;
          if (i > 0) for (var r = 0; r < i; r++) {
            var a = this._triggerArray[r],
                s = c.getSelectorFromElement(a);
            null !== s && (o.default([].slice.call(document.querySelectorAll(s))).hasClass("show") || o.default(a).addClass("collapsed").attr("aria-expanded", !1));
          }
          this.setTransitioning(!0), this._element.style[n] = "";
          var l = c.getTransitionDurationFromElement(this._element);
          o.default(this._element).one(c.TRANSITION_END, function () {
            e.setTransitioning(!1), o.default(e._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
          }).emulateTransitionEnd(l);
        }
      }
    }, t.setTransitioning = function (e) {
      this._isTransitioning = e;
    }, t.dispose = function () {
      o.default.removeData(this._element, "bs.collapse"), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
    }, t._getConfig = function (e) {
      return (e = l({}, k, e)).toggle = Boolean(e.toggle), c.typeCheckConfig(w, e, E), e;
    }, t._getDimension = function () {
      return o.default(this._element).hasClass("width") ? "width" : "height";
    }, t._getParent = function () {
      var t,
          n = this;
      c.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
      var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
          r = [].slice.call(t.querySelectorAll(i));
      return o.default(r).each(function (t, i) {
        n._addAriaAndCollapsedClass(e._getTargetFromElement(i), [i]);
      }), t;
    }, t._addAriaAndCollapsedClass = function (e, t) {
      var n = o.default(e).hasClass("show");
      t.length && o.default(t).toggleClass("collapsed", !n).attr("aria-expanded", n);
    }, e._getTargetFromElement = function (e) {
      var t = c.getSelectorFromElement(e);
      return t ? document.querySelector(t) : null;
    }, e._jQueryInterface = function (t) {
      return this.each(function () {
        var n = o.default(this),
            i = n.data("bs.collapse"),
            r = l({}, k, n.data(), "object" == _typeof(t) && t ? t : {});

        if (!i && r.toggle && "string" == typeof t && /show|hide/.test(t) && (r.toggle = !1), i || (i = new e(this, r), n.data("bs.collapse", i)), "string" == typeof t) {
          if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
          i[t]();
        }
      });
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }, {
      key: "Default",
      get: function get() {
        return k;
      }
    }]), e;
  }();

  o.default(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (e) {
    "A" === e.currentTarget.tagName && e.preventDefault();
    var t = o.default(this),
        n = c.getSelectorFromElement(this),
        i = [].slice.call(document.querySelectorAll(n));
    o.default(i).each(function () {
      var e = o.default(this),
          n = e.data("bs.collapse") ? "toggle" : t.data();

      T._jQueryInterface.call(e, n);
    });
  }), o.default.fn[w] = T._jQueryInterface, o.default.fn[w].Constructor = T, o.default.fn[w].noConflict = function () {
    return o.default.fn[w] = _, T._jQueryInterface;
  };

  var S = "dropdown",
      C = o.default.fn[S],
      A = new RegExp("38|40|27"),
      L = {
    offset: 0,
    flip: !0,
    boundary: "scrollParent",
    reference: "toggle",
    display: "dynamic",
    popperConfig: null
  },
      O = {
    offset: "(number|string|function)",
    flip: "boolean",
    boundary: "(string|element)",
    reference: "(string|element)",
    display: "string",
    popperConfig: "(null|object)"
  },
      N = function () {
    function e(e, t) {
      this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
    }

    var t = e.prototype;
    return t.toggle = function () {
      if (!this._element.disabled && !o.default(this._element).hasClass("disabled")) {
        var t = o.default(this._menu).hasClass("show");
        e._clearMenus(), t || this.show(!0);
      }
    }, t.show = function (t) {
      if (void 0 === t && (t = !1), !(this._element.disabled || o.default(this._element).hasClass("disabled") || o.default(this._menu).hasClass("show"))) {
        var n = {
          relatedTarget: this._element
        },
            i = o.default.Event("show.bs.dropdown", n),
            a = e._getParentFromElement(this._element);

        if (o.default(a).trigger(i), !i.isDefaultPrevented()) {
          if (!this._inNavbar && t) {
            if (void 0 === r.default) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            var s = this._element;
            "parent" === this._config.reference ? s = a : c.isElement(this._config.reference) && (s = this._config.reference, void 0 !== this._config.reference.jquery && (s = this._config.reference[0])), "scrollParent" !== this._config.boundary && o.default(a).addClass("position-static"), this._popper = new r.default(s, this._menu, this._getPopperConfig());
          }

          "ontouchstart" in document.documentElement && 0 === o.default(a).closest(".navbar-nav").length && o.default(document.body).children().on("mouseover", null, o.default.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), o.default(this._menu).toggleClass("show"), o.default(a).toggleClass("show").trigger(o.default.Event("shown.bs.dropdown", n));
        }
      }
    }, t.hide = function () {
      if (!this._element.disabled && !o.default(this._element).hasClass("disabled") && o.default(this._menu).hasClass("show")) {
        var t = {
          relatedTarget: this._element
        },
            n = o.default.Event("hide.bs.dropdown", t),
            i = e._getParentFromElement(this._element);

        o.default(i).trigger(n), n.isDefaultPrevented() || (this._popper && this._popper.destroy(), o.default(this._menu).toggleClass("show"), o.default(i).toggleClass("show").trigger(o.default.Event("hidden.bs.dropdown", t)));
      }
    }, t.dispose = function () {
      o.default.removeData(this._element, "bs.dropdown"), o.default(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null);
    }, t.update = function () {
      this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
    }, t._addEventListeners = function () {
      var e = this;
      o.default(this._element).on("click.bs.dropdown", function (t) {
        t.preventDefault(), t.stopPropagation(), e.toggle();
      });
    }, t._getConfig = function (e) {
      return e = l({}, this.constructor.Default, o.default(this._element).data(), e), c.typeCheckConfig(S, e, this.constructor.DefaultType), e;
    }, t._getMenuElement = function () {
      if (!this._menu) {
        var t = e._getParentFromElement(this._element);

        t && (this._menu = t.querySelector(".dropdown-menu"));
      }

      return this._menu;
    }, t._getPlacement = function () {
      var e = o.default(this._element.parentNode),
          t = "bottom-start";
      return e.hasClass("dropup") ? t = o.default(this._menu).hasClass("dropdown-menu-right") ? "top-end" : "top-start" : e.hasClass("dropright") ? t = "right-start" : e.hasClass("dropleft") ? t = "left-start" : o.default(this._menu).hasClass("dropdown-menu-right") && (t = "bottom-end"), t;
    }, t._detectNavbar = function () {
      return o.default(this._element).closest(".navbar").length > 0;
    }, t._getOffset = function () {
      var e = this,
          t = {};
      return "function" == typeof this._config.offset ? t.fn = function (t) {
        return t.offsets = l({}, t.offsets, e._config.offset(t.offsets, e._element) || {}), t;
      } : t.offset = this._config.offset, t;
    }, t._getPopperConfig = function () {
      var e = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      };
      return "static" === this._config.display && (e.modifiers.applyStyle = {
        enabled: !1
      }), l({}, e, this._config.popperConfig);
    }, e._jQueryInterface = function (t) {
      return this.each(function () {
        var n = o.default(this).data("bs.dropdown");

        if (n || (n = new e(this, "object" == _typeof(t) ? t : null), o.default(this).data("bs.dropdown", n)), "string" == typeof t) {
          if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
          n[t]();
        }
      });
    }, e._clearMenus = function (t) {
      if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which)) for (var n = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')), i = 0, r = n.length; i < r; i++) {
        var a = e._getParentFromElement(n[i]),
            s = o.default(n[i]).data("bs.dropdown"),
            l = {
          relatedTarget: n[i]
        };

        if (t && "click" === t.type && (l.clickEvent = t), s) {
          var c = s._menu;

          if (o.default(a).hasClass("show") && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && o.default.contains(a, t.target))) {
            var u = o.default.Event("hide.bs.dropdown", l);
            o.default(a).trigger(u), u.isDefaultPrevented() || ("ontouchstart" in document.documentElement && o.default(document.body).children().off("mouseover", null, o.default.noop), n[i].setAttribute("aria-expanded", "false"), s._popper && s._popper.destroy(), o.default(c).removeClass("show"), o.default(a).removeClass("show").trigger(o.default.Event("hidden.bs.dropdown", l)));
          }
        }
      }
    }, e._getParentFromElement = function (e) {
      var t,
          n = c.getSelectorFromElement(e);
      return n && (t = document.querySelector(n)), t || e.parentNode;
    }, e._dataApiKeydownHandler = function (t) {
      if (!(/input|textarea/i.test(t.target.tagName) ? 32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || o.default(t.target).closest(".dropdown-menu").length) : !A.test(t.which)) && !this.disabled && !o.default(this).hasClass("disabled")) {
        var n = e._getParentFromElement(this),
            i = o.default(n).hasClass("show");

        if (i || 27 !== t.which) {
          if (t.preventDefault(), t.stopPropagation(), !i || 27 === t.which || 32 === t.which) return 27 === t.which && o.default(n.querySelector('[data-toggle="dropdown"]')).trigger("focus"), void o.default(this).trigger("click");
          var r = [].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (e) {
            return o.default(e).is(":visible");
          });

          if (0 !== r.length) {
            var a = r.indexOf(t.target);
            38 === t.which && a > 0 && a--, 40 === t.which && a < r.length - 1 && a++, a < 0 && (a = 0), r[a].focus();
          }
        }
      }
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }, {
      key: "Default",
      get: function get() {
        return L;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return O;
      }
    }]), e;
  }();

  o.default(document).on("keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', N._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api", ".dropdown-menu", N._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", N._clearMenus).on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', function (e) {
    e.preventDefault(), e.stopPropagation(), N._jQueryInterface.call(o.default(this), "toggle");
  }).on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
    e.stopPropagation();
  }), o.default.fn[S] = N._jQueryInterface, o.default.fn[S].Constructor = N, o.default.fn[S].noConflict = function () {
    return o.default.fn[S] = C, N._jQueryInterface;
  };

  var M = o.default.fn.modal,
      j = {
    backdrop: !0,
    keyboard: !0,
    focus: !0,
    show: !0
  },
      D = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    focus: "boolean",
    show: "boolean"
  },
      I = function () {
    function e(e, t) {
      this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0;
    }

    var t = e.prototype;
    return t.toggle = function (e) {
      return this._isShown ? this.hide() : this.show(e);
    }, t.show = function (e) {
      var t = this;

      if (!this._isShown && !this._isTransitioning) {
        o.default(this._element).hasClass("fade") && (this._isTransitioning = !0);
        var n = o.default.Event("show.bs.modal", {
          relatedTarget: e
        });
        o.default(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), o.default(this._element).on("click.dismiss.bs.modal", '[data-dismiss="modal"]', function (e) {
          return t.hide(e);
        }), o.default(this._dialog).on("mousedown.dismiss.bs.modal", function () {
          o.default(t._element).one("mouseup.dismiss.bs.modal", function (e) {
            o.default(e.target).is(t._element) && (t._ignoreBackdropClick = !0);
          });
        }), this._showBackdrop(function () {
          return t._showElement(e);
        }));
      }
    }, t.hide = function (e) {
      var t = this;

      if (e && e.preventDefault(), this._isShown && !this._isTransitioning) {
        var n = o.default.Event("hide.bs.modal");

        if (o.default(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
          this._isShown = !1;
          var i = o.default(this._element).hasClass("fade");

          if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), o.default(document).off("focusin.bs.modal"), o.default(this._element).removeClass("show"), o.default(this._element).off("click.dismiss.bs.modal"), o.default(this._dialog).off("mousedown.dismiss.bs.modal"), i) {
            var r = c.getTransitionDurationFromElement(this._element);
            o.default(this._element).one(c.TRANSITION_END, function (e) {
              return t._hideModal(e);
            }).emulateTransitionEnd(r);
          } else this._hideModal();
        }
      }
    }, t.dispose = function () {
      [window, this._element, this._dialog].forEach(function (e) {
        return o.default(e).off(".bs.modal");
      }), o.default(document).off("focusin.bs.modal"), o.default.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
    }, t.handleUpdate = function () {
      this._adjustDialog();
    }, t._getConfig = function (e) {
      return e = l({}, j, e), c.typeCheckConfig("modal", e, D), e;
    }, t._triggerBackdropTransition = function () {
      var e = this,
          t = o.default.Event("hidePrevented.bs.modal");

      if (o.default(this._element).trigger(t), !t.isDefaultPrevented()) {
        var n = this._element.scrollHeight > document.documentElement.clientHeight;
        n || (this._element.style.overflowY = "hidden"), this._element.classList.add("modal-static");
        var i = c.getTransitionDurationFromElement(this._dialog);
        o.default(this._element).off(c.TRANSITION_END), o.default(this._element).one(c.TRANSITION_END, function () {
          e._element.classList.remove("modal-static"), n || o.default(e._element).one(c.TRANSITION_END, function () {
            e._element.style.overflowY = "";
          }).emulateTransitionEnd(e._element, i);
        }).emulateTransitionEnd(i), this._element.focus();
      }
    }, t._showElement = function (e) {
      var t = this,
          n = o.default(this._element).hasClass("fade"),
          i = this._dialog ? this._dialog.querySelector(".modal-body") : null;
      this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), o.default(this._dialog).hasClass("modal-dialog-scrollable") && i ? i.scrollTop = 0 : this._element.scrollTop = 0, n && c.reflow(this._element), o.default(this._element).addClass("show"), this._config.focus && this._enforceFocus();

      var r = o.default.Event("shown.bs.modal", {
        relatedTarget: e
      }),
          a = function a() {
        t._config.focus && t._element.focus(), t._isTransitioning = !1, o.default(t._element).trigger(r);
      };

      if (n) {
        var s = c.getTransitionDurationFromElement(this._dialog);
        o.default(this._dialog).one(c.TRANSITION_END, a).emulateTransitionEnd(s);
      } else a();
    }, t._enforceFocus = function () {
      var e = this;
      o.default(document).off("focusin.bs.modal").on("focusin.bs.modal", function (t) {
        document !== t.target && e._element !== t.target && 0 === o.default(e._element).has(t.target).length && e._element.focus();
      });
    }, t._setEscapeEvent = function () {
      var e = this;
      this._isShown ? o.default(this._element).on("keydown.dismiss.bs.modal", function (t) {
        e._config.keyboard && 27 === t.which ? (t.preventDefault(), e.hide()) : e._config.keyboard || 27 !== t.which || e._triggerBackdropTransition();
      }) : this._isShown || o.default(this._element).off("keydown.dismiss.bs.modal");
    }, t._setResizeEvent = function () {
      var e = this;
      this._isShown ? o.default(window).on("resize.bs.modal", function (t) {
        return e.handleUpdate(t);
      }) : o.default(window).off("resize.bs.modal");
    }, t._hideModal = function () {
      var e = this;
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function () {
        o.default(document.body).removeClass("modal-open"), e._resetAdjustments(), e._resetScrollbar(), o.default(e._element).trigger("hidden.bs.modal");
      });
    }, t._removeBackdrop = function () {
      this._backdrop && (o.default(this._backdrop).remove(), this._backdrop = null);
    }, t._showBackdrop = function (e) {
      var t = this,
          n = o.default(this._element).hasClass("fade") ? "fade" : "";

      if (this._isShown && this._config.backdrop) {
        if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), o.default(this._backdrop).appendTo(document.body), o.default(this._element).on("click.dismiss.bs.modal", function (e) {
          t._ignoreBackdropClick ? t._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === t._config.backdrop ? t._triggerBackdropTransition() : t.hide());
        }), n && c.reflow(this._backdrop), o.default(this._backdrop).addClass("show"), !e) return;
        if (!n) return void e();
        var i = c.getTransitionDurationFromElement(this._backdrop);
        o.default(this._backdrop).one(c.TRANSITION_END, e).emulateTransitionEnd(i);
      } else if (!this._isShown && this._backdrop) {
        o.default(this._backdrop).removeClass("show");

        var r = function r() {
          t._removeBackdrop(), e && e();
        };

        if (o.default(this._element).hasClass("fade")) {
          var a = c.getTransitionDurationFromElement(this._backdrop);
          o.default(this._backdrop).one(c.TRANSITION_END, r).emulateTransitionEnd(a);
        } else r();
      } else e && e();
    }, t._adjustDialog = function () {
      var e = this._element.scrollHeight > document.documentElement.clientHeight;
      !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px");
    }, t._resetAdjustments = function () {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }, t._checkScrollbar = function () {
      var e = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(e.left + e.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
    }, t._setScrollbar = function () {
      var e = this;

      if (this._isBodyOverflowing) {
        var t = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),
            n = [].slice.call(document.querySelectorAll(".sticky-top"));
        o.default(t).each(function (t, n) {
          var i = n.style.paddingRight,
              r = o.default(n).css("padding-right");
          o.default(n).data("padding-right", i).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px");
        }), o.default(n).each(function (t, n) {
          var i = n.style.marginRight,
              r = o.default(n).css("margin-right");
          o.default(n).data("margin-right", i).css("margin-right", parseFloat(r) - e._scrollbarWidth + "px");
        });
        var i = document.body.style.paddingRight,
            r = o.default(document.body).css("padding-right");
        o.default(document.body).data("padding-right", i).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px");
      }

      o.default(document.body).addClass("modal-open");
    }, t._resetScrollbar = function () {
      var e = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));
      o.default(e).each(function (e, t) {
        var n = o.default(t).data("padding-right");
        o.default(t).removeData("padding-right"), t.style.paddingRight = n || "";
      });
      var t = [].slice.call(document.querySelectorAll(".sticky-top"));
      o.default(t).each(function (e, t) {
        var n = o.default(t).data("margin-right");
        void 0 !== n && o.default(t).css("margin-right", n).removeData("margin-right");
      });
      var n = o.default(document.body).data("padding-right");
      o.default(document.body).removeData("padding-right"), document.body.style.paddingRight = n || "";
    }, t._getScrollbarWidth = function () {
      var e = document.createElement("div");
      e.className = "modal-scrollbar-measure", document.body.appendChild(e);
      var t = e.getBoundingClientRect().width - e.clientWidth;
      return document.body.removeChild(e), t;
    }, e._jQueryInterface = function (t, n) {
      return this.each(function () {
        var i = o.default(this).data("bs.modal"),
            r = l({}, j, o.default(this).data(), "object" == _typeof(t) && t ? t : {});

        if (i || (i = new e(this, r), o.default(this).data("bs.modal", i)), "string" == typeof t) {
          if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
          i[t](n);
        } else r.show && i.show(n);
      });
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }, {
      key: "Default",
      get: function get() {
        return j;
      }
    }]), e;
  }();

  o.default(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (e) {
    var t,
        n = this,
        i = c.getSelectorFromElement(this);
    i && (t = document.querySelector(i));
    var r = o.default(t).data("bs.modal") ? "toggle" : l({}, o.default(t).data(), o.default(this).data());
    "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
    var a = o.default(t).one("show.bs.modal", function (e) {
      e.isDefaultPrevented() || a.one("hidden.bs.modal", function () {
        o.default(n).is(":visible") && n.focus();
      });
    });

    I._jQueryInterface.call(o.default(t), r, this);
  }), o.default.fn.modal = I._jQueryInterface, o.default.fn.modal.Constructor = I, o.default.fn.modal.noConflict = function () {
    return o.default.fn.modal = M, I._jQueryInterface;
  };
  var P = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
      R = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
      H = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  function q(e, t, n) {
    if (0 === e.length) return e;
    if (n && "function" == typeof n) return n(e);

    for (var i = new window.DOMParser().parseFromString(e, "text/html"), o = Object.keys(t), r = [].slice.call(i.body.querySelectorAll("*")), a = function a(e, n) {
      var i = r[e],
          a = i.nodeName.toLowerCase();
      if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
      var s = [].slice.call(i.attributes),
          l = [].concat(t["*"] || [], t[a] || []);
      s.forEach(function (e) {
        (function (e, t) {
          var n = e.nodeName.toLowerCase();
          if (-1 !== t.indexOf(n)) return -1 === P.indexOf(n) || Boolean(e.nodeValue.match(R) || e.nodeValue.match(H));

          for (var i = t.filter(function (e) {
            return e instanceof RegExp;
          }), o = 0, r = i.length; o < r; o++) {
            if (n.match(i[o])) return !0;
          }

          return !1;
        })(e, l) || i.removeAttribute(e.nodeName);
      });
    }, s = 0, l = r.length; s < l; s++) {
      a(s);
    }

    return i.body.innerHTML;
  }

  var F = "tooltip",
      W = o.default.fn[F],
      z = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
      U = ["sanitize", "whiteList", "sanitizeFn"],
      B = {
    animation: "boolean",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
    delay: "(number|object)",
    html: "boolean",
    selector: "(string|boolean)",
    placement: "(string|function)",
    offset: "(number|string|function)",
    container: "(string|element|boolean)",
    fallbackPlacement: "(string|array)",
    boundary: "(string|element)",
    customClass: "(string|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    whiteList: "object",
    popperConfig: "(null|object)"
  },
      X = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    LEFT: "left"
  },
      Y = {
    animation: !0,
    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    selector: !1,
    placement: "top",
    offset: 0,
    container: !1,
    fallbackPlacement: "flip",
    boundary: "scrollParent",
    customClass: "",
    sanitize: !0,
    sanitizeFn: null,
    whiteList: {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
    },
    popperConfig: null
  },
      V = {
    HIDE: "hide.bs.tooltip",
    HIDDEN: "hidden.bs.tooltip",
    SHOW: "show.bs.tooltip",
    SHOWN: "shown.bs.tooltip",
    INSERTED: "inserted.bs.tooltip",
    CLICK: "click.bs.tooltip",
    FOCUSIN: "focusin.bs.tooltip",
    FOCUSOUT: "focusout.bs.tooltip",
    MOUSEENTER: "mouseenter.bs.tooltip",
    MOUSELEAVE: "mouseleave.bs.tooltip"
  },
      $ = function () {
    function e(e, t) {
      if (void 0 === r.default) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
      this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners();
    }

    var t = e.prototype;
    return t.enable = function () {
      this._isEnabled = !0;
    }, t.disable = function () {
      this._isEnabled = !1;
    }, t.toggleEnabled = function () {
      this._isEnabled = !this._isEnabled;
    }, t.toggle = function (e) {
      if (this._isEnabled) if (e) {
        var t = this.constructor.DATA_KEY,
            n = o.default(e.currentTarget).data(t);
        n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), o.default(e.currentTarget).data(t, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n);
      } else {
        if (o.default(this.getTipElement()).hasClass("show")) return void this._leave(null, this);

        this._enter(null, this);
      }
    }, t.dispose = function () {
      clearTimeout(this._timeout), o.default.removeData(this.element, this.constructor.DATA_KEY), o.default(this.element).off(this.constructor.EVENT_KEY), o.default(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && o.default(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
    }, t.show = function () {
      var e = this;
      if ("none" === o.default(this.element).css("display")) throw new Error("Please use show on visible elements");
      var t = o.default.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        o.default(this.element).trigger(t);
        var n = c.findShadowRoot(this.element),
            i = o.default.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
        if (t.isDefaultPrevented() || !i) return;
        var a = this.getTipElement(),
            s = c.getUID(this.constructor.NAME);
        a.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && o.default(a).addClass("fade");

        var l = "function" == typeof this.config.placement ? this.config.placement.call(this, a, this.element) : this.config.placement,
            u = this._getAttachment(l);

        this.addAttachmentClass(u);

        var p = this._getContainer();

        o.default(a).data(this.constructor.DATA_KEY, this), o.default.contains(this.element.ownerDocument.documentElement, this.tip) || o.default(a).appendTo(p), o.default(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new r.default(this.element, a, this._getPopperConfig(u)), o.default(a).addClass("show"), o.default(a).addClass(this.config.customClass), "ontouchstart" in document.documentElement && o.default(document.body).children().on("mouseover", null, o.default.noop);

        var f = function f() {
          e.config.animation && e._fixTransition();
          var t = e._hoverState;
          e._hoverState = null, o.default(e.element).trigger(e.constructor.Event.SHOWN), "out" === t && e._leave(null, e);
        };

        if (o.default(this.tip).hasClass("fade")) {
          var h = c.getTransitionDurationFromElement(this.tip);
          o.default(this.tip).one(c.TRANSITION_END, f).emulateTransitionEnd(h);
        } else f();
      }
    }, t.hide = function (e) {
      var t = this,
          n = this.getTipElement(),
          i = o.default.Event(this.constructor.Event.HIDE),
          r = function r() {
        "show" !== t._hoverState && n.parentNode && n.parentNode.removeChild(n), t._cleanTipClass(), t.element.removeAttribute("aria-describedby"), o.default(t.element).trigger(t.constructor.Event.HIDDEN), null !== t._popper && t._popper.destroy(), e && e();
      };

      if (o.default(this.element).trigger(i), !i.isDefaultPrevented()) {
        if (o.default(n).removeClass("show"), "ontouchstart" in document.documentElement && o.default(document.body).children().off("mouseover", null, o.default.noop), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, o.default(this.tip).hasClass("fade")) {
          var a = c.getTransitionDurationFromElement(n);
          o.default(n).one(c.TRANSITION_END, r).emulateTransitionEnd(a);
        } else r();

        this._hoverState = "";
      }
    }, t.update = function () {
      null !== this._popper && this._popper.scheduleUpdate();
    }, t.isWithContent = function () {
      return Boolean(this.getTitle());
    }, t.addAttachmentClass = function (e) {
      o.default(this.getTipElement()).addClass("bs-tooltip-" + e);
    }, t.getTipElement = function () {
      return this.tip = this.tip || o.default(this.config.template)[0], this.tip;
    }, t.setContent = function () {
      var e = this.getTipElement();
      this.setElementContent(o.default(e.querySelectorAll(".tooltip-inner")), this.getTitle()), o.default(e).removeClass("fade show");
    }, t.setElementContent = function (e, t) {
      "object" != _typeof(t) || !t.nodeType && !t.jquery ? this.config.html ? (this.config.sanitize && (t = q(t, this.config.whiteList, this.config.sanitizeFn)), e.html(t)) : e.text(t) : this.config.html ? o.default(t).parent().is(e) || e.empty().append(t) : e.text(o.default(t).text());
    }, t.getTitle = function () {
      var e = this.element.getAttribute("data-original-title");
      return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e;
    }, t._getPopperConfig = function (e) {
      var t = this;
      return l({}, {
        placement: e,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: ".arrow"
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(e) {
          e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e);
        },
        onUpdate: function onUpdate(e) {
          return t._handlePopperPlacementChange(e);
        }
      }, this.config.popperConfig);
    }, t._getOffset = function () {
      var e = this,
          t = {};
      return "function" == typeof this.config.offset ? t.fn = function (t) {
        return t.offsets = l({}, t.offsets, e.config.offset(t.offsets, e.element) || {}), t;
      } : t.offset = this.config.offset, t;
    }, t._getContainer = function () {
      return !1 === this.config.container ? document.body : c.isElement(this.config.container) ? o.default(this.config.container) : o.default(document).find(this.config.container);
    }, t._getAttachment = function (e) {
      return X[e.toUpperCase()];
    }, t._setListeners = function () {
      var e = this;
      this.config.trigger.split(" ").forEach(function (t) {
        if ("click" === t) o.default(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
          return e.toggle(t);
        });else if ("manual" !== t) {
          var n = "hover" === t ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
              i = "hover" === t ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
          o.default(e.element).on(n, e.config.selector, function (t) {
            return e._enter(t);
          }).on(i, e.config.selector, function (t) {
            return e._leave(t);
          });
        }
      }), this._hideModalHandler = function () {
        e.element && e.hide();
      }, o.default(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = l({}, this.config, {
        trigger: "manual",
        selector: ""
      }) : this._fixTitle();
    }, t._fixTitle = function () {
      var e = _typeof(this.element.getAttribute("data-original-title"));

      (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
    }, t._enter = function (e, t) {
      var n = this.constructor.DATA_KEY;
      (t = t || o.default(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), o.default(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusin" === e.type ? "focus" : "hover"] = !0), o.default(t.getTipElement()).hasClass("show") || "show" === t._hoverState ? t._hoverState = "show" : (clearTimeout(t._timeout), t._hoverState = "show", t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function () {
        "show" === t._hoverState && t.show();
      }, t.config.delay.show) : t.show());
    }, t._leave = function (e, t) {
      var n = this.constructor.DATA_KEY;
      (t = t || o.default(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), o.default(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusout" === e.type ? "focus" : "hover"] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = "out", t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function () {
        "out" === t._hoverState && t.hide();
      }, t.config.delay.hide) : t.hide());
    }, t._isWithActiveTrigger = function () {
      for (var e in this._activeTrigger) {
        if (this._activeTrigger[e]) return !0;
      }

      return !1;
    }, t._getConfig = function (e) {
      var t = o.default(this.element).data();
      return Object.keys(t).forEach(function (e) {
        -1 !== U.indexOf(e) && delete t[e];
      }), "number" == typeof (e = l({}, this.constructor.Default, t, "object" == _typeof(e) && e ? e : {})).delay && (e.delay = {
        show: e.delay,
        hide: e.delay
      }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), c.typeCheckConfig(F, e, this.constructor.DefaultType), e.sanitize && (e.template = q(e.template, e.whiteList, e.sanitizeFn)), e;
    }, t._getDelegateConfig = function () {
      var e = {};
      if (this.config) for (var t in this.config) {
        this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
      }
      return e;
    }, t._cleanTipClass = function () {
      var e = o.default(this.getTipElement()),
          t = e.attr("class").match(z);
      null !== t && t.length && e.removeClass(t.join(""));
    }, t._handlePopperPlacementChange = function (e) {
      this.tip = e.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement));
    }, t._fixTransition = function () {
      var e = this.getTipElement(),
          t = this.config.animation;
      null === e.getAttribute("x-placement") && (o.default(e).removeClass("fade"), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t);
    }, e._jQueryInterface = function (t) {
      return this.each(function () {
        var n = o.default(this),
            i = n.data("bs.tooltip"),
            r = "object" == _typeof(t) && t;

        if ((i || !/dispose|hide/.test(t)) && (i || (i = new e(this, r), n.data("bs.tooltip", i)), "string" == typeof t)) {
          if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
          i[t]();
        }
      });
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }, {
      key: "Default",
      get: function get() {
        return Y;
      }
    }, {
      key: "NAME",
      get: function get() {
        return F;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.tooltip";
      }
    }, {
      key: "Event",
      get: function get() {
        return V;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.tooltip";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return B;
      }
    }]), e;
  }();

  o.default.fn[F] = $._jQueryInterface, o.default.fn[F].Constructor = $, o.default.fn[F].noConflict = function () {
    return o.default.fn[F] = W, $._jQueryInterface;
  };

  var Q = "popover",
      K = o.default.fn[Q],
      G = new RegExp("(^|\\s)bs-popover\\S+", "g"),
      J = l({}, $.Default, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }),
      Z = l({}, $.DefaultType, {
    content: "(string|element|function)"
  }),
      ee = {
    HIDE: "hide.bs.popover",
    HIDDEN: "hidden.bs.popover",
    SHOW: "show.bs.popover",
    SHOWN: "shown.bs.popover",
    INSERTED: "inserted.bs.popover",
    CLICK: "click.bs.popover",
    FOCUSIN: "focusin.bs.popover",
    FOCUSOUT: "focusout.bs.popover",
    MOUSEENTER: "mouseenter.bs.popover",
    MOUSELEAVE: "mouseleave.bs.popover"
  },
      te = function (e) {
    var t, n;

    function i() {
      return e.apply(this, arguments) || this;
    }

    n = e, (t = i).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
    var r = i.prototype;
    return r.isWithContent = function () {
      return this.getTitle() || this._getContent();
    }, r.addAttachmentClass = function (e) {
      o.default(this.getTipElement()).addClass("bs-popover-" + e);
    }, r.getTipElement = function () {
      return this.tip = this.tip || o.default(this.config.template)[0], this.tip;
    }, r.setContent = function () {
      var e = o.default(this.getTipElement());
      this.setElementContent(e.find(".popover-header"), this.getTitle());

      var t = this._getContent();

      "function" == typeof t && (t = t.call(this.element)), this.setElementContent(e.find(".popover-body"), t), e.removeClass("fade show");
    }, r._getContent = function () {
      return this.element.getAttribute("data-content") || this.config.content;
    }, r._cleanTipClass = function () {
      var e = o.default(this.getTipElement()),
          t = e.attr("class").match(G);
      null !== t && t.length > 0 && e.removeClass(t.join(""));
    }, i._jQueryInterface = function (e) {
      return this.each(function () {
        var t = o.default(this).data("bs.popover"),
            n = "object" == _typeof(e) ? e : null;

        if ((t || !/dispose|hide/.test(e)) && (t || (t = new i(this, n), o.default(this).data("bs.popover", t)), "string" == typeof e)) {
          if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
          t[e]();
        }
      });
    }, s(i, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }, {
      key: "Default",
      get: function get() {
        return J;
      }
    }, {
      key: "NAME",
      get: function get() {
        return Q;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.popover";
      }
    }, {
      key: "Event",
      get: function get() {
        return ee;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".bs.popover";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Z;
      }
    }]), i;
  }($);

  o.default.fn[Q] = te._jQueryInterface, o.default.fn[Q].Constructor = te, o.default.fn[Q].noConflict = function () {
    return o.default.fn[Q] = K, te._jQueryInterface;
  };

  var ne = "scrollspy",
      ie = o.default.fn[ne],
      oe = {
    offset: 10,
    method: "auto",
    target: ""
  },
      re = {
    offset: "number",
    method: "string",
    target: "(string|element)"
  },
      ae = function () {
    function e(e, t) {
      var n = this;
      this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " .nav-link," + this._config.target + " .list-group-item," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, o.default(this._scrollElement).on("scroll.bs.scrollspy", function (e) {
        return n._process(e);
      }), this.refresh(), this._process();
    }

    var t = e.prototype;
    return t.refresh = function () {
      var e = this,
          t = this._scrollElement === this._scrollElement.window ? "offset" : "position",
          n = "auto" === this._config.method ? t : this._config.method,
          i = "position" === n ? this._getScrollTop() : 0;
      this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (e) {
        var t,
            r = c.getSelectorFromElement(e);

        if (r && (t = document.querySelector(r)), t) {
          var a = t.getBoundingClientRect();
          if (a.width || a.height) return [o.default(t)[n]().top + i, r];
        }

        return null;
      }).filter(function (e) {
        return e;
      }).sort(function (e, t) {
        return e[0] - t[0];
      }).forEach(function (t) {
        e._offsets.push(t[0]), e._targets.push(t[1]);
      });
    }, t.dispose = function () {
      o.default.removeData(this._element, "bs.scrollspy"), o.default(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
    }, t._getConfig = function (e) {
      if ("string" != typeof (e = l({}, oe, "object" == _typeof(e) && e ? e : {})).target && c.isElement(e.target)) {
        var t = o.default(e.target).attr("id");
        t || (t = c.getUID(ne), o.default(e.target).attr("id", t)), e.target = "#" + t;
      }

      return c.typeCheckConfig(ne, e, re), e;
    }, t._getScrollTop = function () {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }, t._getScrollHeight = function () {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }, t._getOffsetHeight = function () {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }, t._process = function () {
      var e = this._getScrollTop() + this._config.offset,
          t = this._getScrollHeight(),
          n = this._config.offset + t - this._getOffsetHeight();

      if (this._scrollHeight !== t && this.refresh(), e >= n) {
        var i = this._targets[this._targets.length - 1];
        this._activeTarget !== i && this._activate(i);
      } else {
        if (this._activeTarget && e < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();

        for (var o = this._offsets.length; o--;) {
          this._activeTarget !== this._targets[o] && e >= this._offsets[o] && (void 0 === this._offsets[o + 1] || e < this._offsets[o + 1]) && this._activate(this._targets[o]);
        }
      }
    }, t._activate = function (e) {
      this._activeTarget = e, this._clear();

      var t = this._selector.split(",").map(function (t) {
        return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
      }),
          n = o.default([].slice.call(document.querySelectorAll(t.join(","))));

      n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass("active"), n.addClass("active")) : (n.addClass("active"), n.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"), n.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active")), o.default(this._scrollElement).trigger("activate.bs.scrollspy", {
        relatedTarget: e
      });
    }, t._clear = function () {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (e) {
        return e.classList.contains("active");
      }).forEach(function (e) {
        return e.classList.remove("active");
      });
    }, e._jQueryInterface = function (t) {
      return this.each(function () {
        var n = o.default(this).data("bs.scrollspy");

        if (n || (n = new e(this, "object" == _typeof(t) && t), o.default(this).data("bs.scrollspy", n)), "string" == typeof t) {
          if (void 0 === n[t]) throw new TypeError('No method named "' + t + '"');
          n[t]();
        }
      });
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }, {
      key: "Default",
      get: function get() {
        return oe;
      }
    }]), e;
  }();

  o.default(window).on("load.bs.scrollspy.data-api", function () {
    for (var e = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), t = e.length; t--;) {
      var n = o.default(e[t]);

      ae._jQueryInterface.call(n, n.data());
    }
  }), o.default.fn[ne] = ae._jQueryInterface, o.default.fn[ne].Constructor = ae, o.default.fn[ne].noConflict = function () {
    return o.default.fn[ne] = ie, ae._jQueryInterface;
  };

  var se = o.default.fn.tab,
      le = function () {
    function e(e) {
      this._element = e;
    }

    var t = e.prototype;
    return t.show = function () {
      var e = this;

      if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && o.default(this._element).hasClass("active") || o.default(this._element).hasClass("disabled"))) {
        var t,
            n,
            i = o.default(this._element).closest(".nav, .list-group")[0],
            r = c.getSelectorFromElement(this._element);

        if (i) {
          var a = "UL" === i.nodeName || "OL" === i.nodeName ? "> li > .active" : ".active";
          n = (n = o.default.makeArray(o.default(i).find(a)))[n.length - 1];
        }

        var s = o.default.Event("hide.bs.tab", {
          relatedTarget: this._element
        }),
            l = o.default.Event("show.bs.tab", {
          relatedTarget: n
        });

        if (n && o.default(n).trigger(s), o.default(this._element).trigger(l), !l.isDefaultPrevented() && !s.isDefaultPrevented()) {
          r && (t = document.querySelector(r)), this._activate(this._element, i);

          var u = function u() {
            var t = o.default.Event("hidden.bs.tab", {
              relatedTarget: e._element
            }),
                i = o.default.Event("shown.bs.tab", {
              relatedTarget: n
            });
            o.default(n).trigger(t), o.default(e._element).trigger(i);
          };

          t ? this._activate(t, t.parentNode, u) : u();
        }
      }
    }, t.dispose = function () {
      o.default.removeData(this._element, "bs.tab"), this._element = null;
    }, t._activate = function (e, t, n) {
      var i = this,
          r = (!t || "UL" !== t.nodeName && "OL" !== t.nodeName ? o.default(t).children(".active") : o.default(t).find("> li > .active"))[0],
          a = n && r && o.default(r).hasClass("fade"),
          s = function s() {
        return i._transitionComplete(e, r, n);
      };

      if (r && a) {
        var l = c.getTransitionDurationFromElement(r);
        o.default(r).removeClass("show").one(c.TRANSITION_END, s).emulateTransitionEnd(l);
      } else s();
    }, t._transitionComplete = function (e, t, n) {
      if (t) {
        o.default(t).removeClass("active");
        var i = o.default(t.parentNode).find("> .dropdown-menu .active")[0];
        i && o.default(i).removeClass("active"), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1);
      }

      if (o.default(e).addClass("active"), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), c.reflow(e), e.classList.contains("fade") && e.classList.add("show"), e.parentNode && o.default(e.parentNode).hasClass("dropdown-menu")) {
        var r = o.default(e).closest(".dropdown")[0];

        if (r) {
          var a = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
          o.default(a).addClass("active");
        }

        e.setAttribute("aria-expanded", !0);
      }

      n && n();
    }, e._jQueryInterface = function (t) {
      return this.each(function () {
        var n = o.default(this),
            i = n.data("bs.tab");

        if (i || (i = new e(this), n.data("bs.tab", i)), "string" == typeof t) {
          if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
          i[t]();
        }
      });
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }]), e;
  }();

  o.default(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (e) {
    e.preventDefault(), le._jQueryInterface.call(o.default(this), "show");
  }), o.default.fn.tab = le._jQueryInterface, o.default.fn.tab.Constructor = le, o.default.fn.tab.noConflict = function () {
    return o.default.fn.tab = se, le._jQueryInterface;
  };

  var ce = o.default.fn.toast,
      ue = {
    animation: "boolean",
    autohide: "boolean",
    delay: "number"
  },
      pe = {
    animation: !0,
    autohide: !0,
    delay: 500
  },
      fe = function () {
    function e(e, t) {
      this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners();
    }

    var t = e.prototype;
    return t.show = function () {
      var e = this,
          t = o.default.Event("show.bs.toast");

      if (o.default(this._element).trigger(t), !t.isDefaultPrevented()) {
        this._clearTimeout(), this._config.animation && this._element.classList.add("fade");

        var n = function n() {
          e._element.classList.remove("showing"), e._element.classList.add("show"), o.default(e._element).trigger("shown.bs.toast"), e._config.autohide && (e._timeout = setTimeout(function () {
            e.hide();
          }, e._config.delay));
        };

        if (this._element.classList.remove("hide"), c.reflow(this._element), this._element.classList.add("showing"), this._config.animation) {
          var i = c.getTransitionDurationFromElement(this._element);
          o.default(this._element).one(c.TRANSITION_END, n).emulateTransitionEnd(i);
        } else n();
      }
    }, t.hide = function () {
      if (this._element.classList.contains("show")) {
        var e = o.default.Event("hide.bs.toast");
        o.default(this._element).trigger(e), e.isDefaultPrevented() || this._close();
      }
    }, t.dispose = function () {
      this._clearTimeout(), this._element.classList.contains("show") && this._element.classList.remove("show"), o.default(this._element).off("click.dismiss.bs.toast"), o.default.removeData(this._element, "bs.toast"), this._element = null, this._config = null;
    }, t._getConfig = function (e) {
      return e = l({}, pe, o.default(this._element).data(), "object" == _typeof(e) && e ? e : {}), c.typeCheckConfig("toast", e, this.constructor.DefaultType), e;
    }, t._setListeners = function () {
      var e = this;
      o.default(this._element).on("click.dismiss.bs.toast", '[data-dismiss="toast"]', function () {
        return e.hide();
      });
    }, t._close = function () {
      var e = this,
          t = function t() {
        e._element.classList.add("hide"), o.default(e._element).trigger("hidden.bs.toast");
      };

      if (this._element.classList.remove("show"), this._config.animation) {
        var n = c.getTransitionDurationFromElement(this._element);
        o.default(this._element).one(c.TRANSITION_END, t).emulateTransitionEnd(n);
      } else t();
    }, t._clearTimeout = function () {
      clearTimeout(this._timeout), this._timeout = null;
    }, e._jQueryInterface = function (t) {
      return this.each(function () {
        var n = o.default(this),
            i = n.data("bs.toast");

        if (i || (i = new e(this, "object" == _typeof(t) && t), n.data("bs.toast", i)), "string" == typeof t) {
          if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
          i[t](this);
        }
      });
    }, s(e, null, [{
      key: "VERSION",
      get: function get() {
        return "4.6.0";
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return ue;
      }
    }, {
      key: "Default",
      get: function get() {
        return pe;
      }
    }]), e;
  }();

  o.default.fn.toast = fe._jQueryInterface, o.default.fn.toast.Constructor = fe, o.default.fn.toast.noConflict = function () {
    return o.default.fn.toast = ce, fe._jQueryInterface;
  }, e.Alert = f, e.Button = d, e.Carousel = x, e.Collapse = T, e.Dropdown = N, e.Modal = I, e.Popover = te, e.Scrollspy = ae, e.Tab = le, e.Toast = fe, e.Tooltip = $, e.Util = c, Object.defineProperty(e, "__esModule", {
    value: !0
  });
}),
/*!
 * perfect-scrollbar v1.5.0
 * Copyright 2020 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).PerfectScrollbar = t();
}(this, function () {
  "use strict";

  var e = Math.abs,
      t = Math.floor;

  function n(e) {
    return getComputedStyle(e);
  }

  function i(e, t) {
    for (var n in t) {
      var i = t[n];
      "number" == typeof i && (i += "px"), e.style[n] = i;
    }

    return e;
  }

  function o(e) {
    var t = document.createElement("div");
    return t.className = e, t;
  }

  function r(e, t) {
    if (!b) throw new Error("No element matching method supported");
    return b.call(e, t);
  }

  function a(e) {
    e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
  }

  function s(e, t) {
    return Array.prototype.filter.call(e.children, function (e) {
      return r(e, t);
    });
  }

  function l(e, t) {
    var n = e.element.classList,
        i = x.state.scrolling(t);
    n.contains(i) ? clearTimeout(w[t]) : n.add(i);
  }

  function c(e, t) {
    w[t] = setTimeout(function () {
      return e.isAlive && e.element.classList.remove(x.state.scrolling(t));
    }, e.settings.scrollingThreshold);
  }

  function u(e, t) {
    l(e, t), c(e, t);
  }

  function p(e) {
    if ("function" == typeof window.CustomEvent) return new CustomEvent(e);
    var t = document.createEvent("CustomEvent");
    return t.initCustomEvent(e, !1, !1, void 0), t;
  }

  function f(e, t, n, i, o) {
    var r;
    if (void 0 === i && (i = !0), void 0 === o && (o = !1), "top" === t) r = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];else {
      if ("left" !== t) throw new Error("A proper axis should be provided");
      r = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"];
    }
    !function (e, t, n, i, o) {
      var r = n[0],
          a = n[1],
          s = n[2],
          l = n[3],
          c = n[4],
          f = n[5];
      void 0 === i && (i = !0), void 0 === o && (o = !1);
      var h = e.element;
      e.reach[l] = null, 1 > h[s] && (e.reach[l] = "start"), h[s] > e[r] - e[a] - 1 && (e.reach[l] = "end"), t && (h.dispatchEvent(p("ps-scroll-" + l)), 0 > t ? h.dispatchEvent(p("ps-scroll-" + c)) : 0 < t && h.dispatchEvent(p("ps-scroll-" + f)), i && u(e, l)), e.reach[l] && (t || o) && h.dispatchEvent(p("ps-" + l + "-reach-" + e.reach[l]));
    }(e, n, r, i, o);
  }

  function h(e) {
    return parseInt(e, 10) || 0;
  }

  function d(e) {
    return r(e, "input,[contenteditable]") || r(e, "select,[contenteditable]") || r(e, "textarea,[contenteditable]") || r(e, "button,[contenteditable]");
  }

  function g(e) {
    var n = Math.ceil,
        i = e.element,
        o = t(i.scrollTop),
        r = i.getBoundingClientRect();
    e.containerWidth = n(r.width), e.containerHeight = n(r.height), e.contentWidth = i.scrollWidth, e.contentHeight = i.scrollHeight, i.contains(e.scrollbarXRail) || (s(i, x.element.rail("x")).forEach(function (e) {
      return a(e);
    }), i.appendChild(e.scrollbarXRail)), i.contains(e.scrollbarYRail) || (s(i, x.element.rail("y")).forEach(function (e) {
      return a(e);
    }), i.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = m(e, h(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = h((e.negativeScrollAdjustment + i.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = m(e, h(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = h(o * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), y(i, e), e.scrollbarXActive ? i.classList.add(x.state.active("x")) : (i.classList.remove(x.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, i.scrollLeft = !0 === e.isRtl ? e.contentWidth : 0), e.scrollbarYActive ? i.classList.add(x.state.active("y")) : (i.classList.remove(x.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, i.scrollTop = 0);
  }

  function m(e, t) {
    var n = Math.min,
        i = Math.max;
    return e.settings.minScrollbarLength && (t = i(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = n(t, e.settings.maxScrollbarLength)), t;
  }

  function y(e, n) {
    var o = {
      width: n.railXWidth
    },
        r = t(e.scrollTop);
    o.left = n.isRtl ? n.negativeScrollAdjustment + e.scrollLeft + n.containerWidth - n.contentWidth : e.scrollLeft, n.isScrollbarXUsingBottom ? o.bottom = n.scrollbarXBottom - r : o.top = n.scrollbarXTop + r, i(n.scrollbarXRail, o);
    var a = {
      top: r,
      height: n.railYHeight
    };
    n.isScrollbarYUsingRight ? n.isRtl ? a.right = n.contentWidth - (n.negativeScrollAdjustment + e.scrollLeft) - n.scrollbarYRight - n.scrollbarYOuterWidth - 9 : a.right = n.scrollbarYRight - e.scrollLeft : n.isRtl ? a.left = n.negativeScrollAdjustment + e.scrollLeft + 2 * n.containerWidth - n.contentWidth - n.scrollbarYLeft - n.scrollbarYOuterWidth : a.left = n.scrollbarYLeft + e.scrollLeft, i(n.scrollbarYRail, a), i(n.scrollbarX, {
      left: n.scrollbarXLeft,
      width: n.scrollbarXWidth - n.railBorderXWidth
    }), i(n.scrollbarY, {
      top: n.scrollbarYTop,
      height: n.scrollbarYHeight - n.railBorderYWidth
    });
  }

  function v(e, t) {
    function n(t) {
      t.touches && t.touches[0] && (t[s] = t.touches[0].pageY), y[h] = v + w * (t[s] - b), l(e, d), g(e), t.stopPropagation(), t.preventDefault();
    }

    function i() {
      c(e, d), e[m].classList.remove(x.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", n);
    }

    function o(t, o) {
      v = y[h], o && t.touches && (t[s] = t.touches[0].pageY), b = t[s], w = (e[a] - e[r]) / (e[u] - e[f]), o ? e.event.bind(e.ownerDocument, "touchmove", n) : (e.event.bind(e.ownerDocument, "mousemove", n), e.event.once(e.ownerDocument, "mouseup", i), t.preventDefault()), e[m].classList.add(x.state.clicking), t.stopPropagation();
    }

    var r = t[0],
        a = t[1],
        s = t[2],
        u = t[3],
        p = t[4],
        f = t[5],
        h = t[6],
        d = t[7],
        m = t[8],
        y = e.element,
        v = null,
        b = null,
        w = null;
    e.event.bind(e[p], "mousedown", function (e) {
      o(e);
    }), e.event.bind(e[p], "touchstart", function (e) {
      o(e, !0);
    });
  }

  var b = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector),
      x = {
    main: "ps",
    rtl: "ps__rtl",
    element: {
      thumb: function thumb(e) {
        return "ps__thumb-" + e;
      },
      rail: function rail(e) {
        return "ps__rail-" + e;
      },
      consuming: "ps__child--consume"
    },
    state: {
      focus: "ps--focus",
      clicking: "ps--clicking",
      active: function active(e) {
        return "ps--active-" + e;
      },
      scrolling: function scrolling(e) {
        return "ps--scrolling-" + e;
      }
    }
  },
      w = {
    x: null,
    y: null
  },
      _ = function _(e) {
    this.element = e, this.handlers = {};
  },
      k = {
    isEmpty: {
      configurable: !0
    }
  };

  _.prototype.bind = function (e, t) {
    void 0 === this.handlers[e] && (this.handlers[e] = []), this.handlers[e].push(t), this.element.addEventListener(e, t, !1);
  }, _.prototype.unbind = function (e, t) {
    var n = this;
    this.handlers[e] = this.handlers[e].filter(function (i) {
      return !(!t || i === t) || (n.element.removeEventListener(e, i, !1), !1);
    });
  }, _.prototype.unbindAll = function () {
    for (var e in this.handlers) {
      this.unbind(e);
    }
  }, k.isEmpty.get = function () {
    var e = this;
    return Object.keys(this.handlers).every(function (t) {
      return 0 === e.handlers[t].length;
    });
  }, Object.defineProperties(_.prototype, k);

  var E = function E() {
    this.eventElements = [];
  };

  E.prototype.eventElement = function (e) {
    var t = this.eventElements.filter(function (t) {
      return t.element === e;
    })[0];
    return t || (t = new _(e), this.eventElements.push(t)), t;
  }, E.prototype.bind = function (e, t, n) {
    this.eventElement(e).bind(t, n);
  }, E.prototype.unbind = function (e, t, n) {
    var i = this.eventElement(e);
    i.unbind(t, n), i.isEmpty && this.eventElements.splice(this.eventElements.indexOf(i), 1);
  }, E.prototype.unbindAll = function () {
    this.eventElements.forEach(function (e) {
      return e.unbindAll();
    }), this.eventElements = [];
  }, E.prototype.once = function (e, t, n) {
    var i = this.eventElement(e),
        o = function o(e) {
      i.unbind(t, o), n(e);
    };

    i.bind(t, o);
  };

  var T = {
    isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style,
    supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && 0 < window.navigator.maxTouchPoints || window.DocumentTouch && document instanceof window.DocumentTouch),
    supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
    isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent)
  },
      S = {
    "click-rail": function clickRail(e) {
      e.element, e.event.bind(e.scrollbarY, "mousedown", function (e) {
        return e.stopPropagation();
      }), e.event.bind(e.scrollbarYRail, "mousedown", function (t) {
        var n = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top > e.scrollbarYTop ? 1 : -1;
        e.element.scrollTop += n * e.containerHeight, g(e), t.stopPropagation();
      }), e.event.bind(e.scrollbarX, "mousedown", function (e) {
        return e.stopPropagation();
      }), e.event.bind(e.scrollbarXRail, "mousedown", function (t) {
        var n = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left > e.scrollbarXLeft ? 1 : -1;
        e.element.scrollLeft += n * e.containerWidth, g(e), t.stopPropagation();
      });
    },
    "drag-thumb": function dragThumb(e) {
      v(e, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]), v(e, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"]);
    },
    keyboard: function keyboard(e) {
      var n = e.element,
          i = function i() {
        return r(n, ":hover");
      },
          o = function o() {
        return r(e.scrollbarX, ":focus") || r(e.scrollbarY, ":focus");
      };

      e.event.bind(e.ownerDocument, "keydown", function (r) {
        if (!(r.isDefaultPrevented && r.isDefaultPrevented() || r.defaultPrevented) && (i() || o())) {
          var a = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;

          if (a) {
            if ("IFRAME" === a.tagName) a = a.contentDocument.activeElement;else for (; a.shadowRoot;) {
              a = a.shadowRoot.activeElement;
            }
            if (d(a)) return;
          }

          var s = 0,
              l = 0;

          switch (r.which) {
            case 37:
              s = r.metaKey ? -e.contentWidth : r.altKey ? -e.containerWidth : -30;
              break;

            case 38:
              l = r.metaKey ? e.contentHeight : r.altKey ? e.containerHeight : 30;
              break;

            case 39:
              s = r.metaKey ? e.contentWidth : r.altKey ? e.containerWidth : 30;
              break;

            case 40:
              l = r.metaKey ? -e.contentHeight : r.altKey ? -e.containerHeight : -30;
              break;

            case 32:
              l = r.shiftKey ? e.containerHeight : -e.containerHeight;
              break;

            case 33:
              l = e.containerHeight;
              break;

            case 34:
              l = -e.containerHeight;
              break;

            case 36:
              l = e.contentHeight;
              break;

            case 35:
              l = -e.contentHeight;
              break;

            default:
              return;
          }

          e.settings.suppressScrollX && 0 !== s || e.settings.suppressScrollY && 0 !== l || (n.scrollTop -= l, n.scrollLeft += s, g(e), function (i, o) {
            var r = t(n.scrollTop);

            if (0 === i) {
              if (!e.scrollbarYActive) return !1;
              if (0 === r && 0 < o || r >= e.contentHeight - e.containerHeight && 0 > o) return !e.settings.wheelPropagation;
            }

            var a = n.scrollLeft;

            if (0 === o) {
              if (!e.scrollbarXActive) return !1;
              if (0 === a && 0 > i || a >= e.contentWidth - e.containerWidth && 0 < i) return !e.settings.wheelPropagation;
            }

            return !0;
          }(s, l) && r.preventDefault());
        }
      });
    },
    wheel: function wheel(i) {
      function o(e, t, i) {
        if (!T.isWebKit && a.querySelector("select:focus")) return !0;
        if (!a.contains(e)) return !1;

        for (var o = e; o && o !== a;) {
          if (o.classList.contains(x.element.consuming)) return !0;
          var r = n(o);

          if (i && r.overflowY.match(/(scroll|auto)/)) {
            var s = o.scrollHeight - o.clientHeight;
            if (0 < s && (0 < o.scrollTop && 0 > i || o.scrollTop < s && 0 < i)) return !0;
          }

          if (t && r.overflowX.match(/(scroll|auto)/)) {
            var l = o.scrollWidth - o.clientWidth;
            if (0 < l && (0 < o.scrollLeft && 0 > t || o.scrollLeft < l && 0 < t)) return !0;
          }

          o = o.parentNode;
        }

        return !1;
      }

      function r(n) {
        var r = function (e) {
          var t = e.deltaX,
              n = -1 * e.deltaY;
          return (void 0 === t || void 0 === n) && (t = -1 * e.wheelDeltaX / 6, n = e.wheelDeltaY / 6), e.deltaMode && 1 === e.deltaMode && (t *= 10, n *= 10), t != t && n != n && (t = 0, n = e.wheelDelta), e.shiftKey ? [-n, -t] : [t, n];
        }(n),
            s = r[0],
            l = r[1];

        if (!o(n.target, s, l)) {
          var c = !1;
          i.settings.useBothWheelAxes ? i.scrollbarYActive && !i.scrollbarXActive ? (l ? a.scrollTop -= l * i.settings.wheelSpeed : a.scrollTop += s * i.settings.wheelSpeed, c = !0) : i.scrollbarXActive && !i.scrollbarYActive && (s ? a.scrollLeft += s * i.settings.wheelSpeed : a.scrollLeft -= l * i.settings.wheelSpeed, c = !0) : (a.scrollTop -= l * i.settings.wheelSpeed, a.scrollLeft += s * i.settings.wheelSpeed), g(i), (c = c || function (n, o) {
            var r = t(a.scrollTop),
                s = 0 === a.scrollTop,
                l = r + a.offsetHeight === a.scrollHeight,
                c = 0 === a.scrollLeft,
                u = a.scrollLeft + a.offsetWidth === a.scrollWidth;
            return !(e(o) > e(n) ? s || l : c || u) || !i.settings.wheelPropagation;
          }(s, l)) && !n.ctrlKey && (n.stopPropagation(), n.preventDefault());
        }
      }

      var a = i.element;
      void 0 === window.onwheel ? void 0 !== window.onmousewheel && i.event.bind(a, "mousewheel", r) : i.event.bind(a, "wheel", r);
    },
    touch: function touch(i) {
      function o(n, o) {
        var r = t(f.scrollTop),
            a = f.scrollLeft,
            s = e(n),
            l = e(o);

        if (l > s) {
          if (0 > o && r === i.contentHeight - i.containerHeight || 0 < o && 0 === r) return 0 === window.scrollY && 0 < o && T.isChrome;
        } else if (s > l && (0 > n && a === i.contentWidth - i.containerWidth || 0 < n && 0 === a)) return !0;

        return !0;
      }

      function r(e, t) {
        f.scrollTop -= t, f.scrollLeft -= e, g(i);
      }

      function a(e) {
        return e.targetTouches ? e.targetTouches[0] : e;
      }

      function s(e) {
        return !(e.pointerType && "pen" === e.pointerType && 0 === e.buttons || (!e.targetTouches || 1 !== e.targetTouches.length) && (!e.pointerType || "mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE));
      }

      function l(e) {
        if (s(e)) {
          var t = a(e);
          h.pageX = t.pageX, h.pageY = t.pageY, d = new Date().getTime(), null !== y && clearInterval(y);
        }
      }

      function c(e, t, i) {
        if (!f.contains(e)) return !1;

        for (var o = e; o && o !== f;) {
          if (o.classList.contains(x.element.consuming)) return !0;
          var r = n(o);

          if (i && r.overflowY.match(/(scroll|auto)/)) {
            var a = o.scrollHeight - o.clientHeight;
            if (0 < a && (0 < o.scrollTop && 0 > i || o.scrollTop < a && 0 < i)) return !0;
          }

          if (t && r.overflowX.match(/(scroll|auto)/)) {
            var s = o.scrollWidth - o.clientWidth;
            if (0 < s && (0 < o.scrollLeft && 0 > t || o.scrollLeft < s && 0 < t)) return !0;
          }

          o = o.parentNode;
        }

        return !1;
      }

      function u(e) {
        if (s(e)) {
          var t = a(e),
              n = {
            pageX: t.pageX,
            pageY: t.pageY
          },
              i = n.pageX - h.pageX,
              l = n.pageY - h.pageY;
          if (c(e.target, i, l)) return;
          r(i, l), h = n;
          var u = new Date().getTime(),
              p = u - d;
          0 < p && (m.x = i / p, m.y = l / p, d = u), o(i, l) && e.preventDefault();
        }
      }

      function p() {
        i.settings.swipeEasing && (clearInterval(y), y = setInterval(function () {
          return i.isInitialized ? void clearInterval(y) : m.x || m.y ? .01 > e(m.x) && .01 > e(m.y) ? void clearInterval(y) : (r(30 * m.x, 30 * m.y), m.x *= .8, void (m.y *= .8)) : void clearInterval(y);
        }, 10));
      }

      if (T.supportsTouch || T.supportsIePointer) {
        var f = i.element,
            h = {},
            d = 0,
            m = {},
            y = null;
        T.supportsTouch ? (i.event.bind(f, "touchstart", l), i.event.bind(f, "touchmove", u), i.event.bind(f, "touchend", p)) : T.supportsIePointer && (window.PointerEvent ? (i.event.bind(f, "pointerdown", l), i.event.bind(f, "pointermove", u), i.event.bind(f, "pointerup", p)) : window.MSPointerEvent && (i.event.bind(f, "MSPointerDown", l), i.event.bind(f, "MSPointerMove", u), i.event.bind(f, "MSPointerUp", p)));
      }
    }
  },
      C = function C(e, r) {
    var a = this;
    if (void 0 === r && (r = {}), "string" == typeof e && (e = document.querySelector(e)), !e || !e.nodeName) throw new Error("no element is specified to initialize PerfectScrollbar");

    for (var s in this.element = e, e.classList.add(x.main), this.settings = {
      handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
      maxScrollbarLength: null,
      minScrollbarLength: null,
      scrollingThreshold: 1e3,
      scrollXMarginOffset: 0,
      scrollYMarginOffset: 0,
      suppressScrollX: !1,
      suppressScrollY: !1,
      swipeEasing: !0,
      useBothWheelAxes: !1,
      wheelPropagation: !0,
      wheelSpeed: 1
    }, r) {
      this.settings[s] = r[s];
    }

    this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;

    var l = function l() {
      return e.classList.add(x.state.focus);
    },
        c = function c() {
      return e.classList.remove(x.state.focus);
    };

    this.isRtl = "rtl" === n(e).direction, !0 === this.isRtl && e.classList.add(x.rtl), this.isNegativeScroll = function () {
      var t,
          n = e.scrollLeft;
      return e.scrollLeft = -1, t = 0 > e.scrollLeft, e.scrollLeft = n, t;
    }(), this.negativeScrollAdjustment = this.isNegativeScroll ? e.scrollWidth - e.clientWidth : 0, this.event = new E(), this.ownerDocument = e.ownerDocument || document, this.scrollbarXRail = o(x.element.rail("x")), e.appendChild(this.scrollbarXRail), this.scrollbarX = o(x.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", l), this.event.bind(this.scrollbarX, "blur", c), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
    var u = n(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(u.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = h(u.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = h(u.borderLeftWidth) + h(u.borderRightWidth), i(this.scrollbarXRail, {
      display: "block"
    }), this.railXMarginWidth = h(u.marginLeft) + h(u.marginRight), i(this.scrollbarXRail, {
      display: ""
    }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = o(x.element.rail("y")), e.appendChild(this.scrollbarYRail), this.scrollbarY = o(x.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", l), this.event.bind(this.scrollbarY, "blur", c), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
    var p = n(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(p.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = h(p.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? function (e) {
      var t = n(e);
      return h(t.width) + h(t.paddingLeft) + h(t.paddingRight) + h(t.borderLeftWidth) + h(t.borderRightWidth);
    }(this.scrollbarY) : null, this.railBorderYWidth = h(p.borderTopWidth) + h(p.borderBottomWidth), i(this.scrollbarYRail, {
      display: "block"
    }), this.railYMarginHeight = h(p.marginTop) + h(p.marginBottom), i(this.scrollbarYRail, {
      display: ""
    }), this.railYHeight = null, this.railYRatio = null, this.reach = {
      x: 0 >= e.scrollLeft ? "start" : e.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
      y: 0 >= e.scrollTop ? "start" : e.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
    }, this.isAlive = !0, this.settings.handlers.forEach(function (e) {
      return S[e](a);
    }), this.lastScrollTop = t(e.scrollTop), this.lastScrollLeft = e.scrollLeft, this.event.bind(this.element, "scroll", function (e) {
      return a.onScroll(e);
    }), g(this);
  };

  return C.prototype.update = function () {
    this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, i(this.scrollbarXRail, {
      display: "block"
    }), i(this.scrollbarYRail, {
      display: "block"
    }), this.railXMarginWidth = h(n(this.scrollbarXRail).marginLeft) + h(n(this.scrollbarXRail).marginRight), this.railYMarginHeight = h(n(this.scrollbarYRail).marginTop) + h(n(this.scrollbarYRail).marginBottom), i(this.scrollbarXRail, {
      display: "none"
    }), i(this.scrollbarYRail, {
      display: "none"
    }), g(this), f(this, "top", 0, !1, !0), f(this, "left", 0, !1, !0), i(this.scrollbarXRail, {
      display: ""
    }), i(this.scrollbarYRail, {
      display: ""
    }));
  }, C.prototype.onScroll = function () {
    this.isAlive && (g(this), f(this, "top", this.element.scrollTop - this.lastScrollTop), f(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = t(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
  }, C.prototype.destroy = function () {
    this.isAlive && (this.event.unbindAll(), a(this.scrollbarX), a(this.scrollbarY), a(this.scrollbarXRail), a(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
  }, C.prototype.removePsClasses = function () {
    this.element.className = this.element.className.split(" ").filter(function (e) {
      return !e.match(/^ps([-_].+|)$/);
    }).join(" ");
  }, C;
}), function (e, t, n, i) {
  "use strict";

  function o(e, t, n) {
    return setTimeout(c(e, n), t);
  }

  function r(e, t, n) {
    return !!Array.isArray(e) && (a(e, n[t], n), !0);
  }

  function a(e, t, n) {
    var o;
    if (e) if (e.forEach) e.forEach(t, n);else if (e.length !== i) for (o = 0; o < e.length;) {
      t.call(n, e[o], o, e), o++;
    } else for (o in e) {
      e.hasOwnProperty(o) && t.call(n, e[o], o, e);
    }
  }

  function s(t, n, i) {
    var o = "DEPRECATED METHOD: " + n + "\n" + i + " AT \n";
    return function () {
      var n = new Error("get-stack-trace"),
          i = n && n.stack ? n.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
          r = e.console && (e.console.warn || e.console.log);
      return r && r.call(e.console, o, i), t.apply(this, arguments);
    };
  }

  function l(e, t, n) {
    var i,
        o = t.prototype;
    (i = e.prototype = Object.create(o)).constructor = e, i._super = o, n && ie(i, n);
  }

  function c(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }

  function u(e, t) {
    return _typeof(e) == ae ? e.apply(t && t[0] || i, t) : e;
  }

  function p(e, t) {
    return e === i ? t : e;
  }

  function f(e, t, n) {
    a(m(t), function (t) {
      e.addEventListener(t, n, !1);
    });
  }

  function h(e, t, n) {
    a(m(t), function (t) {
      e.removeEventListener(t, n, !1);
    });
  }

  function d(e, t) {
    for (; e;) {
      if (e == t) return !0;
      e = e.parentNode;
    }

    return !1;
  }

  function g(e, t) {
    return e.indexOf(t) > -1;
  }

  function m(e) {
    return e.trim().split(/\s+/g);
  }

  function y(e, t, n) {
    if (e.indexOf && !n) return e.indexOf(t);

    for (var i = 0; i < e.length;) {
      if (n && e[i][n] == t || !n && e[i] === t) return i;
      i++;
    }

    return -1;
  }

  function v(e) {
    return Array.prototype.slice.call(e, 0);
  }

  function b(e, t, n) {
    for (var i = [], o = [], r = 0; r < e.length;) {
      var a = t ? e[r][t] : e[r];
      y(o, a) < 0 && i.push(e[r]), o[r] = a, r++;
    }

    return n && (i = t ? i.sort(function (e, n) {
      return e[t] > n[t];
    }) : i.sort()), i;
  }

  function x(e, t) {
    for (var n, o, r = t[0].toUpperCase() + t.slice(1), a = 0; a < oe.length;) {
      if ((o = (n = oe[a]) ? n + r : t) in e) return o;
      a++;
    }

    return i;
  }

  function w(t) {
    var n = t.ownerDocument || t;
    return n.defaultView || n.parentWindow || e;
  }

  function _(e, t) {
    var n = this;
    this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function (t) {
      u(e.options.enable, [e]) && n.handler(t);
    }, this.init();
  }

  function k(e, t, n) {
    var i = n.pointers.length,
        o = n.changedPointers.length,
        r = t & be && i - o == 0,
        a = t & (we | _e) && i - o == 0;
    n.isFirst = !!r, n.isFinal = !!a, r && (e.session = {}), n.eventType = t, function (e, t) {
      var n = e.session,
          i = t.pointers,
          o = i.length;
      n.firstInput || (n.firstInput = T(t)), o > 1 && !n.firstMultiple ? n.firstMultiple = T(t) : 1 === o && (n.firstMultiple = !1);
      var r = n.firstInput,
          a = n.firstMultiple,
          s = a ? a.center : r.center,
          l = t.center = S(i);
      t.timeStamp = ce(), t.deltaTime = t.timeStamp - r.timeStamp, t.angle = O(s, l), t.distance = L(s, l), function (e, t) {
        var n = t.center,
            i = e.offsetDelta || {},
            o = e.prevDelta || {},
            r = e.prevInput || {};
        t.eventType !== be && r.eventType !== we || (o = e.prevDelta = {
          x: r.deltaX || 0,
          y: r.deltaY || 0
        }, i = e.offsetDelta = {
          x: n.x,
          y: n.y
        }), t.deltaX = o.x + (n.x - i.x), t.deltaY = o.y + (n.y - i.y);
      }(n, t), t.offsetDirection = A(t.deltaX, t.deltaY);
      var c = C(t.deltaTime, t.deltaX, t.deltaY);
      t.overallVelocityX = c.x, t.overallVelocityY = c.y, t.overallVelocity = le(c.x) > le(c.y) ? c.x : c.y, t.scale = a ? function (e, t) {
        return L(t[0], t[1], Me) / L(e[0], e[1], Me);
      }(a.pointers, i) : 1, t.rotation = a ? function (e, t) {
        return O(t[1], t[0], Me) + O(e[1], e[0], Me);
      }(a.pointers, i) : 0, t.maxPointers = n.prevInput ? t.pointers.length > n.prevInput.maxPointers ? t.pointers.length : n.prevInput.maxPointers : t.pointers.length, E(n, t);
      var u = e.element;
      d(t.srcEvent.target, u) && (u = t.srcEvent.target), t.target = u;
    }(e, n), e.emit("hammer.input", n), e.recognize(n), e.session.prevInput = n;
  }

  function E(e, t) {
    var n,
        o,
        r,
        a,
        s = e.lastInterval || t,
        l = t.timeStamp - s.timeStamp;

    if (t.eventType != _e && (l > ve || s.velocity === i)) {
      var c = t.deltaX - s.deltaX,
          u = t.deltaY - s.deltaY,
          p = C(l, c, u);
      o = p.x, r = p.y, n = le(p.x) > le(p.y) ? p.x : p.y, a = A(c, u), e.lastInterval = t;
    } else n = s.velocity, o = s.velocityX, r = s.velocityY, a = s.direction;

    t.velocity = n, t.velocityX = o, t.velocityY = r, t.direction = a;
  }

  function T(e) {
    for (var t = [], n = 0; n < e.pointers.length;) {
      t[n] = {
        clientX: se(e.pointers[n].clientX),
        clientY: se(e.pointers[n].clientY)
      }, n++;
    }

    return {
      timeStamp: ce(),
      pointers: t,
      center: S(t),
      deltaX: e.deltaX,
      deltaY: e.deltaY
    };
  }

  function S(e) {
    var t = e.length;
    if (1 === t) return {
      x: se(e[0].clientX),
      y: se(e[0].clientY)
    };

    for (var n = 0, i = 0, o = 0; t > o;) {
      n += e[o].clientX, i += e[o].clientY, o++;
    }

    return {
      x: se(n / t),
      y: se(i / t)
    };
  }

  function C(e, t, n) {
    return {
      x: t / e || 0,
      y: n / e || 0
    };
  }

  function A(e, t) {
    return e === t ? ke : le(e) >= le(t) ? 0 > e ? Ee : Te : 0 > t ? Se : Ce;
  }

  function L(e, t, n) {
    n || (n = Ne);
    var i = t[n[0]] - e[n[0]],
        o = t[n[1]] - e[n[1]];
    return Math.sqrt(i * i + o * o);
  }

  function O(e, t, n) {
    n || (n = Ne);
    var i = t[n[0]] - e[n[0]],
        o = t[n[1]] - e[n[1]];
    return 180 * Math.atan2(o, i) / Math.PI;
  }

  function N() {
    this.evEl = De, this.evWin = Ie, this.pressed = !1, _.apply(this, arguments);
  }

  function M() {
    this.evEl = He, this.evWin = qe, _.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }

  function j() {
    this.evTarget = We, this.evWin = ze, this.started = !1, _.apply(this, arguments);
  }

  function D(e, t) {
    var n = v(e.touches),
        i = v(e.changedTouches);
    return t & (we | _e) && (n = b(n.concat(i), "identifier", !0)), [n, i];
  }

  function I() {
    this.evTarget = Be, this.targetIds = {}, _.apply(this, arguments);
  }

  function P(e, t) {
    var n = v(e.touches),
        i = this.targetIds;
    if (t & (be | xe) && 1 === n.length) return i[n[0].identifier] = !0, [n, n];
    var o,
        r,
        a = v(e.changedTouches),
        s = [],
        l = this.target;
    if (r = n.filter(function (e) {
      return d(e.target, l);
    }), t === be) for (o = 0; o < r.length;) {
      i[r[o].identifier] = !0, o++;
    }

    for (o = 0; o < a.length;) {
      i[a[o].identifier] && s.push(a[o]), t & (we | _e) && delete i[a[o].identifier], o++;
    }

    return s.length ? [b(r.concat(s), "identifier", !0), s] : void 0;
  }

  function R() {
    _.apply(this, arguments);

    var e = c(this.handler, this);
    this.touch = new I(this.manager, e), this.mouse = new N(this.manager, e), this.primaryTouch = null, this.lastTouches = [];
  }

  function H(e, t) {
    e & be ? (this.primaryTouch = t.changedPointers[0].identifier, q.call(this, t)) : e & (we | _e) && q.call(this, t);
  }

  function q(e) {
    var t = e.changedPointers[0];

    if (t.identifier === this.primaryTouch) {
      var n = {
        x: t.clientX,
        y: t.clientY
      };
      this.lastTouches.push(n);
      var i = this.lastTouches;
      setTimeout(function () {
        var e = i.indexOf(n);
        e > -1 && i.splice(e, 1);
      }, Xe);
    }
  }

  function F(e) {
    for (var t = e.srcEvent.clientX, n = e.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {
      var o = this.lastTouches[i],
          r = Math.abs(t - o.x),
          a = Math.abs(n - o.y);
      if (Ye >= r && Ye >= a) return !0;
    }

    return !1;
  }

  function W(e, t) {
    this.manager = e, this.set(t);
  }

  function z(e) {
    this.options = ie({}, this.defaults, e || {}), this.id = fe++, this.manager = null, this.options.enable = p(this.options.enable, !0), this.state = nt, this.simultaneous = {}, this.requireFail = [];
  }

  function U(e) {
    return e & st ? "cancel" : e & rt ? "end" : e & ot ? "move" : e & it ? "start" : "";
  }

  function B(e) {
    return e == Ce ? "down" : e == Se ? "up" : e == Ee ? "left" : e == Te ? "right" : "";
  }

  function X(e, t) {
    var n = t.manager;
    return n ? n.get(e) : e;
  }

  function Y() {
    z.apply(this, arguments);
  }

  function V() {
    Y.apply(this, arguments), this.pX = null, this.pY = null;
  }

  function $() {
    Y.apply(this, arguments);
  }

  function Q() {
    z.apply(this, arguments), this._timer = null, this._input = null;
  }

  function K() {
    Y.apply(this, arguments);
  }

  function G() {
    Y.apply(this, arguments);
  }

  function J() {
    z.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
  }

  function Z(e, t) {
    return (t = t || {}).recognizers = p(t.recognizers, Z.defaults.preset), new ee(e, t);
  }

  function ee(e, t) {
    this.options = ie({}, Z.defaults, t || {}), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = e, this.input = function (e) {
      return new (e.options.inputClass || (de ? M : ge ? I : he ? R : N))(e, k);
    }(this), this.touchAction = new W(this, this.options.touchAction), te(this, !0), a(this.options.recognizers, function (e) {
      var t = this.add(new e[0](e[1]));
      e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3]);
    }, this);
  }

  function te(e, t) {
    var n,
        i = e.element;
    i.style && (a(e.options.cssProps, function (o, r) {
      n = x(i.style, r), t ? (e.oldCssProps[n] = i.style[n], i.style[n] = o) : i.style[n] = e.oldCssProps[n] || "";
    }), t || (e.oldCssProps = {}));
  }

  function ne(e, n) {
    var i = t.createEvent("Event");
    i.initEvent(e, !0, !0), i.gesture = n, n.target.dispatchEvent(i);
  }

  var ie,
      oe = ["", "webkit", "Moz", "MS", "ms", "o"],
      re = t.createElement("div"),
      ae = "function",
      se = Math.round,
      le = Math.abs,
      ce = Date.now;
  ie = "function" != typeof Object.assign ? function (e) {
    if (e === i || null === e) throw new TypeError("Cannot convert undefined or null to object");

    for (var t = Object(e), n = 1; n < arguments.length; n++) {
      var o = arguments[n];
      if (o !== i && null !== o) for (var r in o) {
        o.hasOwnProperty(r) && (t[r] = o[r]);
      }
    }

    return t;
  } : Object.assign;
  var ue = s(function (e, t, n) {
    for (var o = Object.keys(t), r = 0; r < o.length;) {
      (!n || n && e[o[r]] === i) && (e[o[r]] = t[o[r]]), r++;
    }

    return e;
  }, "extend", "Use `assign`."),
      pe = s(function (e, t) {
    return ue(e, t, !0);
  }, "merge", "Use `assign`."),
      fe = 1,
      he = ("ontouchstart" in e),
      de = x(e, "PointerEvent") !== i,
      ge = he && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
      me = "touch",
      ye = "mouse",
      ve = 25,
      be = 1,
      xe = 2,
      we = 4,
      _e = 8,
      ke = 1,
      Ee = 2,
      Te = 4,
      Se = 8,
      Ce = 16,
      Ae = Ee | Te,
      Le = Se | Ce,
      Oe = Ae | Le,
      Ne = ["x", "y"],
      Me = ["clientX", "clientY"];
  _.prototype = {
    handler: function handler() {},
    init: function init() {
      this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(w(this.element), this.evWin, this.domHandler);
    },
    destroy: function destroy() {
      this.evEl && h(this.element, this.evEl, this.domHandler), this.evTarget && h(this.target, this.evTarget, this.domHandler), this.evWin && h(w(this.element), this.evWin, this.domHandler);
    }
  };
  var je = {
    mousedown: be,
    mousemove: xe,
    mouseup: we
  },
      De = "mousedown",
      Ie = "mousemove mouseup";
  l(N, _, {
    handler: function handler(e) {
      var t = je[e.type];
      t & be && 0 === e.button && (this.pressed = !0), t & xe && 1 !== e.which && (t = we), this.pressed && (t & we && (this.pressed = !1), this.callback(this.manager, t, {
        pointers: [e],
        changedPointers: [e],
        pointerType: ye,
        srcEvent: e
      }));
    }
  });
  var Pe = {
    pointerdown: be,
    pointermove: xe,
    pointerup: we,
    pointercancel: _e,
    pointerout: _e
  },
      Re = {
    2: me,
    3: "pen",
    4: ye,
    5: "kinect"
  },
      He = "pointerdown",
      qe = "pointermove pointerup pointercancel";
  e.MSPointerEvent && !e.PointerEvent && (He = "MSPointerDown", qe = "MSPointerMove MSPointerUp MSPointerCancel"), l(M, _, {
    handler: function handler(e) {
      var t = this.store,
          n = !1,
          i = e.type.toLowerCase().replace("ms", ""),
          o = Pe[i],
          r = Re[e.pointerType] || e.pointerType,
          a = r == me,
          s = y(t, e.pointerId, "pointerId");
      o & be && (0 === e.button || a) ? 0 > s && (t.push(e), s = t.length - 1) : o & (we | _e) && (n = !0), 0 > s || (t[s] = e, this.callback(this.manager, o, {
        pointers: t,
        changedPointers: [e],
        pointerType: r,
        srcEvent: e
      }), n && t.splice(s, 1));
    }
  });
  var Fe = {
    touchstart: be,
    touchmove: xe,
    touchend: we,
    touchcancel: _e
  },
      We = "touchstart",
      ze = "touchstart touchmove touchend touchcancel";
  l(j, _, {
    handler: function handler(e) {
      var t = Fe[e.type];

      if (t === be && (this.started = !0), this.started) {
        var n = D.call(this, e, t);
        t & (we | _e) && n[0].length - n[1].length == 0 && (this.started = !1), this.callback(this.manager, t, {
          pointers: n[0],
          changedPointers: n[1],
          pointerType: me,
          srcEvent: e
        });
      }
    }
  });
  var Ue = {
    touchstart: be,
    touchmove: xe,
    touchend: we,
    touchcancel: _e
  },
      Be = "touchstart touchmove touchend touchcancel";
  l(I, _, {
    handler: function handler(e) {
      var t = Ue[e.type],
          n = P.call(this, e, t);
      n && this.callback(this.manager, t, {
        pointers: n[0],
        changedPointers: n[1],
        pointerType: me,
        srcEvent: e
      });
    }
  });
  var Xe = 2500,
      Ye = 25;
  l(R, _, {
    handler: function handler(e, t, n) {
      var i = n.pointerType == me,
          o = n.pointerType == ye;

      if (!(o && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
        if (i) H.call(this, t, n);else if (o && F.call(this, n)) return;
        this.callback(e, t, n);
      }
    },
    destroy: function destroy() {
      this.touch.destroy(), this.mouse.destroy();
    }
  });

  var Ve = x(re.style, "touchAction"),
      $e = Ve !== i,
      Qe = "compute",
      Ke = "auto",
      Ge = "manipulation",
      Je = "none",
      Ze = "pan-x",
      et = "pan-y",
      tt = function () {
    if (!$e) return !1;
    var t = {},
        n = e.CSS && e.CSS.supports;
    return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (i) {
      t[i] = !n || e.CSS.supports("touch-action", i);
    }), t;
  }();

  W.prototype = {
    set: function set(e) {
      e == Qe && (e = this.compute()), $e && this.manager.element.style && tt[e] && (this.manager.element.style[Ve] = e), this.actions = e.toLowerCase().trim();
    },
    update: function update() {
      this.set(this.manager.options.touchAction);
    },
    compute: function compute() {
      var e = [];
      return a(this.manager.recognizers, function (t) {
        u(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()));
      }), function (e) {
        if (g(e, Je)) return Je;
        var t = g(e, Ze),
            n = g(e, et);
        return t && n ? Je : t || n ? t ? Ze : et : g(e, Ge) ? Ge : Ke;
      }(e.join(" "));
    },
    preventDefaults: function preventDefaults(e) {
      var t = e.srcEvent,
          n = e.offsetDirection;

      if (!this.manager.session.prevented) {
        var i = this.actions,
            o = g(i, Je) && !tt[Je],
            r = g(i, et) && !tt[et],
            a = g(i, Ze) && !tt[Ze];

        if (o) {
          var s = 1 === e.pointers.length,
              l = e.distance < 2,
              c = e.deltaTime < 250;
          if (s && l && c) return;
        }

        return a && r ? void 0 : o || r && n & Ae || a && n & Le ? this.preventSrc(t) : void 0;
      }

      t.preventDefault();
    },
    preventSrc: function preventSrc(e) {
      this.manager.session.prevented = !0, e.preventDefault();
    }
  };
  var nt = 1,
      it = 2,
      ot = 4,
      rt = 8,
      at = rt,
      st = 16,
      lt = 32;
  z.prototype = {
    defaults: {},
    set: function set(e) {
      return ie(this.options, e), this.manager && this.manager.touchAction.update(), this;
    },
    recognizeWith: function recognizeWith(e) {
      if (r(e, "recognizeWith", this)) return this;
      var t = this.simultaneous;
      return t[(e = X(e, this)).id] || (t[e.id] = e, e.recognizeWith(this)), this;
    },
    dropRecognizeWith: function dropRecognizeWith(e) {
      return r(e, "dropRecognizeWith", this) || (e = X(e, this), delete this.simultaneous[e.id]), this;
    },
    requireFailure: function requireFailure(e) {
      if (r(e, "requireFailure", this)) return this;
      var t = this.requireFail;
      return -1 === y(t, e = X(e, this)) && (t.push(e), e.requireFailure(this)), this;
    },
    dropRequireFailure: function dropRequireFailure(e) {
      if (r(e, "dropRequireFailure", this)) return this;
      e = X(e, this);
      var t = y(this.requireFail, e);
      return t > -1 && this.requireFail.splice(t, 1), this;
    },
    hasRequireFailures: function hasRequireFailures() {
      return this.requireFail.length > 0;
    },
    canRecognizeWith: function canRecognizeWith(e) {
      return !!this.simultaneous[e.id];
    },
    emit: function emit(e) {
      function t(t) {
        n.manager.emit(t, e);
      }

      var n = this,
          i = this.state;
      rt > i && t(n.options.event + U(i)), t(n.options.event), e.additionalEvent && t(e.additionalEvent), i >= rt && t(n.options.event + U(i));
    },
    tryEmit: function tryEmit(e) {
      return this.canEmit() ? this.emit(e) : void (this.state = lt);
    },
    canEmit: function canEmit() {
      for (var e = 0; e < this.requireFail.length;) {
        if (!(this.requireFail[e].state & (lt | nt))) return !1;
        e++;
      }

      return !0;
    },
    recognize: function recognize(e) {
      var t = ie({}, e);
      return u(this.options.enable, [this, t]) ? (this.state & (at | st | lt) && (this.state = nt), this.state = this.process(t), void (this.state & (it | ot | rt | st) && this.tryEmit(t))) : (this.reset(), void (this.state = lt));
    },
    process: function process(e) {},
    getTouchAction: function getTouchAction() {},
    reset: function reset() {}
  }, l(Y, z, {
    defaults: {
      pointers: 1
    },
    attrTest: function attrTest(e) {
      var t = this.options.pointers;
      return 0 === t || e.pointers.length === t;
    },
    process: function process(e) {
      var t = this.state,
          n = e.eventType,
          i = t & (it | ot),
          o = this.attrTest(e);
      return i && (n & _e || !o) ? t | st : i || o ? n & we ? t | rt : t & it ? t | ot : it : lt;
    }
  }), l(V, Y, {
    defaults: {
      event: "pan",
      threshold: 10,
      pointers: 1,
      direction: Oe
    },
    getTouchAction: function getTouchAction() {
      var e = this.options.direction,
          t = [];
      return e & Ae && t.push(et), e & Le && t.push(Ze), t;
    },
    directionTest: function directionTest(e) {
      var t = this.options,
          n = !0,
          i = e.distance,
          o = e.direction,
          r = e.deltaX,
          a = e.deltaY;
      return o & t.direction || (t.direction & Ae ? (o = 0 === r ? ke : 0 > r ? Ee : Te, n = r != this.pX, i = Math.abs(e.deltaX)) : (o = 0 === a ? ke : 0 > a ? Se : Ce, n = a != this.pY, i = Math.abs(e.deltaY))), e.direction = o, n && i > t.threshold && o & t.direction;
    },
    attrTest: function attrTest(e) {
      return Y.prototype.attrTest.call(this, e) && (this.state & it || !(this.state & it) && this.directionTest(e));
    },
    emit: function emit(e) {
      this.pX = e.deltaX, this.pY = e.deltaY;
      var t = B(e.direction);
      t && (e.additionalEvent = this.options.event + t), this._super.emit.call(this, e);
    }
  }), l($, Y, {
    defaults: {
      event: "pinch",
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function getTouchAction() {
      return [Je];
    },
    attrTest: function attrTest(e) {
      return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & it);
    },
    emit: function emit(e) {
      if (1 !== e.scale) {
        var t = e.scale < 1 ? "in" : "out";
        e.additionalEvent = this.options.event + t;
      }

      this._super.emit.call(this, e);
    }
  }), l(Q, z, {
    defaults: {
      event: "press",
      pointers: 1,
      time: 251,
      threshold: 9
    },
    getTouchAction: function getTouchAction() {
      return [Ke];
    },
    process: function process(e) {
      var t = this.options,
          n = e.pointers.length === t.pointers,
          i = e.distance < t.threshold,
          r = e.deltaTime > t.time;
      if (this._input = e, !i || !n || e.eventType & (we | _e) && !r) this.reset();else if (e.eventType & be) this.reset(), this._timer = o(function () {
        this.state = at, this.tryEmit();
      }, t.time, this);else if (e.eventType & we) return at;
      return lt;
    },
    reset: function reset() {
      clearTimeout(this._timer);
    },
    emit: function emit(e) {
      this.state === at && (e && e.eventType & we ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = ce(), this.manager.emit(this.options.event, this._input)));
    }
  }), l(K, Y, {
    defaults: {
      event: "rotate",
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function getTouchAction() {
      return [Je];
    },
    attrTest: function attrTest(e) {
      return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & it);
    }
  }), l(G, Y, {
    defaults: {
      event: "swipe",
      threshold: 10,
      velocity: .3,
      direction: Ae | Le,
      pointers: 1
    },
    getTouchAction: function getTouchAction() {
      return V.prototype.getTouchAction.call(this);
    },
    attrTest: function attrTest(e) {
      var t,
          n = this.options.direction;
      return n & (Ae | Le) ? t = e.overallVelocity : n & Ae ? t = e.overallVelocityX : n & Le && (t = e.overallVelocityY), this._super.attrTest.call(this, e) && n & e.offsetDirection && e.distance > this.options.threshold && e.maxPointers == this.options.pointers && le(t) > this.options.velocity && e.eventType & we;
    },
    emit: function emit(e) {
      var t = B(e.offsetDirection);
      t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e);
    }
  }), l(J, z, {
    defaults: {
      event: "tap",
      pointers: 1,
      taps: 1,
      interval: 300,
      time: 250,
      threshold: 9,
      posThreshold: 10
    },
    getTouchAction: function getTouchAction() {
      return [Ge];
    },
    process: function process(e) {
      var t = this.options,
          n = e.pointers.length === t.pointers,
          i = e.distance < t.threshold,
          r = e.deltaTime < t.time;
      if (this.reset(), e.eventType & be && 0 === this.count) return this.failTimeout();

      if (i && r && n) {
        if (e.eventType != we) return this.failTimeout();
        var a = !this.pTime || e.timeStamp - this.pTime < t.interval,
            s = !this.pCenter || L(this.pCenter, e.center) < t.posThreshold;
        if (this.pTime = e.timeStamp, this.pCenter = e.center, s && a ? this.count += 1 : this.count = 1, this._input = e, 0 === this.count % t.taps) return this.hasRequireFailures() ? (this._timer = o(function () {
          this.state = at, this.tryEmit();
        }, t.interval, this), it) : at;
      }

      return lt;
    },
    failTimeout: function failTimeout() {
      return this._timer = o(function () {
        this.state = lt;
      }, this.options.interval, this), lt;
    },
    reset: function reset() {
      clearTimeout(this._timer);
    },
    emit: function emit() {
      this.state == at && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
    }
  }), Z.VERSION = "2.0.8", Z.defaults = {
    domEvents: !1,
    touchAction: Qe,
    enable: !0,
    inputTarget: null,
    inputClass: null,
    preset: [[K, {
      enable: !1
    }], [$, {
      enable: !1
    }, ["rotate"]], [G, {
      direction: Ae
    }], [V, {
      direction: Ae
    }, ["swipe"]], [J], [J, {
      event: "doubletap",
      taps: 2
    }, ["tap"]], [Q]],
    cssProps: {
      userSelect: "none",
      touchSelect: "none",
      touchCallout: "none",
      contentZooming: "none",
      userDrag: "none",
      tapHighlightColor: "rgba(0,0,0,0)"
    }
  };
  ee.prototype = {
    set: function set(e) {
      return ie(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this;
    },
    stop: function stop(e) {
      this.session.stopped = e ? 2 : 1;
    },
    recognize: function recognize(e) {
      var t = this.session;

      if (!t.stopped) {
        this.touchAction.preventDefaults(e);
        var n,
            i = this.recognizers,
            o = t.curRecognizer;
        (!o || o && o.state & at) && (o = t.curRecognizer = null);

        for (var r = 0; r < i.length;) {
          n = i[r], 2 === t.stopped || o && n != o && !n.canRecognizeWith(o) ? n.reset() : n.recognize(e), !o && n.state & (it | ot | rt) && (o = t.curRecognizer = n), r++;
        }
      }
    },
    get: function get(e) {
      if (e instanceof z) return e;

      for (var t = this.recognizers, n = 0; n < t.length; n++) {
        if (t[n].options.event == e) return t[n];
      }

      return null;
    },
    add: function add(e) {
      if (r(e, "add", this)) return this;
      var t = this.get(e.options.event);
      return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e;
    },
    remove: function remove(e) {
      if (r(e, "remove", this)) return this;

      if (e = this.get(e)) {
        var t = this.recognizers,
            n = y(t, e);
        -1 !== n && (t.splice(n, 1), this.touchAction.update());
      }

      return this;
    },
    on: function on(e, t) {
      if (e !== i && t !== i) {
        var n = this.handlers;
        return a(m(e), function (e) {
          n[e] = n[e] || [], n[e].push(t);
        }), this;
      }
    },
    off: function off(e, t) {
      if (e !== i) {
        var n = this.handlers;
        return a(m(e), function (e) {
          t ? n[e] && n[e].splice(y(n[e], t), 1) : delete n[e];
        }), this;
      }
    },
    emit: function emit(e, t) {
      this.options.domEvents && ne(e, t);
      var n = this.handlers[e] && this.handlers[e].slice();

      if (n && n.length) {
        t.type = e, t.preventDefault = function () {
          t.srcEvent.preventDefault();
        };

        for (var i = 0; i < n.length;) {
          n[i](t), i++;
        }
      }
    },
    destroy: function destroy() {
      this.element && te(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
    }
  }, ie(Z, {
    INPUT_START: be,
    INPUT_MOVE: xe,
    INPUT_END: we,
    INPUT_CANCEL: _e,
    STATE_POSSIBLE: nt,
    STATE_BEGAN: it,
    STATE_CHANGED: ot,
    STATE_ENDED: rt,
    STATE_RECOGNIZED: at,
    STATE_CANCELLED: st,
    STATE_FAILED: lt,
    DIRECTION_NONE: ke,
    DIRECTION_LEFT: Ee,
    DIRECTION_RIGHT: Te,
    DIRECTION_UP: Se,
    DIRECTION_DOWN: Ce,
    DIRECTION_HORIZONTAL: Ae,
    DIRECTION_VERTICAL: Le,
    DIRECTION_ALL: Oe,
    Manager: ee,
    Input: _,
    TouchAction: W,
    TouchInput: I,
    MouseInput: N,
    PointerEventInput: M,
    TouchMouseInput: R,
    SingleTouchInput: j,
    Recognizer: z,
    AttrRecognizer: Y,
    Tap: J,
    Pan: V,
    Swipe: G,
    Pinch: $,
    Rotate: K,
    Press: Q,
    on: f,
    off: h,
    each: a,
    merge: pe,
    extend: ue,
    assign: ie,
    inherit: l,
    bindFn: c,
    prefixed: x
  }), (void 0 !== e ? e : "undefined" != typeof self ? self : {}).Hammer = Z, "function" == typeof define && define.amd ? define(function () {
    return Z;
  }) : "undefined" != typeof module && module.exports ? module.exports = Z : e.Hammer = Z;
}(window, document), Unison = function () {
  "use strict";

  var e,
      t = window,
      n = document,
      i = n.head,
      o = {},
      r = !1,
      a = {
    parseMQ: function parseMQ(e) {
      return t.getComputedStyle(e, null).getPropertyValue("font-family").replace(/"/g, "").replace(/'/g, "");
    },
    debounce: function debounce(e, t, n) {
      var i;
      return function () {
        var o = this,
            r = arguments;
        clearTimeout(i), i = setTimeout(function () {
          i = null, n || e.apply(o, r);
        }, t), n && !i && e.apply(o, r);
      };
    },
    isObject: function isObject(e) {
      return "object" == _typeof(e);
    },
    isUndefined: function isUndefined(e) {
      return void 0 === e;
    }
  },
      s = {
    on: function on(e, t) {
      a.isObject(o[e]) || (o[e] = []), o[e].push(t);
    },
    emit: function emit(e, t) {
      if (a.isObject(o[e])) for (var n = o[e].slice(), i = 0; i < n.length; i++) {
        n[i].call(this, t);
      }
    }
  },
      l = {
    all: function all() {
      for (var e = {}, t = a.parseMQ(n.querySelector("title")).split(","), i = 0; i < t.length; i++) {
        var o = t[i].trim().split(" ");
        e[o[0]] = o[1];
      }

      return r ? e : null;
    },
    now: function now(e) {
      var t = a.parseMQ(i).split(" "),
          n = {
        name: t[0],
        width: t[1]
      };
      return r ? a.isUndefined(e) ? n : e(n) : null;
    },
    update: function update() {
      l.now(function (t) {
        t.name !== e && (s.emit(t.name), s.emit("change", t), e = t.name);
      });
    }
  };
  return t.onresize = a.debounce(l.update, 100), n.addEventListener("DOMContentLoaded", function () {
    r = "none" !== t.getComputedStyle(i, null).getPropertyValue("clear"), l.update();
  }), {
    fetch: {
      all: l.all,
      now: l.now
    },
    on: s.on,
    emit: s.emit,
    util: {
      debounce: a.debounce,
      isObject: a.isObject
    }
  };
}(), function () {
  "use strict";

  function e(e) {
    function t(t, i) {
      var r,
          d,
          g = t == window,
          m = i && void 0 !== i.message ? i.message : void 0;

      if (!(i = e.extend({}, e.blockUI.defaults, i || {})).ignoreIfBlocked || !e(t).data("blockUI.isBlocked")) {
        if (i.overlayCSS = e.extend({}, e.blockUI.defaults.overlayCSS, i.overlayCSS || {}), r = e.extend({}, e.blockUI.defaults.css, i.css || {}), i.onOverlayClick && (i.overlayCSS.cursor = "pointer"), d = e.extend({}, e.blockUI.defaults.themedCSS, i.themedCSS || {}), m = void 0 === m ? i.message : m, g && f && n(window, {
          fadeOut: 0
        }), m && "string" != typeof m && (m.parentNode || m.jquery)) {
          var y = m.jquery ? m[0] : m,
              v = {};
          e(t).data("blockUI.history", v), v.el = y, v.parent = y.parentNode, v.display = y.style.display, v.position = y.style.position, v.parent && v.parent.removeChild(y);
        }

        e(t).data("blockUI.onUnblock", i.onUnblock);

        var b,
            x,
            w,
            _,
            k = i.baseZ;

        b = e(c || i.forceIframe ? '<iframe class="blockUI" style="z-index:' + k++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + i.iframeSrc + '"></iframe>' : '<div class="blockUI" style="display:none"></div>'), x = e(i.theme ? '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + k++ + ';display:none"></div>' : '<div class="blockUI blockOverlay" style="z-index:' + k++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'), i.theme && g ? (_ = '<div class="blockUI ' + i.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (k + 10) + ';display:none;position:fixed">', i.title && (_ += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (i.title || "&nbsp;") + "</div>"), _ += '<div class="ui-widget-content ui-dialog-content"></div>', _ += "</div>") : i.theme ? (_ = '<div class="blockUI ' + i.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (k + 10) + ';display:none;position:absolute">', i.title && (_ += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (i.title || "&nbsp;") + "</div>"), _ += '<div class="ui-widget-content ui-dialog-content"></div>', _ += "</div>") : _ = g ? '<div class="blockUI ' + i.blockMsgClass + ' blockPage" style="z-index:' + (k + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + i.blockMsgClass + ' blockElement" style="z-index:' + (k + 10) + ';display:none;position:absolute"></div>', w = e(_), m && (i.theme ? (w.css(d), w.addClass("ui-widget-content")) : w.css(r)), i.theme || x.css(i.overlayCSS), x.css("position", g ? "fixed" : "absolute"), (c || i.forceIframe) && b.css("opacity", 0);
        var E = [b, x, w],
            T = e(g ? "body" : t);
        e.each(E, function () {
          this.appendTo(T);
        }), i.theme && i.draggable && e.fn.draggable && w.draggable({
          handle: ".ui-dialog-titlebar",
          cancel: "li"
        });
        var S = p && (!e.support.boxModel || e("object,embed", g ? null : t).length > 0);

        if (u || S) {
          if (g && i.allowBodyStretch && e.support.boxModel && e("html,body").css("height", "100%"), (u || !e.support.boxModel) && !g) var C = s(t, "borderTopWidth"),
              A = s(t, "borderLeftWidth"),
              L = C ? "(0 - " + C + ")" : 0,
              O = A ? "(0 - " + A + ")" : 0;
          e.each(E, function (e, t) {
            var n = t[0].style;
            if (n.position = "absolute", 2 > e) g ? n.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + i.quirksmodeOffsetHack + ') + "px"') : n.setExpression("height", 'this.parentNode.offsetHeight + "px"'), g ? n.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : n.setExpression("width", 'this.parentNode.offsetWidth + "px"'), O && n.setExpression("left", O), L && n.setExpression("top", L);else if (i.centerY) g && n.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'), n.marginTop = 0;else if (!i.centerY && g) {
              var o = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + (i.css && i.css.top ? parseInt(i.css.top, 10) : 0) + ') + "px"';
              n.setExpression("top", o);
            }
          });
        }

        if (m && (i.theme ? w.find(".ui-widget-content").append(m) : w.append(m), (m.jquery || m.nodeType) && e(m).show()), (c || i.forceIframe) && i.showOverlay && b.show(), i.fadeIn) {
          var N = i.onBlock ? i.onBlock : l,
              M = i.showOverlay && !m ? N : l,
              j = m ? N : l;
          i.showOverlay && x._fadeIn(i.fadeIn, M), m && w._fadeIn(i.fadeIn, j);
        } else i.showOverlay && x.show(), m && w.show(), i.onBlock && i.onBlock.bind(w)();

        if (o(1, t, i), g ? (f = w[0], h = e(i.focusableElements, f), i.focusInput && setTimeout(a, 20)) : function (e, t, n) {
          var i = e.parentNode,
              o = e.style,
              r = (i.offsetWidth - e.offsetWidth) / 2 - s(i, "borderLeftWidth"),
              a = (i.offsetHeight - e.offsetHeight) / 2 - s(i, "borderTopWidth");
          t && (o.left = r > 0 ? r + "px" : "0"), n && (o.top = a > 0 ? a + "px" : "0");
        }(w[0], i.centerX, i.centerY), i.timeout) {
          var D = setTimeout(function () {
            g ? e.unblockUI(i) : e(t).unblock(i);
          }, i.timeout);
          e(t).data("blockUI.timeout", D);
        }
      }
    }

    function n(t, n) {
      var r,
          a,
          s = t == window,
          l = e(t),
          c = l.data("blockUI.history"),
          u = l.data("blockUI.timeout");
      u && (clearTimeout(u), l.removeData("blockUI.timeout")), n = e.extend({}, e.blockUI.defaults, n || {}), o(0, t, n), null === n.onUnblock && (n.onUnblock = l.data("blockUI.onUnblock"), l.removeData("blockUI.onUnblock")), a = s ? e("body").children().filter(".blockUI").add("body > .blockUI") : l.find(">.blockUI"), n.cursorReset && (a.length > 1 && (a[1].style.cursor = n.cursorReset), a.length > 2 && (a[2].style.cursor = n.cursorReset)), s && (f = h = null), n.fadeOut ? (r = a.length, a.stop().fadeOut(n.fadeOut, function () {
        0 == --r && i(a, c, n, t);
      })) : i(a, c, n, t);
    }

    function i(t, n, i, o) {
      var r = e(o);

      if (!r.data("blockUI.isBlocked")) {
        t.each(function (e, t) {
          this.parentNode && this.parentNode.removeChild(this);
        }), n && n.el && (n.el.style.display = n.display, n.el.style.position = n.position, n.el.style.cursor = "default", n.parent && n.parent.appendChild(n.el), r.removeData("blockUI.history")), r.data("blockUI.static") && r.css("position", "static"), "function" == typeof i.onUnblock && i.onUnblock(o, i);
        var a = e(document.body),
            s = a.width(),
            l = a[0].style.width;
        a.width(s - 1).width(s), a[0].style.width = l;
      }
    }

    function o(t, n, i) {
      var o = n == window,
          a = e(n);

      if ((t || (!o || f) && (o || a.data("blockUI.isBlocked"))) && (a.data("blockUI.isBlocked", t), o && i.bindEvents && (!t || i.showOverlay))) {
        var s = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
        t ? e(document).bind(s, i, r) : e(document).unbind(s, r);
      }
    }

    function r(t) {
      if ("keydown" === t.type && t.keyCode && 9 == t.keyCode && f && t.data.constrainTabKey) {
        var n = h,
            i = !t.shiftKey && t.target === n[n.length - 1],
            o = t.shiftKey && t.target === n[0];
        if (i || o) return setTimeout(function () {
          a(o);
        }, 10), !1;
      }

      var r = t.data,
          s = e(t.target);
      return s.hasClass("blockOverlay") && r.onOverlayClick && r.onOverlayClick(t), s.parents("div." + r.blockMsgClass).length > 0 || 0 === s.parents().children().filter("div.blockUI").length;
    }

    function a(e) {
      if (h) {
        var t = h[!0 === e ? h.length - 1 : 0];
        t && t.focus();
      }
    }

    function s(t, n) {
      return parseInt(e.css(t, n), 10) || 0;
    }

    e.fn._fadeIn = e.fn.fadeIn;

    var l = e.noop || function () {},
        c = /MSIE/.test(navigator.userAgent),
        u = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent),
        p = (document.documentMode, e.isFunction(document.createElement("div").style.setExpression));

    e.blockUI = function (e) {
      t(window, e);
    }, e.unblockUI = function (e) {
      n(window, e);
    }, e.growlUI = function (t, n, i, o) {
      var r = e('<div class="growlUI"></div>');
      t && r.append("<h1>" + t + "</h1>"), n && r.append("<h2>" + n + "</h2>"), void 0 === i && (i = 3e3);

      var a = function a(t) {
        t = t || {}, e.blockUI({
          message: r,
          fadeIn: void 0 !== t.fadeIn ? t.fadeIn : 700,
          fadeOut: void 0 !== t.fadeOut ? t.fadeOut : 1e3,
          timeout: void 0 !== t.timeout ? t.timeout : i,
          centerY: !1,
          showOverlay: !1,
          onUnblock: o,
          css: e.blockUI.defaults.growlCSS
        });
      };

      a(), r.css("opacity"), r.mouseover(function () {
        a({
          fadeIn: 0,
          timeout: 3e4
        });
        var t = e(".blockMsg");
        t.stop(), t.fadeTo(300, 1);
      }).mouseout(function () {
        e(".blockMsg").fadeOut(1e3);
      });
    }, e.fn.block = function (n) {
      if (this[0] === window) return e.blockUI(n), this;
      var i = e.extend({}, e.blockUI.defaults, n || {});
      return this.each(function () {
        var t = e(this);
        i.ignoreIfBlocked && t.data("blockUI.isBlocked") || t.unblock({
          fadeOut: 0
        });
      }), this.each(function () {
        "static" == e.css(this, "position") && (this.style.position = "relative", e(this).data("blockUI.static", !0)), this.style.zoom = 1, t(this, n);
      });
    }, e.fn.unblock = function (t) {
      return this[0] === window ? (e.unblockUI(t), this) : this.each(function () {
        n(this, t);
      });
    }, e.blockUI.version = 2.7, e.blockUI.defaults = {
      message: "<h1>Please wait...</h1>",
      title: null,
      draggable: !0,
      theme: !1,
      css: {
        padding: 0,
        margin: 0,
        width: "30%",
        top: "40%",
        left: "35%",
        textAlign: "center",
        color: "#000",
        border: "3px solid #aaa",
        backgroundColor: "#fff",
        cursor: "wait"
      },
      themedCSS: {
        width: "30%",
        top: "40%",
        left: "35%"
      },
      overlayCSS: {
        backgroundColor: "#000",
        opacity: .6,
        cursor: "wait"
      },
      cursorReset: "default",
      growlCSS: {
        width: "350px",
        top: "10px",
        left: "",
        right: "10px",
        border: "none",
        padding: "5px",
        opacity: .6,
        cursor: "default",
        color: "#fff",
        backgroundColor: "#000",
        "-webkit-border-radius": "10px",
        "-moz-border-radius": "10px",
        "border-radius": "10px"
      },
      iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
      forceIframe: !1,
      baseZ: 1e3,
      centerX: !0,
      centerY: !0,
      allowBodyStretch: !0,
      bindEvents: !0,
      constrainTabKey: !0,
      fadeIn: 200,
      fadeOut: 400,
      timeout: 0,
      showOverlay: !0,
      focusInput: !0,
      focusableElements: ":input:enabled:visible",
      onBlock: null,
      onUnblock: null,
      onOverlayClick: null,
      quirksmodeOffsetHack: 4,
      blockMsgClass: "blockMsg",
      ignoreIfBlocked: !1
    };
    var f = null,
        h = [];
  }

  "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery);
}(), function () {
  function e(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }

  var t,
      n,
      i,
      o,
      r,
      a,
      s,
      l,
      c,
      u,
      p,
      f,
      h,
      d,
      g,
      m,
      y,
      v,
      _b,
      x,
      w,
      _,
      k,
      E,
      T,
      S,
      C,
      A,
      L,
      O,
      N,
      M,
      j,
      D,
      I,
      P,
      R,
      H,
      q,
      F,
      W,
      z,
      U,
      B,
      X,
      Y,
      V = [].slice,
      $ = {}.hasOwnProperty,
      Q = function Q(e, t) {
    for (var n in t) {
      $.call(t, n) && (e[n] = t[n]);
    }

    function i() {
      this.constructor = e;
    }

    return i.prototype = t.prototype, e.prototype = new i(), e.__super__ = t.prototype, e;
  },
      K = [].indexOf || function (e) {
    for (var t = 0, n = this.length; t < n; t++) {
      if (t in this && this[t] === e) return t;
    }

    return -1;
  };

  function G() {}

  for (v = {
    className: "",
    catchupTime: 100,
    initialRate: .03,
    minTime: 250,
    ghostTime: 100,
    maxProgressPerFrame: 20,
    easeFactor: 1.25,
    startOnPageLoad: !0,
    restartOnPushState: !0,
    restartOnRequestAfter: 500,
    target: "body",
    elements: {
      checkInterval: 100,
      selectors: ["body"]
    },
    eventLag: {
      minSamples: 10,
      sampleCount: 3,
      lagThreshold: 3
    },
    ajax: {
      trackMethods: ["GET"],
      trackWebSockets: !0,
      ignoreURLs: []
    }
  }, S = function S() {
    var e;
    return null != (e = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? e : +new Date();
  }, A = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, y = window.cancelAnimationFrame || window.mozCancelAnimationFrame, f = function f(e, t, n) {
    if ("function" == typeof e.addEventListener) return e.addEventListener(t, n, !1);
    var i;
    "function" != typeof e["on" + t] || "object" != _typeof(e["on" + t].eventListeners) ? (i = new o(), "function" == typeof e["on" + t] && i.on(t, e["on" + t]), e["on" + t] = function (e) {
      return i.trigger(t, e);
    }, e["on" + t].eventListeners = i) : i = e["on" + t].eventListeners, i.on(t, n);
  }, null == A && (A = function A(e) {
    return setTimeout(e, 50);
  }, y = function y(e) {
    return clearTimeout(e);
  }), O = function O(e) {
    var t = S(),
        n = function n() {
      var i = S() - t;
      return 33 <= i ? (t = S(), e(i, function () {
        return A(n);
      })) : setTimeout(n, 33 - i);
    };

    return n();
  }, L = function L() {
    var e = arguments[0],
        t = arguments[1],
        n = 3 <= arguments.length ? V.call(arguments, 2) : [];
    return "function" == typeof e[t] ? e[t].apply(e, n) : e[t];
  }, _b = function b() {
    for (var e, t, n, i = arguments[0], o = 2 <= arguments.length ? V.call(arguments, 1) : [], r = 0, a = o.length; r < a; r++) {
      if (t = o[r]) for (e in t) {
        $.call(t, e) && (n = t[e], null != i[e] && "object" == _typeof(i[e]) && null != n && "object" == _typeof(n) ? _b(i[e], n) : i[e] = n);
      }
    }

    return i;
  }, d = function d(e) {
    for (var t, n, i = t = 0, o = 0, r = e.length; o < r; o++) {
      n = e[o], i += Math.abs(n), t++;
    }

    return i / t;
  }, w = function w(e, t) {
    var n, i;

    if (null == e && (e = "options"), null == t && (t = !0), i = document.querySelector("[data-pace-" + e + "]")) {
      if (n = i.getAttribute("data-pace-" + e), !t) return n;

      try {
        return JSON.parse(n);
      } catch (e) {
        return "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", e) : void 0;
      }
    }
  }, G.prototype.on = function (e, t, n, i) {
    var o;
    return null == i && (i = !1), null == this.bindings && (this.bindings = {}), null == (o = this.bindings)[e] && (o[e] = []), this.bindings[e].push({
      handler: t,
      ctx: n,
      once: i
    });
  }, G.prototype.once = function (e, t, n) {
    return this.on(e, t, n, !0);
  }, G.prototype.off = function (e, t) {
    var n, i, o;

    if (null != (null != (i = this.bindings) ? i[e] : void 0)) {
      if (null == t) return delete this.bindings[e];

      for (n = 0, o = []; n < this.bindings[e].length;) {
        this.bindings[e][n].handler === t ? o.push(this.bindings[e].splice(n, 1)) : o.push(n++);
      }

      return o;
    }
  }, G.prototype.trigger = function () {
    var e,
        t,
        n,
        i,
        o,
        r,
        a = arguments[0],
        s = 2 <= arguments.length ? V.call(arguments, 1) : [];

    if (null != (i = this.bindings) && i[a]) {
      for (n = 0, r = []; n < this.bindings[a].length;) {
        t = (o = this.bindings[a][n]).handler, e = o.ctx, o = o.once, t.apply(null != e ? e : this, s), o ? r.push(this.bindings[a].splice(n, 1)) : r.push(n++);
      }

      return r;
    }
  }, Y = G, a = window.Pace || {}, window.Pace = a, _b(a, Y.prototype), C = a.options = _b({}, v, window.paceOptions, w()), F = 0, z = (B = ["ajax", "document", "eventLag", "elements"]).length; F < z; F++) {
    !0 === C[D = B[F]] && (C[D] = v[D]);
  }

  function J() {
    return J.__super__.constructor.apply(this, arguments);
  }

  function Z() {
    this.progress = 0;
  }

  function ee() {
    this.bindings = {};
  }

  function te() {
    var e,
        t = this;
    te.__super__.constructor.apply(this, arguments), e = function e(_e2) {
      var n = _e2.open;
      return _e2.open = function (i, o, r) {
        return j(i) && t.trigger("request", {
          type: i,
          url: o,
          request: _e2
        }), n.apply(_e2, arguments);
      };
    }, window.XMLHttpRequest = function (t) {
      return t = new q(t), e(t), t;
    };

    try {
      x(window.XMLHttpRequest, q);
    } catch (e) {}

    if (null != H) {
      window.XDomainRequest = function () {
        var t = new H();
        return e(t), t;
      };

      try {
        x(window.XDomainRequest, H);
      } catch (e) {}
    }

    if (null != R && C.ajax.trackWebSockets) {
      window.WebSocket = function (e, n) {
        var i = null != n ? new R(e, n) : new R(e);
        return j("socket") && t.trigger("request", {
          type: "socket",
          url: e,
          protocols: n,
          request: i
        }), i;
      };

      try {
        x(window.WebSocket, R);
      } catch (e) {}
    }
  }

  function ne() {
    this.complete = e(this.complete, this);
    var t = this;
    this.elements = [], _().on("request", function () {
      return t.watch.apply(t, arguments);
    });
  }

  function ie(t) {
    var n, o, r, a;

    for (null == t && (t = {}), this.complete = e(this.complete, this), this.elements = [], null == t.selectors && (t.selectors = []), o = 0, r = (a = t.selectors).length; o < r; o++) {
      n = a[o], this.elements.push(new i(n, this.complete));
    }
  }

  function oe(e, t) {
    this.selector = e, this.completeCallback = t, this.progress = 0, this.check();
  }

  function re() {
    var e,
        t,
        n = this;
    this.progress = null != (t = this.states[document.readyState]) ? t : 100, e = document.onreadystatechange, document.onreadystatechange = function () {
      return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof e ? e.apply(null, arguments) : void 0;
    };
  }

  function ae(e) {
    this.source = e, this.last = this.sinceLastUpdate = 0, this.rate = C.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = L(this.source, "progress"));
  }

  Q(J, Y = Error), r = J, Z.prototype.getElement = function () {
    var e;

    if (null == this.el) {
      if (!(e = document.querySelector(C.target))) throw new r();
      this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/(pace-done )|/, "pace-running ");
      var t = "" !== C.className ? " " + C.className : "";
      this.el.innerHTML = '<div class="pace-progress' + t + '">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != e.firstChild ? e.insertBefore(this.el, e.firstChild) : e.appendChild(this.el);
    }

    return this.el;
  }, Z.prototype.finish = function () {
    var e = this.getElement();
    return e.className = e.className.replace("pace-active", "pace-inactive"), document.body.className = document.body.className.replace("pace-running ", "pace-done ");
  }, Z.prototype.update = function (e) {
    return this.progress = e, a.trigger("progress", e), this.render();
  }, Z.prototype.destroy = function () {
    try {
      this.getElement().parentNode.removeChild(this.getElement());
    } catch (e) {
      r = e;
    }

    return this.el = void 0;
  }, Z.prototype.render = function () {
    var e, t, n, i, o, r, s;
    if (null == document.querySelector(C.target)) return !1;

    for (e = this.getElement(), i = "translate3d(" + this.progress + "%, 0, 0)", o = 0, r = (s = ["webkitTransform", "msTransform", "transform"]).length; o < r; o++) {
      t = s[o], e.children[0].style[t] = i;
    }

    return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (e.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), 100 <= this.progress ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), e.children[0].setAttribute("data-progress", "" + n)), a.trigger("change", this.progress), this.lastRenderedProgress = this.progress;
  }, Z.prototype.done = function () {
    return 100 <= this.progress;
  }, n = Z, ee.prototype.trigger = function (e, t) {
    var n, i, o, r, a;

    if (null != this.bindings[e]) {
      for (a = [], i = 0, o = (r = this.bindings[e]).length; i < o; i++) {
        n = r[i], a.push(n.call(this, t));
      }

      return a;
    }
  }, ee.prototype.on = function (e, t) {
    var n;
    return null == (n = this.bindings)[e] && (n[e] = []), this.bindings[e].push(t);
  }, o = ee, q = window.XMLHttpRequest, H = window.XDomainRequest, R = window.WebSocket, x = function x(e, t) {
    var n,
        i = [];

    for (n in t.prototype) {
      try {
        null == e[n] && "function" != typeof t[n] ? "function" == typeof Object.defineProperty ? i.push(Object.defineProperty(e, n, {
          get: function (e) {
            return function () {
              return t.prototype[e];
            };
          }(n),
          configurable: !0,
          enumerable: !0
        })) : i.push(e[n] = t.prototype[n]) : i.push(void 0);
      } catch (e) {}
    }

    return i;
  }, E = [], a.ignore = function () {
    var e = arguments[0],
        t = 2 <= arguments.length ? V.call(arguments, 1) : [];
    return E.unshift("ignore"), t = e.apply(null, t), E.shift(), t;
  }, a.track = function () {
    var e = arguments[0],
        t = 2 <= arguments.length ? V.call(arguments, 1) : [];
    return E.unshift("track"), t = e.apply(null, t), E.shift(), t;
  }, j = function j(e) {
    if (null == e && (e = "GET"), "track" === E[0]) return "force";

    if (!E.length && C.ajax) {
      if ("socket" === e && C.ajax.trackWebSockets) return !0;
      if (e = e.toUpperCase(), 0 <= K.call(C.ajax.trackMethods, e)) return !0;
    }

    return !1;
  }, Q(te, o), s = te, W = null, M = function M(e) {
    for (var t, n = C.ajax.ignoreURLs, i = 0, o = n.length; i < o; i++) {
      if ("string" == typeof (t = n[i])) {
        if (-1 !== e.indexOf(t)) return !0;
      } else if (t.test(e)) return !0;
    }

    return !1;
  }, (_ = function _() {
    return W = null == W ? new s() : W;
  })().on("request", function (e) {
    var n,
        i = e.type,
        o = e.request,
        r = e.url;
    if (!M(r)) return a.running || !1 === C.restartOnRequestAfter && "force" !== j(i) ? void 0 : (n = arguments, "boolean" == typeof (r = C.restartOnRequestAfter || 0) && (r = 0), setTimeout(function () {
      var e,
          r,
          s,
          l,
          c = "socket" === i ? o.readyState < 1 : 0 < (c = o.readyState) && c < 4;

      if (c) {
        for (a.restart(), l = [], e = 0, r = (s = a.sources).length; e < r; e++) {
          if ((D = s[e]) instanceof t) {
            D.watch.apply(D, n);
            break;
          }

          l.push(void 0);
        }

        return l;
      }
    }, r));
  }), ne.prototype.watch = function (e) {
    var t = e.type,
        n = e.request;
    e = e.url;
    if (!M(e)) return n = new ("socket" === t ? u : p)(n, this.complete), this.elements.push(n);
  }, ne.prototype.complete = function (e) {
    return this.elements = this.elements.filter(function (t) {
      return t !== e;
    });
  }, t = ne, p = function p(e, t) {
    var n,
        i,
        o,
        r,
        a = this;
    if (this.progress = 0, null != window.ProgressEvent) for (f(e, "progress", function (e) {
      return e.lengthComputable ? a.progress = 100 * e.loaded / e.total : a.progress = a.progress + (100 - a.progress) / 2;
    }), n = 0, i = (r = ["load", "abort", "timeout", "error"]).length; n < i; n++) {
      f(e, r[n], function () {
        return t(a), a.progress = 100;
      });
    } else o = e.onreadystatechange, e.onreadystatechange = function () {
      var n;
      return 0 === (n = e.readyState) || 4 === n ? (t(a), a.progress = 100) : 3 === e.readyState && (a.progress = 50), "function" == typeof o ? o.apply(null, arguments) : void 0;
    };
  }, u = function u(e, t) {
    for (var n, i = this, o = this.progress = 0, r = (n = ["error", "open"]).length; o < r; o++) {
      f(e, n[o], function () {
        return t(i), i.progress = 100;
      });
    }
  }, ie.prototype.complete = function (e) {
    return this.elements = this.elements.filter(function (t) {
      return t !== e;
    });
  }, w = ie, oe.prototype.check = function () {
    var e = this;
    return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
      return e.check();
    }, C.elements.checkInterval);
  }, oe.prototype.done = function () {
    return this.completeCallback(this), this.completeCallback = null, this.progress = 100;
  }, i = oe, re.prototype.states = {
    loading: 0,
    interactive: 50,
    complete: 100
  }, Y = re, Q = function Q() {
    var e,
        t,
        n,
        i,
        o,
        r = this;
    this.progress = 0, o = [], i = 0, n = S(), t = setInterval(function () {
      var a = S() - n - 50;
      return n = S(), o.push(a), o.length > C.eventLag.sampleCount && o.shift(), e = d(o), ++i >= C.eventLag.minSamples && e < C.eventLag.lagThreshold ? (r.progress = 100, clearInterval(t)) : r.progress = 3 / (e + 3) * 100;
    }, 50);
  }, ae.prototype.tick = function (e, t) {
    return 100 <= (t = null == t ? L(this.source, "progress") : t) && (this.done = !0), t === this.last ? this.sinceLastUpdate += e : (this.sinceLastUpdate && (this.rate = (t - this.last) / this.sinceLastUpdate), this.catchup = (t - this.progress) / C.catchupTime, this.sinceLastUpdate = 0, this.last = t), t > this.progress && (this.progress += this.catchup * e), t = 1 - Math.pow(this.progress / 100, C.easeFactor), this.progress += t * this.rate * e, this.progress = Math.min(this.lastProgress + C.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress;
  }, c = ae, m = h = P = g = N = I = null, a.running = !1, k = function k() {
    if (C.restartOnPushState) return a.restart();
  }, null != window.history.pushState && (U = window.history.pushState, window.history.pushState = function () {
    return k(), U.apply(window.history, arguments);
  }), null != window.history.replaceState && (X = window.history.replaceState, window.history.replaceState = function () {
    return k(), X.apply(window.history, arguments);
  }), l = {
    ajax: t,
    elements: w,
    document: Y,
    eventLag: Q
  }, (T = function T() {
    var e, t, i, o, r, s, u, p;

    for (a.sources = I = [], t = 0, o = (s = ["ajax", "elements", "document", "eventLag"]).length; t < o; t++) {
      !1 !== C[e = s[t]] && I.push(new l[e](C[e]));
    }

    for (i = 0, r = (p = null != (u = C.extraSources) ? u : []).length; i < r; i++) {
      D = p[i], I.push(new D(C));
    }

    return a.bar = g = new n(), N = [], P = new c();
  })(), a.stop = function () {
    return a.trigger("stop"), a.running = !1, g.destroy(), m = !0, null != h && ("function" == typeof y && y(h), h = null), T();
  }, a.restart = function () {
    return a.trigger("restart"), a.stop(), a.start();
  }, a.go = function () {
    var e;
    return a.running = !0, g.render(), e = S(), m = !1, h = O(function (t, n) {
      g.progress;

      for (var i, o, r, s, l, u, p, f, h, d, y = u = 0, v = !0, b = p = 0, x = I.length; p < x; b = ++p) {
        for (D = I[b], l = null != N[b] ? N[b] : N[b] = [], r = f = 0, h = (o = null != (d = D.elements) ? d : [D]).length; f < h; r = ++f) {
          s = o[r], v &= (s = null != l[r] ? l[r] : l[r] = new c(s)).done, s.done || (y++, u += s.tick(t));
        }
      }

      return i = u / y, g.update(P.tick(t, i)), g.done() || v || m ? (g.update(100), a.trigger("done"), setTimeout(function () {
        return g.finish(), a.running = !1, a.trigger("hide");
      }, Math.max(C.ghostTime, Math.max(C.minTime - (S() - e), 0)))) : n();
    });
  }, a.start = function (e) {
    _b(C, e), a.running = !0;

    try {
      g.render();
    } catch (e) {
      r = e;
    }

    return document.querySelector(".pace") ? (a.trigger("start"), a.go()) : setTimeout(a.start, 50);
  }, "function" == typeof define && define.amd ? define(function () {
    return a;
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = a : C.startOnPageLoad && a.start();
}.call(this), function (e, t) {
  "use strict";

  "function" == typeof define && define.amd ? define([], function () {
    return e.Waves = t.call(e), e.Waves;
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t.call(e) : e.Waves = t.call(e);
}("object" == (typeof global === "undefined" ? "undefined" : _typeof(global)) ? global : this, function () {
  "use strict";

  var e = e || {},
      t = document.querySelectorAll.bind(document),
      n = Object.prototype.toString,
      i = ("ontouchstart" in window);

  function o(e) {
    var t = _typeof(e);

    return "function" == t || "object" == t && !!e;
  }

  function r(e) {
    var i,
        r = n.call(e);
    return "[object String]" === r ? t(e) : o(e) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(r) && e.hasOwnProperty("length") ? e : o(i = e) && 0 < i.nodeType ? [e] : [];
  }

  function a(e) {
    var t,
        n,
        i,
        o = {
      top: 0,
      left: 0
    },
        r = e && e.ownerDocument,
        a = r.documentElement;
    return void 0 !== e.getBoundingClientRect && (o = e.getBoundingClientRect()), t = null !== (i = n = r) && i === i.window ? n : 9 === n.nodeType && n.defaultView, {
      top: o.top + t.pageYOffset - a.clientTop,
      left: o.left + t.pageXOffset - a.clientLeft
    };
  }

  function s(e) {
    var t = "";

    for (var n in e) {
      e.hasOwnProperty(n) && (t += n + ":" + e[n] + ";");
    }

    return t;
  }

  var l = {
    duration: 750,
    delay: 200,
    show: function show(e, t, n) {
      if (2 === e.button) return !1;
      t = t || this;
      var i = document.createElement("div");
      i.className = "waves-ripple waves-rippling", t.appendChild(i);
      var o = a(t),
          r = 0,
          c = 0;
      c = 0 <= (c = "touches" in e && e.touches.length ? (r = e.touches[0].pageY - o.top, e.touches[0].pageX - o.left) : (r = e.pageY - o.top, e.pageX - o.left)) ? c : 0, r = 0 <= r ? r : 0;
      var u = "scale(" + t.clientWidth / 100 * 3 + ")",
          p = "translate(0,0)";
      n && (p = "translate(" + n.x + "px, " + n.y + "px)"), i.setAttribute("data-hold", Date.now()), i.setAttribute("data-x", c), i.setAttribute("data-y", r), i.setAttribute("data-scale", u), i.setAttribute("data-translate", p);
      var f = {
        top: r + "px",
        left: c + "px"
      };
      i.classList.add("waves-notransition"), i.setAttribute("style", s(f)), i.classList.remove("waves-notransition"), f["-webkit-transform"] = u + " " + p, f["-moz-transform"] = u + " " + p, f["-ms-transform"] = u + " " + p, f["-o-transform"] = u + " " + p, f.transform = u + " " + p, f.opacity = "1";
      var h = "mousemove" === e.type ? 2500 : l.duration;
      f["-webkit-transition-duration"] = h + "ms", f["-moz-transition-duration"] = h + "ms", f["-o-transition-duration"] = h + "ms", f["transition-duration"] = h + "ms", i.setAttribute("style", s(f));
    },
    hide: function hide(e, t) {
      for (var n = (t = t || this).getElementsByClassName("waves-rippling"), o = 0, r = n.length; o < r; o++) {
        u(e, t, n[o]);
      }

      i && (t.removeEventListener("touchend", l.hide), t.removeEventListener("touchcancel", l.hide)), t.removeEventListener("mouseup", l.hide), t.removeEventListener("mouseleave", l.hide);
    }
  },
      c = {
    input: function input(e) {
      var t,
          n,
          i,
          o,
          r = e.parentNode;
      "i" === r.tagName.toLowerCase() && r.classList.contains("waves-effect") || ((t = document.createElement("i")).className = e.className + " waves-input-wrapper", e.className = "waves-button-input", r.replaceChild(t, e), t.appendChild(e), i = (n = window.getComputedStyle(e, null)).color, o = n.backgroundColor, t.setAttribute("style", "color:" + i + ";background:" + o), e.setAttribute("style", "background-color:rgba(0,0,0,0);"));
    },
    img: function img(e) {
      var t,
          n = e.parentNode;
      "i" === n.tagName.toLowerCase() && n.classList.contains("waves-effect") || (t = document.createElement("i"), n.replaceChild(t, e), t.appendChild(e));
    }
  };

  function u(e, t, n) {
    var i, o, r, a, c, u;
    n && (n.classList.remove("waves-rippling"), i = n.getAttribute("data-x"), o = n.getAttribute("data-y"), r = n.getAttribute("data-scale"), a = n.getAttribute("data-translate"), (c = 350 - (Date.now() - Number(n.getAttribute("data-hold")))) < 0 && (c = 0), "mousemove" === e.type && (c = 150), u = "mousemove" === e.type ? 2500 : l.duration, setTimeout(function () {
      var e = {
        top: o + "px",
        left: i + "px",
        opacity: "0",
        "-webkit-transition-duration": u + "ms",
        "-moz-transition-duration": u + "ms",
        "-o-transition-duration": u + "ms",
        "transition-duration": u + "ms",
        "-webkit-transform": r + " " + a,
        "-moz-transform": r + " " + a,
        "-ms-transform": r + " " + a,
        "-o-transform": r + " " + a,
        transform: r + " " + a
      };
      n.setAttribute("style", s(e)), setTimeout(function () {
        try {
          t.removeChild(n);
        } catch (e) {
          return !1;
        }
      }, u);
    }, c));
  }

  var p = {
    touches: 0,
    allowEvent: function allowEvent(e) {
      var t = !0;
      return /^(mousedown|mousemove)$/.test(e.type) && p.touches && (t = !1), t;
    },
    registerEvent: function registerEvent(e) {
      var t = e.type;
      "touchstart" === t ? p.touches += 1 : /^(touchend|touchcancel)$/.test(t) && setTimeout(function () {
        p.touches && --p.touches;
      }, 500);
    }
  };

  function f(e) {
    var t,
        n,
        o,
        r,
        a,
        s = function (e) {
      if (!1 === p.allowEvent(e)) return null;

      for (var t = null, n = e.target || e.srcElement; n.parentElement;) {
        if (!(n instanceof SVGElement) && n.classList.contains("waves-effect")) {
          t = n;
          break;
        }

        n = n.parentElement;
      }

      return t;
    }(e);

    if (null !== s) {
      if (s.disabled || s.getAttribute("disabled") || s.classList.contains("disabled")) return;
      p.registerEvent(e), "touchstart" === e.type && l.delay ? (t = !1, n = setTimeout(function () {
        n = null, l.show(e, s);
      }, l.delay), o = function o(i) {
        n && (clearTimeout(n), n = null, l.show(e, s)), t || (t = !0, l.hide(i, s)), a();
      }, r = function r(e) {
        n && (clearTimeout(n), n = null), o(e), a();
      }, s.addEventListener("touchmove", r, !1), s.addEventListener("touchend", o, !1), s.addEventListener("touchcancel", o, !1), a = function a() {
        s.removeEventListener("touchmove", r), s.removeEventListener("touchend", o), s.removeEventListener("touchcancel", o);
      }) : (l.show(e, s), i && (s.addEventListener("touchend", l.hide, !1), s.addEventListener("touchcancel", l.hide, !1)), s.addEventListener("mouseup", l.hide, !1), s.addEventListener("mouseleave", l.hide, !1));
    }
  }

  return e.init = function (e) {
    var t = document.body;
    "duration" in (e = e || {}) && (l.duration = e.duration), "delay" in e && (l.delay = e.delay), i && (t.addEventListener("touchstart", f, !1), t.addEventListener("touchcancel", p.registerEvent, !1), t.addEventListener("touchend", p.registerEvent, !1)), t.addEventListener("mousedown", f, !1);
  }, e.attach = function (e, t) {
    var i, o;
    e = r(e), "[object Array]" === n.call(t) && (t = t.join(" ")), t = t ? " " + t : "";

    for (var a = 0, s = e.length; a < s; a++) {
      o = (i = e[a]).tagName.toLowerCase(), -1 !== ["input", "img"].indexOf(o) && (c[o](i), i = i.parentElement), -1 === i.className.indexOf("waves-effect") && (i.className += " waves-effect" + t);
    }
  }, e.ripple = function (e, t) {
    var n = (e = r(e)).length;
    if ((t = t || {}).wait = t.wait || 0, t.position = t.position || null, n) for (var i = {}, o = 0, s = {
      type: "mousedown",
      button: 1
    }, c = function c(e, t) {
      return function () {
        l.hide(e, t);
      };
    }; o < n; o++) {
      var u = e[o],
          p = t.position || {
        x: u.clientWidth / 2,
        y: u.clientHeight / 2
      },
          f = a(u);
      i.x = f.left + p.x, i.y = f.top + p.y, s.pageX = i.x, s.pageY = i.y, l.show(s, u), 0 <= t.wait && null !== t.wait && setTimeout(c({
        type: "mouseup",
        button: 1
      }, u), t.wait);
    }
  }, e.calm = function (e) {
    for (var t = {
      type: "mouseup",
      button: 1
    }, n = 0, i = (e = r(e)).length; n < i; n++) {
      l.hide(t, e[n]);
    }
  }, e.displayEffect = function (t) {
    e.init(t);
  }, e;
}), function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).i18next = t();
}(this, function () {
  "use strict";

  function e(t) {
    return (e = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(t);
  }

  function t(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function n(e) {
    for (var n = 1; n < arguments.length; n++) {
      var i = null != arguments[n] ? Object(arguments[n]) : {},
          o = Object.keys(i);
      "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(i).filter(function (e) {
        return Object.getOwnPropertyDescriptor(i, e).enumerable;
      }))), o.forEach(function (n) {
        t(e, n, i[n]);
      });
    }

    return e;
  }

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function o(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  function r(e, t, n) {
    return t && o(e.prototype, t), n && o(e, n), e;
  }

  function a(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function s(t, n) {
    return !n || "object" !== e(n) && "function" != typeof n ? a(t) : n;
  }

  function l(e) {
    return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }

  function c(e, t) {
    return (c = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }

  function u(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: !0,
        configurable: !0
      }
    }), t && c(e, t);
  }

  var p = {
    type: "logger",
    log: function log(e) {
      this.output("log", e);
    },
    warn: function warn(e) {
      this.output("warn", e);
    },
    error: function error(e) {
      this.output("error", e);
    },
    output: function output(e, t) {
      console && console[e] && console[e].apply(console, t);
    }
  },
      f = new (function () {
    function e(t) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      i(this, e), this.init(t, n);
    }

    return r(e, [{
      key: "init",
      value: function value(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        this.prefix = t.prefix || "i18next:", this.logger = e || p, this.options = t, this.debug = t.debug;
      }
    }, {
      key: "setDebug",
      value: function value(e) {
        this.debug = e;
      }
    }, {
      key: "log",
      value: function value() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
          t[n] = arguments[n];
        }

        return this.forward(t, "log", "", !0);
      }
    }, {
      key: "warn",
      value: function value() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
          t[n] = arguments[n];
        }

        return this.forward(t, "warn", "", !0);
      }
    }, {
      key: "error",
      value: function value() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
          t[n] = arguments[n];
        }

        return this.forward(t, "error", "");
      }
    }, {
      key: "deprecate",
      value: function value() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
          t[n] = arguments[n];
        }

        return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
      }
    }, {
      key: "forward",
      value: function value(e, t, n, i) {
        return i && !this.debug ? null : ("string" == typeof e[0] && (e[0] = "".concat(n).concat(this.prefix, " ").concat(e[0])), this.logger[t](e));
      }
    }, {
      key: "create",
      value: function value(t) {
        return new e(this.logger, n({}, {
          prefix: "".concat(this.prefix, ":").concat(t, ":")
        }, this.options));
      }
    }]), e;
  }())(),
      h = function () {
    function e() {
      i(this, e), this.observers = {};
    }

    return r(e, [{
      key: "on",
      value: function value(e, t) {
        var n = this;
        return e.split(" ").forEach(function (e) {
          n.observers[e] = n.observers[e] || [], n.observers[e].push(t);
        }), this;
      }
    }, {
      key: "off",
      value: function value(e, t) {
        this.observers[e] && (t ? this.observers[e] = this.observers[e].filter(function (e) {
          return e !== t;
        }) : delete this.observers[e]);
      }
    }, {
      key: "emit",
      value: function value(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {
          n[i - 1] = arguments[i];
        }

        this.observers[e] && [].concat(this.observers[e]).forEach(function (e) {
          e.apply(void 0, n);
        }), this.observers["*"] && [].concat(this.observers["*"]).forEach(function (t) {
          t.apply(t, [e].concat(n));
        });
      }
    }]), e;
  }();

  function d() {
    var e,
        t,
        n = new Promise(function (n, i) {
      e = n, t = i;
    });
    return n.resolve = e, n.reject = t, n;
  }

  function g(e) {
    return null == e ? "" : "" + e;
  }

  function m(e, t, n) {
    function i(e) {
      return e && e.indexOf("###") > -1 ? e.replace(/###/g, ".") : e;
    }

    function o() {
      return !e || "string" == typeof e;
    }

    for (var r = "string" != typeof t ? [].concat(t) : t.split("."); r.length > 1;) {
      if (o()) return {};
      var a = i(r.shift());
      !e[a] && n && (e[a] = new n()), e = e[a];
    }

    return o() ? {} : {
      obj: e,
      k: i(r.shift())
    };
  }

  function y(e, t, n) {
    var i = m(e, t, Object);
    i.obj[i.k] = n;
  }

  function v(e, t) {
    var n = m(e, t),
        i = n.obj,
        o = n.k;
    if (i) return i[o];
  }

  function b(e, t, n) {
    var i = v(e, n);
    return void 0 !== i ? i : v(t, n);
  }

  function x(e) {
    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  var w = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  };

  function _(e) {
    return "string" == typeof e ? e.replace(/[&<>"'\/]/g, function (e) {
      return w[e];
    }) : e;
  }

  var k = "undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1,
      E = function (e) {
    function t(e) {
      var n,
          o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
        ns: ["translation"],
        defaultNS: "translation"
      };
      return i(this, t), n = s(this, l(t).call(this)), k && h.call(a(n)), n.data = e || {}, n.options = o, void 0 === n.options.keySeparator && (n.options.keySeparator = "."), n;
    }

    return u(t, h), r(t, [{
      key: "addNamespaces",
      value: function value(e) {
        this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
      }
    }, {
      key: "removeNamespaces",
      value: function value(e) {
        var t = this.options.ns.indexOf(e);
        t > -1 && this.options.ns.splice(t, 1);
      }
    }, {
      key: "getResource",
      value: function value(e, t, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            o = void 0 !== i.keySeparator ? i.keySeparator : this.options.keySeparator,
            r = [e, t];
        return n && "string" != typeof n && (r = r.concat(n)), n && "string" == typeof n && (r = r.concat(o ? n.split(o) : n)), e.indexOf(".") > -1 && (r = e.split(".")), v(this.data, r);
      }
    }, {
      key: "addResource",
      value: function value(e, t, n, i) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
          silent: !1
        },
            r = this.options.keySeparator;
        void 0 === r && (r = ".");
        var a = [e, t];
        n && (a = a.concat(r ? n.split(r) : n)), e.indexOf(".") > -1 && (i = t, t = (a = e.split("."))[1]), this.addNamespaces(t), y(this.data, a, i), o.silent || this.emit("added", e, t, n, i);
      }
    }, {
      key: "addResources",
      value: function value(e, t, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
          silent: !1
        };

        for (var o in n) {
          "string" != typeof n[o] && "[object Array]" !== Object.prototype.toString.apply(n[o]) || this.addResource(e, t, o, n[o], {
            silent: !0
          });
        }

        i.silent || this.emit("added", e, t, n);
      }
    }, {
      key: "addResourceBundle",
      value: function value(e, t, i, o, r) {
        var a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
          silent: !1
        },
            s = [e, t];
        e.indexOf(".") > -1 && (o = i, i = t, t = (s = e.split("."))[1]), this.addNamespaces(t);
        var l = v(this.data, s) || {};
        o ? function e(t, n, i) {
          for (var o in n) {
            "__proto__" !== o && (o in t ? "string" == typeof t[o] || t[o] instanceof String || "string" == typeof n[o] || n[o] instanceof String ? i && (t[o] = n[o]) : e(t[o], n[o], i) : t[o] = n[o]);
          }

          return t;
        }(l, i, r) : l = n({}, l, i), y(this.data, s, l), a.silent || this.emit("added", e, t, i);
      }
    }, {
      key: "removeResourceBundle",
      value: function value(e, t) {
        this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t);
      }
    }, {
      key: "hasResourceBundle",
      value: function value(e, t) {
        return void 0 !== this.getResource(e, t);
      }
    }, {
      key: "getResourceBundle",
      value: function value(e, t) {
        return t || (t = this.options.defaultNS), "v1" === this.options.compatibilityAPI ? n({}, {}, this.getResource(e, t)) : this.getResource(e, t);
      }
    }, {
      key: "getDataByLanguage",
      value: function value(e) {
        return this.data[e];
      }
    }, {
      key: "toJSON",
      value: function value() {
        return this.data;
      }
    }]), t;
  }(),
      T = {
    processors: {},
    addPostProcessor: function addPostProcessor(e) {
      this.processors[e.name] = e;
    },
    handle: function handle(e, t, n, i, o) {
      var r = this;
      return e.forEach(function (e) {
        r.processors[e] && (t = r.processors[e].process(t, n, i, o));
      }), t;
    }
  },
      S = {},
      C = function (t) {
    function o(e) {
      var t,
          n,
          r,
          c,
          u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return i(this, o), t = s(this, l(o).call(this)), k && h.call(a(t)), n = ["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], r = e, c = a(t), n.forEach(function (e) {
        r[e] && (c[e] = r[e]);
      }), t.options = u, void 0 === t.options.keySeparator && (t.options.keySeparator = "."), t.logger = f.create("translator"), t;
    }

    return u(o, h), r(o, [{
      key: "changeLanguage",
      value: function value(e) {
        e && (this.language = e);
      }
    }, {
      key: "exists",
      value: function value(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
          interpolation: {}
        },
            n = this.resolve(e, t);
        return n && void 0 !== n.res;
      }
    }, {
      key: "extractFromKey",
      value: function value(e, t) {
        var n = void 0 !== t.nsSeparator ? t.nsSeparator : this.options.nsSeparator;
        void 0 === n && (n = ":");
        var i = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator,
            o = t.ns || this.options.defaultNS;

        if (n && e.indexOf(n) > -1) {
          var r = e.match(this.interpolator.nestingRegexp);
          if (r && r.length > 0) return {
            key: e,
            namespaces: o
          };
          var a = e.split(n);
          (n !== i || n === i && this.options.ns.indexOf(a[0]) > -1) && (o = a.shift()), e = a.join(i);
        }

        return "string" == typeof o && (o = [o]), {
          key: e,
          namespaces: o
        };
      }
    }, {
      key: "translate",
      value: function value(t, i, o) {
        var r = this;
        if ("object" !== e(i) && this.options.overloadTranslationOptionHandler && (i = this.options.overloadTranslationOptionHandler(arguments)), i || (i = {}), null == t) return "";
        Array.isArray(t) || (t = [String(t)]);
        var a = void 0 !== i.keySeparator ? i.keySeparator : this.options.keySeparator,
            s = this.extractFromKey(t[t.length - 1], i),
            l = s.key,
            c = s.namespaces,
            u = c[c.length - 1],
            p = i.lng || this.language,
            f = i.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;

        if (p && "cimode" === p.toLowerCase()) {
          if (f) {
            var h = i.nsSeparator || this.options.nsSeparator;
            return u + h + l;
          }

          return l;
        }

        var d = this.resolve(t, i),
            g = d && d.res,
            m = d && d.usedKey || l,
            y = d && d.exactUsedKey || l,
            v = Object.prototype.toString.apply(g),
            b = void 0 !== i.joinArrays ? i.joinArrays : this.options.joinArrays,
            x = !this.i18nFormat || this.i18nFormat.handleAsObject;

        if (x && g && "string" != typeof g && "boolean" != typeof g && "number" != typeof g && ["[object Number]", "[object Function]", "[object RegExp]"].indexOf(v) < 0 && ("string" != typeof b || "[object Array]" !== v)) {
          if (!i.returnObjects && !this.options.returnObjects) return this.logger.warn("accessing an object - but returnObjects options is not enabled!"), this.options.returnedObjectHandler ? this.options.returnedObjectHandler(m, g, i) : "key '".concat(l, " (").concat(this.language, ")' returned an object instead of string.");

          if (a) {
            var w = "[object Array]" === v,
                _ = w ? [] : {},
                k = w ? y : m;

            for (var E in g) {
              if (Object.prototype.hasOwnProperty.call(g, E)) {
                var T = "".concat(k).concat(a).concat(E);
                _[E] = this.translate(T, n({}, i, {
                  joinArrays: !1,
                  ns: c
                })), _[E] === T && (_[E] = g[E]);
              }
            }

            g = _;
          }
        } else if (x && "string" == typeof b && "[object Array]" === v) (g = g.join(b)) && (g = this.extendTranslation(g, t, i, o));else {
          var S = !1,
              C = !1;

          if (!this.isValidLookup(g) && void 0 !== i.defaultValue) {
            if (S = !0, void 0 !== i.count) {
              var A = this.pluralResolver.getSuffix(p, i.count);
              g = i["defaultValue".concat(A)];
            }

            g || (g = i.defaultValue);
          }

          this.isValidLookup(g) || (C = !0, g = l);
          var L = i.defaultValue && i.defaultValue !== g && this.options.updateMissing;

          if (C || S || L) {
            if (this.logger.log(L ? "updateKey" : "missingKey", p, u, l, L ? i.defaultValue : g), a) {
              var O = this.resolve(l, n({}, i, {
                keySeparator: !1
              }));
              O && O.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
            }

            var N = [],
                M = this.languageUtils.getFallbackCodes(this.options.fallbackLng, i.lng || this.language);
            if ("fallback" === this.options.saveMissingTo && M && M[0]) for (var j = 0; j < M.length; j++) {
              N.push(M[j]);
            } else "all" === this.options.saveMissingTo ? N = this.languageUtils.toResolveHierarchy(i.lng || this.language) : N.push(i.lng || this.language);

            var D = function D(e, t) {
              r.options.missingKeyHandler ? r.options.missingKeyHandler(e, u, t, L ? i.defaultValue : g, L, i) : r.backendConnector && r.backendConnector.saveMissing && r.backendConnector.saveMissing(e, u, t, L ? i.defaultValue : g, L, i), r.emit("missingKey", e, u, t, g);
            };

            if (this.options.saveMissing) {
              var I = void 0 !== i.count && "string" != typeof i.count;
              this.options.saveMissingPlurals && I ? N.forEach(function (e) {
                r.pluralResolver.getPluralFormsOfKey(e, l).forEach(function (t) {
                  return D([e], t);
                });
              }) : D(N, l);
            }
          }

          g = this.extendTranslation(g, t, i, d, o), C && g === l && this.options.appendNamespaceToMissingKey && (g = "".concat(u, ":").concat(l)), C && this.options.parseMissingKeyHandler && (g = this.options.parseMissingKeyHandler(g));
        }

        return g;
      }
    }, {
      key: "extendTranslation",
      value: function value(e, t, i, o, r) {
        var a = this;
        if (this.i18nFormat && this.i18nFormat.parse) e = this.i18nFormat.parse(e, i, o.usedLng, o.usedNS, o.usedKey, {
          resolved: o
        });else if (!i.skipInterpolation) {
          i.interpolation && this.interpolator.init(n({}, i, {
            interpolation: n({}, this.options.interpolation, i.interpolation)
          }));
          var s,
              l = i.interpolation && i.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;

          if (l) {
            var c = e.match(this.interpolator.nestingRegexp);
            s = c && c.length;
          }

          var u = i.replace && "string" != typeof i.replace ? i.replace : i;

          if (this.options.interpolation.defaultVariables && (u = n({}, this.options.interpolation.defaultVariables, u)), e = this.interpolator.interpolate(e, u, i.lng || this.language, i), l) {
            var p = e.match(this.interpolator.nestingRegexp);
            s < (p && p.length) && (i.nest = !1);
          }

          !1 !== i.nest && (e = this.interpolator.nest(e, function () {
            for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++) {
              n[i] = arguments[i];
            }

            return r && r[0] === n[0] ? (a.logger.warn("It seems you are nesting recursively key: ".concat(n[0], " in key: ").concat(t[0])), null) : a.translate.apply(a, n.concat([t]));
          }, i)), i.interpolation && this.interpolator.reset();
        }
        var f = i.postProcess || this.options.postProcess,
            h = "string" == typeof f ? [f] : f;
        return null != e && h && h.length && !1 !== i.applyPostProcessor && (e = T.handle(h, e, t, this.options && this.options.postProcessPassResolved ? n({
          i18nResolved: o
        }, i) : i, this)), e;
      }
    }, {
      key: "resolve",
      value: function value(e) {
        var t,
            n,
            i,
            o,
            r,
            a = this,
            s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return "string" == typeof e && (e = [e]), e.forEach(function (e) {
          if (!a.isValidLookup(t)) {
            var l = a.extractFromKey(e, s),
                c = l.key;
            n = c;
            var u = l.namespaces;
            a.options.fallbackNS && (u = u.concat(a.options.fallbackNS));
            var p = void 0 !== s.count && "string" != typeof s.count,
                f = void 0 !== s.context && "string" == typeof s.context && "" !== s.context,
                h = s.lngs ? s.lngs : a.languageUtils.toResolveHierarchy(s.lng || a.language, s.fallbackLng);
            u.forEach(function (e) {
              a.isValidLookup(t) || (r = e, !S["".concat(h[0], "-").concat(e)] && a.utils && a.utils.hasLoadedNamespace && !a.utils.hasLoadedNamespace(r) && (S["".concat(h[0], "-").concat(e)] = !0, a.logger.warn('key "'.concat(n, '" for languages "').concat(h.join(", "), '" won\'t get resolved as namespace "').concat(r, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), h.forEach(function (n) {
                if (!a.isValidLookup(t)) {
                  o = n;
                  var r,
                      l,
                      u = c,
                      h = [u];

                  for (a.i18nFormat && a.i18nFormat.addLookupKeys ? a.i18nFormat.addLookupKeys(h, c, n, e, s) : (p && (r = a.pluralResolver.getSuffix(n, s.count)), p && f && h.push(u + r), f && h.push(u += "".concat(a.options.contextSeparator).concat(s.context)), p && h.push(u += r)); l = h.pop();) {
                    a.isValidLookup(t) || (i = l, t = a.getResource(n, e, l, s));
                  }
                }
              }));
            });
          }
        }), {
          res: t,
          usedKey: n,
          exactUsedKey: i,
          usedLng: o,
          usedNS: r
        };
      }
    }, {
      key: "isValidLookup",
      value: function value(e) {
        return !(void 0 === e || !this.options.returnNull && null === e || !this.options.returnEmptyString && "" === e);
      }
    }, {
      key: "getResource",
      value: function value(e, t, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, n, i) : this.resourceStore.getResource(e, t, n, i);
      }
    }]), o;
  }();

  function A(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }

  var L = function () {
    function e(t) {
      i(this, e), this.options = t, this.whitelist = this.options.supportedLngs || !1, this.supportedLngs = this.options.supportedLngs || !1, this.logger = f.create("languageUtils");
    }

    return r(e, [{
      key: "getScriptPartFromCode",
      value: function value(e) {
        if (!e || e.indexOf("-") < 0) return null;
        var t = e.split("-");
        return 2 === t.length ? null : (t.pop(), "x" === t[t.length - 1].toLowerCase() ? null : this.formatLanguageCode(t.join("-")));
      }
    }, {
      key: "getLanguagePartFromCode",
      value: function value(e) {
        if (!e || e.indexOf("-") < 0) return e;
        var t = e.split("-");
        return this.formatLanguageCode(t[0]);
      }
    }, {
      key: "formatLanguageCode",
      value: function value(e) {
        if ("string" == typeof e && e.indexOf("-") > -1) {
          var t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"],
              n = e.split("-");
          return this.options.lowerCaseLng ? n = n.map(function (e) {
            return e.toLowerCase();
          }) : 2 === n.length ? (n[0] = n[0].toLowerCase(), n[1] = n[1].toUpperCase(), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = A(n[1].toLowerCase()))) : 3 === n.length && (n[0] = n[0].toLowerCase(), 2 === n[1].length && (n[1] = n[1].toUpperCase()), "sgn" !== n[0] && 2 === n[2].length && (n[2] = n[2].toUpperCase()), t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = A(n[1].toLowerCase())), t.indexOf(n[2].toLowerCase()) > -1 && (n[2] = A(n[2].toLowerCase()))), n.join("-");
        }

        return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
      }
    }, {
      key: "isWhitelisted",
      value: function value(e) {
        return this.logger.deprecate("languageUtils.isWhitelisted", 'function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it\'s usage asap.'), this.isSupportedCode(e);
      }
    }, {
      key: "isSupportedCode",
      value: function value(e) {
        return ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1;
      }
    }, {
      key: "getBestMatchFromCodes",
      value: function value(e) {
        var t,
            n = this;
        return e ? (e.forEach(function (e) {
          if (!t) {
            var i = n.formatLanguageCode(e);
            n.options.supportedLngs && !n.isSupportedCode(i) || (t = i);
          }
        }), !t && this.options.supportedLngs && e.forEach(function (e) {
          if (!t) {
            var i = n.getLanguagePartFromCode(e);
            if (n.isSupportedCode(i)) return t = i;
            t = n.options.supportedLngs.find(function (e) {
              if (0 === e.indexOf(i)) return e;
            });
          }
        }), t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]), t) : null;
      }
    }, {
      key: "getFallbackCodes",
      value: function value(e, t) {
        if (!e) return [];
        if ("function" == typeof e && (e = e(t)), "string" == typeof e && (e = [e]), "[object Array]" === Object.prototype.toString.apply(e)) return e;
        if (!t) return e.default || [];
        var n = e[t];
        return n || (n = e[this.getScriptPartFromCode(t)]), n || (n = e[this.formatLanguageCode(t)]), n || (n = e[this.getLanguagePartFromCode(t)]), n || (n = e.default), n || [];
      }
    }, {
      key: "toResolveHierarchy",
      value: function value(e, t) {
        var n = this,
            i = this.getFallbackCodes(t || this.options.fallbackLng || [], e),
            o = [],
            r = function r(e) {
          e && (n.isSupportedCode(e) ? o.push(e) : n.logger.warn("rejecting language code not found in supportedLngs: ".concat(e)));
        };

        return "string" == typeof e && e.indexOf("-") > -1 ? ("languageOnly" !== this.options.load && r(this.formatLanguageCode(e)), "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && r(this.getScriptPartFromCode(e)), "currentOnly" !== this.options.load && r(this.getLanguagePartFromCode(e))) : "string" == typeof e && r(this.formatLanguageCode(e)), i.forEach(function (e) {
          o.indexOf(e) < 0 && r(n.formatLanguageCode(e));
        }), o;
      }
    }]), e;
  }(),
      O = [{
    lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "ti", "tr", "uz", "wa"],
    nr: [1, 2],
    fc: 1
  }, {
    lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
    nr: [1, 2],
    fc: 2
  }, {
    lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "kk", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
    nr: [1],
    fc: 3
  }, {
    lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
    nr: [1, 2, 5],
    fc: 4
  }, {
    lngs: ["ar"],
    nr: [0, 1, 2, 3, 11, 100],
    fc: 5
  }, {
    lngs: ["cs", "sk"],
    nr: [1, 2, 5],
    fc: 6
  }, {
    lngs: ["csb", "pl"],
    nr: [1, 2, 5],
    fc: 7
  }, {
    lngs: ["cy"],
    nr: [1, 2, 3, 8],
    fc: 8
  }, {
    lngs: ["fr"],
    nr: [1, 2],
    fc: 9
  }, {
    lngs: ["ga"],
    nr: [1, 2, 3, 7, 11],
    fc: 10
  }, {
    lngs: ["gd"],
    nr: [1, 2, 3, 20],
    fc: 11
  }, {
    lngs: ["is"],
    nr: [1, 2],
    fc: 12
  }, {
    lngs: ["jv"],
    nr: [0, 1],
    fc: 13
  }, {
    lngs: ["kw"],
    nr: [1, 2, 3, 4],
    fc: 14
  }, {
    lngs: ["lt"],
    nr: [1, 2, 10],
    fc: 15
  }, {
    lngs: ["lv"],
    nr: [1, 2, 0],
    fc: 16
  }, {
    lngs: ["mk"],
    nr: [1, 2],
    fc: 17
  }, {
    lngs: ["mnk"],
    nr: [0, 1, 2],
    fc: 18
  }, {
    lngs: ["mt"],
    nr: [1, 2, 11, 20],
    fc: 19
  }, {
    lngs: ["or"],
    nr: [2, 1],
    fc: 2
  }, {
    lngs: ["ro"],
    nr: [1, 2, 20],
    fc: 20
  }, {
    lngs: ["sl"],
    nr: [5, 1, 2, 3],
    fc: 21
  }, {
    lngs: ["he", "iw"],
    nr: [1, 2, 20, 21],
    fc: 22
  }],
      N = {
    1: function _(e) {
      return Number(e > 1);
    },
    2: function _(e) {
      return Number(1 != e);
    },
    3: function _(e) {
      return 0;
    },
    4: function _(e) {
      return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
    },
    5: function _(e) {
      return Number(0 == e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5);
    },
    6: function _(e) {
      return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2);
    },
    7: function _(e) {
      return Number(1 == e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
    },
    8: function _(e) {
      return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3);
    },
    9: function _(e) {
      return Number(e >= 2);
    },
    10: function _(e) {
      return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4);
    },
    11: function _(e) {
      return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && e < 20 ? 2 : 3);
    },
    12: function _(e) {
      return Number(e % 10 != 1 || e % 100 == 11);
    },
    13: function _(e) {
      return Number(0 !== e);
    },
    14: function _(e) {
      return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3);
    },
    15: function _(e) {
      return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2);
    },
    16: function _(e) {
      return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2);
    },
    17: function _(e) {
      return Number(1 == e || e % 10 == 1 && e % 100 != 11 ? 0 : 1);
    },
    18: function _(e) {
      return Number(0 == e ? 0 : 1 == e ? 1 : 2);
    },
    19: function _(e) {
      return Number(1 == e ? 0 : 0 == e || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3);
    },
    20: function _(e) {
      return Number(1 == e ? 0 : 0 == e || e % 100 > 0 && e % 100 < 20 ? 1 : 2);
    },
    21: function _(e) {
      return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0);
    },
    22: function _(e) {
      return Number(1 == e ? 0 : 2 == e ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3);
    }
  },
      M = function () {
    function e(t) {
      var n,
          o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      i(this, e), this.languageUtils = t, this.options = o, this.logger = f.create("pluralResolver"), this.rules = (n = {}, O.forEach(function (e) {
        e.lngs.forEach(function (t) {
          n[t] = {
            numbers: e.nr,
            plurals: N[e.fc]
          };
        });
      }), n);
    }

    return r(e, [{
      key: "addRule",
      value: function value(e, t) {
        this.rules[e] = t;
      }
    }, {
      key: "getRule",
      value: function value(e) {
        return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)];
      }
    }, {
      key: "needsPlural",
      value: function value(e) {
        var t = this.getRule(e);
        return t && t.numbers.length > 1;
      }
    }, {
      key: "getPluralFormsOfKey",
      value: function value(e, t) {
        var n = this,
            i = [],
            o = this.getRule(e);
        return o ? (o.numbers.forEach(function (o) {
          var r = n.getSuffix(e, o);
          i.push("".concat(t).concat(r));
        }), i) : i;
      }
    }, {
      key: "getSuffix",
      value: function value(e, t) {
        var n = this,
            i = this.getRule(e);

        if (i) {
          var o = i.noAbs ? i.plurals(t) : i.plurals(Math.abs(t)),
              r = i.numbers[o];
          this.options.simplifyPluralSuffix && 2 === i.numbers.length && 1 === i.numbers[0] && (2 === r ? r = "plural" : 1 === r && (r = ""));

          var a = function a() {
            return n.options.prepend && r.toString() ? n.options.prepend + r.toString() : r.toString();
          };

          return "v1" === this.options.compatibilityJSON ? 1 === r ? "" : "number" == typeof r ? "_plural_".concat(r.toString()) : a() : "v2" === this.options.compatibilityJSON || this.options.simplifyPluralSuffix && 2 === i.numbers.length && 1 === i.numbers[0] ? a() : this.options.prepend && o.toString() ? this.options.prepend + o.toString() : o.toString();
        }

        return this.logger.warn("no plural rule found for: ".concat(e)), "";
      }
    }]), e;
  }(),
      j = function () {
    function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      i(this, e), this.logger = f.create("interpolator"), this.options = t, this.format = t.interpolation && t.interpolation.format || function (e) {
        return e;
      }, this.init(t);
    }

    return r(e, [{
      key: "init",
      value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e.interpolation || (e.interpolation = {
          escapeValue: !0
        });
        var t = e.interpolation;
        this.escape = void 0 !== t.escape ? t.escape : _, this.escapeValue = void 0 === t.escapeValue || t.escapeValue, this.useRawValueToEscape = void 0 !== t.useRawValueToEscape && t.useRawValueToEscape, this.prefix = t.prefix ? x(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? x(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? x(t.nestingPrefix) : t.nestingPrefixEscaped || x("$t("), this.nestingSuffix = t.nestingSuffix ? x(t.nestingSuffix) : t.nestingSuffixEscaped || x(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = void 0 !== t.alwaysFormat && t.alwaysFormat, this.resetRegExp();
      }
    }, {
      key: "reset",
      value: function value() {
        this.options && this.init(this.options);
      }
    }, {
      key: "resetRegExp",
      value: function value() {
        var e = "".concat(this.prefix, "(.+?)").concat(this.suffix);
        this.regexp = new RegExp(e, "g");
        var t = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
        this.regexpUnescape = new RegExp(t, "g");
        var n = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
        this.nestingRegexp = new RegExp(n, "g");
      }
    }, {
      key: "interpolate",
      value: function value(e, t, n, i) {
        var o,
            r,
            a,
            s = this,
            l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

        function c(e) {
          return e.replace(/\$/g, "$$$$");
        }

        var u = function u(e) {
          if (e.indexOf(s.formatSeparator) < 0) {
            var o = b(t, l, e);
            return s.alwaysFormat ? s.format(o, void 0, n) : o;
          }

          var r = e.split(s.formatSeparator),
              a = r.shift().trim(),
              c = r.join(s.formatSeparator).trim();
          return s.format(b(t, l, a), c, n, i);
        };

        this.resetRegExp();
        var p = i && i.missingInterpolationHandler || this.options.missingInterpolationHandler,
            f = i && i.interpolation && i.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
        return [{
          regex: this.regexpUnescape,
          safeValue: function safeValue(e) {
            return c(e);
          }
        }, {
          regex: this.regexp,
          safeValue: function safeValue(e) {
            return s.escapeValue ? c(s.escape(e)) : c(e);
          }
        }].forEach(function (t) {
          for (a = 0; o = t.regex.exec(e);) {
            if (void 0 === (r = u(o[1].trim()))) {
              if ("function" == typeof p) {
                var n = p(e, o, i);
                r = "string" == typeof n ? n : "";
              } else {
                if (f) {
                  r = o[0];
                  continue;
                }

                s.logger.warn("missed to pass in variable ".concat(o[1], " for interpolating ").concat(e)), r = "";
              }
            } else "string" == typeof r || s.useRawValueToEscape || (r = g(r));
            if (e = e.replace(o[0], t.safeValue(r)), t.regex.lastIndex = 0, ++a >= s.maxReplaces) break;
          }
        }), e;
      }
    }, {
      key: "nest",
      value: function value(e, t) {
        var i,
            o,
            r = this,
            a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            s = n({}, a);

        function l(e, t) {
          var i = this.nestingOptionsSeparator;
          if (e.indexOf(i) < 0) return e;
          var o = e.split(new RegExp("".concat(i, "[ ]*{"))),
              r = "{".concat(o[1]);
          e = o[0], r = (r = this.interpolate(r, s)).replace(/'/g, '"');

          try {
            s = JSON.parse(r), t && (s = n({}, t, s));
          } catch (t) {
            return this.logger.warn("failed parsing options string in nesting for key ".concat(e), t), "".concat(e).concat(i).concat(r);
          }

          return delete s.defaultValue, e;
        }

        for (s.applyPostProcessor = !1, delete s.defaultValue; i = this.nestingRegexp.exec(e);) {
          var c = [],
              u = !1;

          if (i[0].includes(this.formatSeparator) && !/{.*}/.test(i[1])) {
            var p = i[1].split(this.formatSeparator).map(function (e) {
              return e.trim();
            });
            i[1] = p.shift(), c = p, u = !0;
          }

          if ((o = t(l.call(this, i[1].trim(), s), s)) && i[0] === e && "string" != typeof o) return o;
          "string" != typeof o && (o = g(o)), o || (this.logger.warn("missed to resolve ".concat(i[1], " for nesting ").concat(e)), o = ""), u && (o = c.reduce(function (e, t) {
            return r.format(e, t, a.lng, a);
          }, o.trim())), e = e.replace(i[0], o), this.regexp.lastIndex = 0;
        }

        return e;
      }
    }]), e;
  }(),
      D = function (e) {
    function t(e, n, o) {
      var r,
          c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      return i(this, t), r = s(this, l(t).call(this)), k && h.call(a(r)), r.backend = e, r.store = n, r.services = o, r.languageUtils = o.languageUtils, r.options = c, r.logger = f.create("backendConnector"), r.state = {}, r.queue = [], r.backend && r.backend.init && r.backend.init(o, c.backend, c), r;
    }

    return u(t, h), r(t, [{
      key: "queueLoad",
      value: function value(e, t, n, i) {
        var o = this,
            r = [],
            a = [],
            s = [],
            l = [];
        return e.forEach(function (e) {
          var i = !0;
          t.forEach(function (t) {
            var s = "".concat(e, "|").concat(t);
            !n.reload && o.store.hasResourceBundle(e, t) ? o.state[s] = 2 : o.state[s] < 0 || (1 === o.state[s] ? a.indexOf(s) < 0 && a.push(s) : (o.state[s] = 1, i = !1, a.indexOf(s) < 0 && a.push(s), r.indexOf(s) < 0 && r.push(s), l.indexOf(t) < 0 && l.push(t)));
          }), i || s.push(e);
        }), (r.length || a.length) && this.queue.push({
          pending: a,
          loaded: {},
          errors: [],
          callback: i
        }), {
          toLoad: r,
          pending: a,
          toLoadLanguages: s,
          toLoadNamespaces: l
        };
      }
    }, {
      key: "loaded",
      value: function value(e, t, n) {
        var i = e.split("|"),
            o = i[0],
            r = i[1];
        t && this.emit("failedLoading", o, r, t), n && this.store.addResourceBundle(o, r, n), this.state[e] = t ? -1 : 2;
        var a = {};
        this.queue.forEach(function (n) {
          var i, s, l, c, u;
          i = n.loaded, s = r, (c = (l = m(i, [o], Object)).obj)[u = l.k] = c[u] || [], c[u].push(s), function (e, t) {
            for (var n = e.indexOf(t); -1 !== n;) {
              e.splice(n, 1), n = e.indexOf(t);
            }
          }(n.pending, e), t && n.errors.push(t), 0 !== n.pending.length || n.done || (Object.keys(n.loaded).forEach(function (e) {
            a[e] || (a[e] = []), n.loaded[e].length && n.loaded[e].forEach(function (t) {
              a[e].indexOf(t) < 0 && a[e].push(t);
            });
          }), n.done = !0, n.errors.length ? n.callback(n.errors) : n.callback());
        }), this.emit("loaded", a), this.queue = this.queue.filter(function (e) {
          return !e.done;
        });
      }
    }, {
      key: "read",
      value: function value(e, t, n) {
        var i = this,
            o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 350,
            a = arguments.length > 5 ? arguments[5] : void 0;
        return e.length ? this.backend[n](e, t, function (s, l) {
          s && l && o < 5 ? setTimeout(function () {
            i.read.call(i, e, t, n, o + 1, 2 * r, a);
          }, r) : a(s, l);
        }) : a(null, {});
      }
    }, {
      key: "prepareLoading",
      value: function value(e, t) {
        var n = this,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            o = arguments.length > 3 ? arguments[3] : void 0;
        if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), o && o();
        "string" == typeof e && (e = this.languageUtils.toResolveHierarchy(e)), "string" == typeof t && (t = [t]);
        var r = this.queueLoad(e, t, i, o);
        if (!r.toLoad.length) return r.pending.length || o(), null;
        r.toLoad.forEach(function (e) {
          n.loadOne(e);
        });
      }
    }, {
      key: "load",
      value: function value(e, t, n) {
        this.prepareLoading(e, t, {}, n);
      }
    }, {
      key: "reload",
      value: function value(e, t, n) {
        this.prepareLoading(e, t, {
          reload: !0
        }, n);
      }
    }, {
      key: "loadOne",
      value: function value(e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = e.split("|"),
            o = i[0],
            r = i[1];
        this.read(o, r, "read", void 0, void 0, function (i, a) {
          i && t.logger.warn("".concat(n, "loading namespace ").concat(r, " for language ").concat(o, " failed"), i), !i && a && t.logger.log("".concat(n, "loaded namespace ").concat(r, " for language ").concat(o), a), t.loaded(e, i, a);
        });
      }
    }, {
      key: "saveMissing",
      value: function value(e, t, i, o, r) {
        var a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
        this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t) ? this.logger.warn('did not save key "'.concat(i, '" as the namespace "').concat(t, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!") : null != i && "" !== i && (this.backend && this.backend.create && this.backend.create(e, t, i, o, null, n({}, a, {
          isUpdate: r
        })), e && e[0] && this.store.addResource(e[0], t, i, o));
      }
    }]), t;
  }();

  function I(e) {
    return "string" == typeof e.ns && (e.ns = [e.ns]), "string" == typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]), "string" == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]), e.whitelist && (e.whitelist && e.whitelist.indexOf("cimode") < 0 && (e.whitelist = e.whitelist.concat(["cimode"])), e.supportedLngs = e.whitelist), e.nonExplicitWhitelist && (e.nonExplicitSupportedLngs = e.nonExplicitWhitelist), e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e;
  }

  function P() {}

  return new (function (t) {
    function o() {
      var e,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          n = arguments.length > 1 ? arguments[1] : void 0;

      if (i(this, o), e = s(this, l(o).call(this)), k && h.call(a(e)), e.options = I(t), e.services = {}, e.logger = f, e.modules = {
        external: []
      }, n && !e.isInitialized && !t.isClone) {
        if (!e.options.initImmediate) return e.init(t, n), s(e, a(e));
        setTimeout(function () {
          e.init(t, n);
        }, 0);
      }

      return e;
    }

    return u(o, h), r(o, [{
      key: "init",
      value: function value() {
        var t = this,
            i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            o = arguments.length > 1 ? arguments[1] : void 0;

        function r(e) {
          return e ? "function" == typeof e ? new e() : e : null;
        }

        if ("function" == typeof i && (o = i, i = {}), i.whitelist && !i.supportedLngs && this.logger.deprecate("whitelist", 'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.'), i.nonExplicitWhitelist && !i.nonExplicitSupportedLngs && this.logger.deprecate("whitelist", 'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.'), this.options = n({}, {
          debug: !1,
          initImmediate: !0,
          ns: ["translation"],
          defaultNS: ["translation"],
          fallbackLng: ["dev"],
          fallbackNS: !1,
          whitelist: !1,
          nonExplicitWhitelist: !1,
          supportedLngs: !1,
          nonExplicitSupportedLngs: !1,
          load: "all",
          preload: !1,
          simplifyPluralSuffix: !0,
          keySeparator: ".",
          nsSeparator: ":",
          pluralSeparator: "_",
          contextSeparator: "_",
          partialBundledLanguages: !1,
          saveMissing: !1,
          updateMissing: !1,
          saveMissingTo: "fallback",
          saveMissingPlurals: !0,
          missingKeyHandler: !1,
          missingInterpolationHandler: !1,
          postProcess: !1,
          postProcessPassResolved: !1,
          returnNull: !0,
          returnEmptyString: !0,
          returnObjects: !1,
          joinArrays: !1,
          returnedObjectHandler: !1,
          parseMissingKeyHandler: !1,
          appendNamespaceToMissingKey: !1,
          appendNamespaceToCIMode: !1,
          overloadTranslationOptionHandler: function overloadTranslationOptionHandler(t) {
            var n = {};

            if ("object" === e(t[1]) && (n = t[1]), "string" == typeof t[1] && (n.defaultValue = t[1]), "string" == typeof t[2] && (n.tDescription = t[2]), "object" === e(t[2]) || "object" === e(t[3])) {
              var i = t[3] || t[2];
              Object.keys(i).forEach(function (e) {
                n[e] = i[e];
              });
            }

            return n;
          },
          interpolation: {
            escapeValue: !0,
            format: function format(e, t, n, i) {
              return e;
            },
            prefix: "{{",
            suffix: "}}",
            formatSeparator: ",",
            unescapePrefix: "-",
            nestingPrefix: "$t(",
            nestingSuffix: ")",
            nestingOptionsSeparator: ",",
            maxReplaces: 1e3,
            skipOnVariables: !1
          }
        }, this.options, I(i)), this.format = this.options.interpolation.format, o || (o = P), !this.options.isClone) {
          this.modules.logger ? f.init(r(this.modules.logger), this.options) : f.init(null, this.options);
          var a = new L(this.options);
          this.store = new E(this.options.resources, this.options);
          var s = this.services;
          s.logger = f, s.resourceStore = this.store, s.languageUtils = a, s.pluralResolver = new M(a, {
            prepend: this.options.pluralSeparator,
            compatibilityJSON: this.options.compatibilityJSON,
            simplifyPluralSuffix: this.options.simplifyPluralSuffix
          }), s.interpolator = new j(this.options), s.utils = {
            hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
          }, s.backendConnector = new D(r(this.modules.backend), s.resourceStore, s, this.options), s.backendConnector.on("*", function (e) {
            for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) {
              i[o - 1] = arguments[o];
            }

            t.emit.apply(t, [e].concat(i));
          }), this.modules.languageDetector && (s.languageDetector = r(this.modules.languageDetector), s.languageDetector.init(s, this.options.detection, this.options)), this.modules.i18nFormat && (s.i18nFormat = r(this.modules.i18nFormat), s.i18nFormat.init && s.i18nFormat.init(this)), this.translator = new C(this.services, this.options), this.translator.on("*", function (e) {
            for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) {
              i[o - 1] = arguments[o];
            }

            t.emit.apply(t, [e].concat(i));
          }), this.modules.external.forEach(function (e) {
            e.init && e.init(t);
          });
        }

        this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(function (e) {
          t[e] = function () {
            var n;
            return (n = t.store)[e].apply(n, arguments);
          };
        }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(function (e) {
          t[e] = function () {
            var n;
            return (n = t.store)[e].apply(n, arguments), t;
          };
        });

        var l = d(),
            c = function c() {
          t.changeLanguage(t.options.lng, function (e, n) {
            t.isInitialized = !0, t.options.isClone || t.logger.log("initialized", t.options), t.emit("initialized", t.options), l.resolve(n), o(e, n);
          });
        };

        return this.options.resources || !this.options.initImmediate ? c() : setTimeout(c, 0), l;
      }
    }, {
      key: "loadResources",
      value: function value(e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : P,
            i = "string" == typeof e ? e : this.language;

        if ("function" == typeof e && (n = e), !this.options.resources || this.options.partialBundledLanguages) {
          if (i && "cimode" === i.toLowerCase()) return n();

          var o = [],
              r = function r(e) {
            e && t.services.languageUtils.toResolveHierarchy(e).forEach(function (e) {
              o.indexOf(e) < 0 && o.push(e);
            });
          };

          i ? r(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(function (e) {
            return r(e);
          }), this.options.preload && this.options.preload.forEach(function (e) {
            return r(e);
          }), this.services.backendConnector.load(o, this.options.ns, n);
        } else n(null);
      }
    }, {
      key: "reloadResources",
      value: function value(e, t, n) {
        var i = d();
        return e || (e = this.languages), t || (t = this.options.ns), n || (n = P), this.services.backendConnector.reload(e, t, function (e) {
          i.resolve(), n(e);
        }), i;
      }
    }, {
      key: "use",
      value: function value(e) {
        if (!e) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
        if (!e.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
        return "backend" === e.type && (this.modules.backend = e), ("logger" === e.type || e.log && e.warn && e.error) && (this.modules.logger = e), "languageDetector" === e.type && (this.modules.languageDetector = e), "i18nFormat" === e.type && (this.modules.i18nFormat = e), "postProcessor" === e.type && T.addPostProcessor(e), "3rdParty" === e.type && this.modules.external.push(e), this;
      }
    }, {
      key: "changeLanguage",
      value: function value(e, t) {
        var n = this;
        this.isLanguageChangingTo = e;
        var i = d();
        this.emit("languageChanging", e);

        var o = function o(e) {
          var o = "string" == typeof e ? e : n.services.languageUtils.getBestMatchFromCodes(e);
          o && (n.language || (n.language = o, n.languages = n.services.languageUtils.toResolveHierarchy(o)), n.translator.language || n.translator.changeLanguage(o), n.services.languageDetector && n.services.languageDetector.cacheUserLanguage(o)), n.loadResources(o, function (e) {
            !function (e, o) {
              o ? (n.language = o, n.languages = n.services.languageUtils.toResolveHierarchy(o), n.translator.changeLanguage(o), n.isLanguageChangingTo = void 0, n.emit("languageChanged", o), n.logger.log("languageChanged", o)) : n.isLanguageChangingTo = void 0, i.resolve(function () {
                return n.t.apply(n, arguments);
              }), t && t(e, function () {
                return n.t.apply(n, arguments);
              });
            }(e, o);
          });
        };

        return e || !this.services.languageDetector || this.services.languageDetector.async ? !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect(o) : o(e) : o(this.services.languageDetector.detect()), i;
      }
    }, {
      key: "getFixedT",
      value: function value(t, i) {
        var o = this,
            r = function t(i, r) {
          var a;

          if ("object" !== e(r)) {
            for (var s = arguments.length, l = new Array(s > 2 ? s - 2 : 0), c = 2; c < s; c++) {
              l[c - 2] = arguments[c];
            }

            a = o.options.overloadTranslationOptionHandler([i, r].concat(l));
          } else a = n({}, r);

          return a.lng = a.lng || t.lng, a.lngs = a.lngs || t.lngs, a.ns = a.ns || t.ns, o.t(i, a);
        };

        return "string" == typeof t ? r.lng = t : r.lngs = t, r.ns = i, r;
      }
    }, {
      key: "t",
      value: function value() {
        var e;
        return this.translator && (e = this.translator).translate.apply(e, arguments);
      }
    }, {
      key: "exists",
      value: function value() {
        var e;
        return this.translator && (e = this.translator).exists.apply(e, arguments);
      }
    }, {
      key: "setDefaultNamespace",
      value: function value(e) {
        this.options.defaultNS = e;
      }
    }, {
      key: "hasLoadedNamespace",
      value: function value(e) {
        var t = this,
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
        if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
        var i = this.languages[0],
            o = !!this.options && this.options.fallbackLng,
            r = this.languages[this.languages.length - 1];
        if ("cimode" === i.toLowerCase()) return !0;

        var a = function a(e, n) {
          var i = t.services.backendConnector.state["".concat(e, "|").concat(n)];
          return -1 === i || 2 === i;
        };

        if (n.precheck) {
          var s = n.precheck(this, a);
          if (void 0 !== s) return s;
        }

        return !!this.hasResourceBundle(i, e) || !this.services.backendConnector.backend || !(!a(i, e) || o && !a(r, e));
      }
    }, {
      key: "loadNamespaces",
      value: function value(e, t) {
        var n = this,
            i = d();
        return this.options.ns ? ("string" == typeof e && (e = [e]), e.forEach(function (e) {
          n.options.ns.indexOf(e) < 0 && n.options.ns.push(e);
        }), this.loadResources(function (e) {
          i.resolve(), t && t(e);
        }), i) : (t && t(), Promise.resolve());
      }
    }, {
      key: "loadLanguages",
      value: function value(e, t) {
        var n = d();
        "string" == typeof e && (e = [e]);
        var i = this.options.preload || [],
            o = e.filter(function (e) {
          return i.indexOf(e) < 0;
        });
        return o.length ? (this.options.preload = i.concat(o), this.loadResources(function (e) {
          n.resolve(), t && t(e);
        }), n) : (t && t(), Promise.resolve());
      }
    }, {
      key: "dir",
      value: function value(e) {
        return e || (e = this.languages && this.languages.length > 0 ? this.languages[0] : this.language), e ? ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam"].indexOf(this.services.languageUtils.getLanguagePartFromCode(e)) >= 0 ? "rtl" : "ltr" : "rtl";
      }
    }, {
      key: "createInstance",
      value: function value() {
        return new o(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, arguments.length > 1 ? arguments[1] : void 0);
      }
    }, {
      key: "cloneInstance",
      value: function value() {
        var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : P,
            r = n({}, this.options, t, {
          isClone: !0
        }),
            a = new o(r);
        return ["store", "services", "language"].forEach(function (t) {
          a[t] = e[t];
        }), a.services = n({}, this.services), a.services.utils = {
          hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
        }, a.translator = new C(a.services, a.options), a.translator.on("*", function (e) {
          for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {
            n[i - 1] = arguments[i];
          }

          a.emit.apply(a, [e].concat(n));
        }), a.init(r, i), a.translator.options = a.options, a.translator.backendConnector.services.utils = {
          hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
        }, a;
      }
    }]), o;
  }())();
}), function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).i18nextXHRBackend = t();
}(this, function () {
  "use strict";

  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  var t = [],
      n = t.forEach,
      i = t.slice;

  function o(e) {
    return n.call(i.call(arguments, 1), function (t) {
      if (t) for (var n in t) {
        void 0 === e[n] && (e[n] = t[n]);
      }
    }), e;
  }

  function r(e) {
    return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  function a(e) {
    return (a = "function" == typeof Symbol && "symbol" === r(Symbol.iterator) ? function (e) {
      return r(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : r(e);
    })(e);
  }

  function s(e, t) {
    if (t && "object" === a(t)) {
      var n = "",
          i = encodeURIComponent;

      for (var o in t) {
        n += "&" + i(o) + "=" + i(t[o]);
      }

      if (!n) return e;
      e = e + (-1 !== e.indexOf("?") ? "&" : "?") + n.slice(1);
    }

    return e;
  }

  function l(e, t, n, i, o) {
    i && "object" === a(i) && (o || (i._t = new Date()), i = s("", i).slice(1)), t.queryStringParams && (e = s(e, t.queryStringParams));

    try {
      var r;
      (r = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0")).open(i ? "POST" : "GET", e, 1), t.crossDomain || r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), r.withCredentials = !!t.withCredentials, i && r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.overrideMimeType && r.overrideMimeType("application/json");
      var l = t.customHeaders;
      if (l = "function" == typeof l ? l() : l) for (var c in l) {
        r.setRequestHeader(c, l[c]);
      }
      r.onreadystatechange = function () {
        r.readyState > 3 && n && n(r.responseText, r);
      }, r.send(i);
    } catch (e) {
      console && console.log(e);
    }
  }

  function c() {
    return {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}",
      allowMultiLoading: !1,
      parse: JSON.parse,
      parsePayload: function parsePayload(e, t, n) {
        return function (e, t, n) {
          return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n, e;
        }({}, t, n || "");
      },
      crossDomain: !1,
      ajax: l
    };
  }

  var u = function () {
    function t(e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this.init(e, n), this.type = "backend";
    }

    var n, i;
    return n = t, (i = [{
      key: "init",
      value: function value(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        this.services = e, this.options = o(t, this.options || {}, c());
      }
    }, {
      key: "readMulti",
      value: function value(e, t, n) {
        var i = this.options.loadPath;
        "function" == typeof this.options.loadPath && (i = this.options.loadPath(e, t));
        var o = this.services.interpolator.interpolate(i, {
          lng: e.join("+"),
          ns: t.join("+")
        });
        this.loadUrl(o, n);
      }
    }, {
      key: "read",
      value: function value(e, t, n) {
        var i = this.options.loadPath;
        "function" == typeof this.options.loadPath && (i = this.options.loadPath([e], [t]));
        var o = this.services.interpolator.interpolate(i, {
          lng: e,
          ns: t
        });
        this.loadUrl(o, n);
      }
    }, {
      key: "loadUrl",
      value: function value(e, t) {
        var n = this;
        this.options.ajax(e, this.options, function (i, o) {
          if (o.status >= 500 && o.status < 600) return t("failed loading " + e, !0);
          if (o.status >= 400 && o.status < 500) return t("failed loading " + e, !1);
          var r, a;

          try {
            r = n.options.parse(i, e);
          } catch (t) {
            a = "failed parsing " + e + " to json";
          }

          if (a) return t(a, !1);
          t(null, r);
        });
      }
    }, {
      key: "create",
      value: function value(e, t, n, i) {
        var o = this;
        "string" == typeof e && (e = [e]);
        var r = this.options.parsePayload(t, n, i);
        e.forEach(function (e) {
          var n = o.services.interpolator.interpolate(o.options.addPath, {
            lng: e,
            ns: t
          });
          o.options.ajax(n, o.options, function (e, t) {}, r);
        });
      }
    }]) && e(n.prototype, i), t;
  }();

  return u.type = "backend", u;
}), function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).i18nextBrowserLanguageDetector = t();
}(this, function () {
  "use strict";

  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  var t = [],
      n = t.forEach,
      i = t.slice;

  function o(e) {
    return n.call(i.call(arguments, 1), function (t) {
      if (t) for (var n in t) {
        void 0 === e[n] && (e[n] = t[n]);
      }
    }), e;
  }

  var r = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
      a = function a(e, t, n) {
    var i = n || {};
    i.path = i.path || "/";
    var o = e + "=" + encodeURIComponent(t);

    if (i.maxAge > 0) {
      var a = i.maxAge - 0;
      if (isNaN(a)) throw new Error("maxAge should be a Number");
      o += "; Max-Age=" + Math.floor(a);
    }

    if (i.domain) {
      if (!r.test(i.domain)) throw new TypeError("option domain is invalid");
      o += "; Domain=" + i.domain;
    }

    if (i.path) {
      if (!r.test(i.path)) throw new TypeError("option path is invalid");
      o += "; Path=" + i.path;
    }

    if (i.expires) {
      if ("function" != typeof i.expires.toUTCString) throw new TypeError("option expires is invalid");
      o += "; Expires=" + i.expires.toUTCString();
    }

    if (i.httpOnly && (o += "; HttpOnly"), i.secure && (o += "; Secure"), i.sameSite) switch ("string" == typeof i.sameSite ? i.sameSite.toLowerCase() : i.sameSite) {
      case !0:
        o += "; SameSite=Strict";
        break;

      case "lax":
        o += "; SameSite=Lax";
        break;

      case "strict":
        o += "; SameSite=Strict";
        break;

      case "none":
        o += "; SameSite=None";
        break;

      default:
        throw new TypeError("option sameSite is invalid");
    }
    return o;
  },
      s = {
    name: "cookie",
    lookup: function lookup(e) {
      var t;

      if (e.lookupCookie && "undefined" != typeof document) {
        var n = function (e) {
          for (var t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
            for (var o = n[i]; " " === o.charAt(0);) {
              o = o.substring(1, o.length);
            }

            if (0 === o.indexOf(t)) return o.substring(t.length, o.length);
          }

          return null;
        }(e.lookupCookie);

        n && (t = n);
      }

      return t;
    },
    cacheUserLanguage: function cacheUserLanguage(e, t) {
      t.lookupCookie && "undefined" != typeof document && function (e, t, n, i) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
          path: "/",
          sameSite: "strict"
        };
        n && (o.expires = new Date(), o.expires.setTime(o.expires.getTime() + 60 * n * 1e3)), i && (o.domain = i), document.cookie = a(e, encodeURIComponent(t), o);
      }(t.lookupCookie, e, t.cookieMinutes, t.cookieDomain, t.cookieOptions);
    }
  },
      l = {
    name: "querystring",
    lookup: function lookup(e) {
      var t;
      if ("undefined" != typeof window) for (var n = window.location.search.substring(1).split("&"), i = 0; i < n.length; i++) {
        var o = n[i].indexOf("=");
        o > 0 && n[i].substring(0, o) === e.lookupQuerystring && (t = n[i].substring(o + 1));
      }
      return t;
    }
  },
      c = null,
      u = function u() {
    if (null !== c) return c;

    try {
      c = "undefined" !== window && null !== window.localStorage, window.localStorage.setItem("i18next.translate.boo", "foo"), window.localStorage.removeItem("i18next.translate.boo");
    } catch (e) {
      c = !1;
    }

    return c;
  },
      p = {
    name: "localStorage",
    lookup: function lookup(e) {
      var t;

      if (e.lookupLocalStorage && u()) {
        var n = window.localStorage.getItem(e.lookupLocalStorage);
        n && (t = n);
      }

      return t;
    },
    cacheUserLanguage: function cacheUserLanguage(e, t) {
      t.lookupLocalStorage && u() && window.localStorage.setItem(t.lookupLocalStorage, e);
    }
  },
      f = null,
      h = function h() {
    if (null !== f) return f;

    try {
      f = "undefined" !== window && null !== window.sessionStorage, window.sessionStorage.setItem("i18next.translate.boo", "foo"), window.sessionStorage.removeItem("i18next.translate.boo");
    } catch (e) {
      f = !1;
    }

    return f;
  },
      d = {
    name: "sessionStorage",
    lookup: function lookup(e) {
      var t;

      if (e.lookupSessionStorage && h()) {
        var n = window.sessionStorage.getItem(e.lookupSessionStorage);
        n && (t = n);
      }

      return t;
    },
    cacheUserLanguage: function cacheUserLanguage(e, t) {
      t.lookupSessionStorage && h() && window.sessionStorage.setItem(t.lookupSessionStorage, e);
    }
  },
      g = {
    name: "navigator",
    lookup: function lookup(e) {
      var t = [];

      if ("undefined" != typeof navigator) {
        if (navigator.languages) for (var n = 0; n < navigator.languages.length; n++) {
          t.push(navigator.languages[n]);
        }
        navigator.userLanguage && t.push(navigator.userLanguage), navigator.language && t.push(navigator.language);
      }

      return t.length > 0 ? t : void 0;
    }
  },
      m = {
    name: "htmlTag",
    lookup: function lookup(e) {
      var t,
          n = e.htmlTag || ("undefined" != typeof document ? document.documentElement : null);
      return n && "function" == typeof n.getAttribute && (t = n.getAttribute("lang")), t;
    }
  },
      y = {
    name: "path",
    lookup: function lookup(e) {
      var t;

      if ("undefined" != typeof window) {
        var n = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
        if (n instanceof Array) if ("number" == typeof e.lookupFromPathIndex) {
          if ("string" != typeof n[e.lookupFromPathIndex]) return;
          t = n[e.lookupFromPathIndex].replace("/", "");
        } else t = n[0].replace("/", "");
      }

      return t;
    }
  },
      v = {
    name: "subdomain",
    lookup: function lookup(e) {
      var t;

      if ("undefined" != typeof window) {
        var n = window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);
        n instanceof Array && (t = "number" == typeof e.lookupFromSubdomainIndex ? n[e.lookupFromSubdomainIndex].replace("http://", "").replace("https://", "").replace(".", "") : n[0].replace("http://", "").replace("https://", "").replace(".", ""));
      }

      return t;
    }
  },
      b = function () {
    function t(e) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this.type = "languageDetector", this.detectors = {}, this.init(e, n);
    }

    var n, i;
    return n = t, (i = [{
      key: "init",
      value: function value(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        this.services = e, this.options = o(t, this.options || {}, {
          order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"],
          lookupQuerystring: "lng",
          lookupCookie: "i18next",
          lookupLocalStorage: "i18nextLng",
          lookupSessionStorage: "i18nextLng",
          caches: ["localStorage"],
          excludeCacheFor: ["cimode"]
        }), this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex), this.i18nOptions = n, this.addDetector(s), this.addDetector(l), this.addDetector(p), this.addDetector(d), this.addDetector(g), this.addDetector(m), this.addDetector(y), this.addDetector(v);
      }
    }, {
      key: "addDetector",
      value: function value(e) {
        this.detectors[e.name] = e;
      }
    }, {
      key: "detect",
      value: function value(e) {
        var t = this;
        e || (e = this.options.order);
        var n = [];
        return e.forEach(function (e) {
          if (t.detectors[e]) {
            var i = t.detectors[e].lookup(t.options);
            i && "string" == typeof i && (i = [i]), i && (n = n.concat(i));
          }
        }), this.services.languageUtils.getBestMatchFromCodes ? n : n.length > 0 ? n[0] : null;
      }
    }, {
      key: "cacheUserLanguage",
      value: function value(e, t) {
        var n = this;
        t || (t = this.options.caches), t && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(e) > -1 || t.forEach(function (t) {
          n.detectors[t] && n.detectors[t].cacheUserLanguage(e, n.options);
        }));
      }
    }]) && e(n.prototype, i), t;
  }();

  return b.type = "languageDetector", b;
}), function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.jqueryI18next = t();
}(this, function () {
  "use strict";

  var e = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];

      for (var i in n) {
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }
    }

    return e;
  },
      t = {
    tName: "t",
    i18nName: "i18n",
    handleName: "localize",
    selectorAttr: "data-i18n",
    targetAttr: "i18n-target",
    optionsAttr: "i18n-options",
    useOptionsAttr: !1,
    parseDefaultValueFromContent: !0
  };

  return {
    init: function init(n, i) {
      function o(t, i, o) {
        function r(t, n) {
          return s.parseDefaultValueFromContent ? e({}, t, {
            defaultValue: n
          }) : t;
        }

        if (0 !== i.length) {
          var a = "text";

          if (0 === i.indexOf("[")) {
            var l = i.split("]");
            i = l[1], a = l[0].substr(1, l[0].length - 1);
          }

          if (i.indexOf(";") === i.length - 1 && (i = i.substr(0, i.length - 2)), "html" === a) t.html(n.t(i, r(o, t.html())));else if ("text" === a) t.text(n.t(i, r(o, t.text())));else if ("prepend" === a) t.prepend(n.t(i, r(o, t.html())));else if ("append" === a) t.append(n.t(i, r(o, t.html())));else if (0 === a.indexOf("data-")) {
            var c = a.substr("data-".length),
                u = n.t(i, r(o, t.data(c)));
            t.data(c, u), t.attr(a, u);
          } else t.attr(a, n.t(i, r(o, t.attr(a))));
        }
      }

      function r(t, n) {
        var r = t.attr(s.selectorAttr);

        if (r || void 0 === r || !1 === r || (r = t.text() || t.val()), r) {
          var a = t,
              l = t.data(s.targetAttr);

          if (l && (a = t.find(l) || t), n || !0 !== s.useOptionsAttr || (n = t.data(s.optionsAttr)), n = n || {}, r.indexOf(";") >= 0) {
            var c = r.split(";");
            i.each(c, function (e, t) {
              "" !== t && o(a, t.trim(), n);
            });
          } else o(a, r, n);

          if (!0 === s.useOptionsAttr) {
            var u = {};
            delete (u = e({
              clone: u
            }, n)).lng, t.data(s.optionsAttr, u);
          }
        }
      }

      function a(e) {
        return this.each(function () {
          r(i(this), e), i(this).find("[" + s.selectorAttr + "]").each(function () {
            r(i(this), e);
          });
        });
      }

      var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      s = e({}, t, s), i[s.tName] = n.t.bind(n), i[s.i18nName] = n, i.fn[s.handleName] = a;
    }
  };
}), function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.feather = t() : e.feather = t();
}("undefined" != typeof self ? self : this, function () {
  return function (e) {
    var t = {};

    function n(i) {
      if (t[i]) return t[i].exports;
      var o = t[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }

    return n.m = e, n.c = t, n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, {
        configurable: !1,
        enumerable: !0,
        get: i
      });
    }, n.r = function (e) {
      Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 80);
  }([function (e, t, n) {
    (function (t) {
      var n = "object",
          i = function i(e) {
        return e && e.Math == Math && e;
      };

      e.exports = i((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == n && globalThis) || i((typeof window === "undefined" ? "undefined" : _typeof(window)) == n && window) || i((typeof self === "undefined" ? "undefined" : _typeof(self)) == n && self) || i(_typeof(t) == n && t) || Function("return this")();
    }).call(this, n(75));
  }, function (e, t) {
    var n = {}.hasOwnProperty;

    e.exports = function (e, t) {
      return n.call(e, t);
    };
  }, function (e, t, n) {
    var i = n(0),
        o = n(11),
        r = n(33),
        a = n(62),
        s = i.Symbol,
        l = o("wks");

    e.exports = function (e) {
      return l[e] || (l[e] = a && s[e] || (a ? s : r)("Symbol." + e));
    };
  }, function (e, t, n) {
    var i = n(6);

    e.exports = function (e) {
      if (!i(e)) throw TypeError(String(e) + " is not an object");
      return e;
    };
  }, function (e, t) {
    e.exports = function (e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    };
  }, function (e, t, n) {
    var i = n(8),
        o = n(7),
        r = n(10);
    e.exports = i ? function (e, t, n) {
      return o.f(e, t, r(1, n));
    } : function (e, t, n) {
      return e[t] = n, e;
    };
  }, function (e, t) {
    e.exports = function (e) {
      return "object" == _typeof(e) ? null !== e : "function" == typeof e;
    };
  }, function (e, t, n) {
    var i = n(8),
        o = n(35),
        r = n(3),
        a = n(18),
        s = Object.defineProperty;
    t.f = i ? s : function (e, t, n) {
      if (r(e), t = a(t, !0), r(n), o) try {
        return s(e, t, n);
      } catch (e) {}
      if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
      return "value" in n && (e[t] = n.value), e;
    };
  }, function (e, t, n) {
    var i = n(4);
    e.exports = !i(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, function (e, t) {
    e.exports = {};
  }, function (e, t) {
    e.exports = function (e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      };
    };
  }, function (e, t, n) {
    var i = n(0),
        o = n(19),
        r = n(17),
        a = i["__core-js_shared__"] || o("__core-js_shared__", {});
    (e.exports = function (e, t) {
      return a[e] || (a[e] = void 0 !== t ? t : {});
    })("versions", []).push({
      version: "3.1.3",
      mode: r ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
    });
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = a(n(43)),
        o = a(n(41)),
        r = a(n(40));

    function a(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    t.default = Object.keys(o.default).map(function (e) {
      return new i.default(e, o.default[e], r.default[e]);
    }).reduce(function (e, t) {
      return e[t.name] = t, e;
    }, {});
  }, function (e, t) {
    e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  }, function (e, t, n) {
    var i = n(72),
        o = n(20);

    e.exports = function (e) {
      return i(o(e));
    };
  }, function (e, t) {
    e.exports = {};
  }, function (e, t, n) {
    var i = n(11),
        o = n(33),
        r = i("keys");

    e.exports = function (e) {
      return r[e] || (r[e] = o(e));
    };
  }, function (e, t) {
    e.exports = !1;
  }, function (e, t, n) {
    var i = n(6);

    e.exports = function (e, t) {
      if (!i(e)) return e;
      var n, o;
      if (t && "function" == typeof (n = e.toString) && !i(o = n.call(e))) return o;
      if ("function" == typeof (n = e.valueOf) && !i(o = n.call(e))) return o;
      if (!t && "function" == typeof (n = e.toString) && !i(o = n.call(e))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  }, function (e, t, n) {
    var i = n(0),
        o = n(5);

    e.exports = function (e, t) {
      try {
        o(i, e, t);
      } catch (n) {
        i[e] = t;
      }

      return t;
    };
  }, function (e, t) {
    e.exports = function (e) {
      if (null == e) throw TypeError("Can't call method on " + e);
      return e;
    };
  }, function (e, t) {
    var n = Math.ceil,
        i = Math.floor;

    e.exports = function (e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? i : n)(e);
    };
  }, function (e, t, n) {
    var i;
    /*!
        Copyright (c) 2016 Jed Watson.
        Licensed under the MIT License (MIT), see
        http://jedwatson.github.io/classnames
      */

    /*!
        Copyright (c) 2016 Jed Watson.
        Licensed under the MIT License (MIT), see
        http://jedwatson.github.io/classnames
      */

    !function () {
      "use strict";

      var n = function () {
        function e() {}

        function t(e, t) {
          for (var n = t.length, i = 0; i < n; ++i) {
            o(e, t[i]);
          }
        }

        e.prototype = Object.create(null);
        var n = {}.hasOwnProperty,
            i = /\s+/;

        function o(e, o) {
          if (o) {
            var r = _typeof(o);

            "string" === r ? function (e, t) {
              for (var n = t.split(i), o = n.length, r = 0; r < o; ++r) {
                e[n[r]] = !0;
              }
            }(e, o) : Array.isArray(o) ? t(e, o) : "object" === r ? function (e, t) {
              for (var i in t) {
                n.call(t, i) && (e[i] = !!t[i]);
              }
            }(e, o) : "number" === r && function (e, t) {
              e[t] = !0;
            }(e, o);
          }
        }

        return function () {
          for (var n = arguments.length, i = Array(n), o = 0; o < n; o++) {
            i[o] = arguments[o];
          }

          var r = new e();
          t(r, i);
          var a = [];

          for (var s in r) {
            r[s] && a.push(s);
          }

          return a.join(" ");
        };
      }();

      void 0 !== e && e.exports ? e.exports = n : void 0 === (i = function () {
        return n;
      }.apply(t, [])) || (e.exports = i);
    }();
  }, function (e, t, n) {
    var i = n(7).f,
        o = n(1),
        r = n(2)("toStringTag");

    e.exports = function (e, t, n) {
      e && !o(e = n ? e : e.prototype, r) && i(e, r, {
        configurable: !0,
        value: t
      });
    };
  }, function (e, t, n) {
    var i = n(20);

    e.exports = function (e) {
      return Object(i(e));
    };
  }, function (e, t, n) {
    var i = n(1),
        o = n(24),
        r = n(16),
        a = n(63),
        s = r("IE_PROTO"),
        l = Object.prototype;
    e.exports = a ? Object.getPrototypeOf : function (e) {
      return e = o(e), i(e, s) ? e[s] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? l : null;
    };
  }, function (e, t, n) {
    "use strict";

    var i,
        o,
        r,
        a = n(25),
        s = n(5),
        l = n(1),
        c = n(2),
        u = n(17),
        p = c("iterator"),
        f = !1;
    [].keys && ("next" in (r = [].keys()) ? (o = a(a(r))) !== Object.prototype && (i = o) : f = !0), null == i && (i = {}), u || l(i, p) || s(i, p, function () {
      return this;
    }), e.exports = {
      IteratorPrototype: i,
      BUGGY_SAFARI_ITERATORS: f
    };
  }, function (e, t, n) {
    var i = n(21),
        o = Math.min;

    e.exports = function (e) {
      return e > 0 ? o(i(e), 9007199254740991) : 0;
    };
  }, function (e, t, n) {
    var i = n(1),
        o = n(14),
        r = n(68),
        a = n(15),
        s = r(!1);

    e.exports = function (e, t) {
      var n,
          r = o(e),
          l = 0,
          c = [];

      for (n in r) {
        !i(a, n) && i(r, n) && c.push(n);
      }

      for (; t.length > l;) {
        i(r, n = t[l++]) && (~s(c, n) || c.push(n));
      }

      return c;
    };
  }, function (e, t, n) {
    var i = n(0),
        o = n(11),
        r = n(5),
        a = n(1),
        s = n(19),
        l = n(36),
        c = n(37),
        u = c.get,
        p = c.enforce,
        f = String(l).split("toString");
    o("inspectSource", function (e) {
      return l.call(e);
    }), (e.exports = function (e, t, n, o) {
      var l = !!o && !!o.unsafe,
          c = !!o && !!o.enumerable,
          u = !!o && !!o.noTargetGet;
      "function" == typeof n && ("string" != typeof t || a(n, "name") || r(n, "name", t), p(n).source = f.join("string" == typeof t ? t : "")), e !== i ? (l ? !u && e[t] && (c = !0) : delete e[t], c ? e[t] = n : r(e, t, n)) : c ? e[t] = n : s(t, n);
    })(Function.prototype, "toString", function () {
      return "function" == typeof this && u(this).source || l.call(this);
    });
  }, function (e, t) {
    var n = {}.toString;

    e.exports = function (e) {
      return n.call(e).slice(8, -1);
    };
  }, function (e, t, n) {
    var i = n(8),
        o = n(73),
        r = n(10),
        a = n(14),
        s = n(18),
        l = n(1),
        c = n(35),
        u = Object.getOwnPropertyDescriptor;
    t.f = i ? u : function (e, t) {
      if (e = a(e), t = s(t, !0), c) try {
        return u(e, t);
      } catch (e) {}
      if (l(e, t)) return r(!o.f.call(e, t), e[t]);
    };
  }, function (e, t, n) {
    var i = n(0),
        o = n(31).f,
        r = n(5),
        a = n(29),
        s = n(19),
        l = n(71),
        c = n(65);

    e.exports = function (e, t) {
      var n,
          u,
          p,
          f,
          h,
          d = e.target,
          g = e.global,
          m = e.stat;
      if (n = g ? i : m ? i[d] || s(d, {}) : (i[d] || {}).prototype) for (u in t) {
        if (f = t[u], p = e.noTargetGet ? (h = o(n, u)) && h.value : n[u], !c(g ? u : d + (m ? "." : "#") + u, e.forced) && void 0 !== p) {
          if (_typeof(f) == _typeof(p)) continue;
          l(f, p);
        }

        (e.sham || p && p.sham) && r(f, "sham", !0), a(n, u, f, e);
      }
    };
  }, function (e, t) {
    var n = 0,
        i = Math.random();

    e.exports = function (e) {
      return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + i).toString(36));
    };
  }, function (e, t, n) {
    var i = n(0),
        o = n(6),
        r = i.document,
        a = o(r) && o(r.createElement);

    e.exports = function (e) {
      return a ? r.createElement(e) : {};
    };
  }, function (e, t, n) {
    var i = n(8),
        o = n(4),
        r = n(34);
    e.exports = !i && !o(function () {
      return 7 != Object.defineProperty(r("div"), "a", {
        get: function get() {
          return 7;
        }
      }).a;
    });
  }, function (e, t, n) {
    var i = n(11);
    e.exports = i("native-function-to-string", Function.toString);
  }, function (e, t, n) {
    var i,
        o,
        r,
        a = n(76),
        s = n(0),
        l = n(6),
        c = n(5),
        u = n(1),
        p = n(16),
        f = n(15),
        h = s.WeakMap;

    if (a) {
      var d = new h(),
          g = d.get,
          m = d.has,
          y = d.set;
      i = function i(e, t) {
        return y.call(d, e, t), t;
      }, o = function o(e) {
        return g.call(d, e) || {};
      }, r = function r(e) {
        return m.call(d, e);
      };
    } else {
      var v = p("state");
      f[v] = !0, i = function i(e, t) {
        return c(e, v, t), t;
      }, o = function o(e) {
        return u(e, v) ? e[v] : {};
      }, r = function r(e) {
        return u(e, v);
      };
    }

    e.exports = {
      set: i,
      get: o,
      has: r,
      enforce: function enforce(e) {
        return r(e) ? o(e) : i(e, {});
      },
      getterFor: function getterFor(e) {
        return function (t) {
          var n;
          if (!l(t) || (n = o(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
          return n;
        };
      }
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        }
      }

      return e;
    },
        o = a(n(22)),
        r = a(n(12));

    function a(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    t.default = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      if ("undefined" == typeof document) throw new Error("`feather.replace()` only works in a browser environment.");
      var t = document.querySelectorAll("[data-feather]");
      Array.from(t).forEach(function (t) {
        return function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = function (e) {
            return Array.from(e.attributes).reduce(function (e, t) {
              return e[t.name] = t.value, e;
            }, {});
          }(e),
              a = n["data-feather"];

          delete n["data-feather"];
          var s = r.default[a].toSvg(i({}, t, n, {
            class: (0, o.default)(t.class, n.class)
          })),
              l = new DOMParser().parseFromString(s, "image/svg+xml").querySelector("svg");
          e.parentNode.replaceChild(l, e);
        }(t, e);
      });
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i,
        o = (i = n(12)) && i.__esModule ? i : {
      default: i
    };

    t.default = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      if (console.warn("feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead."), !e) throw new Error("The required `key` (icon name) parameter is missing.");
      if (!o.default[e]) throw new Error("No icon matching '" + e + "'. See the complete list of icons at https://feathericons.com");
      return o.default[e].toSvg(t);
    };
  }, function (e) {
    e.exports = {
      activity: ["pulse", "health", "action", "motion"],
      airplay: ["stream", "cast", "mirroring"],
      "alert-circle": ["warning", "alert", "danger"],
      "alert-octagon": ["warning", "alert", "danger"],
      "alert-triangle": ["warning", "alert", "danger"],
      "align-center": ["text alignment", "center"],
      "align-justify": ["text alignment", "justified"],
      "align-left": ["text alignment", "left"],
      "align-right": ["text alignment", "right"],
      anchor: [],
      archive: ["index", "box"],
      "at-sign": ["mention", "at", "email", "message"],
      award: ["achievement", "badge"],
      aperture: ["camera", "photo"],
      "bar-chart": ["statistics", "diagram", "graph"],
      "bar-chart-2": ["statistics", "diagram", "graph"],
      battery: ["power", "electricity"],
      "battery-charging": ["power", "electricity"],
      bell: ["alarm", "notification", "sound"],
      "bell-off": ["alarm", "notification", "silent"],
      bluetooth: ["wireless"],
      "book-open": ["read", "library"],
      book: ["read", "dictionary", "booklet", "magazine", "library"],
      bookmark: ["read", "clip", "marker", "tag"],
      box: ["cube"],
      briefcase: ["work", "bag", "baggage", "folder"],
      calendar: ["date"],
      camera: ["photo"],
      cast: ["chromecast", "airplay"],
      circle: ["off", "zero", "record"],
      clipboard: ["copy"],
      clock: ["time", "watch", "alarm"],
      "cloud-drizzle": ["weather", "shower"],
      "cloud-lightning": ["weather", "bolt"],
      "cloud-rain": ["weather"],
      "cloud-snow": ["weather", "blizzard"],
      cloud: ["weather"],
      codepen: ["logo"],
      codesandbox: ["logo"],
      code: ["source", "programming"],
      coffee: ["drink", "cup", "mug", "tea", "cafe", "hot", "beverage"],
      columns: ["layout"],
      command: ["keyboard", "cmd", "terminal", "prompt"],
      compass: ["navigation", "safari", "travel", "direction"],
      copy: ["clone", "duplicate"],
      "corner-down-left": ["arrow", "return"],
      "corner-down-right": ["arrow"],
      "corner-left-down": ["arrow"],
      "corner-left-up": ["arrow"],
      "corner-right-down": ["arrow"],
      "corner-right-up": ["arrow"],
      "corner-up-left": ["arrow"],
      "corner-up-right": ["arrow"],
      cpu: ["processor", "technology"],
      "credit-card": ["purchase", "payment", "cc"],
      crop: ["photo", "image"],
      crosshair: ["aim", "target"],
      database: ["storage", "memory"],
      delete: ["remove"],
      disc: ["album", "cd", "dvd", "music"],
      "dollar-sign": ["currency", "money", "payment"],
      droplet: ["water"],
      edit: ["pencil", "change"],
      "edit-2": ["pencil", "change"],
      "edit-3": ["pencil", "change"],
      eye: ["view", "watch"],
      "eye-off": ["view", "watch", "hide", "hidden"],
      "external-link": ["outbound"],
      facebook: ["logo", "social"],
      "fast-forward": ["music"],
      figma: ["logo", "design", "tool"],
      "file-minus": ["delete", "remove", "erase"],
      "file-plus": ["add", "create", "new"],
      "file-text": ["data", "txt", "pdf"],
      film: ["movie", "video"],
      filter: ["funnel", "hopper"],
      flag: ["report"],
      "folder-minus": ["directory"],
      "folder-plus": ["directory"],
      folder: ["directory"],
      framer: ["logo", "design", "tool"],
      frown: ["emoji", "face", "bad", "sad", "emotion"],
      gift: ["present", "box", "birthday", "party"],
      "git-branch": ["code", "version control"],
      "git-commit": ["code", "version control"],
      "git-merge": ["code", "version control"],
      "git-pull-request": ["code", "version control"],
      github: ["logo", "version control"],
      gitlab: ["logo", "version control"],
      globe: ["world", "browser", "language", "translate"],
      "hard-drive": ["computer", "server", "memory", "data"],
      hash: ["hashtag", "number", "pound"],
      headphones: ["music", "audio", "sound"],
      heart: ["like", "love", "emotion"],
      "help-circle": ["question mark"],
      hexagon: ["shape", "node.js", "logo"],
      home: ["house", "living"],
      image: ["picture"],
      inbox: ["email"],
      instagram: ["logo", "camera"],
      key: ["password", "login", "authentication", "secure"],
      layers: ["stack"],
      layout: ["window", "webpage"],
      "life-bouy": ["help", "life ring", "support"],
      link: ["chain", "url"],
      "link-2": ["chain", "url"],
      linkedin: ["logo", "social media"],
      list: ["options"],
      lock: ["security", "password", "secure"],
      "log-in": ["sign in", "arrow", "enter"],
      "log-out": ["sign out", "arrow", "exit"],
      mail: ["email", "message"],
      "map-pin": ["location", "navigation", "travel", "marker"],
      map: ["location", "navigation", "travel"],
      maximize: ["fullscreen"],
      "maximize-2": ["fullscreen", "arrows", "expand"],
      meh: ["emoji", "face", "neutral", "emotion"],
      menu: ["bars", "navigation", "hamburger"],
      "message-circle": ["comment", "chat"],
      "message-square": ["comment", "chat"],
      "mic-off": ["record", "sound", "mute"],
      mic: ["record", "sound", "listen"],
      minimize: ["exit fullscreen", "close"],
      "minimize-2": ["exit fullscreen", "arrows", "close"],
      minus: ["subtract"],
      monitor: ["tv", "screen", "display"],
      moon: ["dark", "night"],
      "more-horizontal": ["ellipsis"],
      "more-vertical": ["ellipsis"],
      "mouse-pointer": ["arrow", "cursor"],
      move: ["arrows"],
      music: ["note"],
      navigation: ["location", "travel"],
      "navigation-2": ["location", "travel"],
      octagon: ["stop"],
      package: ["box", "container"],
      paperclip: ["attachment"],
      pause: ["music", "stop"],
      "pause-circle": ["music", "audio", "stop"],
      "pen-tool": ["vector", "drawing"],
      percent: ["discount"],
      "phone-call": ["ring"],
      "phone-forwarded": ["call"],
      "phone-incoming": ["call"],
      "phone-missed": ["call"],
      "phone-off": ["call", "mute"],
      "phone-outgoing": ["call"],
      phone: ["call"],
      play: ["music", "start"],
      "pie-chart": ["statistics", "diagram"],
      "play-circle": ["music", "start"],
      plus: ["add", "new"],
      "plus-circle": ["add", "new"],
      "plus-square": ["add", "new"],
      pocket: ["logo", "save"],
      power: ["on", "off"],
      printer: ["fax", "office", "device"],
      radio: ["signal"],
      "refresh-cw": ["synchronise", "arrows"],
      "refresh-ccw": ["arrows"],
      repeat: ["loop", "arrows"],
      rewind: ["music"],
      "rotate-ccw": ["arrow"],
      "rotate-cw": ["arrow"],
      rss: ["feed", "subscribe"],
      save: ["floppy disk"],
      scissors: ["cut"],
      search: ["find", "magnifier", "magnifying glass"],
      send: ["message", "mail", "email", "paper airplane", "paper aeroplane"],
      settings: ["cog", "edit", "gear", "preferences"],
      "share-2": ["network", "connections"],
      shield: ["security", "secure"],
      "shield-off": ["security", "insecure"],
      "shopping-bag": ["ecommerce", "cart", "purchase", "store"],
      "shopping-cart": ["ecommerce", "cart", "purchase", "store"],
      shuffle: ["music"],
      "skip-back": ["music"],
      "skip-forward": ["music"],
      slack: ["logo"],
      slash: ["ban", "no"],
      sliders: ["settings", "controls"],
      smartphone: ["cellphone", "device"],
      smile: ["emoji", "face", "happy", "good", "emotion"],
      speaker: ["audio", "music"],
      star: ["bookmark", "favorite", "like"],
      "stop-circle": ["media", "music"],
      sun: ["brightness", "weather", "light"],
      sunrise: ["weather", "time", "morning", "day"],
      sunset: ["weather", "time", "evening", "night"],
      tablet: ["device"],
      tag: ["label"],
      target: ["logo", "bullseye"],
      terminal: ["code", "command line", "prompt"],
      thermometer: ["temperature", "celsius", "fahrenheit", "weather"],
      "thumbs-down": ["dislike", "bad", "emotion"],
      "thumbs-up": ["like", "good", "emotion"],
      "toggle-left": ["on", "off", "switch"],
      "toggle-right": ["on", "off", "switch"],
      tool: ["settings", "spanner"],
      trash: ["garbage", "delete", "remove", "bin"],
      "trash-2": ["garbage", "delete", "remove", "bin"],
      triangle: ["delta"],
      truck: ["delivery", "van", "shipping", "transport", "lorry"],
      tv: ["television", "stream"],
      twitch: ["logo"],
      twitter: ["logo", "social"],
      type: ["text"],
      umbrella: ["rain", "weather"],
      unlock: ["security"],
      "user-check": ["followed", "subscribed"],
      "user-minus": ["delete", "remove", "unfollow", "unsubscribe"],
      "user-plus": ["new", "add", "create", "follow", "subscribe"],
      "user-x": ["delete", "remove", "unfollow", "unsubscribe", "unavailable"],
      user: ["person", "account"],
      users: ["group"],
      "video-off": ["camera", "movie", "film"],
      video: ["camera", "movie", "film"],
      voicemail: ["phone"],
      volume: ["music", "sound", "mute"],
      "volume-1": ["music", "sound"],
      "volume-2": ["music", "sound"],
      "volume-x": ["music", "sound", "mute"],
      watch: ["clock", "time"],
      "wifi-off": ["disabled"],
      wifi: ["connection", "signal", "wireless"],
      wind: ["weather", "air"],
      "x-circle": ["cancel", "close", "delete", "remove", "times", "clear"],
      "x-octagon": ["delete", "stop", "alert", "warning", "times", "clear"],
      "x-square": ["cancel", "close", "delete", "remove", "times", "clear"],
      x: ["cancel", "close", "delete", "remove", "times", "clear"],
      youtube: ["logo", "video", "play"],
      "zap-off": ["flash", "camera", "lightning"],
      zap: ["flash", "camera", "lightning"],
      "zoom-in": ["magnifying glass"],
      "zoom-out": ["magnifying glass"]
    };
  }, function (e) {
    e.exports = {
      activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',
      airplay: '<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon>',
      "alert-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
      "alert-octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
      "alert-triangle": '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',
      "align-center": '<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>',
      "align-justify": '<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>',
      "align-left": '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>',
      "align-right": '<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>',
      anchor: '<circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>',
      aperture: '<circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>',
      archive: '<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>',
      "arrow-down-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line>',
      "arrow-down-left": '<line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline>',
      "arrow-down-right": '<line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline>',
      "arrow-down": '<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>',
      "arrow-left-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line>',
      "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>',
      "arrow-right-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>',
      "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
      "arrow-up-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line>',
      "arrow-up-left": '<line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline>',
      "arrow-up-right": '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>',
      "arrow-up": '<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>',
      "at-sign": '<circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>',
      award: '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
      "bar-chart-2": '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',
      "bar-chart": '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>',
      "battery-charging": '<path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline>',
      battery: '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>',
      "bell-off": '<path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
      bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',
      bluetooth: '<polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>',
      bold: '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>',
      "book-open": '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
      bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>',
      box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
      briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
      calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
      "camera-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path>',
      camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>',
      cast: '<path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2.01" y2="20"></line>',
      "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
      "check-square": '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
      check: '<polyline points="20 6 9 17 4 12"></polyline>',
      "chevron-down": '<polyline points="6 9 12 15 18 9"></polyline>',
      "chevron-left": '<polyline points="15 18 9 12 15 6"></polyline>',
      "chevron-right": '<polyline points="9 18 15 12 9 6"></polyline>',
      "chevron-up": '<polyline points="18 15 12 9 6 15"></polyline>',
      "chevrons-down": '<polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>',
      "chevrons-left": '<polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>',
      "chevrons-right": '<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>',
      "chevrons-up": '<polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>',
      chrome: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>',
      circle: '<circle cx="12" cy="12" r="10"></circle>',
      clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>',
      clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
      "cloud-drizzle": '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>',
      "cloud-lightning": '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>',
      "cloud-off": '<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
      "cloud-rain": '<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>',
      "cloud-snow": '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>',
      cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>',
      code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
      codepen: '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>',
      codesandbox: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
      coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>',
      columns: '<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>',
      command: '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>',
      compass: '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>',
      copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
      "corner-down-left": '<polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path>',
      "corner-down-right": '<polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>',
      "corner-left-down": '<polyline points="14 15 9 20 4 15"></polyline><path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>',
      "corner-left-up": '<polyline points="14 9 9 4 4 9"></polyline><path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>',
      "corner-right-down": '<polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>',
      "corner-right-up": '<polyline points="10 9 15 4 20 9"></polyline><path d="M4 20h7a4 4 0 0 0 4-4V4"></path>',
      "corner-up-left": '<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>',
      "corner-up-right": '<polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>',
      cpu: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>',
      "credit-card": '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
      crop: '<path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>',
      crosshair: '<circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line>',
      database: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>',
      delete: '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line>',
      disc: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>',
      "divide-circle": '<line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line><circle cx="12" cy="12" r="10"></circle>',
      "divide-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line>',
      divide: '<circle cx="12" cy="6" r="2"></circle><line x1="5" y1="12" x2="19" y2="12"></line><circle cx="12" cy="18" r="2"></circle>',
      "dollar-sign": '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
      "download-cloud": '<polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>',
      download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>',
      dribbble: '<circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>',
      droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',
      "edit-2": '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>',
      "edit-3": '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>',
      edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>',
      "external-link": '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>',
      "eye-off": '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
      eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
      facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>',
      "fast-forward": '<polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon>',
      feather: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>',
      figma: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>',
      "file-minus": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line>',
      "file-plus": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line>',
      "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
      file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>',
      film: '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>',
      filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>',
      flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>',
      "folder-minus": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="14" x2="15" y2="14"></line>',
      "folder-plus": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>',
      folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
      framer: '<path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>',
      frown: '<circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',
      gift: '<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>',
      "git-branch": '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>',
      "git-commit": '<circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line>',
      "git-merge": '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path>',
      "git-pull-request": '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line>',
      github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
      gitlab: '<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>',
      globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
      grid: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
      "hard-drive": '<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>',
      hash: '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>',
      headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>',
      heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
      "help-circle": '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>',
      hexagon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>',
      home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
      image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>',
      inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>',
      info: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
      instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
      italic: '<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>',
      key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>',
      layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
      layout: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
      "life-buoy": '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>',
      "link-2": '<path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line>',
      link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
      linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
      list: '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>',
      loader: '<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>',
      lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
      "log-in": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>',
      "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>',
      mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
      "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
      map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>',
      "maximize-2": '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>',
      maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>',
      meh: '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',
      menu: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
      "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
      "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
      "mic-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>',
      mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>',
      "minimize-2": '<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line>',
      minimize: '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>',
      "minus-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>',
      "minus-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line>',
      minus: '<line x1="5" y1="12" x2="19" y2="12"></line>',
      monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
      moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>',
      "more-horizontal": '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',
      "more-vertical": '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>',
      "mouse-pointer": '<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path>',
      move: '<polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line>',
      music: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>',
      "navigation-2": '<polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>',
      navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>',
      octagon: '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>',
      package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
      paperclip: '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>',
      "pause-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line>',
      pause: '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>',
      "pen-tool": '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>',
      percent: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
      "phone-call": '<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
      "phone-forwarded": '<polyline points="19 1 23 5 19 9"></polyline><line x1="15" y1="5" x2="23" y2="5"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
      "phone-incoming": '<polyline points="16 2 16 8 22 8"></polyline><line x1="23" y1="1" x2="16" y2="8"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
      "phone-missed": '<line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
      "phone-off": '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line>',
      "phone-outgoing": '<polyline points="23 7 23 1 17 1"></polyline><line x1="16" y1="8" x2="23" y2="1"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
      phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
      "pie-chart": '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>',
      "play-circle": '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>',
      play: '<polygon points="5 3 19 12 5 21 5 3"></polygon>',
      "plus-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',
      "plus-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',
      plus: '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',
      pocket: '<path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path><polyline points="8 10 12 14 16 10"></polyline>',
      power: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>',
      printer: '<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>',
      radio: '<circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>',
      "refresh-ccw": '<polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>',
      "refresh-cw": '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>',
      repeat: '<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>',
      rewind: '<polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon>',
      "rotate-ccw": '<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>',
      "rotate-cw": '<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>',
      rss: '<path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>',
      save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>',
      scissors: '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>',
      search: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
      send: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>',
      server: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>',
      settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
      "share-2": '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>',
      share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>',
      "shield-off": '<path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path><path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
      "shopping-bag": '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',
      "shopping-cart": '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
      shuffle: '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>',
      sidebar: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>',
      "skip-back": '<polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>',
      "skip-forward": '<polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>',
      slack: '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>',
      slash: '<circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>',
      sliders: '<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>',
      smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
      smile: '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',
      speaker: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line>',
      square: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>',
      star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
      "stop-circle": '<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect>',
      sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
      sunrise: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>',
      sunset: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>',
      tablet: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
      tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>',
      target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
      terminal: '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>',
      thermometer: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>',
      "thumbs-down": '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>',
      "thumbs-up": '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>',
      "toggle-left": '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle>',
      "toggle-right": '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="16" cy="12" r="3"></circle>',
      tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>',
      "trash-2": '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>',
      trash: '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',
      trello: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect>',
      "trending-down": '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>',
      "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
      triangle: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>',
      truck: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>',
      tv: '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>',
      twitch: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>',
      twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>',
      type: '<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>',
      umbrella: '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>',
      underline: '<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>',
      unlock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>',
      "upload-cloud": '<polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>',
      upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>',
      "user-check": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>',
      "user-minus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>',
      "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>',
      "user-x": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line>',
      user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
      users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
      "video-off": '<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
      video: '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>',
      voicemail: '<circle cx="5.5" cy="11.5" r="4.5"></circle><circle cx="18.5" cy="11.5" r="4.5"></circle><line x1="5.5" y1="16" x2="18.5" y2="16"></line>',
      "volume-1": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>',
      "volume-2": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>',
      "volume-x": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>',
      volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>',
      watch: '<circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>',
      "wifi-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',
      wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>',
      wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>',
      "x-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
      "x-octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
      "x-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>',
      x: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
      youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>',
      "zap-off": '<polyline points="12.41 6.75 13 2 10.57 4.92"></polyline><polyline points="18.57 12.91 21 10 15.66 10"></polyline><polyline points="8 8 3 14 12 14 11 22 16 16"></polyline><line x1="1" y1="1" x2="23" y2="23"></line>',
      zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
      "zoom-in": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>',
      "zoom-out": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>'
    };
  }, function (e) {
    e.exports = {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    };
  }, function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var i = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        }
      }

      return e;
    },
        o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }

      return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = s(n(22)),
        a = s(n(42));

    function s(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var l = function () {
      function e(t, n) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.name = t, this.contents = n, this.tags = o, this.attrs = i({}, a.default, {
          class: "feather feather-" + t
        });
      }

      return o(e, [{
        key: "toSvg",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return "<svg " + function (e) {
            return Object.keys(e).map(function (t) {
              return t + '="' + e[t] + '"';
            }).join(" ");
          }(i({}, this.attrs, e, {
            class: (0, r.default)(this.attrs.class, e.class)
          })) + ">" + this.contents + "</svg>";
        }
      }, {
        key: "toString",
        value: function value() {
          return this.contents;
        }
      }]), e;
    }();

    t.default = l;
  }, function (e, t, n) {
    "use strict";

    var i = a(n(12)),
        o = a(n(39)),
        r = a(n(38));

    function a(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    e.exports = {
      icons: i.default,
      toSvg: o.default,
      replace: r.default
    };
  }, function (e, t, n) {
    e.exports = n(0);
  }, function (e, t, n) {
    var i = n(2)("iterator"),
        o = !1;

    try {
      var r = 0,
          a = {
        next: function next() {
          return {
            done: !!r++
          };
        },
        return: function _return() {
          o = !0;
        }
      };
      a[i] = function () {
        return this;
      }, Array.from(a, function () {
        throw 2;
      });
    } catch (e) {}

    e.exports = function (e, t) {
      if (!t && !o) return !1;
      var n = !1;

      try {
        var r = {};
        r[i] = function () {
          return {
            next: function next() {
              return {
                done: n = !0
              };
            }
          };
        }, e(r);
      } catch (e) {}

      return n;
    };
  }, function (e, t, n) {
    var i = n(30),
        o = n(2)("toStringTag"),
        r = "Arguments" == i(function () {
      return arguments;
    }());

    e.exports = function (e) {
      var t, n, a;
      return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
        try {
          return e[t];
        } catch (e) {}
      }(t = Object(e), o)) ? n : r ? i(t) : "Object" == (a = i(t)) && "function" == typeof t.callee ? "Arguments" : a;
    };
  }, function (e, t, n) {
    var i = n(47),
        o = n(9),
        r = n(2)("iterator");

    e.exports = function (e) {
      if (null != e) return e[r] || e["@@iterator"] || o[i(e)];
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(18),
        o = n(7),
        r = n(10);

    e.exports = function (e, t, n) {
      var a = i(t);
      a in e ? o.f(e, a, r(0, n)) : e[a] = n;
    };
  }, function (e, t, n) {
    var i = n(2),
        o = n(9),
        r = i("iterator"),
        a = Array.prototype;

    e.exports = function (e) {
      return void 0 !== e && (o.Array === e || a[r] === e);
    };
  }, function (e, t, n) {
    var i = n(3);

    e.exports = function (e, t, n, o) {
      try {
        return o ? t(i(n)[0], n[1]) : t(n);
      } catch (t) {
        var r = e.return;
        throw void 0 !== r && i(r.call(e)), t;
      }
    };
  }, function (e, t) {
    e.exports = function (e) {
      if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
      return e;
    };
  }, function (e, t, n) {
    var i = n(52);

    e.exports = function (e, t, n) {
      if (i(e), void 0 === t) return e;

      switch (n) {
        case 0:
          return function () {
            return e.call(t);
          };

        case 1:
          return function (n) {
            return e.call(t, n);
          };

        case 2:
          return function (n, i) {
            return e.call(t, n, i);
          };

        case 3:
          return function (n, i, o) {
            return e.call(t, n, i, o);
          };
      }

      return function () {
        return e.apply(t, arguments);
      };
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(53),
        o = n(24),
        r = n(51),
        a = n(50),
        s = n(27),
        l = n(49),
        c = n(48);

    e.exports = function (e) {
      var t,
          n,
          u,
          p,
          f = o(e),
          h = "function" == typeof this ? this : Array,
          d = arguments.length,
          g = d > 1 ? arguments[1] : void 0,
          m = void 0 !== g,
          y = 0,
          v = c(f);
      if (m && (g = i(g, d > 2 ? arguments[2] : void 0, 2)), null == v || h == Array && a(v)) for (n = new h(t = s(f.length)); t > y; y++) {
        l(n, y, m ? g(f[y], y) : f[y]);
      } else for (p = v.call(f), n = new h(); !(u = p.next()).done; y++) {
        l(n, y, m ? r(p, g, [u.value, y], !0) : u.value);
      }
      return n.length = y, n;
    };
  }, function (e, t, n) {
    var i = n(32),
        o = n(54);
    i({
      target: "Array",
      stat: !0,
      forced: !n(46)(function (e) {
        Array.from(e);
      })
    }, {
      from: o
    });
  }, function (e, t, n) {
    var i = n(6),
        o = n(3);

    e.exports = function (e, t) {
      if (o(e), !i(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype");
    };
  }, function (e, t, n) {
    var i = n(56);
    e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
      var e,
          t = !1,
          n = {};

      try {
        (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array;
      } catch (e) {}

      return function (n, o) {
        return i(n, o), t ? e.call(n, o) : n.__proto__ = o, n;
      };
    }() : void 0);
  }, function (e, t, n) {
    var i = n(0).document;
    e.exports = i && i.documentElement;
  }, function (e, t, n) {
    var i = n(28),
        o = n(13);

    e.exports = Object.keys || function (e) {
      return i(e, o);
    };
  }, function (e, t, n) {
    var i = n(8),
        o = n(7),
        r = n(3),
        a = n(59);
    e.exports = i ? Object.defineProperties : function (e, t) {
      r(e);

      for (var n, i = a(t), s = i.length, l = 0; s > l;) {
        o.f(e, n = i[l++], t[n]);
      }

      return e;
    };
  }, function (e, t, n) {
    var i = n(3),
        o = n(60),
        r = n(13),
        a = n(15),
        s = n(58),
        l = n(34),
        c = n(16)("IE_PROTO"),
        u = function u() {},
        _p = function p() {
      var e,
          t = l("iframe"),
          n = r.length;

      for (t.style.display = "none", s.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), _p = e.F; n--;) {
        delete _p.prototype[r[n]];
      }

      return _p();
    };

    e.exports = Object.create || function (e, t) {
      var n;
      return null !== e ? (u.prototype = i(e), n = new u(), u.prototype = null, n[c] = e) : n = _p(), void 0 === t ? n : o(n, t);
    }, a[c] = !0;
  }, function (e, t, n) {
    var i = n(4);
    e.exports = !!Object.getOwnPropertySymbols && !i(function () {
      return !String(Symbol());
    });
  }, function (e, t, n) {
    var i = n(4);
    e.exports = !i(function () {
      function e() {}

      return e.prototype.constructor = null, Object.getPrototypeOf(new e()) !== e.prototype;
    });
  }, function (e, t, n) {
    "use strict";

    var i = n(26).IteratorPrototype,
        o = n(61),
        r = n(10),
        a = n(23),
        s = n(9),
        l = function l() {
      return this;
    };

    e.exports = function (e, t, n) {
      var c = t + " Iterator";
      return e.prototype = o(i, {
        next: r(1, n)
      }), a(e, c, !1, !0), s[c] = l, e;
    };
  }, function (e, t, n) {
    var i = n(4),
        o = /#|\.prototype\./,
        r = function r(e, t) {
      var n = s[a(e)];
      return n == c || n != l && ("function" == typeof t ? i(t) : !!t);
    },
        a = r.normalize = function (e) {
      return String(e).replace(o, ".").toLowerCase();
    },
        s = r.data = {},
        l = r.NATIVE = "N",
        c = r.POLYFILL = "P";

    e.exports = r;
  }, function (e, t) {
    t.f = Object.getOwnPropertySymbols;
  }, function (e, t, n) {
    var i = n(21),
        o = Math.max,
        r = Math.min;

    e.exports = function (e, t) {
      var n = i(e);
      return n < 0 ? o(n + t, 0) : r(n, t);
    };
  }, function (e, t, n) {
    var i = n(14),
        o = n(27),
        r = n(67);

    e.exports = function (e) {
      return function (t, n, a) {
        var s,
            l = i(t),
            c = o(l.length),
            u = r(a, c);

        if (e && n != n) {
          for (; c > u;) {
            if ((s = l[u++]) != s) return !0;
          }
        } else for (; c > u; u++) {
          if ((e || u in l) && l[u] === n) return e || u || 0;
        }

        return !e && -1;
      };
    };
  }, function (e, t, n) {
    var i = n(28),
        o = n(13).concat("length", "prototype");

    t.f = Object.getOwnPropertyNames || function (e) {
      return i(e, o);
    };
  }, function (e, t, n) {
    var i = n(0),
        o = n(69),
        r = n(66),
        a = n(3),
        s = i.Reflect;

    e.exports = s && s.ownKeys || function (e) {
      var t = o.f(a(e)),
          n = r.f;
      return n ? t.concat(n(e)) : t;
    };
  }, function (e, t, n) {
    var i = n(1),
        o = n(70),
        r = n(31),
        a = n(7);

    e.exports = function (e, t) {
      for (var n = o(t), s = a.f, l = r.f, c = 0; c < n.length; c++) {
        var u = n[c];
        i(e, u) || s(e, u, l(t, u));
      }
    };
  }, function (e, t, n) {
    var i = n(4),
        o = n(30),
        r = "".split;
    e.exports = i(function () {
      return !Object("z").propertyIsEnumerable(0);
    }) ? function (e) {
      return "String" == o(e) ? r.call(e, "") : Object(e);
    } : Object;
  }, function (e, t, n) {
    "use strict";

    var i = {}.propertyIsEnumerable,
        o = Object.getOwnPropertyDescriptor,
        r = o && !i.call({
      1: 2
    }, 1);
    t.f = r ? function (e) {
      var t = o(this, e);
      return !!t && t.enumerable;
    } : i;
  }, function (e, t, n) {
    "use strict";

    var i = n(32),
        o = n(64),
        r = n(25),
        a = n(57),
        s = n(23),
        l = n(5),
        c = n(29),
        u = n(2),
        p = n(17),
        f = n(9),
        h = n(26),
        d = h.IteratorPrototype,
        g = h.BUGGY_SAFARI_ITERATORS,
        m = u("iterator"),
        y = function y() {
      return this;
    };

    e.exports = function (e, t, n, u, h, v, b) {
      o(n, t, u);

      var x,
          w,
          _,
          k = function k(e) {
        if (e === h && A) return A;
        if (!g && e in S) return S[e];

        switch (e) {
          case "keys":
          case "values":
          case "entries":
            return function () {
              return new n(this, e);
            };
        }

        return function () {
          return new n(this);
        };
      },
          E = t + " Iterator",
          T = !1,
          S = e.prototype,
          C = S[m] || S["@@iterator"] || h && S[h],
          A = !g && C || k(h),
          L = "Array" == t && S.entries || C;

      if (L && (x = r(L.call(new e())), d !== Object.prototype && x.next && (p || r(x) === d || (a ? a(x, d) : "function" != typeof x[m] && l(x, m, y)), s(x, E, !0, !0), p && (f[E] = y))), "values" == h && C && "values" !== C.name && (T = !0, A = function A() {
        return C.call(this);
      }), p && !b || S[m] === A || l(S, m, A), f[t] = A, h) if (w = {
        values: k("values"),
        keys: v ? A : k("keys"),
        entries: k("entries")
      }, b) for (_ in w) {
        !g && !T && _ in S || c(S, _, w[_]);
      } else i({
        target: t,
        proto: !0,
        forced: g || T
      }, w);
      return w;
    };
  }, function (e, t) {
    var n;

    n = function () {
      return this;
    }();

    try {
      n = n || Function("return this")() || (0, eval)("this");
    } catch (e) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
    }

    e.exports = n;
  }, function (e, t, n) {
    var i = n(0),
        o = n(36),
        r = i.WeakMap;
    e.exports = "function" == typeof r && /native code/.test(o.call(r));
  }, function (e, t, n) {
    var i = n(21),
        o = n(20);

    e.exports = function (e, t, n) {
      var r,
          a,
          s = String(o(e)),
          l = i(t),
          c = s.length;
      return l < 0 || l >= c ? n ? "" : void 0 : (r = s.charCodeAt(l)) < 55296 || r > 56319 || l + 1 === c || (a = s.charCodeAt(l + 1)) < 56320 || a > 57343 ? n ? s.charAt(l) : r : n ? s.slice(l, l + 2) : a - 56320 + (r - 55296 << 10) + 65536;
    };
  }, function (e, t, n) {
    "use strict";

    var i = n(77),
        o = n(37),
        r = n(74),
        a = o.set,
        s = o.getterFor("String Iterator");
    r(String, "String", function (e) {
      a(this, {
        type: "String Iterator",
        string: String(e),
        index: 0
      });
    }, function () {
      var e,
          t = s(this),
          n = t.string,
          o = t.index;
      return o >= n.length ? {
        value: void 0,
        done: !0
      } : (e = i(n, o, !0), t.index += e.length, {
        value: e,
        done: !1
      });
    });
  }, function (e, t, n) {
    n(78), n(55);
    var i = n(45);
    e.exports = i.Array.from;
  }, function (e, t, n) {
    n(79), e.exports = n(44);
  }]);
}), function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = function (t, n) {
    return void 0 === n && (n = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), e(n), n;
  } : e(jQuery);
}(function (e) {
  "use strict";

  var t = 0;

  e.fn.TouchSpin = function (n) {
    var i = {
      min: 0,
      max: 100,
      initval: "",
      replacementval: "",
      firstclickvalueifempty: null,
      step: 1,
      decimals: 0,
      stepinterval: 100,
      forcestepdivisibility: "round",
      stepintervaldelay: 500,
      verticalbuttons: !1,
      verticalup: "+",
      verticaldown: "-",
      verticalupclass: "",
      verticaldownclass: "",
      prefix: "",
      postfix: "",
      prefix_extraclass: "",
      postfix_extraclass: "",
      booster: !0,
      boostat: 10,
      maxboostedstep: !1,
      mousewheel: !0,
      buttondown_class: "btn btn-primary",
      buttonup_class: "btn btn-primary",
      buttondown_txt: "-",
      buttonup_txt: "+",
      callback_before_calculation: function callback_before_calculation(e) {
        return e;
      },
      callback_after_calculation: function callback_after_calculation(e) {
        return e;
      }
    },
        o = {
      min: "min",
      max: "max",
      initval: "init-val",
      replacementval: "replacement-val",
      firstclickvalueifempty: "first-click-value-if-empty",
      step: "step",
      decimals: "decimals",
      stepinterval: "step-interval",
      verticalbuttons: "vertical-buttons",
      verticalupclass: "vertical-up-class",
      verticaldownclass: "vertical-down-class",
      forcestepdivisibility: "force-step-divisibility",
      stepintervaldelay: "step-interval-delay",
      prefix: "prefix",
      postfix: "postfix",
      prefix_extraclass: "prefix-extra-class",
      postfix_extraclass: "postfix-extra-class",
      booster: "booster",
      boostat: "boostat",
      maxboostedstep: "max-boosted-step",
      mousewheel: "mouse-wheel",
      buttondown_class: "button-down-class",
      buttonup_class: "button-up-class",
      buttondown_txt: "button-down-txt",
      buttonup_txt: "button-up-txt"
    };
    return this.each(function () {
      var r,
          a,
          s,
          l,
          c,
          u,
          p,
          f,
          h,
          d,
          g = e(this),
          m = g.data(),
          y = 0,
          v = !1;

      function b() {
        "" === r.prefix && (a = c.prefix.detach()), "" === r.postfix && (s = c.postfix.detach());
      }

      function x() {
        var e, t, n;
        "" !== (e = r.callback_before_calculation(g.val())) ? 0 < r.decimals && "." === e || (t = parseFloat(e), isNaN(t) && (t = "" !== r.replacementval ? r.replacementval : 0), (n = t).toString() !== e && (n = t), null !== r.min && t < r.min && (n = r.min), null !== r.max && t > r.max && (n = r.max), n = function (e) {
          switch (r.forcestepdivisibility) {
            case "round":
              return (Math.round(e / r.step) * r.step).toFixed(r.decimals);

            case "floor":
              return (Math.floor(e / r.step) * r.step).toFixed(r.decimals);

            case "ceil":
              return (Math.ceil(e / r.step) * r.step).toFixed(r.decimals);

            default:
              return e.toFixed(r.decimals);
          }
        }(n), Number(e).toString() !== n.toString() && (g.val(n), g.trigger("change"))) : "" !== r.replacementval && (g.val(r.replacementval), g.trigger("change"));
      }

      function w() {
        if (r.booster) {
          var e = Math.pow(2, Math.floor(y / r.boostat)) * r.step;
          return r.maxboostedstep && e > r.maxboostedstep && (e = r.maxboostedstep, u = Math.round(u / e) * e), Math.max(r.step, e);
        }

        return r.step;
      }

      function _() {
        return "number" == typeof r.firstclickvalueifempty ? r.firstclickvalueifempty : (r.min + r.max) / 2;
      }

      function k() {
        x();
        var e,
            t = u = parseFloat(r.callback_before_calculation(c.input.val()));
        isNaN(u) ? u = _() : (e = w(), u += e), null !== r.max && u > r.max && (u = r.max, g.trigger("touchspin.on.max"), C()), c.input.val(r.callback_after_calculation(Number(u).toFixed(r.decimals))), t !== u && g.trigger("change");
      }

      function E() {
        x();
        var e,
            t = u = parseFloat(r.callback_before_calculation(c.input.val()));
        isNaN(u) ? u = _() : (e = w(), u -= e), null !== r.min && u < r.min && (u = r.min, g.trigger("touchspin.on.min"), C()), c.input.val(r.callback_after_calculation(Number(u).toFixed(r.decimals))), t !== u && g.trigger("change");
      }

      function T() {
        C(), y = 0, v = "down", g.trigger("touchspin.on.startspin"), g.trigger("touchspin.on.startdownspin"), h = setTimeout(function () {
          p = setInterval(function () {
            y++, E();
          }, r.stepinterval);
        }, r.stepintervaldelay);
      }

      function S() {
        C(), y = 0, v = "up", g.trigger("touchspin.on.startspin"), g.trigger("touchspin.on.startupspin"), d = setTimeout(function () {
          f = setInterval(function () {
            y++, k();
          }, r.stepinterval);
        }, r.stepintervaldelay);
      }

      function C() {
        switch (clearTimeout(h), clearTimeout(d), clearInterval(p), clearInterval(f), v) {
          case "up":
            g.trigger("touchspin.on.stopupspin"), g.trigger("touchspin.on.stopspin");
            break;

          case "down":
            g.trigger("touchspin.on.stopdownspin"), g.trigger("touchspin.on.stopspin");
        }

        y = 0, v = !1;
      }

      !function () {
        if (!g.data("alreadyinitialized")) g.data("alreadyinitialized", !0), t += 1, g.data("spinnerid", t), g.is("input") ? ("" !== (r = e.extend({}, i, m, function () {
          var t = {};
          return e.each(o, function (e, n) {
            var i = "bts-" + n;
            g.is("[data-" + i + "]") && (t[e] = g.data(i));
          }), t;
        }(), n)).initval && "" === g.val() && g.val(r.initval), x(), function () {
          var t = g.val(),
              n = g.parent();
          "" !== t && (t = r.callback_after_calculation(Number(t).toFixed(r.decimals))), g.data("initvalue", t).val(t), g.addClass("form-control"), n.hasClass("input-group") ? function (t) {
            t.addClass("bootstrap-touchspin");
            var n,
                i,
                o = g.prev(),
                a = g.next(),
                s = '<span class="input-group-addon input-group-prepend bootstrap-touchspin-prefix input-group-prepend bootstrap-touchspin-injected"><span class="input-group-text">' + r.prefix + "</span></span>",
                c = '<span class="input-group-addon input-group-append bootstrap-touchspin-postfix input-group-append bootstrap-touchspin-injected"><span class="input-group-text">' + r.postfix + "</span></span>";
            o.hasClass("input-group-btn") || o.hasClass("input-group-prepend") ? (n = '<button class="' + r.buttondown_class + ' bootstrap-touchspin-down bootstrap-touchspin-injected" type="button">' + r.buttondown_txt + "</button>", o.append(n)) : (n = '<span class="input-group-btn input-group-prepend bootstrap-touchspin-injected"><button class="' + r.buttondown_class + ' bootstrap-touchspin-down" type="button">' + r.buttondown_txt + "</button></span>", e(n).insertBefore(g)), a.hasClass("input-group-btn") || a.hasClass("input-group-append") ? (i = '<button class="' + r.buttonup_class + ' bootstrap-touchspin-up bootstrap-touchspin-injected" type="button">' + r.buttonup_txt + "</button>", a.prepend(i)) : (i = '<span class="input-group-btn input-group-append bootstrap-touchspin-injected"><button class="' + r.buttonup_class + ' bootstrap-touchspin-up" type="button">' + r.buttonup_txt + "</button></span>", e(i).insertAfter(g)), e(s).insertBefore(g), e(c).insertAfter(g), l = t;
          }(n) : function () {
            var t,
                n = "";
            g.hasClass("input-sm") && (n = "input-group-sm"), g.hasClass("input-lg") && (n = "input-group-lg"), t = r.verticalbuttons ? '<div class="input-group ' + n + ' bootstrap-touchspin bootstrap-touchspin-injected"><span class="input-group-addon input-group-prepend bootstrap-touchspin-prefix"><span class="input-group-text">' + r.prefix + '</span></span><span class="input-group-addon bootstrap-touchspin-postfix input-group-append"><span class="input-group-text">' + r.postfix + '</span></span><span class="input-group-btn-vertical"><button class="' + r.buttondown_class + " bootstrap-touchspin-up " + r.verticalupclass + '" type="button">' + r.verticalup + '</button><button class="' + r.buttonup_class + " bootstrap-touchspin-down " + r.verticaldownclass + '" type="button">' + r.verticaldown + "</button></span></div>" : '<div class="input-group bootstrap-touchspin bootstrap-touchspin-injected"><span class="input-group-btn input-group-prepend"><button class="' + r.buttondown_class + ' bootstrap-touchspin-down" type="button">' + r.buttondown_txt + '</button></span><span class="input-group-addon bootstrap-touchspin-prefix input-group-prepend"><span class="input-group-text">' + r.prefix + '</span></span><span class="input-group-addon bootstrap-touchspin-postfix input-group-append"><span class="input-group-text">' + r.postfix + '</span></span><span class="input-group-btn input-group-append"><button class="' + r.buttonup_class + ' bootstrap-touchspin-up" type="button">' + r.buttonup_txt + "</button></span></div>", l = e(t).insertBefore(g), e(".bootstrap-touchspin-prefix", l).after(g), g.hasClass("input-sm") ? l.addClass("input-group-sm") : g.hasClass("input-lg") && l.addClass("input-group-lg");
          }();
        }(), c = {
          down: e(".bootstrap-touchspin-down", l),
          up: e(".bootstrap-touchspin-up", l),
          input: e("input", l),
          prefix: e(".bootstrap-touchspin-prefix", l).addClass(r.prefix_extraclass),
          postfix: e(".bootstrap-touchspin-postfix", l).addClass(r.postfix_extraclass)
        }, b(), g.on("keydown.touchspin", function (e) {
          var t = e.keyCode || e.which;
          38 === t ? ("up" !== v && (k(), S()), e.preventDefault()) : 40 === t && ("down" !== v && (E(), T()), e.preventDefault());
        }), g.on("keyup.touchspin", function (e) {
          var t = e.keyCode || e.which;
          38 !== t && 40 !== t || C();
        }), g.on("blur.touchspin", function () {
          x(), g.val(r.callback_after_calculation(g.val()));
        }), c.down.on("keydown", function (e) {
          var t = e.keyCode || e.which;
          32 !== t && 13 !== t || ("down" !== v && (E(), T()), e.preventDefault());
        }), c.down.on("keyup.touchspin", function (e) {
          var t = e.keyCode || e.which;
          32 !== t && 13 !== t || C();
        }), c.up.on("keydown.touchspin", function (e) {
          var t = e.keyCode || e.which;
          32 !== t && 13 !== t || ("up" !== v && (k(), S()), e.preventDefault());
        }), c.up.on("keyup.touchspin", function (e) {
          var t = e.keyCode || e.which;
          32 !== t && 13 !== t || C();
        }), c.down.on("mousedown.touchspin", function (e) {
          c.down.off("touchstart.touchspin"), g.is(":disabled") || (E(), T(), e.preventDefault(), e.stopPropagation());
        }), c.down.on("touchstart.touchspin", function (e) {
          c.down.off("mousedown.touchspin"), g.is(":disabled") || (E(), T(), e.preventDefault(), e.stopPropagation());
        }), c.up.on("mousedown.touchspin", function (e) {
          c.up.off("touchstart.touchspin"), g.is(":disabled") || (k(), S(), e.preventDefault(), e.stopPropagation());
        }), c.up.on("touchstart.touchspin", function (e) {
          c.up.off("mousedown.touchspin"), g.is(":disabled") || (k(), S(), e.preventDefault(), e.stopPropagation());
        }), c.up.on("mouseup.touchspin mouseout.touchspin touchleave.touchspin touchend.touchspin touchcancel.touchspin", function (e) {
          v && (e.stopPropagation(), C());
        }), c.down.on("mouseup.touchspin mouseout.touchspin touchleave.touchspin touchend.touchspin touchcancel.touchspin", function (e) {
          v && (e.stopPropagation(), C());
        }), c.down.on("mousemove.touchspin touchmove.touchspin", function (e) {
          v && (e.stopPropagation(), e.preventDefault());
        }), c.up.on("mousemove.touchspin touchmove.touchspin", function (e) {
          v && (e.stopPropagation(), e.preventDefault());
        }), g.on("mousewheel.touchspin DOMMouseScroll.touchspin", function (e) {
          if (r.mousewheel && g.is(":focus")) {
            var t = e.originalEvent.wheelDelta || -e.originalEvent.deltaY || -e.originalEvent.detail;
            e.stopPropagation(), e.preventDefault(), (t < 0 ? E : k)();
          }
        }), g.on("touchspin.destroy", function () {
          !function () {
            var t = g.parent();
            C(), g.off(".touchspin"), t.hasClass("bootstrap-touchspin-injected") ? (g.siblings().remove(), g.unwrap()) : (e(".bootstrap-touchspin-injected", t).remove(), t.removeClass("bootstrap-touchspin")), g.data("alreadyinitialized", !1);
          }();
        }), g.on("touchspin.uponce", function () {
          C(), k();
        }), g.on("touchspin.downonce", function () {
          C(), E();
        }), g.on("touchspin.startupspin", function () {
          S();
        }), g.on("touchspin.startdownspin", function () {
          T();
        }), g.on("touchspin.stopspin", function () {
          C();
        }), g.on("touchspin.updatesettings", function (t, n) {
          !function (t) {
            (function (t) {
              r = e.extend({}, r, t), t.postfix && (0 === g.parent().find(".bootstrap-touchspin-postfix").length && s.insertAfter(g), g.parent().find(".bootstrap-touchspin-postfix .input-group-text").text(t.postfix)), t.prefix && (0 === g.parent().find(".bootstrap-touchspin-prefix").length && a.insertBefore(g), g.parent().find(".bootstrap-touchspin-prefix .input-group-text").text(t.prefix)), b();
            })(t), x();
            var n = c.input.val();
            "" !== n && (n = Number(r.callback_before_calculation(c.input.val())), c.input.val(r.callback_after_calculation(Number(n).toFixed(r.decimals))));
          }(n);
        })) : console.log("Must be an input.");
      }();
    });
  };
});
},{"jquery":"node_modules/jquery/dist/jquery.js","popper.js":"node_modules/popper.js/dist/esm/popper.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58015" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app-assets/vendors/js/vendors.min.js"], null)
//# sourceMappingURL=/vendors.min.ea81ae61.js.map