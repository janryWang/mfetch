'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _body = require('./body');

Object.keys(_body).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _body[key];
    }
  });
});

var _headers = require('./headers');

Object.keys(_headers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _headers[key];
    }
  });
});

var _method = require('./method');

Object.keys(_method).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _method[key];
    }
  });
});

var _url = require('./url');

Object.keys(_url).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _url[key];
    }
  });
});

var _credentials = require('./credentials');

Object.keys(_credentials).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _credentials[key];
    }
  });
});