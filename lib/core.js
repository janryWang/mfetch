'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.core = undefined;

var _lang = require('./lang');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var core = exports.core = {
    processFetch: function processFetch(options, previous) {
        options = previous(options);
        this.options = options;
        return window.fetch(options.url, options);
    },
    processRequest: function processRequest(options, previous) {
        var _this = this;

        return (0, _lang.process)(options, previous, function (options) {
            if ((0, _lang.isNumber)(options.timeout)) {
                var timeout = options.timeout;

                delete options['timeout'];

                var abort = void 0;

                var abort_promise = new Promise(function (resolve, reject) {
                    abort = function abort(err) {
                        reject(err);
                    };
                });

                setTimeout(function () {
                    var err = new Error('[MFETCH Error] request "' + options.url + '" is timeout!');
                    err.isTimeout = true;
                    abort(err);
                }, timeout);

                var promise = Promise.race([_this.post('fetch', options), abort_promise]);

                promise.abort = abort;

                return _this.post('response', promise);
            }
            return _this.post('response', _this.post('fetch', options));
        });
    },
    processSerializer: function processSerializer(options) {
        return {
            query_string: {
                parse: _queryString2.default.parse,
                stringify: _queryString2.default.stringify,
                extract: _queryString2.default.extract
            },
            form_data: {
                parse: _lang.formdata2json,
                formify: _lang.json2formdata
            }
        };
    },
    processAfterOption: function processAfterOption(options, previous) {
        options = previous(options);

        var varNames = options.uri ? options.uri.varNames : [];

        var serialize = (0, _lang.createSerializer)(this, options);

        options.params = serialize(_lang.extractParams, options, options.params);

        options.url = options.uri ? options.uri.fill((0, _lang.pickParams)(options.params, varNames)) : options.url;

        delete options.uri;

        switch ((0, _lang.getMethod)(options)) {
            case 'get':

            case 'jsonp':

            case 'head':

                var url_params = Object.assign(serialize(_lang.extractUrl, options, options.url), (0, _lang.filterParams)(options.params, varNames));

                options.url = serialize(_lang.appendUrl, options, options.url, url_params);
                return options;

            default:

                options.body = serialize(_lang.transformParams, options, Object.assign(serialize(_lang.extractParams, options, options.body), (0, _lang.filterParams)(options.params, varNames)));

                return options;

        }
    }
};