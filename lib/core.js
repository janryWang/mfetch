'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.core = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lang = require('./lang');

var core = exports.core = {
    processFetch: function processFetch(options, previous) {
        options = previous(options);
        return fetch(options.url, options);
    },
    processRequest: function processRequest(options, previous) {
        var _this = this;

        return (0, _lang.process)(options, previous, function (options) {
            if ((0, _lang.isNumber)(options.timeout)) {
                var _ret = function () {
                    var timeout = options.timeout;

                    delete options['timeout'];
                    return {
                        v: _this.post('response', new Promise(function (resolve, reject) {
                            setTimeout(function () {
                                reject(new Error('[serve-fetch Error] request "' + options.url + '" is timeout!'));
                            }, timeout);
                            _this.post('fetch', options).then(resolve, reject);
                        }))
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
            return _this.post('response', _this.post('fetch', options));
        });
    }
};