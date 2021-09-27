export interface IAccordionProps {
  skuAttributes?: ISkuAttributes[];
  productName: string;
  productDesc: string;
  showShippingInfo: boolean;
  isReturnable: number;
  isPresale: number;
  preOrderDescription: string;
  showBrandDetails: boolean;
  brandDescription: string;
  brandName: string;
  moreInfo: string;
  shippingReturnInfo: string;
  shippingReturnInfoForSku: string;
  simpleSkus: AccordionSimpleSkusEntityProps[];
  productLevelAttrList?: AccordionProductLevelAttrListEntityProps[];
  selectedSku?: ISelectedSimpleSkusEntityProps;
}

export interface ISelectedSimpleSkusEntityProps {
  attributes: any;
  productName: string;
  skuId: string;
  attrs?: AccordionAttrsEntityProps[] | null;
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
  deliveryMessage: AccordionDeliveryMessageOrDeliveryMessagesEntityProps;
}

export interface ISkuAttributes {
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
  year?: string;
}

export interface AccordionSimpleSkusEntityProps {
  attributes: any;
  productName: string;
  skuId: string;
  attrs?: AccordionAttrsEntityProps[] | null;
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
  deliveryMessage: AccordionDeliveryMessageOrDeliveryMessagesEntityProps;
}

export interface AccordionAttrsEntityProps {
  name: string;
  value: string;
}

export interface AccordionDeliveryMessageOrDeliveryMessagesEntityProps {
  action: string;
  msg: string;
  type: number;
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
