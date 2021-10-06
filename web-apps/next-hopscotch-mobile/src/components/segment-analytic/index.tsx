import { IContextData, ISegmentProperties } from '@hs/framework';

export const PDP_TRACKING_EVENTS = {
  PRODUCT_VIEWED: 'product_viewed',
  ADDED_TO_CART: 'product_added_to_cart',
  PINCODE_CHECK_CLICKED: 'pincode_check_clicked',
  PINCODE_CHECKED: 'pincode_checked',
  PLP_SCROLLED: 'plp_scrolled',
  PRODUCT_ADDED_TO_WISHLIST: 'product_added_to_wishlist',
  PRODUCT_REMOVED_FROM_WISHLIST: 'product_removed_from_wishlist',
  PDP_SEE_SIMILAR_CLICKED: 'reco_clicked',
  SIZE_CLICKED: 'select_size_clicked',
};

export interface IPropsType {
  evtName: string;
  properties: ISegmentProperties;
  contextData?: IContextData;
}

export const trackEvent = ({ evtName, properties, contextData }: IPropsType) => {
  (window as any).analytics.track(evtName, properties, contextData);
};
