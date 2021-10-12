// import { ISimpleSkusEntityProps } from 'product/types';
export interface IDeliveryDetailsProps {
  deliveryMessages?: DeliveryMessageOrDeliveryMessagesEntity[];
  isEddDifferentForSKUs: boolean;
  preOrderInfo: string;
  preOrderAction: string;
  eddColor: string;
  eddTextColor: string;
  eddPrefix: string;
  deliveryMsg: string;
  pinCode?: string;
  openPinCodePopup: () => void;
  openSizeSelector: () => void;
  // selectedSku: ISimpleSkusEntityProps;
  selectedSku: any;
  showInternationaPreorder: boolean;
}

export interface DeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}
