'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchEmbed = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchEmbed = exports.fetchEmbed = function fetchEmbed(url, provider, proxy) {
  return new Promise(function (resolve, reject) {
    var provider_name = provider.provider_name,
        provider_url = provider.provider_url,
        resourceUrl = provider.url;

    // Construct Oembed request url.  Accomodate for the 'oembed.json' and 'format=json' formats.

    var baseLink = resourceUrl.match('{format}') ? resourceUrl.replace('{format}', 'json') + '?url=' + encodeURIComponent(url) : resourceUrl + '?format=json&url=' + encodeURIComponent(url);

    // URL encode the entire link if we are passing it to a proxy server.
    // It will be up to the proxy to decode it and make the api call.
    var link = proxy ? '' + proxy + encodeURIComponent(baseLink) : baseLink;

    return (0, _nodeFetch2.default)(link).then(function (res) {
      return res.json();
    }).then(function (json) {
      json.provider_name = provider_name; // eslint-disable-line camelcase
      json.provider_url = provider_url; // eslint-disable-line camelcase
      return resolve(json);
    }).catch(function (err) {
      return reject(err);
    });
  });
}; // utils -> fetchEmbed