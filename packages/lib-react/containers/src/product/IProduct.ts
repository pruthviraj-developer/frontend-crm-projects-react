import {
  IProductDetails,
  ISimpleSkusEntityProps,
  IRecommendedProducts,
} from '@hs/framework';

export interface IProductPage {
  productId: string;
  productData: IProductDetails;
  selectedSku?: ISimpleSkusEntityProps;
  deliveryDetails?: IUpdatedDeliverDetailsProps;
  recommendedProductDetails?: IRecommendedProducts;
  similarProductDetails?: IRecommendedProducts;
  updatedWishListId?: number;
  addToWishlist?: () => void;
  deleteFromWishlist?: () => void;
  openSizeChartPopup: () => void;
  onSizeSelect: (sku: ISimpleSkusEntityProps, fromLocation: string) => void;
  openPinCodePopup: () => void;
  openSizeSelector: () => void;
  addProductToCart: () => void;
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
