'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasProvider = exports.extract = undefined;

var _utils = require('./utils');

var extract = exports.extract = function extract(url, proxy) {
  return new Promise(function (resolve, reject) {
    if (!(0, _utils.isValidURL)(url)) {
      return reject(new Error('Invalid input URL'));
    }
    var p = (0, _utils.findProvider)(url);
    if (!p) {
      return reject(new Error('No provider found with given url "' + url + '"'));
    }
    return resolve((0, _utils.fetchEmbed)(url, p, proxy));
  });
}; // main

var hasProvider = exports.hasProvider = function hasProvider(url) {
  return (0, _utils.findProvider)(url) !== null;
};