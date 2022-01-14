// import { IDeliveryMessagesEntity } from 'types';
export interface IDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}

export interface IPinCodeProps {
  pinCode?: string;
  productId: number;
  isAddressLoading: boolean;
  address?: IAllAddressItemsEntityProps[];
  closePinCodePopup: (args?: any) => void;
}

export interface IPinCodeAPIResponseProps {
  action: string;
  simpleSkus: any;
  serviceable: boolean;
  codAvailable: boolean;
  edd: string;
  eddPrefix: string;
  deliveryMessages?: IDeliveryMessagesEntity[] | null;
  eddColor: string;
  eddTextColor: string;
  isEddDifferentForSKUs: boolean;
  isReturnInfoDifferentForSKUs: boolean;
  showSizePickerDropdown: boolean;
  sizePickerDropdownLabel: string;
  message: string;
  noPinCodeMessage: string;
}

export interface IPinCodeErrorProps {
  message: string;
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
  deliveryMessage: IDeliveryMessagesEntity;
}

export interface IAddressListProps {
  action: string;
  allAddressItems: IAllAddressItemsEntityProps[];
}

export interface IAllAddressItemsEntityProps {
  id: number;
  name: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  streetAddress: string;
  landmark: string;
  cellPhone: string;
  isPrimary: boolean;
  canCod: boolean;
  canPol: boolean;
  isServicable: boolean;
  simpleStreetAddress: string;
  firstName: string;
  lastName: string;
}

export interface IUpdatedDeliverDetailsProps {
  edd?: string;
  pinCode: string;
  eddPrefix: string;
  deliveryMessages: IDeliveryMessagesEntity[];
}
