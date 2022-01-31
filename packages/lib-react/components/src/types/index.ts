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
  deliveryMessage: IDeliveryMessagesEntity;
}

export interface IProductDetailsAttrsEntity {
  name: string;
  value: string;
}

export interface IDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}

export * from './ISearchProps';
export * from './ISearchResource';
export * from './ISizeChart';
