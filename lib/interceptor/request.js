'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.request = undefined;

var _lang = require('../lang');

var request = exports.request = function request(fn) {
    return {
        processRequest: function processRequest(options, previous) {
            return (0, _lang.process)(options, previous, function (options) {
                return (0, _lang.isFn)(fn) ? fn(options) : options;
            });
        }
    };
};