'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.method = undefined;

var _fetchJsonp = require('fetch-jsonp');

var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

var _lang = require('../lang');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * method插件，用于设置method
 * 
 */

var method = exports.method = function method(_method) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);
            options.method = (0, _lang.lowerCase)(_method);
            if (options.method.indexOf("get") > -1 && options.headers) {
                options.headers = (0, _lang.removeHeader)(headers, 'content-type');
            }
            return options;
        },
        processFetch: function processFetch(options, previous) {
            if (options.method == 'jsonp') {
                return (0, _fetchJsonp2.default)(options.url, options);
            } else {
                return previous(options);
            }
        }
    };
};