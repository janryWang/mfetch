'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.process = exports.mergeHeaders = exports.contentTypeIs = exports.cleanMs = exports.getMethod = exports.lowerCase = exports.isNumber = exports.isNull = exports.isUndefined = exports.isFile = exports.isForm = exports.isIter = exports.isNum = exports.isStr = exports.isObj = exports.isArr = exports.isFn = exports.isType = undefined;
exports.json2formdata = json2formdata;

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

var cleanMs = exports.cleanMs = function cleanMs(str) {
    return lowerCase(String(str)).replace(/\s+/ig, '');
};

var contentTypeIs = exports.contentTypeIs = function contentTypeIs(options, target) {
    if (!options) return false;
    var headers = options.headers;


    if (headers && headers['content-type']) {
        target = cleanMs(isArr(target) ? target.join('/') : isStr(target) ? target : '');
        return headers['content-type'].indexOf(target) > -1;
    }

    return false;
};

var mergeHeaders = exports.mergeHeaders = function mergeHeaders(oldHeaders, newHeaders) {
    oldHeaders = Object.keys(oldHeaders || {}).reduce(function (buf, key) {
        buf[cleanMs(key)] = cleanMs(oldHeaders[key]);
        return buf;
    }, {});
    Object.keys(newHeaders || {}).forEach(function (key) {
        oldHeaders[cleanMs(key)] = cleanMs(newHeaders[key]);
    });
    return oldHeaders;
};

var process = exports.process = function process(payload, previous, response) {
    return Promise.resolve(previous(payload)).then(function (payload) {
        return response(payload);
    });
};