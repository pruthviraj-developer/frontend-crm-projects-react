export interface IDeliveryDetailsProps {
  deliveryDetails: DeliveryMessageOrDeliveryMessagesEntity[];
  isSkuInternational?: boolean;
  skuInternationalPreOrderInfo: string;
  skuInternationalPreOrderAction: string;
  isProductInternational?: boolean;
  productInternationalPreOrderInfo: string;
  productInternationalPreOrderAction: string;
  eddColor: string;
  eddTextColor: string;
  eddPrefix: string;
  deliveryMsg: string;
  pinCode?: string;
  openPinCodePopup: () => void;
}

export interface DeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}
