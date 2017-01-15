'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.headers = undefined;

var _lang = require('../lang');

/**
 * 
 * headers插件，用于设置headers
 * 
 */

var headers = exports.headers = function headers(_headers) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);

            options.headers = (0, _lang.mergeHeaders)(options.headers, _headers);

            return options;
        }
    };
};