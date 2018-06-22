// main

import { isValidURL, findProvider, fetchEmbed } from './utils';

export const extract = (url, proxy) => {
  return new Promise((resolve, reject) => {
    if (!isValidURL(url)) {
      return reject(new Error('Invalid input URL'));
    }
    let p = findProvider(url);
    if (!p) {
      return reject(new Error(`No provider found with given url "${url}"`));
    }
    return resolve(fetchEmbed(url, p, proxy));
  });
};

export const hasProvider = (url) => {
  return findProvider(url) !== null;
};
