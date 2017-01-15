'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.interceptor = exports.extension = exports.resource = exports.fetch = undefined;

var _superPlugin = require('super-plugin');

var _superPlugin2 = _interopRequireDefault(_superPlugin);

var _lang = require('./lang');

var _core = require('./core');

var _interceptor = require('./interceptor');

var _plugins = require('./plugins');

var plugins = _interopRequireWildcard(_plugins);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXTENSIONS = [];

var createParams = function createParams(url, options) {

    if ((0, _lang.isStr)(url)) {
        options = Object.assign({ url: url }, options);
    } else if ((0, _lang.isObj)(url)) {
        options = Object.assign(url, options);
    }

    return Object.keys(options).reduce(function (buf, key) {
        if (plugins[key]) {
            return buf.concat(plugins[key](options[key]));
        } else {
            console.warn('[serve-fetch] No ' + key + ' plugins for serve-fetch!');
            return buf;
        }
    }, []);
};

var http = function http(args) {
    var pluginService = (0, _superPlugin2.default)();
    var options = {
        url: '/',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };

    pluginService.extension(_core.core);
    pluginService.extension(args);
    pluginService.extension(EXTENSIONS);

    return pluginService.post('request', pluginService.post('afterOption', pluginService.post('option', pluginService.post('beforeOption', options))));
};

var fetch = exports.fetch = function fetch(url, options) {
    return http(createParams(url, options));
};

var resource = exports.resource = function resource(url, options) {
    if ((0, _lang.isFn)(url)) {
        return function (data) {
            return Promise.resolve(url(data));
        };
    }
    var params = createParams(url, options);

    return function (data) {
        return http(params.concat(plugins.params(data)));
    };
};

var extension = exports.extension = function extension() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    EXTENSIONS = EXTENSIONS.concat(args);
};

var interceptor = exports.interceptor = function interceptor(specs) {
    EXTENSIONS = EXTENSIONS.concat((0, _interceptor.createInterceptor)(specs));
};