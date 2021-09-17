export interface IProductNamePriceProps {
  name?: string;
  retailPrice: number;
  retailPriceMax: number;
  selectedSku?: any;
  regularPrice: number;
  discount: number;
  isProductSoldOut: boolean;
  wishlistId?: number;
  addToWishlist: () => void;
  deleteFromWishlist: () => void;
}
