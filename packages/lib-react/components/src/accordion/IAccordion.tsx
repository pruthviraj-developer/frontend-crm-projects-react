import {
  ISimpleSkusAttrsProps,
  ISimpleSkusDeliveryMessageOrDeliveryMessagesEntity,
  ISimpleSkusEntityProps,
} from 'types';

export interface IAccordionProps {
  productDesc: string;
  showShippingInfo: boolean;
  showBrandInfo: boolean;
  isReturnable: number;
  isPresale: number;
  preOrderDescription: string;
  showBrandDetails: boolean;
  brandDescription: string;
  brandName: string;
  moreInfo: string;
  shippingReturnInfo: string;
  shippingReturnInfoForSku: string;
  simpleSkus: ISimpleSkusEntityProps[];
  productLevelAttrList?: AccordionProductLevelAttrListEntityProps[];
  selectedSku?: ISelectedSimpleSkusEntityProps;
}

export interface ISelectedSimpleSkusEntityProps {
  attributes: any;
  productName: string;
  skuId: string;
  attrs?: ISimpleSkusAttrsProps[] | null;
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
  merchType: string;
  shippingReturnInfoForSku: string;
  deliveryMessage: ISimpleSkusDeliveryMessageOrDeliveryMessagesEntity;
}

export interface AccordionProductLevelAttrListEntityProps {
  attributeName: string;
  isShowAttr: boolean;
  productSubAttrList?: AccordionProductSubAttrListEntityProps[] | null;
  attributeValue?: string | null;
}

export interface AccordionProductSubAttrListEntityProps {
  subAttributeName: string;
  attributeValue: string;
  isShowAttrName: boolean;
}
