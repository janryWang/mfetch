"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.url = undefined;

var _uriTemplates = require("uri-templates");

var _uriTemplates2 = _interopRequireDefault(_uriTemplates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * url插件，用于设置Url
 * 
 */

var url = exports.url = function url(_url) {
    return {
        processOption: function processOption(options, previous) {
            options = previous(options);
            options.url = _url;
            if (options.uriTemplate) {
                if (_url instanceof URL) {
                    _url = _url.href;
                } else {
                    _url = String(_url || "");
                }
                options.uri = new _uriTemplates2.default(String(decodeURIComponent(_url)));
                delete options.uriTemplate;
            }
            return options;
        }
    };
};