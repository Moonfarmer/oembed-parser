// utils -> findProvider

import providerList from './providers.json';

var getHostname = (url) => {
  let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  }
  return null;
};

var providers = providerList.map((item) => {
  let {
    provider_name,
    provider_url,
    endpoints
  } = item;

  let endpoint  = endpoints[0];
  let {
    schemes = [],
    url
  } = endpoint;

  let hostname = getHostname(url);
  let domain = hostname ? hostname.replace('www.', '') : '';

  return {
    provider_name,
    provider_url,
    schemes,
    domain,
    url
  };
}).filter((item) => {
  return item.domain !== '';
});

export const findProvider = (url) => {
  let candidates = providers.filter((provider) => {
    let {
      schemes,
      domain
    } = provider;
    if (!schemes.length) {
      return url.includes(domain);
    }
    return schemes.some((scheme) => {
      let reg = new RegExp(scheme.replace(/\*/g, '(.*)'), 'i');
      return url.match(reg);
    });
  });

  return candidates.length > 0 ? candidates[0] : null;
};
