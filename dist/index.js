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
var isIter = exports.isIter = function isIter(obj) {
  return isArr(obj) || isObj(obj);
};
});

unwrapExports(__moduleExports);

var __moduleExports$1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lowerCase = exports.compose = exports.reduce = exports.each = exports.extend = exports.isValidThen = exports.isValid = exports.hasOwn = exports.hasOwnProperty = exports.obj = exports.getStr = exports.getFn = exports.noop = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var reduce = exports.reduce = function reduce(target, fn, init) {
    if (!(0, _types.isFn)(fn)) return;
    if ((0, _types.isArr)(target)) return target.reduce(fn, init);else {
        var _ret = function () {
            var result = init;
            each(target, function (value, key) {
                result = fn(result, value, key);
            });
            return {
                v: result
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
};

var compose = exports.compose = function compose() {
    var arguments$1 = arguments;

    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
        fns[_key] = arguments$1[_key];
    }

    return function (payload) {
        var arguments$1 = arguments;

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments$1[_key2];
        }

        return reduce(fns, function (buf, fn) {
            return getFn(fn).apply(undefined, [buf].concat(args));
        }, payload);
    };
};

var lowerCase = exports.lowerCase = function lowerCase(str) {
    return getStr(str).toLowerCase();
};
});

unwrapExports(__moduleExports$1);

var _types = __moduleExports;

var _utils = __moduleExports$1;

var index = function createPluginService(Context) {
    var selectors = (0, _utils.obj)();
    var processors = (0, _utils.obj)();
    var cached = (0, _utils.obj)();
    var post_names = (0, _utils.obj)();
    var indexes = [];

    Context = (0, _utils.getFn)(Context);

    function inject(name, processor, fn) {
        if (selectors[name]) {
            return function (payload) {
                var ctx = new Context(payload);
                return selectors[name].call(ctx, payload, (0, _utils.getFn)(fn, payload));
            };
        } else {
            return function (payload) {
                var ctx = new Context(payload);
                return processor.call(ctx, payload, (0, _utils.getFn)(fn, payload));
            };
        }
    }

    function process(name, processor) {
        if ((0, _types.isObj)(name)) {
            (0, _utils.each)(name, function (processor, key) {
                process(key, processor);
            });
        } else {

            name = (0, _utils.lowerCase)(processors[name] ? name : processors['process' + name] ? 'process' + name : name);

            if (!(0, _types.isFn)(processor)) return;

            if (!processors[name]) {
                indexes.push(name);
            }
            processors[name] = inject(name, processor, processors[name]);
        }
    }

    function remove(name) {
        var processor = processors[name];
        delete processor[name];
        return processor;
    }

    function guard(name, selector) {
        if ((0, _types.isStr)(name) && (0, _types.isFn)(selector)) {
            if (!(0, _utils.hasOwn)(selectors, name)) {
                selectors[name] = selector;
            }
        } else {
            (0, _utils.each)(name, function (selector, name) {
                guard(name, selector);
            });
        }
    }

    function getProcessor(name) {
        name = (0, _utils.lowerCase)(name);
        return processors[name] || processors['process' + name];
    }

    function parsePath(path) {
        if (!post_names[path]) {
            post_names[path] = {
                name: ((0, _types.isArr)(path) ? path : path.split(',')).filter(function (name) {
                    return getProcessor(name);
                })
            };
            post_names[path].path = post_names[path].name.join(',');
        }
        return post_names[path];
    }

    function post(path, payload, defaults) {
        if ((0, _types.isStr)(path)) {
            var parsed = parsePath(path);
            var name = parsed.name;
            var new_path = parsed.path;
            if (name.length) {
                processors[new_path] = processors[new_path] || _utils.compose.apply(null, name.map(function (name) {
                    return getProcessor(name);
                }));
                if ((0, _types.isFn)(processors[new_path])) {
                    return processors[new_path](payload);
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

    function all(payload) {
        return (0, _utils.isValid)(payload) && (0, _utils.reduce)(indexes, function (payload, name) {
            return post(name, payload);
        }, payload);
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
        guard: guard,
        process: process,
        remove: remove,
        post: post,
        extension: extension,
        cache: cache,
        all: all
    };

    Context.prototype = (0, _utils.extend)(Context.prototype, api);

    return api;
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
var isFn$1 = isType$1('Function')
var isArr$1 = Array.isArray || isType$1('Array')
var isObj$1 = isType$1('Object')
var isStr$1 = isType$1('String')
var isForm = isType$1('FormData')
var isUndefined = isType$1('Undefined')
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
    if (!isObj$1(object)) {
        throw new TypeError('Argument must be object');
    }

    var form = new FormData();
    var iterator = new RecursiveIterator(object);
    

    var appendToForm = function(path, node, filename) {
        var name = toName(path);
        if (isUndefined(filename)) {
            form.append(name, node);
        } else {
            form.append(name, node, filename);
        }
    };

    iterator.onStepInto = function(ref) {
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

    for(var i = 0, list = iterator; i < list.length; i += 1) {
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

var cleanMs = function (str){
    return lowerCase$1(String(str)).replace(/\s+/ig,'')
}

var contentTypeIs = function (options,target){
    if(!options) return false
    var headers = options.headers;

    if(headers && headers['content-type']){
        target = cleanMs(isArr$1(target) ? target.join('/') : isStr$1(target) ? target : '')
        return headers['content-type'].indexOf(target) > -1
    }

    return false
}

var mergeHeaders = function (oldHeaders,newHeaders){
    oldHeaders = Object.keys(oldHeaders || {}).reduce(function (buf,key){
        buf[cleanMs(key)] = cleanMs(oldHeaders[key])
        return buf
    },{})
    Object.keys(newHeaders || {}).forEach(function (key){
        oldHeaders[cleanMs(key)] = cleanMs(newHeaders[key])
    })
    return oldHeaders
}

var process = function (payload,previous,response){
    return Promise.resolve(previous(payload)).then(function (payload){
        return response(payload)
    })
}

var core = {

    processFetch: function processFetch(options, previous) {
        options = previous(options)
        return fetch(options.url, options)
    },

    processRequest: function processRequest(options, previous) {
        var this$1 = this;

        return process(options, previous,function (options) {
            if (isNumber(options.timeout)) {
                var timeout = options.timeout;
                delete options['timeout']
                return this$1.post('response',
                    new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            reject(new Error(("[serve-fetch Error] request \"" + (options.url) + "\" is timeout!")))
                        }, timeout)
                        this$1.post('fetch', options).then(resolve, reject)
                    })
                )
            }
            return this$1.post('response', this$1.post('fetch', options))
        })

    }
}

var interceptors = {

    request: function request(fn) {
        return {
            processOption: function processOption(options, previous) {
                return process(options, previous, function (options) {
                    return isFn$1(fn) ? fn(options) : options
                })

            }
        }
    },

    response: function response(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                return process(promise, previous, function (payload) {
                    return isFn$1(fn) ? fn(payload) : payload
                })
            }
        }
    }

}

var createInterceptor = function (specs) {
    return Object.keys(specs || {}).reduce(function (buf,key){
        if(interceptors[key] && isFn$1(specs[key])){
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

  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined'
  // error if request timeout
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
    document.getElementsByTagName('head')[0].removeChild(script);
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
      jsonpScript.id = scriptId;
      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

      timeoutId = setTimeout(function () {
        reject(new Error('JSONP request to ' + _url + ' timed out'));

        clearFunction(callbackFunction);
        removeScript(scriptId);
      }, timeout);
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

var __moduleExports$2 = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

/* eslint-disable no-unused-vars */
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
		var test1 = new String('abc');  // eslint-disable-line
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
	} catch (e) {
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

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
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

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

var extract = function (str) {
	return str.split('?')[1] || '';
};

var parse = function (str) {
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

		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (ret[key] === undefined) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}
	});

	return ret;
};

var stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true
	};

	opts = objectAssign(defaults, opts);

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

				if (val2 === null) {
					result.push(encode(key, opts));
				} else {
					result.push(encode(key, opts) + '=' + encode(val2, opts));
				}
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

var index$1 = {
	extract: extract,
	parse: parse,
	stringify: stringify
};

/**
 * 
 * params插件，用于设置params
 * 
 */

var parseUrl = function (url) {
    var ac = document.createElement('a')
    ac.href = url
    return ac
}

var appendUrl = function (url, params) {
    var ac = parseUrl(url)
    ac.search = index$1.stringify(params)
    return ac.href
}

var extractUrl = function (url) {
    return index$1.parse(
        index$1.extract(String(url))
    )
}


var extractParams = function (params) {
    var result = {}
    if(isStr$1(params)){
        return index$1.parse(params)
    } else if(isForm(params)){
        for (var i = 0, list = params.keys(); i < list.length; i += 1) {
            var key = list[i];

            if (!result.hasOwnProperty(key)) {
                result[key] = params.get(key)
            } else {
                result[key] = params.getAll(key)
            }
        }
        return result
    } else if(isObj$1(params)){
        return params
    } else {
        return result
    }
}



var transformParams = function (options,params){

    var is = function (type){ return contentTypeIs(options,type); }

    if(is(['application','json'])){
        return JSON.stringify(params)
    } else if(is(['multipart','formdata'])){
        return json2formdata(params)
    } else if(is(['application','x-www-form-urlencoded'])){
        return index$1.stringify(params)
    }
}

var filterParams = function (params,names){
    return Object.keys(params || {}).reduce(function (buf,key){
        if(names.indexOf(key) == -1){
            buf[key] = params[key]
        }
        return buf
    },{})
}

var pickParams = function (params,names){
    return Object.keys(params || {}).reduce(function (buf,key){
        if(names.indexOf(key) > -1){
            buf[key] = params[key]
        }
        return buf
    },{})
}

var params = function (params) { return ({
    processOption: function processOption(options, previous) {
        options = previous(options)

        var varNames = options.uri ? options.uri.varNames : []

        params = extractParams(params)

        options.url = options.uri ? options.uri.fill(pickParams(params,varNames)) : options.url

        switch (getMethod(options)) {
            case 'get':

            case 'jsonp':

            case 'head':

                var url_params = Object.assign(
                    extractUrl(options.url),
                    filterParams(params,varNames)
                )

                options.url = appendUrl(options.url, url_params)

                return options


            default:

                options.body = transformParams(options,
                    Object.assign(
                        extractParams(options.body),
                        filterParams(params,varNames)
                    )
                )

                return options

        }

    }
}); }

/**
 * 
 * timeout插件，用于设置timeout
 * 
 */

var timeout = function (timeout){ return ({
    processOption: function processOption(options,previous){
        options = previous(options)
        options.timeout = timeout
        return options
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

var url = function (url){ return ({
    processOption: function processOption(options,previous){
        options = previous(options)
        options.url = url
        options.uri = new uriTemplates(String(url))
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
	params: params,
	timeout: timeout,
	url: url,
	credentials: credentials
});

var EXTENSIONS = []


var createParams = function (url, options) {

    if(isStr$1(url)){
        options = Object.assign(
            { url: url },
            options
        ) 
    } else if(isObj$1(url)){
        options = Object.assign(
            url,
            options
        ) 
    }

    return Object.keys(options).reduce(function (buf, key) {
        if (plugins[key]) {
            return buf.concat(plugins[key](options[key]))
        } else {
            console.warn(("[serve-fetch] No " + key + " plugins for serve-fetch!"))
            return buf
        }
    }, [])
}

var http = function (args) {
    var pluginService = index()
    var options = {
        url: '/',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }

    pluginService.extension(core)
    pluginService.extension(args)
    pluginService.extension(EXTENSIONS)

    return pluginService.post('request',
        pluginService.post('afterOption',
            pluginService.post('option',
                pluginService.post('beforeOption', options)
            )
        )
    )
}


var fetch$1 = function (url, options) {
    return http(createParams(url, options))
}

var resource = function (url, options) {
    if (isFn$1(url)) {
        return function (data) { return Promise.resolve(url(data)); }
    }
    var params$$ = createParams(url, options)

    return function (data) {
        return http(params$$.concat(params(data)))
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

exports.fetch = fetch$1;
exports.resource = resource;
exports.extension = extension;
exports.interceptor = interceptor;

Object.defineProperty(exports, '__esModule', { value: true });

})));