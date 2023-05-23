export interface IProductProps {
  productId: string;
  isMobile: boolean;
  url: string;
  from_screen: string;
  error?: IProductError | boolean;
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
  wishlistItemId: number;
  error?: boolean;
}

export interface ICartAPIResponse {
  action: string;
  cartItemQty: number;
  message: string;
}

export interface IHeadProps {
  productName: string;
  retailPrice?: number;
  schema: string;
  canonicalUrl?: string;
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
  deliveryMsg: string;
  deliveryMessages: IProductDetailsDeliveryMessageOrDeliveryMessagesEntity[];
}

export interface IProductDetailsDeliveryMessageOrDeliveryMessagesEntity {
  action: string;
  msg: string;
  type: number;
}

export interface IErrorStateProps {
  action: string;
  message: string;
  data: ErrorStateProps;
}

export interface ErrorStateProps {
  action: string;
  message: string;
}

export interface IProductError {
  statusCode: number;
  message?: string;
}
