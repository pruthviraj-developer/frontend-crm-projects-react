import {
  IProductDetailsDeliveryMessageOrDeliveryMessagesEntity,
  ISimpleSkusEntityProps,
} from 'types';
export interface IDeliveryDetailsDesktopProps {
  deliveryMessages?: IProductDetailsDeliveryMessageOrDeliveryMessagesEntity[];
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
  selectedSku: ISimpleSkusEntityProps;
  showInternationaPreorder: boolean;
}
