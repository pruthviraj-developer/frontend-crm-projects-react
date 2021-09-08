export interface IDeliveryDetailsProps {
  deliveryDetails: DetailProps[];
  selectedSku: SimpleSkusEntity;
  productDetail: Record<string, string>; // parent IProductDetails prpos
}

export interface SimpleSkusEntity {
  productName: string;
  skuId: string;

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
}

export interface DetailProps {
  action: string;
  msg: string;
  type: number;
}
