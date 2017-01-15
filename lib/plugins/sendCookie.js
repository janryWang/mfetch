"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * sendCookie插件，用于设置credentials
 *
 */

var sendCookie = exports.sendCookie = function sendCookie(credentials) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);
            options.credentials = credentials;
            return options;
        }
    };
};