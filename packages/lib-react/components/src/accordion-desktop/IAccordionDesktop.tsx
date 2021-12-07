import {
  IProductDetailsAttrsEntity,
  IProductDetailsDeliveryMessageOrDeliveryMessagesEntity,
  ISimpleSkusEntityProps,
} from 'types';

export interface IAccordionDesktopProps {
  productDesc: string;
  showShippingInfo: boolean;
  isReturnable: number;
  isPresale?: number;
  preOrderDescription: string;
  moreInfo: string;
  shippingReturnInfo: string;
  shippingReturnInfoForSku: string;
  simpleSkus: ISimpleSkusEntityProps[];
  productLevelAttrList?: AccordionProductLevelAttrListEntityDesktopProps[];
  selectedSku?: ISelectedSimpleSkusEntityDesktopProps;
}

export interface ISelectedSimpleSkusEntityDesktopProps {
  attributes: any;
  productName: string;
  skuId: string;
  attrs?: IProductDetailsAttrsEntity[] | null;
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
  deliveryMessage: IProductDetailsDeliveryMessageOrDeliveryMessagesEntity;
}

export interface AccordionProductLevelAttrListEntityDesktopProps {
  attributeName: string;
  isShowAttr: boolean;
  productSubAttrList?: AccordionProductSubAttrListEntityDesktopProps[] | null;
  attributeValue?: string | null;
}

export interface AccordionProductSubAttrListEntityDesktopProps {
  subAttributeName: string;
  attributeValue: string;
  isShowAttrName: boolean;
}
