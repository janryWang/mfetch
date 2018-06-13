'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lang = require('../lang');

exports.default = {
    request: function request(fn) {
        return {
            processAfterOption: function processAfterOption(options, previous) {
                return Promise.resolve((0, _lang.isFn)(fn) ? fn(options, this.options) : options).then(function (options) {
                    return previous(options);
                });
            }
        };
    },
    response: function response(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                var _this = this;

                return (0, _lang.process)(promise, previous, function (payload) {
                    return (0, _lang.isFn)(fn) ? fn(payload, _this.options) : payload;
                });
            }
        };
    },
    resolve: function resolve(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                var _this2 = this;

                return (0, _lang.process)(promise, previous, function (payload) {
                    return (0, _lang.isFn)(fn) ? fn(payload, _this2.options) : payload;
                });
            }
        };
    },
    reject: function reject(fn) {
        return {
            processResponse: function processResponse(promise, previous) {
                var _this3 = this;

                return (0, _lang.process)(promise, previous, function (payload) {
                    return payload;
                }, function (payload) {
                    return (0, _lang.isFn)(fn) ? fn(payload, _this3.options) : payload;
                });
            }
        };
    }
};