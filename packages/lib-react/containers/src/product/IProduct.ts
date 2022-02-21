import {
  IOfferDetailsProps,
  IProductDetails,
  IRecommendedProducts,
  ISimpleSkusEntityProps,
} from '@hs/framework';

export interface IProductPage {
  productId: string;
  addedToCart: boolean;
  updatedWishListId?: number;
  productData: IProductDetails;
  offerDetails?: IOfferDetailsProps;
  selectedSku?: ISimpleSkusEntityProps;
  similarProductDetails?: IRecommendedProducts;
  deliveryDetails?: IUpdatedDeliverDetailsProps;
  recommendedProductDetails?: IRecommendedProducts;
  goToCart: () => void;
  addToWishlist?: () => void;
  openPinCodePopup: () => void;
  openSizeSelector: () => void;
  addProductToCart: () => void;
  openSizeChartPopup: () => void;
  deleteFromWishlist?: () => void;
  onSizeSelect: (sku: ISimpleSkusEntityProps, fromLocation: string) => void;
  seeAllOffers: (actionURI: string) => void;
}
export interface IUpdatedDeliverDetailsProps {
  edd?: string;
  pinCode: string;
  eddPrefix: string;
  deliveryMessages: IProductDetailsDeliveryMessageOrDeliveryMessagesEntity[];
}

export interface IProductDetailsDeliveryMessageOrDeliveryMessagesEntity {
  msg: string;
  type: number;
  action: string;
}
