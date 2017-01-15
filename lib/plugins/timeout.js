"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * 
 * timeout插件，用于设置timeout
 * 
 */

var timeout = exports.timeout = function timeout(_timeout) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);
            options.timeout = _timeout;
            return options;
        }
    };
};