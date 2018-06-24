// utils -> fetchEmbed

import fetch from 'node-fetch';

export const fetchEmbed = (url, provider, proxy) => {
  return new Promise((resolve, reject) => {
    let {
      provider_name, // eslint-disable-line camelcase
      provider_url, // eslint-disable-line camelcase
      url: resourceUrl,
    } = provider;

    // Construct Oembed request url.  Accomodate for the 'oembed.json' and 'format=json' formats.
    let baseLink = resourceUrl.match(`{format}`)
      ? `${resourceUrl.replace(`{format}`, `json`)}?url=${encodeURIComponent(url)}`
      : `${resourceUrl}?format=json&url=${encodeURIComponent(url)}`;

    // URL encode the entire link if we are passing it to a proxy server.
    // It will be up to the proxy to decode it and make the api call.
    let link = proxy
      ? `${proxy}${encodeURIComponent(baseLink)}`
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
