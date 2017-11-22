// utils -> fetchEmbed

var axios = require('axios');

var fetchEmbed = (url, provider) => {
  return new Promise((resolve, reject) => {
    let {
      provider_name,
      provider_url,
      url: resourceUrl
    } = provider;

    let link = `${resourceUrl}?format=json&url=${encodeURIComponent(url)}`;

    return axios.get(link).then((res) => {
      return res.data;
    }).then((data) => {
      data.provider_name = provider_name;
      data.provider_url = provider_url;
      return resolve(data);
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = fetchEmbed;
