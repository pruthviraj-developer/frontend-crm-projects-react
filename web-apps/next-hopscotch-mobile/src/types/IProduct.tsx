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
}
