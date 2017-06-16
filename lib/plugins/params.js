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

var appendUrl = function appendUrl(_ref) {
    var query_string = _ref.query_string;
    return function (options, url, params) {
        var ac = parseUrl(url);
        ac.search = query_string.stringify(params, options);
        return ac.href;
    };
};

var extractUrl = function extractUrl(_ref2) {
    var query_string = _ref2.query_string;
    return function (options, url) {
        return query_string.parse(query_string.extract(parseUrl(url).search), options);
    };
};

var extractParams = function extractParams(_ref3) {
    var query_string = _ref3.query_string,
        form_data = _ref3.form_data;
    return function (options, params) {
        var result = {};
        if ((0, _lang.isStr)(params)) {
            return query_string.parse(params, options);
        } else if ((0, _lang.isForm)(params)) {
            return form_data.parse(params, options);
        } else if ((0, _lang.isObj)(params)) {
            return params;
        } else {
            return result;
        }
    };
};

var transformParams = function transformParams(_ref4) {
    var query_string = _ref4.query_string,
        form_data = _ref4.form_data;
    return function (options, params) {

        var is = function is(type) {
            return (0, _lang.contentTypeIs)(options, type);
        };

        if (is(['application', 'json'])) {
            return JSON.stringify(params);
        } else if (is(['multipart', 'formdata'])) {
            (0, _lang.removeHeader)(options.headers, 'content-type');
            return form_data.formify(params, options);
        } else if (is(['application', 'x-www-form-urlencoded'])) {
            return query_string.stringify(params, options);
        }
    };
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

var createSerializer = function createSerializer(context, options) {
    return function (method) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return method(context.post('serializer', options)).apply(undefined, args);
    };
};

var params = exports.params = function params(_params) {
    return {
        processSerializer: function processSerializer(options) {
            return {
                query_string: {
                    parse: _queryString2.default.parse,
                    stringify: _queryString2.default.stringify,
                    extract: _queryString2.default.extract
                },
                form_data: {
                    parse: _lang.formdata2json,
                    formify: _lang.json2formdata
                }
            };
        },
        processOption: function processOption(options, previous) {
            options = previous(options);

            var varNames = options.uri ? options.uri.varNames : [];

            var serialize = createSerializer(this, options);

            _params = serialize(extractParams, options, _params);

            options.url = options.uri ? options.uri.fill(pickParams(_params, varNames)) : options.url;

            delete options.uri;

            switch ((0, _lang.getMethod)(options)) {
                case 'get':

                case 'jsonp':

                case 'head':

                    var url_params = Object.assign(serialize(extractUrl, options, options.url), filterParams(_params, varNames));

                    options.url = serialize(appendUrl, options, options.url, url_params);
                    return options;

                default:

                    options.body = serialize(transformParams, options, Object.assign(serialize(extractParams, options, options.body), filterParams(_params, varNames)));

                    return options;

            }
        }
    };
};