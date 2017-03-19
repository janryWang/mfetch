"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * 
 * timeout插件，用于设置mode
 * 
 */

var mode = exports.mode = function mode(_mode) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);
            options.mode = _mode;
            return options;
        }
    };
};