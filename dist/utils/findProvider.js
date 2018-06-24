'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findProvider = undefined;

var _providers = require('./providers.json');

var _providers2 = _interopRequireDefault(_providers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHostname = function getHostname(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  }
  return null;
}; // utils -> findProvider

var providers = _providers2.default.map(function (item) {
  var provider_name = item.provider_name,
      provider_url = item.provider_url,
      endpoints = item.endpoints;


  var endpoint = endpoints[0];
  var _endpoint$schemes = endpoint.schemes,
      schemes = _endpoint$schemes === undefined ? [] : _endpoint$schemes,
      url = endpoint.url;


  var hostname = getHostname(url);
  var domain = hostname ? hostname.replace('www.', '') : '';

  return {
    provider_name: provider_name,
    provider_url: provider_url,
    schemes: schemes,
    domain: domain,
    url: url
  };
}).filter(function (item) {
  return item.domain !== '';
});

var findProvider = exports.findProvider = function findProvider(url) {
  var candidates = providers.filter(function (provider) {
    var schemes = provider.schemes,
        domain = provider.domain;

    if (!schemes.length) {
      return url.includes(domain);
    }
    return schemes.some(function (scheme) {
      var reg = new RegExp(scheme.replace(/\*/g, '(.*)'), 'i');
      return url.match(reg);
    });
  });

  return candidates.length > 0 ? candidates[0] : null;
};