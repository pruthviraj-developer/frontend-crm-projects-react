import { cookiesService } from '@hs/services';
import { COOKIE_DATA, IContextData, ISegmentProperties, timeTrackingData } from '@hs/framework';
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
  SIZE_CHART_VIEWED: 'size_chart_viewed',
  SIZE_CLICKED: 'select_size_clicked',
  ERROR_OCCUERED: 'error_occured',
};

export interface IPropsType {
  evtName: string;
  properties: ISegmentProperties;
  contextData?: IContextData;
}

export const trackEvent = ({ evtName, properties, contextData }: IPropsType) => {
  const timeData = timeTrackingData();
  const user_type = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
  try {
    (window as any).analytics.track(
      evtName,
      { ...properties, ...timeData },
      { ...contextData, ...{ ...contextData?.traits, user_type } },
    );
  } catch (error: any) {
    const errorData = {
      event_name: evtName,
      data: { ...properties, ...timeData, contextData: { ...contextData, ...{ ...contextData?.traits, user_type } } },
      error_message: error.toString(),
      error_stack: error.stack,
    };
    (window as any).analytics.track(ERROR_OCCUERED, errorData);
  }
};
