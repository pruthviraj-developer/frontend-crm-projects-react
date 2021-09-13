export interface IProductProps {
  urlParams: urlParamsProps[];
}

export interface urlParamsProps {
  productId: number;
  ignoredName: string;
}

export interface IProductDetails {
  isReturnable: number;
  subProductTypeId: number;
  action: string;
  id: number;
  productDesc: string;
  productName?: string;
  isProductSoldOut?: boolean;
  isOneSize?: boolean;
  hasSamePrice?: boolean;
  isDefault?: boolean;
  selectedSkuId?: string;
  simpleSkus: SimpleSkusEntity[];
  imgurls?: ImgurlsEntity[] | null;
  brandName: string;
  hasSizeChart: boolean;
  quantity: number;
  shippingReturnInfo: string;
  brandDescription: string;
  canWishList: number;
  restTime: number;
  preOrderDescription: string;
  productLevelAttrList?: ProductLevelAttrListEntity[] | null;
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
  productTypeName: string;
  onSale: number;
  fromAge: number;
  toAge: number;
  deliveryMessages?: DeliveryMessageOrDeliveryMessagesEntity[] | null;
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
  isWishlisted: boolean;
}

export interface SimpleSkusEntity {
  attributes: any;
  productName: string;
  skuId: string;
  attrs?: AttrsEntity[] | null;
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
  preorderAction?: string | null;
  preorderInfo?: string | null;
  merchType: string;
  deliveryMessage: DeliveryMessageOrDeliveryMessagesEntity;
}

export interface AttrsEntity {
  name: string;
  value: string;
}
export interface DeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}

export interface ImgurlsEntity {
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

export interface ProductLevelAttrListEntity {
  attributeName: string;
  isShowAttr: boolean;
  productSubAttrList?: ProductSubAttrListEntity[] | null;
  attributeValue?: string | null;
}

export interface ProductSubAttrListEntity {
  subAttributeName: string;
  attributeValue: string;
  isShowAttrName: boolean;
}

export interface IProductFormProps {
  selectedSku: SimpleSkusEntity;
  retailPrice: number;
  regularPrice: number;
  discount: number;
  isPresale: number;
  finalSale: number;
  qtyLeft: number;
  deliveryMsg: string;
  retailPriceMax: number;
}
