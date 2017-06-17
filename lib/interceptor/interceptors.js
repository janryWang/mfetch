'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lang = require('../lang');

exports.default = {
    request: function request(fn) {
        return {
            processOption: function processOption(options, previous) {
                return (0, _lang.process)(options, previous, function (options) {
                    return (0, _lang.isFn)(fn) ? fn(options) : options;
                });
            }
        };
    },
    response: function response(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                return (0, _lang.process)(promise, previous, function (payload) {
                    return (0, _lang.isFn)(fn) ? fn(payload) : payload;
                });
            }
        };
    },
    resolve: function resolve(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                return (0, _lang.process)(promise, previous, function (payload) {
                    return (0, _lang.isFn)(fn) ? fn(payload) : payload;
                });
            }
        };
    },
    reject: function reject(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                return (0, _lang.process)(promise, previous, function (payload) {
                    return payload;
                }, function (payload) {
                    return (0, _lang.isFn)(fn) ? fn(payload) : payload;
                });
            }
        };
    }
};