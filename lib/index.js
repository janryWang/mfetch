'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.interceptor = exports.extension = exports.resource = exports.fetch = undefined;

var _superPlugin = require('super-plugin');

var _lang = require('./lang');

var _core = require('./core');

var _interceptor = require('./interceptor');

var _plugins = require('./plugins');

var plugins = _interopRequireWildcard(_plugins);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var EXTENSIONS = [];

var getOptions = function getOptions(url, options) {
    if ((0, _lang.isStr)(url)) {
        return Object.assign({ url: url }, options);
    } else if ((0, _lang.isObj)(url)) {
        return Object.assign(url, options);
    }

    return {};
};

var createParams = function createParams(options) {
    return Object.keys(options).reduce(function (buf, key) {
        if (plugins[key]) {
            return buf.concat(plugins[key](options[key]));
        } else {
            return buf;
        }
    }, []);
};

var mergeParams = function mergeParams(data) {
    return {
        processOption: function processOption(options) {
            var serialize = (0, _lang.createSerializer)(this, options);
            options.params = Object.assign(serialize(_lang.extractParams, options, options.params), serialize(_lang.extractParams, options, data));
            return options;
        }
    };
};

var http = function http(args, _options) {
    var pluginService = (0, _superPlugin.createPluginService)();
    var options = Object.assign({
        url: '/',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }, _options);

    pluginService.extension(_core.core);
    pluginService.extension(args);
    pluginService.extension(EXTENSIONS);
    return pluginService.post('request', pluginService.post('afterOption', pluginService.post('option', pluginService.post('beforeOption', options))));
};

var fetch = exports.fetch = function fetch(url, _options) {
    var options = getOptions(url, _options);
    return http(createParams(options), options);
};

var resource = exports.resource = function resource(url, _options) {
    if ((0, _lang.isFn)(url)) {
        return function (data) {
            return Promise.resolve(url(data));
        };
    }

    var options = getOptions(url, _options);

    var params = createParams(options);

    return function (data) {
        params.unshift(mergeParams(data));
        return http(params, options);
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