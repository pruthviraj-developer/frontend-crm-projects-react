import { ISimpleSkusEntityProps } from '@hs/framework';

export interface ISizeSelectorPopupProps {
  showRfypCue: boolean;
  pinCode?: string;
  showAddToCart: boolean;
  closePopup: () => void;
  onSizeChartClick: () => void;
  simpleSkus: ISimpleSkusEntityProps[];
  selectedSku: ISimpleSkusEntityProps;
  onSizeSelect: (a: ISimpleSkusEntityProps, b: string) => void;
  goToProductRecommendation: (args: string) => void;
}
// export interface ISizeSelectorPopupProps {
//   showRfypCue: boolean;
//   pinCode?: string;
//   showAddToCart: boolean;
//   onSizeChartClick: () => void;
//   simpleSkus: ISimpleSkusEntityProps[];
//   selectedSku: ISimpleSkusEntityProps;
//   onSizeSelect: (args: ISimpleSkusEntityProps) => void;
// }

// export interface ISimpleSkusEntityProps {
//   attributes: ISkuAttributes;
//   productName: string;
//   skuId: string;
//   attrs?: IProductDetailsAttrsEntity[] | null;
//   retailPrice: number;
//   regularPrice: number;
//   availableQuantity: number;
//   saleType: string;
//   deliveryMsg: string;
//   rackStatus: string;
//   gender: string;
//   discount: number;
//   isPresale: number;
//   canWishList: number;
//   maxDeliveryDays: number;
//   highlightEDD: number;
//   onSale: number;
//   finalSale: number;
//   fromAge: number;
//   toAge: number;
//   eddPrefix: string;
//   eddColor: string;
//   eddTextColor: string;
//   isFastEdd: boolean;
//   isInternationalPreorder: boolean;
//   preorderAction: string;
//   preorderInfo: string;
//   merchType: string;
//   deliveryMessage: IProductDetailsDeliveryMessageOrDeliveryMessagesEntity;
//   shippingReturnInfoForSku: string;
// }

// export interface IProductDetailsAttrsEntity {
//   name: string;
//   value: string;
// }

// export interface IProductDetailsDeliveryMessageOrDeliveryMessagesEntity {
//   action: string;
//   msg: string;
//   type: number;
// }
