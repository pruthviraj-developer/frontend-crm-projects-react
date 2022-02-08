import { httpService } from '../http-demand';

const addToWishlist = <P, R>(wishItem: P): Promise<R> => {
  return httpService.post<R>({
    url: '/api/wishlist',
    data: wishItem,
    params: { retryAndShow503Modal: false },
  });
};

const addItemToCart = <P, R>(cartData: P): Promise<R> => {
  return httpService.post<R>({
    url: '/api/shopping-cart/add-product/v2',
    data: cartData,
  });
};

const deleteFromWishlist = <P, R>(wishlistId: P): Promise<R> => {
  // params is added because when api request fails (400), to restrict retry call
  return httpService.delete({
    url: `/api/wishlist/${wishlistId}`,
    params: { retryAndShow503Modal: false },
  });
};

const searchProducts = <P, R>(urlParams: P): Promise<R> => {
  // const suggestedSearchText:strong = urlParams['keyWord'] ? '' : urlParams['searchBy'];
  const params = {
    pageNo: 1,
    pageSize: 72,
    // suggestedSearchText: suggestedSearchText,
    ...urlParams,
  };
  //  canceller ?
  return httpService.get<R>({ url: '/api/search/product/v2', params });
};

const getSimilarProducts = <P, R>(
  productId: string,
  urlParams: P,
  baseURL = ''
): Promise<R> => {
  const params = {
    retryAndShow503Modal: false,
    pageNo: 1,
    pageSize: 12,
    fromPlp: 'boutique',
    ...urlParams,
  };
  let url = `/api/reco/product/${productId}`;
  if (baseURL) url = baseURL + url;
  return httpService.get<R>({ url, params });
};

const getRecommendedProducts = <P, R>(
  productId: string,
  urlParams: P,
  baseURL = ''
): Promise<R> => {
  const params = {
    retryAndShow503Modal: false,
    pageNo: 1,
    pageSize: 12,
    fromPlp: 'boutique',
    ...urlParams,
  };
  let url = `/api/reco/collaborative/product/${productId}`;
  if (baseURL) url = baseURL + url;
  return httpService.get<R>({
    url,
    params,
  });
};

const getProductDetails = <P, R>(
  productId: P,
  baseURL = '',
  headers = {}
): Promise<R> => {
  const params = { currentTime: new Date().getTime() };
  let url = `/api/product/${productId}`;
  if (baseURL) url = baseURL + url;
  return httpService.get<R>({
    url,
    params,
    headers,
  });
};

const getUserInfo = <P, R>(params: P): Promise<R> => {
  const url = '/api/customer/info';
  return httpService.get<R>({ url, params });
};

const getSizes = <P, R>(productId: P, baseURL = ''): Promise<R> => {
  let url = `/api/sizeChart/${productId}`;
  if (baseURL) url = baseURL + url;
  return httpService.get<R>({ url });
};

const signUp = <P, R>(user: P): Promise<R> => {
  return httpService.post<R>({
    url: '/api/customer/signup/send/otp',
    data: user,
  });
};

const sendOtp = <P, R>(user: P): Promise<R> => {
  return httpService.post<R>({
    url: '/api/customer/validate-sendotp',
    data: user,
  });
};

const verifyOtp = <P, R>(user: P): Promise<R> => {
  return httpService.post<R>({
    url: '/api/customer/verifyotp-delegate',
    data: user,
  });
};

const getEulerAutoSuggestions = <R>(keyWord: string): Promise<R> => {
  const url = '/api/search/autoSuggest?query=' + encodeURIComponent(keyWord);
  return httpService.get({ url });
};

const getResouce = <R>(): Promise<R> => {
  const currentDate = new Date();
  const prependZeroIfNecessary = (x: number) => {
    return x > 10 ? x : '0' + x;
  };
  const updateElements = [
    currentDate.getFullYear() - 1,
    prependZeroIfNecessary(currentDate.getMonth() + 1),
    prependZeroIfNecessary(currentDate.getDate()),
  ];
  const params = { updateDate: updateElements.join('') };
  return httpService.get({ url: '/api/resources', params });
};

const checkForPincode = <P, R>(params: P): Promise<R> => {
  return httpService.get<R>({ url: '/api/products/pincode', params });
};

const getCustomerAddresses = <R>(): Promise<R> => {
  return httpService.get<R>({ url: '/api/delivery/addresses' });
};

const getAccountCardsCount = <R>(): Promise<R> => {
  return httpService.get<R>({ url: '/api/accountcard/count' });
};

const postUtmParams = <P, R>(data: P): Promise<R> => {
  return httpService.post<R>({
    url: '/api/utm-info',
    data,
  });
};

export const productDetailsService = {
  signUp,
  sendOtp,
  verifyOtp,
  postUtmParams,
  addItemToCart,
  addToWishlist,
  searchProducts,
  checkForPincode,
  deleteFromWishlist,
  getSizes,
  getResouce,
  getUserInfo,
  getProductDetails,
  getSimilarProducts,
  getCustomerAddresses,
  getAccountCardsCount,
  getRecommendedProducts,
  getEulerAutoSuggestions,
};
