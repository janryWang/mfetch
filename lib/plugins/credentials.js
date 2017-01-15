'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * credentials插件，用于设置credentials
 *
 */

var credentials = exports.credentials = function credentials(_credentials) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);
            options.credentials = _credentials || 'include';
            return options;
        }
    };
};