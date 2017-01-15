'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createInterceptor = undefined;

var _lang = require('../lang');

var _interceptors = require('./interceptors');

var _interceptors2 = _interopRequireDefault(_interceptors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createInterceptor = exports.createInterceptor = function createInterceptor(specs) {
    return Object.keys(specs || {}).reduce(function (buf, key) {
        if (_interceptors2.default[key] && (0, _lang.isFn)(specs[key])) {
            return buf.concat(_interceptors2.default[key](specs[key].bind(specs)));
        }

        return buf;
    }, []);
};