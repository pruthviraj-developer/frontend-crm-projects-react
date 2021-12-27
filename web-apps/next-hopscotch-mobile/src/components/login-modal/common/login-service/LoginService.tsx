const getParamsObject = (deepLink = '') => {
  if (deepLink.indexOf('?') == -1) {
    return { link: deepLink };
  }
  let hashes = deepLink.slice(deepLink.indexOf('?') + 1).split('&');
  let link = deepLink.slice(0, deepLink.indexOf('?'));
  let object = hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=');
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
  return { ...object, link };
};

export const LoginService = {
  getParamsObject,
};
