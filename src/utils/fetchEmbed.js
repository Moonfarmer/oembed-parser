// utils -> fetchEmbed

// Don't require node-fetch if running in the browser
// Require it if running in Node
if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch');
}

const fetchEmbed = (url, provider, proxy) => {
  return new Promise((resolve, reject) => {
    let {
      provider_name, // eslint-disable-line camelcase
      provider_url, // eslint-disable-line camelcase
      url: resourceUrl,
    } = provider;

    // Construct Oembed request url.  Accomodate for the 'oembed.json' and 'format=json' formats.
    let baseLink = resourceUrl.match(`{format}`)
      ? encodeURIComponent(`${resourceUrl.replace(`{format}`, `json`)}?url=${encodeURIComponent(url)}`)
      : encodeURIComponent(`${resourceUrl}?format=json&url=${encodeURIComponent(url)}`);

    let link = proxy
      ? `${proxy}${baseLink}`
      : baseLink;

    return fetch(link).then((res) => {
      return res.json();
    }).then((json) => {
      json.provider_name = provider_name; // eslint-disable-line camelcase
      json.provider_url = provider_url; // eslint-disable-line camelcase
      return resolve(json);
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = fetchEmbed;
