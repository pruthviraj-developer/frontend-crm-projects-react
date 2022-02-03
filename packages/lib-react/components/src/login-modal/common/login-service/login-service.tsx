const getParamsObject = (deepLink = '') => {
  if (deepLink.indexOf('?') == -1) {
    return { link: deepLink };
  }
  const hashes = deepLink.slice(deepLink.indexOf('?') + 1).split('&');
  const link = deepLink.slice(0, deepLink.indexOf('?'));
  const object = hashes.reduce((params, hash) => {
    const [key, val] = hash.split('=');
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
  return { ...object, link };
};

const checkIsNumber = (value: number) => {
  return [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105, 8, 9, 13,
  ].includes(value);
};

export const loginService = {
  checkIsNumber,
  getParamsObject,
};
