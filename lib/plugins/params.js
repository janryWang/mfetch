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

            var serialize = (0, _lang.createSerializer)(this, options);

            _params = serialize(_lang.extractParams, options, _params);

            options.url = options.uri ? options.uri.fill((0, _lang.pickParams)(_params, varNames)) : options.url;

            delete options.uri;

            switch ((0, _lang.getMethod)(options)) {
                case 'get':

                case 'jsonp':

                case 'head':

                    var url_params = Object.assign(serialize(_lang.extractUrl, options, options.url), (0, _lang.filterParams)(_params, varNames));

                    options.url = serialize(_lang.appendUrl, options, options.url, url_params);
                    return options;

                default:

                    options.body = serialize(_lang.transformParams, options, Object.assign(serialize(_lang.extractParams, options, options.body), (0, _lang.filterParams)(_params, varNames)));

                    return options;

            }
        }
    };
};