'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interceptor = exports.extension = exports.resource = exports.patch = exports.fetch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superPlugin = require('super-plugin');

var _core = require('./core');

var _interceptor = require('./interceptor');

var _plugins = require('./plugins');

var plugins = _interopRequireWildcard(_plugins);

var _lang = require('./lang');

var utils = _interopRequireWildcard(_lang);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isFn = utils.isFn,
    isObj = utils.isObj,
    isStr = utils.isStr,
    createSerializer = utils.createSerializer,
    extractParams = utils.extractParams;


var EXTENSIONS = [];

var getOptions = function getOptions(url, options) {
  if (isStr(url) || url instanceof URL) {
    return Object.assign({ url: url }, options);
  } else if (isObj(url)) {
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
    processBeforeOption: function processBeforeOption(options) {
      var serialize = createSerializer(this, options);
      options.params = Object.assign(serialize(extractParams, options, options.params), serialize(extractParams, options, data));
      return options;
    }
  };
};

var http = function http(args, _options) {
  var _options2 = Object.assign({
    url: '/',
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }, _options);
  var pluginService = (0, _superPlugin.createPluginService)(function () {
    function Context() {
      _classCallCheck(this, Context);
    }

    _createClass(Context, [{
      key: 'options',
      value: function options() {
        return _options2;
      }
    }]);

    return Context;
  }());

  if (_options2.data) {
    _options2.params = _options2.data;
  }

  pluginService.extension(_core.core);
  pluginService.extension(args);
  pluginService.extension(EXTENSIONS);
  return pluginService.post('request', pluginService.post('afterOption', pluginService.post('option', pluginService.post('beforeOption', _options2))));
};

var monkey_patch_fetch = void 0;

var fetch = exports.fetch = function fetch(url, _options) {
  var options = getOptions(url, _options);
  if (monkey_patch_fetch) return monkey_patch_fetch(options);
  return http(createParams(options), options);
};

var patch = exports.patch = function patch(fetch) {
  monkey_patch_fetch = fetch;
};

var resource = exports.resource = function resource(url, _options) {
  if (isFn(url)) {
    return function (data) {
      return Promise.resolve(url(data));
    };
  }

  var options = getOptions(url, _options);

  var params = createParams(options);

  return function (data) {
    return http([mergeParams(data)].concat(params), options);
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
Object.assign(module.exports, utils);