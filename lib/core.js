'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.core = undefined;

var _lang = require('./lang');

var core = exports.core = {
    processFetch: function processFetch(options, previous) {
        options = previous(options);
        return window.fetch(options.url, options);
    },
    processRequest: function processRequest(options, previous) {
        var _this = this;

        return (0, _lang.process)(options, previous, function (options) {
            if ((0, _lang.isNumber)(options.timeout)) {
                var timeout = options.timeout;

                delete options['timeout'];
                return _this.post('response', new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        reject(new Error('[mfetch Error] request "' + options.url + '" is timeout!'));
                    }, timeout);
                    _this.post('fetch', options).then(resolve, reject);
                }));
            }
            return _this.post('response', _this.post('fetch', options));
        });
    }
};