export interface IProductFormProps {
  selectedSku?: ISelectedSimpleSkusEntityProps;
  productData: ISelectedProductDetails;
}

export interface ISelectedSimpleSkusEntityProps {
  attributes: any;
  productName: string;
  skuId: string;
  attrs?: SelectedAttrsEntity[] | null;
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
  preorderAction: string;
  preorderInfo: string;
  shippingReturnInfoForSku: string;
  merchType: string;
  deliveryMessage: ISelectedDeliveryMessageOrDeliveryMessagesEntity;
}

export interface SelectedAttrsEntity {
  name: string;
  value: string;
}

export interface ISelectedDeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}

export interface ISelectedProductDetails {
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
  isfirst?: boolean;
  showRfypCue?: boolean;
  selectedSkuId?: string;
  simpleSkus: ISelectedSimpleSkusEntityProps[];
  imgurls?: ISelectedImgurlsEntity[] | null;
  brandName: string;
  hasSizeChart: boolean;
  quantity: number;
  shippingReturnInfo: string;
  brandDescription: string;
  canWishList: number;
  restTime: number;
  preOrderDescription: string;
  productLevelAttrList?: ISelectedProductLevelAttrListEntity[];
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
  deliveryMessages?: ISelectedDeliveryMessageOrDeliveryMessagesEntity[] | null;
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
}

export interface ISelectedProductLevelAttrListEntity {
  attributeName: string;
  isShowAttr: boolean;
  productSubAttrList?: ISelectedProductSubAttrListEntity[] | null;
  attributeValue?: string | null;
}

export interface ISelectedProductSubAttrListEntity {
  subAttributeName: string;
  attributeValue: string;
  isShowAttrName: boolean;
}

export interface ISelectedImgurlsEntity {
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
