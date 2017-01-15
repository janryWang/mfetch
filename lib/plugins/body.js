'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.body = undefined;

var _lang = require('../lang');

/**
 * 
 * body插件，用于设置body
 * 
 */

var body = exports.body = function body(_body) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);
            switch ((0, _lang.getMethod)(options)) {
                case 'get':
                case 'head':
                    return options;
                default:
                    options.body = _body;
                    return options;
            }
        }
    };
};