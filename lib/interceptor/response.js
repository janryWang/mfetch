'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.response = undefined;

var _lang = require('../lang');

var response = exports.response = function response(fn) {
    return {
        processResponse: function processResponse(promise, previous) {
            return (0, _lang.process)(promise, previous, function (payload) {
                return (0, _lang.isFn)(fn) ? fn(payload) : payload;
            });
        }
    };
};