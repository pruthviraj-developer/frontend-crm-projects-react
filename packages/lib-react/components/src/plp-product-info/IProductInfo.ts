import { ISimpleSkusEntityProps } from '@hs/framework';

export interface IQuickShopProps {
  pinCode?: string;
  qtyLeft?: number;
  eddColor: string;
  eddPrefix: string;
  isOneSize: boolean;
  deliveryMsg: string;
  eddTextColor: string;
  hasSizeChart: boolean;
  disableAddToCart: boolean;
  selectedSku?: ISimpleSkusEntityProps;
  simpleSkus: ISimpleSkusEntityProps[];
  openSizeChart: (from_location: string) => void;
  addToCart: (a: ISimpleSkusEntityProps) => void;
  onSizeSelect: (sku?: ISimpleSkusEntityProps) => void;
  sizePickerDropdownLabel?: string;
}

export interface IProductInfoProps extends IQuickShopProps {
  name: string;
  imageUrl: string;
  isTile: number;
  quantity: number;
  discount: number;
  isPresale: number;
  wishlistId?: number;
  retailPrice: number;
  regularPrice: number;
  productName?: string;
  isComingSoon: boolean;
  retailPriceMax: number;
  isProductSoldOut: boolean;
  disableQuickShop: number | boolean;
  selectedSku?: ISimpleSkusEntityProps;
  simpleSkus: ISimpleSkusEntityProps[];
  addToWishlist?: () => void;
  deleteFromWishlist?: () => void;
}
