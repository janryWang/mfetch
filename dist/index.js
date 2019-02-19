(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Mfetch = global.Mfetch || {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var __moduleExports = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isType = exports.isType = function isType(type) {
  return function (obj) {
    return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };
};
var isFn = exports.isFn = isType('Function');
var isArr = exports.isArr = Array.isArray || isType('Array');
var isObj = exports.isObj = isType('Object');
var isStr = exports.isStr = isType('String');
var isNum = exports.isNum = isType('Number');
});

unwrapExports(__moduleExports);

var __moduleExports$1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lowerCase = exports.each = exports.extend = exports.isValidThen = exports.isValid = exports.hasOwn = exports.hasOwnProperty = exports.obj = exports.getStr = exports.getFn = exports.noop = undefined;

var _types = __moduleExports;

var noop = exports.noop = function noop(defaults) {
    return function () {
        return defaults;
    };
};

var getFn = exports.getFn = function getFn(fn, defaults) {
    return (0, _types.isFn)(fn) ? fn : noop(defaults);
};

var getStr = exports.getStr = function getStr(str) {
    return (0, _types.isStr)(str) ? str : '';
};

var obj = exports.obj = function obj() {
    return Object.create(null);
};

var hasOwnProperty = exports.hasOwnProperty = Object.prototype.hasOwnProperty;

var hasOwn = exports.hasOwn = function hasOwn(target, key) {
    return hasOwnProperty.call(target, key);
};

var isValid = exports.isValid = function isValid(value) {
    return value !== undefined && value !== null;
};

var isValidThen = exports.isValidThen = function isValidThen(left, right) {
    return isValid(left) ? left : right;
};

var extend = exports.extend = function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
};

var each = exports.each = function each(target, fn) {
    if (!(0, _types.isFn)(fn)) return;
    if ((0, _types.isArr)(target)) {
        for (var i = 0, len = target.length; i < len; i++) {
            if (fn(target[i], i) === false) {
                break;
            }
        }
    } else {
        for (var key in target) {
            if (hasOwn(target, key)) {
                if (fn(target[key], key) === false) {
                    break;
                }
            }
        }
    }
};

var lowerCase = exports.lowerCase = function lowerCase(str) {
    return getStr(str).toLowerCase();
};
});

unwrapExports(__moduleExports$1);

var index = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPluginService = createPluginService;

var _types = __moduleExports;

var _utils = __moduleExports$1;

function createPluginService(Context) {
    var processors = (0, _utils.obj)();
    var cacheName = (0, _utils.obj)();
    Context = Context || (0, _utils.noop)();

    function inject(name, processor, fn) {
        return function (payload) {
            var ctx = new Context(payload);
            var previous = (0, _utils.getFn)(fn, payload);
            if ((0, _types.isFn)(ctx.beforeEach)) ctx.beforeEach(payload);
            var result = processor.call(ctx, payload, previous);
            if ((0, _types.isFn)(ctx.afterEach)) ctx.afterEach(result);
            return result;
        };
    }

    function getProcessName(name) {
        if (cacheName[name]) return cacheName[name];
        cacheName[name] = (0, _utils.lowerCase)(name).replace(/process/i, '');
        return cacheName[name];
    }

    function process(name, processor) {
        if ((0, _types.isObj)(name)) {
            (0, _utils.each)(name, function (processor, key) {
                process(key, processor);
            });
        } else {

            name = getProcessName(name);

            if (!(0, _types.isFn)(processor)) return;

            processors[name] = inject(name, processor, processors[name]);
        }
    }

    function post(name, payload, defaults) {
        if ((0, _types.isStr)(name)) {
            if (name.length) {
                name = getProcessName(name);
                if ((0, _types.isFn)(processors[name])) {
                    return processors[name](payload);
                }
            }
        }
        return (0, _utils.isValidThen)(defaults, payload);
    }

    function cache(name, value) {
        if ((0, _utils.isValid)(value)) {
            cached[name] = value;
        } else {
            return cached[name];
        }
    }

    function extension(exts) {
        if ((0, _types.isArr)(exts)) {
            (0, _utils.each)(exts, function (ext) {
                return extension(ext);
            });
        } else if ((0, _types.isFn)(exts)) {
            exts(api);
        } else {
            process(exts);
        }
    }

    var api = {
        process: process,
        post: post,
        extension: extension,
        cache: cache
    };

    Context.prototype = (0, _utils.extend)(Context.prototype, api);

    return api;
}
});

unwrapExports(index);
var createPluginService = index.createPluginService;

var __moduleExports$2 = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var __moduleExports$3 = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var strictUriEncode = __moduleExports$2;
var objectAssign = __moduleExports$3;

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

var extract = function (str) {
	return str.split('?')[1] || '';
};

var parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

var stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

var index$2 = {
	extract: extract,
	parse: parse,
	stringify: stringify
};

var recursiveIterator = createCommonjsModule(function (module, exports) {
/*
 recursive-iterator v2.0.1
 https://github.com/nervgh/recursive-iterator
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RecursiveIterator"] = factory();
	else
		root["RecursiveIterator"] = factory();
})(commonjsGlobal, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _lang = __webpack_require__(1);
	
	var isObject = _lang.isObject;
	var getKeys = _lang.getKeys;
	
	
	
	// PRIVATE PROPERTIES
	var BYPASS_MODE = "__bypassMode";
	var IGNORE_CIRCULAR = "__ignoreCircular";
	var MAX_DEEP = "__maxDeep";
	var CACHE = "__cache";
	var QUEUE = "__queue";
	var STATE = "__state";
	
	
	var EMPTY_STATE = {};
	
	
	var RecursiveIterator = (function () {
	    /**
	     * @param {Object|Array} root
	     * @param {Number} [bypassMode=0]
	     * @param {Boolean} [ignoreCircular=false]
	     * @param {Number} [maxDeep=100]
	     */
	    function RecursiveIterator(root) {
	        var bypassMode = arguments[1] === undefined ? 0 : arguments[1];
	        var ignoreCircular = arguments[2] === undefined ? false : arguments[2];
	        var maxDeep = arguments[3] === undefined ? 100 : arguments[3];
	        _classCallCheck(this, RecursiveIterator);
	
	        this[BYPASS_MODE] = bypassMode;
	        this[IGNORE_CIRCULAR] = ignoreCircular;
	        this[MAX_DEEP] = maxDeep;
	        this[CACHE] = [];
	        this[QUEUE] = [];
	        this[STATE] = this.getState(undefined, root);
	        this.__makeIterable();
	    }
	
	    _prototypeProperties(RecursiveIterator, null, {
	        next: {
	            /**
	             * @returns {Object}
	             */
	            value: function next() {
	                var _ref = this[STATE] || EMPTY_STATE;
	                var node = _ref.node;
	                var path = _ref.path;
	                var deep = _ref.deep;
	
	
	                if (this[MAX_DEEP] > deep) {
	                    if (this.isNode(node)) {
	                        if (this.isCircular(node)) {
	                            if (this[IGNORE_CIRCULAR]) {} else {
	                                throw new Error("Circular reference");
	                            }
	                        } else {
	                            if (this.onStepInto(this[STATE])) {
	                                var _QUEUE;
	                                var descriptors = this.getStatesOfChildNodes(node, path, deep);
	                                var method = this[BYPASS_MODE] ? "push" : "unshift";
	                                (_QUEUE = this[QUEUE])[method].apply(_QUEUE, _toConsumableArray(descriptors));
	                                this[CACHE].push(node);
	                            }
	                        }
	                    }
	                }
	
	                var value = this[QUEUE].shift();
	                var done = !value;
	
	                this[STATE] = value;
	
	                if (done) this.destroy();
	
	                return { value: value, done: done };
	            },
	            writable: true,
	            configurable: true
	        },
	        destroy: {
	            /**
	             *
	             */
	            value: function destroy() {
	                this[QUEUE].length = 0;
	                this[CACHE].length = 0;
	                this[STATE] = null;
	            },
	            writable: true,
	            configurable: true
	        },
	        isNode: {
	            /**
	             * @param {*} any
	             * @returns {Boolean}
	             */
	            value: function isNode(any) {
	                return isObject(any);
	            },
	            writable: true,
	            configurable: true
	        },
	        isLeaf: {
	            /**
	             * @param {*} any
	             * @returns {Boolean}
	             */
	            value: function isLeaf(any) {
	                return !this.isNode(any);
	            },
	            writable: true,
	            configurable: true
	        },
	        isCircular: {
	            /**
	             * @param {*} any
	             * @returns {Boolean}
	             */
	            value: function isCircular(any) {
	                return this[CACHE].indexOf(any) !== -1;
	            },
	            writable: true,
	            configurable: true
	        },
	        getStatesOfChildNodes: {
	            /**
	             * Returns states of child nodes
	             * @param {Object} node
	             * @param {Array} path
	             * @param {Number} deep
	             * @returns {Array<Object>}
	             */
	            value: function getStatesOfChildNodes(node, path, deep) {
	                var _this = this;
	                return getKeys(node).map(function (key) {
	                    return _this.getState(node, node[key], key, path.concat(key), deep + 1);
	                });
	            },
	            writable: true,
	            configurable: true
	        },
	        getState: {
	            /**
	             * Returns state of node. Calls for each node
	             * @param {Object} [parent]
	             * @param {*} [node]
	             * @param {String} [key]
	             * @param {Array} [path]
	             * @param {Number} [deep]
	             * @returns {Object}
	             */
	            value: function getState(parent, node, key) {
	                var path = arguments[3] === undefined ? [] : arguments[3];
	                var deep = arguments[4] === undefined ? 0 : arguments[4];
	                return { parent: parent, node: node, key: key, path: path, deep: deep };
	            },
	            writable: true,
	            configurable: true
	        },
	        onStepInto: {
	            /**
	             * Callback
	             * @param {Object} state
	             * @returns {Boolean}
	             */
	            value: function onStepInto(state) {
	                return true;
	            },
	            writable: true,
	            configurable: true
	        },
	        __makeIterable: {
	            /**
	             * Only for es6
	             * @private
	             */
	            value: function __makeIterable() {
	                var _this = this;
	                try {
	                    this[Symbol.iterator] = function () {
	                        return _this;
	                    };
	                } catch (e) {}
	            },
	            writable: true,
	            configurable: true
	        }
	    });
	
	    return RecursiveIterator;
	})();
	
	module.exports = RecursiveIterator;
	// skip

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @param {*} any
	 * @returns {Boolean}
	 */
	exports.isObject = isObject;
	/**
	 * @param {*} any
	 * @returns {Boolean}
	 */
	exports.isArrayLike = isArrayLike;
	/**
	 * @param {*} any
	 * @returns {Boolean}
	 */
	exports.isNumber = isNumber;
	/**
	 * @param {Object|Array} object
	 * @returns {Array<String>}
	 */
	exports.getKeys = getKeys;
	function isObject(any) {
	  return any !== null && typeof any === "object";
	}
	/**
	 * @param {*} any
	 * @returns {Boolean}
	 */
	var isArray = exports.isArray = Array.isArray;
	function isArrayLike(any) {
	  if (!isObject(any)) {
	    return false;
	  }if (!("length" in any)) {
	    return false;
	  }var length = any.length;
	  if (!isNumber(length)) {
	    return false;
	  }if (length > 0) {
	    return length - 1 in any;
	  } else {
	    for (var key in any) {
	      return false;
	    }
	  }
	}function isNumber(any) {
	  return typeof any === "number";
	}function getKeys(object) {
	  var keys_ = Object.keys(object);
	  if (isArray(object)) {} else if (isArrayLike(object)) {
	    var index = keys_.indexOf("length");
	    if (index > -1) {
	      keys_.splice(index, 1);
	    }
	    // skip sort
	  } else {
	    // sort
	    keys_ = keys_.sort();
	  }
	  return keys_;
	}
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	// skip sort

/***/ }
/******/ ])
});
;
});

var RecursiveIterator = unwrapExports(recursiveIterator);

var isType$1 = function (type) { return function (obj) { return Object.prototype.toString.call(obj) === ("[object " + type + "]"); }; }
var isFn$2 = isType$1('Function')
var isArr$1 = Array.isArray || isType$1('Array')
var isObj$2 = isType$1('Object')
var isStr$2 = isType$1('String')
var isNum$1 = isType$1('Number')
var isIter = function (obj) { return (isArr$1(obj) || isObj$2(obj)); }
var isForm = isType$1('FormData')
var isFile = isType$1('File')
var isUndefined = isType$1('Undefined')
var isNull = isType$1('Null')
var isNumber = isType$1('Number')


var lowerCase$1 = function (str) { return String(str).toLocaleLowerCase(); }

var getMethod = function (options) { return lowerCase$1(options.method); }

var FormData = window.FormData;
var ref = Object.prototype;
var toString = ref.toString;

/**
 * Returns type of anything
 * @param {Object} any
 * @returns {String}
 */
function getType(any) {
    return toString.call(any).slice(8, -1);
}
/**
 * Converts path to FormData name
 * @param {Array} path
 * @returns {String}
 */
function toName(path) {
    var array = path.map(function (part) { return ("[" + part + "]"); });
    array[0] = path[0];
    return array.join('');
}

/**
 * Converts object to FormData
 * @param {Object} object
 * @returns {FormData}
 */
function json2formdata(object) {
    if (!isObj$2(object)) {
        throw new TypeError('Argument must be object');
    }

    var form = new FormData();
    var iterator = new RecursiveIterator(object);


    var appendToForm = function (path, node, filename) {
        var name = toName(path);
        if (isUndefined(filename)) {
            form.append(name, node);
        } else {
            form.append(name, node, filename);
        }
    };

    iterator.onStepInto = function (ref) {
        var parent = ref.parent;
        var node = ref.node;


        var type = getType(node);
        switch (type) {
            case 'Array':
                return true; // step into
            case 'Object':
                return true; // step into
            case 'FileList':
                return true; // step into
            default:
                return false; // prevent step into
        }
    };

    for (var i = 0, list = iterator; i < list.length; i += 1) {
        var ref = list[i];
        var node = ref.node;
        var path = ref.path;

        var type = getType(node);
        switch (type) {
            case 'Array':
                break;
            case 'Object':
                break;
            case 'FileList':
                break;
            case 'File':
                appendToForm(path, node);
                break;
            case 'Blob':
                appendToForm(path, node, node.name);
                break;
            default:
                appendToForm(path, node);
                break;
        }
    }

    return form;
}

function formdata2json(form) {
    var result = {}
    for (var i = 0, list = form.keys(); i < list.length; i += 1) {
        var key = list[i];

        if (!result.hasOwnProperty(key)) {
            result[key] = form.get(key)
        } else {
            result[key] = form.getAll(key)
        }
    }
    return result
}

var cleanMs = function (str) {
    return lowerCase$1(String(str)).replace(/\s+/ig, '')
}

var equalHeader = function (key1, key2) {
    return cleanMs(key1) === cleanMs(key2)
}

var header = function (target) {
    return cleanMs(isArr$1(target) ? target.join('/') : isStr$2(target) ? target : '')
}

var getHeaderKeys = function (headers) {
    return Object.keys(headers || {})
}

var hasHeader = function (headers, key) {
    if (!headers) return headers
    var keys = getHeaderKeys(headers)
    return keys.some(function ($key) { return equalHeader($key, key); })
}

var findHeaderKey = function (headers, key) {
    if (!headers) return headers
    var keys = getHeaderKeys(headers)
    for (var i = 0; i < keys.length; i++) {
        var value = headers[keys[i]]
        if (equalHeader(key, keys[i])) {
            return keys[i]
        }
    }
    return ''
}



var getHeader = function (headers, key) {
    if (!headers) return headers
    return headers[findHeaderKey(headers, key)] || ''
}

var removeHeader = function (headers, key) {
    if (!headers) return headers
    var $key = findHeaderKey(headers, key)
    delete headers[$key]
    return headers
}

var contentTypeIs = function (options, target) {
    if (!options) return false
    var headers = options.headers;
    var keys = getHeaderKeys(headers)
    if (hasHeader(headers, 'content-type')) {
        return getHeader(headers, 'content-type').indexOf(header(target)) > -1
    }

    return false
}

var mergeHeaders = function (oldHeaders, newHeaders) {
    var oldKeys = getHeaderKeys(oldHeaders)
    var newKeys = getHeaderKeys(newHeaders)
    return newKeys.reduce(function (buf, key) {
        var oldKey = findHeaderKey(buf, key)
        if (oldKey) {
            buf[oldKey] = newHeaders[key]
        } else {
            buf[key] = newHeaders[key]
        }
        return buf
    }, oldHeaders || {})
}

var process = function (payload, previous, resolve, reject) {
    return Promise.resolve(previous(payload)).then(function (payload) {
        return Promise.resolve(resolve ? resolve(payload) : payload)
    }, function (payload) {
        return Promise.reject(reject ? reject(payload) : payload)
    })
}


var parseUrl = function (url) {
    if(url instanceof URL) return url
    var ac = document.createElement('a')
    ac.href = url
    return ac
}

var appendUrl = function (ref) {
    var query_string = ref.query_string;

    return function (options, url, params) {
    var ac = parseUrl(url)
    ac.search = query_string.stringify(params, options)
    return ac.href
};
}

var extractUrl = function (ref) {
    var query_string = ref.query_string;

    return function (options, url) {
    return query_string.parse(
        query_string.extract(parseUrl(url).search),
        options
    )
};
}


var extractParams$1 = function (ref) {
    var query_string = ref.query_string;
    var form_data = ref.form_data;

    return function (options, params) {
    var result = {}
    if (isStr$2(params)) {
        return query_string.parse(params, options)
    } else if (isForm(params)) {
        return form_data.parse(params, options)
    } else if (isObj$2(params)) {
        return params
    } else {
        return result
    }
};
}



var transformParams = function (ref) {
    var query_string = ref.query_string;
    var form_data = ref.form_data;

    return function (options, params) {

    var is = function (type) { return contentTypeIs(options, type); }

    if (is(['application', 'json'])) {
        return JSON.stringify(params)
    } else if (is(['multipart', 'formdata']) || is(['multipart', 'form-data'])) {
        removeHeader(options.headers, 'content-type')
        return form_data.formify(params, options)
    } else {
        return query_string.stringify(params, options)
    }
};
}

var filterParams = function (params, names) {
    return Object.keys(params || {}).reduce(function (buf, key) {
        if (names.indexOf(key) == -1) {
            buf[key] = params[key]
        }
        return buf
    }, {})
}

var pickParams = function (params, names) {
    return Object.keys(params || {}).reduce(function (buf, key) {
        if (names.indexOf(key) > -1) {
            buf[key] = params[key]
        }
        return buf
    }, {})
}

var createSerializer$1 = function (context, options) { return function (method) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    return method(context.post('serializer', options)).apply(void 0, args)
}; }

var utils$1 = Object.freeze({
    isType: isType$1,
    isFn: isFn$2,
    isArr: isArr$1,
    isObj: isObj$2,
    isStr: isStr$2,
    isNum: isNum$1,
    isIter: isIter,
    isForm: isForm,
    isFile: isFile,
    isUndefined: isUndefined,
    isNull: isNull,
    isNumber: isNumber,
    lowerCase: lowerCase$1,
    getMethod: getMethod,
    json2formdata: json2formdata,
    formdata2json: formdata2json,
    cleanMs: cleanMs,
    header: header,
    getHeaderKeys: getHeaderKeys,
    hasHeader: hasHeader,
    findHeaderKey: findHeaderKey,
    getHeader: getHeader,
    removeHeader: removeHeader,
    contentTypeIs: contentTypeIs,
    mergeHeaders: mergeHeaders,
    process: process,
    parseUrl: parseUrl,
    appendUrl: appendUrl,
    extractUrl: extractUrl,
    extractParams: extractParams$1,
    transformParams: transformParams,
    filterParams: filterParams,
    pickParams: pickParams,
    createSerializer: createSerializer$1
});

var core = {

    processFetch: function processFetch(options, previous) {
        options = previous(options)
        this.options = options
        return window.fetch(options.url, options)
    },

    processRequest: function processRequest(options, previous) {
        var this$1 = this;

        return process(options, previous,function (options) {
            if (isNumber(options.timeout)) {
                var timeout = options.timeout;
                delete options['timeout']

                var abort

                var abort_promise = new Promise(function (resolve,reject){
                    abort = function (err){
                        reject(err)
                    }
                })

                setTimeout(function () {
                    var err = new Error(("[MFETCH Error] request \"" + (options.url) + "\" is timeout!"))
                    err.isTimeout = true
                    abort(err)
                }, timeout)

                var promise = Promise.race([
                    this$1.post('fetch', options),
                    abort_promise
                ])

                promise.abort = abort

                return this$1.post('response',promise)
            }
            return this$1.post('response', this$1.post('fetch', options))
        })

    },

    processSerializer: function processSerializer(options) {
        return {
            query_string: {
                parse: index$2.parse,
                stringify: index$2.stringify,
                extract: index$2.extract
            },
            form_data: {
                parse: formdata2json,
                formify: json2formdata
            }
        }
    },

    processAfterOption: function processAfterOption(options, previous) {
        options = previous(options)

        var varNames = options.uri ? options.uri.varNames : []

        var serialize = createSerializer$1(this, options)

        options.params = serialize(extractParams$1, options, options.params)

        options.url = options.uri ? options.uri.fill(pickParams(options.params, varNames)) : options.url

        delete options.uri

        switch (getMethod(options)) {
            case 'get':

            case 'jsonp':

            case 'head':

                var url_params = Object.assign(
                    serialize(extractUrl, options, options.url),
                    filterParams(options.params, varNames)
                )

                options.url = serialize(appendUrl, options, options.url, url_params)
                return options


            default:

                options.body = serialize(transformParams, options,
                    Object.assign(
                        serialize(extractParams$1, options, options.body),
                        filterParams(options.params, varNames)
                    )
                )

                return options

        }

    }
}

var interceptors = {

    request: function request(fn) {
        return {
            processAfterOption: function processAfterOption(options, previous) {
                return Promise.resolve(isFn$2(fn) ? fn(options,this.options) : options).then(function (options){
                    return previous(options)
                })
            }
        }
    },

    response: function response(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                var this$1 = this;

                return process(promise, previous, function (payload) {
                    return isFn$2(fn) ? fn(payload,this$1.options) : payload
                })
            }
        }
    },

    resolve: function resolve(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                var this$1 = this;

                return process(promise, previous, function (payload) {
                    return isFn$2(fn) ? fn(payload,this$1.options) : payload
                })
            }
        }
    },

    reject: function reject(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                var this$1 = this;

                return process(promise, previous, function (payload) { return payload; }, function (payload) {
                    return isFn$2(fn) ? fn(payload,this$1.options) : payload
                })
            }
        }
    }

}

var createInterceptor = function (specs) {
    return Object.keys(specs || {}).reduce(function (buf,key){
        if(interceptors[key] && isFn$2(specs[key])){
            return buf.concat(
                interceptors[key](
                    specs[key].bind(specs)
                )
            )
        }

        return buf
    },[])
}

/**
 * 
 * body插件，用于设置body
 * 
 */

var body = function (body){ return ({
    processOption: function processOption(options,previous){
        options = previous(options)
        switch(getMethod(options)){
            case 'get':
            case 'head':
                return options
            default:
                options.body = body
                return options
        }
    }
}); }

/**
 * 
 * headers插件，用于设置headers
 * 
 */

var headers = function (headers){ return ({
    processOption: function processOption(options,previous){
        options = previous(options)

        options.headers = mergeHeaders(options.headers,headers)

        return options
    }
}); }

var fetchJsonp = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.fetchJsonp = mod.exports;
  }
})(commonjsGlobal, function (exports, module) {
  'use strict';

  var defaultOptions = {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  };

  function generateCallbackFunction() {
    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  function clearFunction(functionName) {
    // IE8 throws an exception when you try to delete a property on window
    // http://stackoverflow.com/a/1824228/751089
    try {
      delete window[functionName];
    } catch (e) {
      window[functionName] = undefined;
    }
  }

  function removeScript(scriptId) {
    var script = document.getElementById(scriptId);
    if (script) {
      document.getElementsByTagName('head')[0].removeChild(script);
    }
  }

  function fetchJsonp(_url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // to avoid param reassign
    var url = _url;
    var timeout = options.timeout || defaultOptions.timeout;
    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

    var timeoutId = undefined;

    return new Promise(function (resolve, reject) {
      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
      var scriptId = jsonpCallback + '_' + callbackFunction;

      window[callbackFunction] = function (response) {
        resolve({
          ok: true,
          // keep consistent with fetch API
          json: function json() {
            return Promise.resolve(response);
          }
        });

        if (timeoutId) clearTimeout(timeoutId);

        removeScript(scriptId);

        clearFunction(callbackFunction);
      };

      // Check if the user set their own params, and if not add a ? to start a list of params
      url += url.indexOf('?') === -1 ? '?' : '&';

      var jsonpScript = document.createElement('script');
      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
      if (options.charset) {
        jsonpScript.setAttribute('charset', options.charset);
      }
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        window[callbackFunction] = function () {
          clearFunction(callbackFunction);
        };
      }, timeout);

      // Caught if got 404/500
      jsonpScript.onerror = function () {
        reject(new Error('JSONP request to ' + _url + ' failed'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    });
  }

  // export as global function
  /*
  let local;
  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }
  local.fetchJsonp = fetchJsonp;
  */

  module.exports = fetchJsonp;
});
});

/**
 * 
 * method插件，用于设置method
 * 
 */

var method = function (method){ return ({
    processOption: function processOption(options,previous){
        options = previous(options)
        options.method = lowerCase$1(method)
        if(options.method.indexOf("get") > -1 && options.headers){
            options.headers = removeHeader(options.headers,'content-type')
        }
        return options
    },

    processFetch: function processFetch(options,previous){
        if(options.method == 'jsonp'){
            return fetchJsonp(options.url,options)
        } else {
            return previous(options)
        }
    }
}); }

var uriTemplates = createCommonjsModule(function (module) {
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define('uri-templates', [], factory);
	} else if (typeof module !== 'undefined' && module.exports){
		module.exports = factory();
	} else {
		global.UriTemplate = factory();
	}
})(commonjsGlobal, function () {
	var uriTemplateGlobalModifiers = {
		"+": true,
		"#": true,
		".": true,
		"/": true,
		";": true,
		"?": true,
		"&": true
	};
	var uriTemplateSuffices = {
		"*": true
	};
	var urlEscapedChars = /[:/&?#]/;

	function notReallyPercentEncode(string) {
		return encodeURI(string).replace(/%25[0-9][0-9]/g, function (doubleEncoded) {
			return "%" + doubleEncoded.substring(3);
		});
	}

	function isPercentEncoded(string) {
		string = string.replace(/%../g, '');
		return encodeURIComponent(string) === string;
	}

	function uriTemplateSubstitution(spec) {
		var modifier = "";
		if (uriTemplateGlobalModifiers[spec.charAt(0)]) {
			modifier = spec.charAt(0);
			spec = spec.substring(1);
		}
		var separator = "";
		var prefix = "";
		var shouldEscape = true;
		var showVariables = false;
		var trimEmptyString = false;
		if (modifier == '+') {
			shouldEscape = false;
		} else if (modifier == ".") {
			prefix = ".";
			separator = ".";
		} else if (modifier == "/") {
			prefix = "/";
			separator = "/";
		} else if (modifier == '#') {
			prefix = "#";
			shouldEscape = false;
		} else if (modifier == ';') {
			prefix = ";";
			separator = ";",
			showVariables = true;
			trimEmptyString = true;
		} else if (modifier == '?') {
			prefix = "?";
			separator = "&",
			showVariables = true;
		} else if (modifier == '&') {
			prefix = "&";
			separator = "&",
			showVariables = true;
		}

		var varNames = [];
		var varList = spec.split(",");
		var varSpecs = [];
		var varSpecMap = {};
		for (var i = 0; i < varList.length; i++) {
			var varName = varList[i];
			var truncate = null;
			if (varName.indexOf(":") != -1) {
				var parts = varName.split(":");
				varName = parts[0];
				truncate = parseInt(parts[1]);
			}
			var suffices = {};
			while (uriTemplateSuffices[varName.charAt(varName.length - 1)]) {
				suffices[varName.charAt(varName.length - 1)] = true;
				varName = varName.substring(0, varName.length - 1);
			}
			var varSpec = {
				truncate: truncate,
				name: varName,
				suffices: suffices
			};
			varSpecs.push(varSpec);
			varSpecMap[varName] = varSpec;
			varNames.push(varName);
		}
		var subFunction = function (valueFunction) {
			var result = "";
			var startIndex = 0;
			for (var i = 0; i < varSpecs.length; i++) {
				var varSpec = varSpecs[i];
				var value = valueFunction(varSpec.name);
				if (value == null || (Array.isArray(value) && value.length == 0) || (typeof value == 'object' && Object.keys(value).length == 0)) {
					startIndex++;
					continue;
				}
				if (i == startIndex) {
					result += prefix;
				} else {
					result += (separator || ",");
				}
				if (Array.isArray(value)) {
					if (showVariables) {
						result += varSpec.name + "=";
					}
					for (var j = 0; j < value.length; j++) {
						if (j > 0) {
							result += varSpec.suffices['*'] ? (separator || ",") : ",";
							if (varSpec.suffices['*'] && showVariables) {
								result += varSpec.name + "=";
							}
						}
						result += shouldEscape ? encodeURIComponent(value[j]).replace(/!/g, "%21") : notReallyPercentEncode(value[j]);
					}
				} else if (typeof value == "object") {
					if (showVariables && !varSpec.suffices['*']) {
						result += varSpec.name + "=";
					}
					var first = true;
					for (var key in value) {
						if (!first) {
							result += varSpec.suffices['*'] ? (separator || ",") : ",";
						}
						first = false;
						result += shouldEscape ? encodeURIComponent(key).replace(/!/g, "%21") : notReallyPercentEncode(key);
						result += varSpec.suffices['*'] ? '=' : ",";
						result += shouldEscape ? encodeURIComponent(value[key]).replace(/!/g, "%21") : notReallyPercentEncode(value[key]);
					}
				} else {
					if (showVariables) {
						result += varSpec.name;
						if (!trimEmptyString || value != "") {
							result += "=";
						}
					}
					if (varSpec.truncate != null) {
						value = value.substring(0, varSpec.truncate);
					}
					result += shouldEscape ? encodeURIComponent(value).replace(/!/g, "%21"): notReallyPercentEncode(value);
				}
			}
			return result;
		};
		var guessFunction = function (stringValue, resultObj, strict) {
			if (prefix) {
				stringValue = stringValue.substring(prefix.length);
			}
			if (varSpecs.length == 1 && varSpecs[0].suffices['*']) {
				var varSpec = varSpecs[0];
				var varName = varSpec.name;
				var arrayValue = varSpec.suffices['*'] ? stringValue.split(separator || ",") : [stringValue];
				var hasEquals = (shouldEscape && stringValue.indexOf('=') != -1);	// There's otherwise no way to distinguish between "{value*}" for arrays and objects
				for (var i = 1; i < arrayValue.length; i++) {
					var stringValue = arrayValue[i];
					if (hasEquals && stringValue.indexOf('=') == -1) {
						// Bit of a hack - if we're expecting "=" for key/value pairs, and values can't contain "=", then assume a value has been accidentally split
						arrayValue[i - 1] += (separator || ",") + stringValue;
						arrayValue.splice(i, 1);
						i--;
					}
				}
				for (var i = 0; i < arrayValue.length; i++) {
					var stringValue = arrayValue[i];
					if (shouldEscape && stringValue.indexOf('=') != -1) {
						hasEquals = true;
					}
					var innerArrayValue = stringValue.split(",");
					if (innerArrayValue.length == 1) {
						arrayValue[i] = innerArrayValue[0];
					} else {
						arrayValue[i] = innerArrayValue;
					}
				}

				if (showVariables || hasEquals) {
					var objectValue = resultObj[varName] || {};
					for (var j = 0; j < arrayValue.length; j++) {
						var innerValue = stringValue;
						if (showVariables && !innerValue) {
							// The empty string isn't a valid variable, so if our value is zero-length we have nothing
							continue;
						}
						if (typeof arrayValue[j] == "string") {
							var stringValue = arrayValue[j];
							var innerVarName = stringValue.split("=", 1)[0];
							var stringValue = stringValue.substring(innerVarName.length + 1);
							if (shouldEscape) {
								if (strict && !isPercentEncoded(stringValue)) {
									return;
								}
								stringValue = decodeURIComponent(stringValue);
							}
							innerValue = stringValue;
						} else {
							var stringValue = arrayValue[j][0];
							var innerVarName = stringValue.split("=", 1)[0];
							var stringValue = stringValue.substring(innerVarName.length + 1);
							if (shouldEscape) {
								if (strict && !isPercentEncoded(stringValue)) {
									return;
								}
								stringValue = decodeURIComponent(stringValue);
							}
							arrayValue[j][0] = stringValue;
							innerValue = arrayValue[j];
						}
						if (shouldEscape) {
							if (strict && !isPercentEncoded(innerVarName)) {
								return;
							}
							innerVarName = decodeURIComponent(innerVarName);
						}

						if (objectValue[innerVarName] !== undefined) {
							if (Array.isArray(objectValue[innerVarName])) {
								objectValue[innerVarName].push(innerValue);
							} else {
								objectValue[innerVarName] = [objectValue[innerVarName], innerValue];
							}
						} else {
							objectValue[innerVarName] = innerValue;
						}
					}
					if (Object.keys(objectValue).length == 1 && objectValue[varName] !== undefined) {
						resultObj[varName] = objectValue[varName];
					} else {
						resultObj[varName] = objectValue;
					}
				} else {
					if (shouldEscape) {
						for (var j = 0; j < arrayValue.length; j++) {
							var innerArrayValue = arrayValue[j];
							if (Array.isArray(innerArrayValue)) {
								for (var k = 0; k < innerArrayValue.length; k++) {
									if (strict && !isPercentEncoded(innerArrayValue[k])) {
										return;
									}
									innerArrayValue[k] = decodeURIComponent(innerArrayValue[k]);
								}
							} else {
								if (strict && !isPercentEncoded(innerArrayValue)) {
									return;
								}
								arrayValue[j] = decodeURIComponent(innerArrayValue);
							}
						}
					}

					if (resultObj[varName] !== undefined) {
						if (Array.isArray(resultObj[varName])) {
							resultObj[varName] = resultObj[varName].concat(arrayValue);
						} else {
							resultObj[varName] = [resultObj[varName]].concat(arrayValue);
						}
					} else {
						if (arrayValue.length == 1 && !varSpec.suffices['*']) {
							resultObj[varName] = arrayValue[0];
						} else {
							resultObj[varName] = arrayValue;
						}
					}
				}
			} else {
				var arrayValue = (varSpecs.length == 1) ? [stringValue] : stringValue.split(separator || ",");
				var specIndexMap = {};
				for (var i = 0; i < arrayValue.length; i++) {
					// Try from beginning
					var firstStarred = 0;
					for (; firstStarred < varSpecs.length - 1 && firstStarred < i; firstStarred++) {
						if (varSpecs[firstStarred].suffices['*']) {
							break;
						}
					}
					if (firstStarred == i) {
						// The first [i] of them have no "*" suffix
						specIndexMap[i] = i;
						continue;
					} else {
						// Try from the end
						for (var lastStarred = varSpecs.length - 1; lastStarred > 0 && (varSpecs.length - lastStarred) < (arrayValue.length - i); lastStarred--) {
							if (varSpecs[lastStarred].suffices['*']) {
								break;
							}
						}
						if ((varSpecs.length - lastStarred) == (arrayValue.length - i)) {
							// The last [length - i] of them have no "*" suffix
							specIndexMap[i] = lastStarred;
							continue;
						}
					}
					// Just give up and use the first one
					specIndexMap[i] = firstStarred;
				}
				for (var i = 0; i < arrayValue.length; i++) {
					var stringValue = arrayValue[i];
					if (!stringValue && showVariables) {
						// The empty string isn't a valid variable, so if our value is zero-length we have nothing
						continue;
					}
					var innerArrayValue = stringValue.split(",");
					var hasEquals = false;

					if (showVariables) {
						var stringValue = innerArrayValue[0]; // using innerArrayValue
						var varName = stringValue.split("=", 1)[0];
						var stringValue = stringValue.substring(varName.length + 1);
						innerArrayValue[0] = stringValue;
						var varSpec = varSpecMap[varName] || varSpecs[0];
					} else {
						var varSpec = varSpecs[specIndexMap[i]];
						var varName = varSpec.name;
					}

					for (var j = 0; j < innerArrayValue.length; j++) {
						if (shouldEscape) {
							if (strict && !isPercentEncoded(innerArrayValue[j])) {
								return;
							}
							innerArrayValue[j] = decodeURIComponent(innerArrayValue[j]);
						}
					}

					if ((showVariables || varSpec.suffices['*'])&& resultObj[varName] !== undefined) {
						if (Array.isArray(resultObj[varName])) {
							resultObj[varName] = resultObj[varName].concat(innerArrayValue);
						} else {
							resultObj[varName] = [resultObj[varName]].concat(innerArrayValue);
						}
					} else {
						if (innerArrayValue.length == 1 && !varSpec.suffices['*']) {
							resultObj[varName] = innerArrayValue[0];
						} else {
							resultObj[varName] = innerArrayValue;
						}
					}
				}
			}
			return 1;
		};
		return {
			varNames: varNames,
			prefix: prefix,
			substitution: subFunction,
			unSubstitution: guessFunction
		};
	}

	function UriTemplate(template) {
		if (!(this instanceof UriTemplate)) {
			return new UriTemplate(template);
		}
		var parts = template.split("{");
		var textParts = [parts.shift()];
		var prefixes = [];
		var substitutions = [];
		var unSubstitutions = [];
		var varNames = [];
		while (parts.length > 0) {
			var part = parts.shift();
			var spec = part.split("}")[0];
			var remainder = part.substring(spec.length + 1);
			var funcs = uriTemplateSubstitution(spec);
			substitutions.push(funcs.substitution);
			unSubstitutions.push(funcs.unSubstitution);
			prefixes.push(funcs.prefix);
			textParts.push(remainder);
			varNames = varNames.concat(funcs.varNames);
		}
		this.fill = function (valueFunction) {
			if (valueFunction && typeof valueFunction !== 'function') {
				var value = valueFunction;
				valueFunction = function (varName) {
					return value[varName];
				};
			}

			var result = textParts[0];
			for (var i = 0; i < substitutions.length; i++) {
				var substitution = substitutions[i];
				result += substitution(valueFunction);
				result += textParts[i + 1];
			}
			return result;
		};
		this.fromUri = function (substituted, options) {
			options = options || {};
			var result = {};
			for (var i = 0; i < textParts.length; i++) {
				var part = textParts[i];
				if (substituted.substring(0, part.length) !== part) {
					return /*undefined*/;
				}
				substituted = substituted.substring(part.length);
				if (i >= textParts.length - 1) {
					// We've run out of input - is there any template left?
					if (substituted == "") {
						break;
					} else {
						return /*undefined*/;
					}
				}

				var prefix = prefixes[i];
				if (prefix && substituted.substring(0, prefix.length) !== prefix) {
					// All values are optional - if we have a prefix and it doesn't match, move along
					continue;
				}

				// Find the next part to un-substitute
				var nextPart = textParts[i + 1];
				var offset = i;
				while (true) {
					if (offset == textParts.length - 2) {
						var endPart = substituted.substring(substituted.length - nextPart.length);
						if (endPart !== nextPart) {
							return /*undefined*/;
						}
						var stringValue = substituted.substring(0, substituted.length - nextPart.length);
						substituted = endPart;
					} else if (nextPart) {
						var nextPartPos = substituted.indexOf(nextPart);
						var stringValue = substituted.substring(0, nextPartPos);
						substituted = substituted.substring(nextPartPos);
					} else if (prefixes[offset + 1]) {
						var nextPartPos = substituted.indexOf(prefixes[offset + 1]);
						if (nextPartPos === -1) nextPartPos = substituted.length;
						var stringValue = substituted.substring(0, nextPartPos);
						substituted = substituted.substring(nextPartPos);
					} else if (textParts.length > offset + 2) {
						// If the separator between this variable and the next is blank (with no prefix), continue onwards
						offset++;
						nextPart = textParts[offset + 1];
						continue;
					} else {
						var stringValue = substituted;
						substituted = "";
					}
					break;
				}
				if (!unSubstitutions[i](stringValue, result, options.strict)) {
					return /*undefined*/;
				}
			}
			return result;
		}
		this.varNames = varNames;
		this.template = template;
	}
	UriTemplate.prototype = {
		toString: function () {
			return this.template;
		},
		fillFromObject: function (obj) {
			return this.fill(obj);
		},
		test: function (uri, options) {
			return !!this.fromUri(uri, options)
		}
	};

	return UriTemplate;
});
});

/**
 * 
 * url插件，用于设置Url
 * 
 */

var url = function (url) { return ({
    processOption: function processOption(options, previous) {
        options = previous(options)
        options.url = url
        if (options.uriTemplate) {
            if(url instanceof URL){
                url = url.href
            } else {
                url = String(url || "")
            }
            options.uri = new uriTemplates(String(decodeURIComponent(url)))
            delete options.uriTemplate
        }
        return options
    }
}); }

/**
 *
 * credentials插件，用于设置credentials
 *
 */

var credentials = function (credentials){ return ({
    processOption: function processOption(options,previous){
        options = previous(options)
        options.credentials = credentials || 'include'
        return options
    }
}); }



var plugins = Object.freeze({
	body: body,
	headers: headers,
	method: method,
	url: url,
	credentials: credentials
});

var isFn = isFn$2;
var isObj = isObj$2;
var isStr = isStr$2;
var createSerializer = createSerializer$1;
var extractParams = extractParams$1;

var EXTENSIONS = []

var getOptions = function (url, options) {
  if (isStr(url) || url instanceof URL) {
    return Object.assign({ url: url }, options)
  } else if (isObj(url)) {
    return Object.assign(url, options)
  }

  return {}
}

var createParams = function (options) {
  return Object.keys(options).reduce(function (buf, key) {
    if (plugins[key]) {
      return buf.concat(plugins[key](options[key]))
    } else {
      return buf
    }
  }, [])
}

var mergeParams = function (data) {
  return {
    processBeforeOption: function processBeforeOption(options) {
      var serialize = createSerializer(this, options)
      options.params = Object.assign(
        serialize(extractParams, options, options.params),
        serialize(extractParams, options, data)
      )
      return options
    }
  }
}

var http = function (args, options) {
  var pluginService = createPluginService(
    (function () {
    function Context () {}

    Context.prototype.options = function options$1 () {
        return options
      };

    return Context;
  }())
  )

  if (options.data) {
    options.params = options.data
  }

  pluginService.extension(core)
  pluginService.extension(args)
  pluginService.extension(EXTENSIONS)
  return pluginService.post(
    'request',
    pluginService.post(
      'afterOption',
      pluginService.post('option', pluginService.post('beforeOption', options))
    )
  )
}

var monkey_patch_fetch

var fetch = function (url, _options) {
  var options = getOptions(
    url,
    Object.assign(
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      },
      _options
    )
  )
  if (monkey_patch_fetch) return monkey_patch_fetch(options)
  return http(createParams(options), options)
}

var patch = function (fetch) {
  monkey_patch_fetch = fetch
}

var resource = function (url, _options) {
  if (isFn(url)) {
    return function (data) { return Promise.resolve(url(data)); }
  }

  var options = getOptions(url, _options)

  var params = createParams(options)

  return function (data) {
    return http([mergeParams(data)].concat(params), options)
  }
}

var extension = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  EXTENSIONS = EXTENSIONS.concat(args)
}

var interceptor = function (specs) {
  EXTENSIONS = EXTENSIONS.concat(createInterceptor(specs))
}
Object.assign(module.exports, utils$1)

exports.fetch = fetch;
exports.patch = patch;
exports.resource = resource;
exports.extension = extension;
exports.interceptor = interceptor;

Object.defineProperty(exports, '__esModule', { value: true });

})));