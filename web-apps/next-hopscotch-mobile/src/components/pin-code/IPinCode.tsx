import { IAllAddressItemsEntityProps } from '@/types';

export interface IPinCodeProps {
  pinCode?: string;
  addressList: IAllAddressItemsEntityProps[];
  productId: number;
  closePinCodePopup: () => void;
}

export interface IPinCodeAPIResponseProps {
  action: string;
  simpleSkus: any;
  serviceable: boolean;
  codAvailable: boolean;
  edd: string;
  eddPrefix: string;
  deliveryMessages?: DeliveryMessageOrDeliveryMessagesEntity[] | null;
  eddColor: string;
  eddTextColor: string;
  isEddDifferentForSKUs: boolean;
  isReturnInfoDifferentForSKUs: boolean;
  showSizePickerDropdown: boolean;
  sizePickerDropdownLabel: string;
  message: string;
  noPinCodeMessage: string;
}

export interface IPinCodeSimpleSkus {
  skuId: string;
  deliveryMsg: string;
  maxDeliveryDays: number;
  highlightEDD: number;
  finalSale: number;
  eddPrefix: string;
  eddColor: string;
  eddTextColor: string;
  isFastEdd: boolean;
  deliveryMessage: DeliveryMessageOrDeliveryMessagesEntity;
}
export interface DeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}
