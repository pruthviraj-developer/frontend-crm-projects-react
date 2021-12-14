import { IDeliveryMessagesEntity, ISimpleSkusEntityProps } from 'types';
export interface IDeliveryDetailsProps {
  deliveryMessages?: IDeliveryMessagesEntity[];
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
