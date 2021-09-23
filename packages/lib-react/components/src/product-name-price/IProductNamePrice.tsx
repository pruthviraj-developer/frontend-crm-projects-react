export interface IProductNamePriceProps {
  productName?: string;
  retailPrice: number;
  retailPriceMax: number;
  selectedSku: ISimpleSkusEntityProps;
  regularPrice: number;
  discount: number;
  isProductSoldOut: boolean;
  wishlistId?: number;
  addToWishlist: () => void;
  deleteFromWishlist: () => void;
}

export interface ISimpleSkusEntityProps {
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
  preorderAction: string;
  preorderInfo: string;
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
