/* eslint-disable @typescript-eslint/no-explicit-any */
import { IContextData, ISegmentProperties } from '@hs/framework';
const ERROR_OCCUERED = 'error_occured';
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
  ERROR_OCCUERED: 'error_occured',
};

export interface IPropsType {
  evtName: string;
  properties: ISegmentProperties;
  contextData?: IContextData;
}

export const trackEvent = ({ evtName, properties, contextData }: IPropsType) => {
  try {
    (window as any).analytics.track(evtName, properties, contextData);
  } catch (error: any) {
    const errorData = {
      event_name: evtName,
      data: { ...properties, contextData },
      error_message: error.toString(),
      error_stack: error.stack,
    };
    (window as any).analytics.track(ERROR_OCCUERED, errorData);
  }
};
