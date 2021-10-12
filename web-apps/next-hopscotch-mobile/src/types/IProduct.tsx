export interface IProductProps {
  urlParams: urlParamsProps[];
}

export interface urlParamsProps {
  productId: number;
  ignoredName: string;
}
export interface IPopularSearchUrlProps {
  displayName: string;
  link: string;
}

export interface IWishListProps {
  action: string;
  message: string;
  wishlistItemId: string;
}

export interface ICartAPIResponse {
  action: string;
  cartItemQty: number;
  message: string;
}

export interface IUserInfoProps {
  action: string;
  actionURI: string;
  cartItemQty: number;
  isRegister: boolean;
  isLoggedIn: boolean;
  hasGuestData: boolean;
  actionText: string;
}

export interface IHeadProps {
  productName: string;
  retailPrice?: number;
}

export interface IAddressListProps {
  action: string;
  addressList?: IAllAddressItemsEntityProps[] | null;
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
  deliveryMessages: IProductDetailsDeliveryMessageOrDeliveryMessagesEntity[];
}

export interface IProductDetailsDeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}
