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

const getProductDetails = <P, R>(productId: P, baseURL = ''): Promise<R> => {
  const params = { currentTime: new Date().getTime() };
  let url = `/api/product/${productId}`;
  if (baseURL) url = baseURL + url;
  // if (self._ConfigService.tiles.customTilesId) {
  //   params.customTilesId = self._ConfigService.tiles.customTilesId;
  //   params.from = self._ConfigService.tiles.from;
  //   self._ConfigService.tiles.customTilesId = null;
  //   self._ConfigService.tiles.from = null;
  // } else if (self._ConfigService.tiles.cptId) {
  //   params.cptId = self._ConfigService.tiles.cptId;
  //   self._ConfigService.tiles.cptId = null;
  // }

  return httpService.get<R>({
    url,
    params,
  });
};

const getUserInfo = <P, R>(params: P): Promise<R> => {
  const url = '/api/customer/info';
  return httpService.get<R>({ url, params });
  // let _self = this;
  // this._CustomerService.getUserInfo().then(resp => {
  //     this.showPlaceholder = false;
  //     if (!resp.data.hasGuestData && this.isMobieDevice()) {
  //         this.signedOutUser = true;
  //     } else {
  //         this.isGUwithDetails = true;
  //         this.phoneNumber = resp.data.phoneNumber || '' ;
  //         this.action = resp.data.actionText || '' ;
  //         this._actionDetails = this._DeeplinkParser.getParamsObject(resp.data.actionURI || '');
  //       //   console.log(resp.data.actionURI, this._actionDetails);

  //         // this.userName = CustomerService.getCustomerFirstName();
  //         // this.userInfo = CustomerService.getCustomerInfo();
  //         // this.email = CustomerService.getCustomerEmail();
  //         // if(this.userInfo.facebookProfile && this.userInfo.facebookProfile.profilePhoto) {
  //         //     this.userInfo.profilePhoto = this.userInfo.facebookProfile.profilePhoto;
  //         // } else {
  //         //     // this.nameInitial = this.userInfo.firstName.substr(0, 1) + this.userInfo.lastName.substr(0, 1);
  //         //     this.nameInitial = this.userInfo.firstName.substr(0, 1);
  //         // }
  //     }

  //     _self.updateMenuLockStatus();
  // }, err => {
  // })
};

const getSizes = <P, R>(productId: P, baseURL = ''): Promise<R> => {
  let url = `/api/sizeChart/${productId}`;
  if (baseURL) url = baseURL + url;
  return httpService.get<R>({ url });
};

export const productDetailsService = {
  addToWishlist,
  deleteFromWishlist,
  checkForPincode,
  searchProducts,
  getProductDetails,
  getSimilarProducts,
  getRecommendedProducts,
  getUserInfo,
  getSizes,
};
