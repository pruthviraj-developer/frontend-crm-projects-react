export interface IProductDetails {
  isReturnable: number;
  subProductTypeId: number;
  action: string;
  id: number;
  name: string;
  productDesc: string;
  brandName: string;
  hasSizeChart: boolean;
  quantity: number;
  shippingReturnInfo: string;
  shippingReturnInfoForSku: string;
  brandDescription: string;
  canWishList: number;
  restTime: number;
  preOrderDescription: string;
  productLevelAttrList?: IProductLevelAttrListEntity[];
  categoryId: number;
  subCategoryId: number;
  productTypeId: number;
  canPreSale: number;
  isPresale: number;
  maxDeliveryDays: number;
  moreInfo: string;
  edd: string;
  highlightEDD: number;
  categoryName: string;
  subcategoryName: string;
  subCategoryName?: string;
  productTypeName: string;
  onSale: number;
  fromAge: number;
  toAge: number;
  deliveryMessages?:
    | IProductDetailsDeliveryMessageOrDeliveryMessagesEntity[]
    | null;
  showProductDetails: boolean;
  showBrandDetails: boolean;
  showPreOrderInfo: boolean;
  showShippingInfo: boolean;
  showPincodeBasedEdd: boolean;
  retailPrice: number;
  retailPriceMax: number;
  eddPrefix: string;
  eddColor: string;
  eddTextColor: string;
  serviceable: boolean;
  eddSuffix: string;
  isInternationalPreorder: boolean;
  preorderAction: string;
  preorderInfo: string;
  country: string;
  isEddDifferentForSKUs: boolean;
  isReturnInfoDifferentForSKUs: boolean;
  showSizePickerDropdown: boolean;
  sizePickerDropdownLabel: string;
  brandId: number;
  wishlistId: number;
  subProductTypeName?: string;
  productName?: string;
  isProductSoldOut?: boolean;
  isOneSize?: boolean;
  hasSamePrice?: boolean;
  isDefault?: boolean;
  isfirst?: boolean;
  showRfypCue?: boolean;
  selectedSkuId?: string;
  simpleSkus: ISimpleSkusEntityProps[];
  imgurls?: IImageUrl[];
  isWishlisted: boolean;
  pinCode: string;
  pincode?: string;
  message?: string;
  discovery?: boolean;
  isTile: number;
  tileAction?: string;
}

export interface ISimpleSkusEntityProps {
  attributes: ISkuAttributes;
  productName: string;
  skuId: string;
  attrs: IProductDetailsAttrsEntity[];
  retailPrice: number;
  regularPrice: number;
  availableQuantity: number;
  saleType: string;
  deliveryMsg: string;
  rackStatus: string;
  gender: string;
  discount: number;
  isPresale: number;
  canWishList: number;
  deliveryDate?: number;
  maxDeliveryDays: number;
  highlightEDD: number;
  onSale: number;
  finalSale: number;
  fromAge: number;
  toAge: number;
  eddPrefix: string;
  eddColor: string;
  eddTextColor: string;
  isFastEdd: boolean;
  isInternationalPreorder: boolean;
  preorderAction: string;
  preorderInfo: string;
  merchType: string;
  deliveryMessage: IProductDetailsDeliveryMessageOrDeliveryMessagesEntity;
  shippingReturnInfoForSku: string;
}

export interface IProductDetailsAttrsEntity {
  name: string;
  value: string;
}

export interface IProductDetailsDeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}

export interface IImageUrl {
  imgUrl: string;
  imgUrlLarge: string;
  imgUrlFull: string;
  imgUrlThumbnail: string;
  isCover: boolean;
  imgUrlHeight: number;
  imgUrlWidth: number;
  imgUrlLargeHeight: number;
  imgUrlLargeWidth: number;
  imgUrlFullHeight: number;
  imgUrlFullWidth: number;
  imgUrlThumbnailHeight: number;
  imgUrlThumbnailWidth: number;
}

export interface IProductLevelAttrListEntity {
  attributeName: string;
  isShowAttr: boolean;
  productSubAttrList?: IProductSubAttrListEntity[] | null;
  attributeValue?: string | null;
}

export interface IProductSubAttrListEntity {
  subAttributeName: string;
  attributeValue: string;
  isShowAttrName: boolean;
}

export interface ISkuAttributes {
  accents?: string;
  character?: string;
  closure?: string;
  gender?: string;
  colour?: string;
  'from age'?: string;
  hbt?: string;
  'hem length'?: string;
  neckline?: string;
  occasion?: string;
  print?: string;
  season?: string;
  size?: string;
  sleeves?: string;
  taste?: string;
  'to age'?: string;
  'units per sets'?: string;
  count?: string;
  'country of origin'?: string;
  embellishment?: string;
  'fabric content'?: string;
  'fabric type'?: string;
  'sleeve length'?: string;
  stitch?: string;
  'value pack'?: string;
  weave?: string;
  year?: string;
  name?: string;
  value?: string;
}

export interface IUserInfoProps {
  action: string;
  actionURI: string;
  cartItemQty: number;
  isRegister: boolean;
  isLoggedIn: boolean;
  hasGuestData: boolean;
  actionText: string;
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  uuid: string;
  mobileStatus: string;
  resendOTPAuto: boolean;
  persistentTicket: string;
}

export interface IOfferDetailsProps {
  title: string;
  promoDetails: string;
  bestPrice: string;
  saving: string;
  actionText: string;
  bestPricePromoCode: string;
  isPromoAvailable: boolean;
  isMerchRule: boolean;
  cardCount: number;
  promoOfferText: string;
  action: string;
  actionURI: string;
  seeAllOffers: () => void;
}
