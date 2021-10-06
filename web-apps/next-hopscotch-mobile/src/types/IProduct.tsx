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
