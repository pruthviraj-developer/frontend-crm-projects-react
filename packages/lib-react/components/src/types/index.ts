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
}

export interface ISimpleSkusEntityProps {
  attributes: ISkuAttributes;
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
  deliveryMessage: ISimpleSkusDeliveryMessageOrDeliveryMessagesEntity;
}

export interface ISimpleSkusAttrsProps {
  name: string;
  value: string;
}

export interface ISimpleSkusDeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}
