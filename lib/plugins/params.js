'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.params = undefined;

var _lang = require('../lang');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * params插件，用于设置params
 * 
 */

var parseUrl = function parseUrl(url) {
    var ac = document.createElement('a');
    ac.href = url;
    return ac;
};

var appendUrl = function appendUrl(url, params) {
    var ac = parseUrl(url);
    ac.search = _queryString2.default.stringify(params);
    return ac.href;
};

var extractUrl = function extractUrl(url) {
    return _queryString2.default.parse(_queryString2.default.extract(String(url)));
};

var extractParams = function extractParams(params) {
    var result = {};
    if ((0, _lang.isStr)(params)) {
        return _queryString2.default.parse(params);
    } else if ((0, _lang.isForm)(params)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = params.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (!result.hasOwnProperty(key)) {
                    result[key] = params.get(key);
                } else {
                    result[key] = params.getAll(key);
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

        return result;
    } else if ((0, _lang.isObj)(params)) {
        return params;
    } else {
        return result;
    }
};

var transformParams = function transformParams(options, params) {

    var is = function is(type) {
        return (0, _lang.contentTypeIs)(options, type);
    };

    if (is(['application', 'json'])) {
        return JSON.stringify(params);
    } else if (is(['multipart', 'formdata'])) {
        return (0, _lang.json2formdata)(params);
    } else if (is(['application', 'x-www-form-urlencoded'])) {
        return _queryString2.default.stringify(params);
    }
};

var filterParams = function filterParams(params, names) {
    return Object.keys(params || {}).reduce(function (buf, key) {
        if (names.indexOf(key) == -1) {
            buf[key] = params[key];
        }
        return buf;
    }, {});
};

var pickParams = function pickParams(params, names) {
    return Object.keys(params || {}).reduce(function (buf, key) {
        if (names.indexOf(key) > -1) {
            buf[key] = params[key];
        }
        return buf;
    }, {});
};

var params = exports.params = function params(_params) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);

            var varNames = options.uri ? options.uri.varNames : [];

            _params = extractParams(_params);

            options.url = options.uri ? options.uri.fill(pickParams(_params, varNames)) : options.url;

            switch ((0, _lang.getMethod)(options)) {
                case 'get':

                case 'jsonp':

                case 'head':

                    var url_params = Object.assign(extractUrl(options.url), filterParams(_params, varNames));

                    options.url = appendUrl(options.url, url_params);

                    return options;

                default:

                    options.body = transformParams(options, Object.assign(extractParams(options.body), filterParams(_params, varNames)));

                    return options;

            }
        }
    };
};