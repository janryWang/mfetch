'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createSerializer = exports.pickParams = exports.filterParams = exports.transformParams = exports.extractParams = exports.extractUrl = exports.appendUrl = exports.parseUrl = exports.process = exports.mergeHeaders = exports.contentTypeIs = exports.removeHeader = exports.getHeader = exports.findHeaderKey = exports.hasHeader = exports.getHeaderKeys = exports.header = exports.cleanMs = exports.getMethod = exports.lowerCase = exports.isNumber = exports.isNull = exports.isUndefined = exports.isFile = exports.isForm = exports.isIter = exports.isNum = exports.isStr = exports.isObj = exports.isArr = exports.isFn = exports.isType = undefined;
exports.json2formdata = json2formdata;
exports.formdata2json = formdata2json;

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _recursiveIterator = require('recursive-iterator');

var _recursiveIterator2 = _interopRequireDefault(_recursiveIterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isType = exports.isType = function isType(type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
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
var isForm = exports.isForm = isType('FormData');
var isFile = exports.isFile = isType('File');
var isUndefined = exports.isUndefined = isType('Undefined');
var isNull = exports.isNull = isType('Null');
var isNumber = exports.isNumber = isType('Number');

var lowerCase = exports.lowerCase = function lowerCase(str) {
    return String(str).toLocaleLowerCase();
};

var getMethod = exports.getMethod = function getMethod(options) {
    return lowerCase(options.method);
};

var _window = window,
    FormData = _window.FormData;
var toString = Object.prototype.toString;

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
    var array = path.map(function (part) {
        return '[' + part + ']';
    });
    array[0] = path[0];
    return array.join('');
}

/**
 * Converts object to FormData
 * @param {Object} object
 * @returns {FormData}
 */
function json2formdata(object) {
    if (!isObj(object)) {
        throw new TypeError('Argument must be object');
    }

    var form = new FormData();
    var iterator = new _recursiveIterator2.default(object);

    var appendToForm = function appendToForm(path, node, filename) {
        var name = toName(path);
        if (isUndefined(filename)) {
            form.append(name, node);
        } else {
            form.append(name, node, filename);
        }
    };

    iterator.onStepInto = function (_ref) {
        var parent = _ref.parent,
            node = _ref.node;


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

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = iterator[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref3 = _step.value;
            var node = _ref3.node,
                path = _ref3.path;

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
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return form;
}

function formdata2json(form) {
    var result = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = form.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            if (!result.hasOwnProperty(key)) {
                result[key] = form.get(key);
            } else {
                result[key] = form.getAll(key);
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return result;
}

var cleanMs = exports.cleanMs = function cleanMs(str) {
    return lowerCase(String(str)).replace(/\s+/ig, '');
};

var equalHeader = function equalHeader(key1, key2) {
    return cleanMs(key1) === cleanMs(key2);
};

var header = exports.header = function header(target) {
    return cleanMs(isArr(target) ? target.join('/') : isStr(target) ? target : '');
};

var getHeaderKeys = exports.getHeaderKeys = function getHeaderKeys(headers) {
    return Object.keys(headers || {});
};

var hasHeader = exports.hasHeader = function hasHeader(headers, key) {
    if (!headers) return headers;
    var keys = getHeaderKeys(headers);
    return keys.some(function ($key) {
        return equalHeader($key, key);
    });
};

var findHeaderKey = exports.findHeaderKey = function findHeaderKey(headers, key) {
    if (!headers) return headers;
    var keys = getHeaderKeys(headers);
    for (var i = 0; i < keys.length; i++) {
        var value = headers[keys[i]];
        if (equalHeader(key, keys[i])) {
            return keys[i];
        }
    }
    return '';
};

var getHeader = exports.getHeader = function getHeader(headers, key) {
    if (!headers) return headers;
    return headers[findHeaderKey(headers, key)] || '';
};

var removeHeader = exports.removeHeader = function removeHeader(headers, key) {
    if (!headers) return headers;
    var $key = findHeaderKey(headers, key);
    delete headers[$key];
    return headers;
};

var contentTypeIs = exports.contentTypeIs = function contentTypeIs(options, target) {
    if (!options) return false;
    var headers = options.headers;

    var keys = getHeaderKeys(headers);
    if (hasHeader(headers, 'content-type')) {
        return getHeader(headers, 'content-type').indexOf(header(target)) > -1;
    }

    return false;
};

var mergeHeaders = exports.mergeHeaders = function mergeHeaders(oldHeaders, newHeaders) {
    var oldKeys = getHeaderKeys(oldHeaders);
    var newKeys = getHeaderKeys(newHeaders);
    return newKeys.reduce(function (buf, key) {
        var oldKey = findHeaderKey(buf, key);
        if (oldKey) {
            buf[oldKey] = newHeaders[key];
        }
        return buf;
    }, oldHeaders || {});
};

var process = exports.process = function process(payload, previous, resolve, reject) {
    return Promise.resolve(previous(payload)).then(function (payload) {
        return Promise.resolve(resolve ? resolve(payload) : payload);
    }, function (payload) {
        return Promise.reject(reject ? reject(payload) : payload);
    });
};

var parseUrl = exports.parseUrl = function parseUrl(url) {
    if (url instanceof URL) return url;
    var ac = document.createElement('a');
    ac.href = url;
    return ac;
};

var appendUrl = exports.appendUrl = function appendUrl(_ref4) {
    var query_string = _ref4.query_string;
    return function (options, url, params) {
        var ac = parseUrl(url);
        ac.search = query_string.stringify(params, options);
        return ac.href;
    };
};

var extractUrl = exports.extractUrl = function extractUrl(_ref5) {
    var query_string = _ref5.query_string;
    return function (options, url) {
        return query_string.parse(query_string.extract(parseUrl(url).search), options);
    };
};

var extractParams = exports.extractParams = function extractParams(_ref6) {
    var query_string = _ref6.query_string,
        form_data = _ref6.form_data;
    return function (options, params) {
        var result = {};
        if (isStr(params)) {
            return query_string.parse(params, options);
        } else if (isForm(params)) {
            return form_data.parse(params, options);
        } else if (isObj(params)) {
            return params;
        } else {
            return result;
        }
    };
};

var transformParams = exports.transformParams = function transformParams(_ref7) {
    var query_string = _ref7.query_string,
        form_data = _ref7.form_data;
    return function (options, params) {

        var is = function is(type) {
            return contentTypeIs(options, type);
        };

        if (is(['application', 'json'])) {
            return JSON.stringify(params);
        } else if (is(['multipart', 'formdata']) || is(['multipart', 'form-data'])) {
            removeHeader(options.headers, 'content-type');
            return form_data.formify(params, options);
        } else {
            return query_string.stringify(params, options);
        }
    };
};

var filterParams = exports.filterParams = function filterParams(params, names) {
    return Object.keys(params || {}).reduce(function (buf, key) {
        if (names.indexOf(key) == -1) {
            buf[key] = params[key];
        }
        return buf;
    }, {});
};

var pickParams = exports.pickParams = function pickParams(params, names) {
    return Object.keys(params || {}).reduce(function (buf, key) {
        if (names.indexOf(key) > -1) {
            buf[key] = params[key];
        }
        return buf;
    }, {});
};

var createSerializer = exports.createSerializer = function createSerializer(context, options) {
    return function (method) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return method(context.post('serializer', options)).apply(undefined, args);
    };
};