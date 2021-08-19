import { httpService } from '../http';

const addToWishlist = <P, R>(wishItem: P): Promise<R> => {
  return httpService.post<R>({
    url: '/api/wishlist',
    data: wishItem,
    params: { retryAndShow503Modal: false },
  });
};

const deleteFromWishlist = <P, R>(wishlistId: P): Promise<R> => {
  // params is added because when api request fails (400), to restrict retry call
  return httpService.delete({
    url: `/api/wishlist/${wishlistId}`,
    params: { retryAndShow503Modal: false },
  });
};

const checkForPincode = <P, R>(pid: P, pincode: P): Promise<R> => {
  return httpService.get<R>({
    url: `/api/products/pincode?productId=${pid}&pincode=${pincode}`,
  });
};

const searchProducts = <P, R>(urlParams: P, canceller: P): Promise<R> => {
  const suggestedSearchText = urlParams['keyWord'] ? '' : urlParams['searchBy'];
  const params = {
    pageNo: 1,
    pageSize: 72,
    suggestedSearchText: suggestedSearchText,
    ...urlParams,
  };
  //  canceller ?
  return httpService.get<R>({ url: '/api/search/product/v2', params });
};

const getSimilarProducts = <P, R>(productId: P, urlParams: P): Promise<R> => {
  const params = {
    retryAndShow503Modal: false,
    pageNo: 1,
    pageSize: 12,
    fromPlp: 'boutique',
    ...urlParams,
  };
  return httpService.get<R>({ url: `/api/reco/product/${productId}`, params });
};

const getProductDetails = <P, R>(productId: P): Promise<R> => {
  const params = { currentTime: new Date().getTime() };
  // if (self._ConfigService.tiles.customTilesId) {
  //   params.customTilesId = self._ConfigService.tiles.customTilesId;
  //   params.from = self._ConfigService.tiles.from;
  //   self._ConfigService.tiles.customTilesId = null;
  //   self._ConfigService.tiles.from = null;
  // } else if (self._ConfigService.tiles.cptId) {
  //   params.cptId = self._ConfigService.tiles.cptId;
  //   self._ConfigService.tiles.cptId = null;
  // }

  return httpService.get<R>({ url: `/api/product/${productId}`, params });
};

export const productDetailsService = {
  addToWishlist,
  deleteFromWishlist,
  checkForPincode,
  searchProducts,
  getProductDetails,
  getSimilarProducts,
};
