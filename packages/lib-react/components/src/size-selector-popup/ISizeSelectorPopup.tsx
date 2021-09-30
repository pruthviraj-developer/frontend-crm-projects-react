export interface ISizeSelectorPopupProps {
  showRfypCue: boolean;
  pinCode?: string;
  onSizeChartClick: () => void;
  simpleSkus: ISizeSelectorSkuProps[];
  selectedSku?: ISizeSelectorSkuProps;
}

export interface ISizeSelectorSkuProps {
  attributes: any;
  productName: string;
  skuId: string;
  attrs?: ISizeSelectorSkuAttrsEntity[] | null;
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
  deliveryMessage: ISizeSelectorSkuDeliveryMessageOrDeliveryMessagesEntity;
  shippingReturnInfoForSku: string;
}

export interface ISizeSelectorSkuAttrsEntity {
  name: string;
  value: string;
}

export interface ISizeSelectorSkuDeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}
