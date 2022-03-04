import { cookiesService } from '@hs/services';
import { COOKIE_DATA, IContextData, ISegmentProperties, IUserInfoProps, timeTrackingData } from '@hs/framework';
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
  LOGIN_VIEWED: 'login_viewed',
};

export interface IPropsType {
  evtName: string;
  properties: ISegmentProperties;
  contextData?: IContextData;
}
const getSessionInfo = (sessionInfostr: string) => {
  const infoArr = sessionInfostr.split(',');
  const sessionInfo = new Map<string, string>();
  for (let i = 0; i < infoArr.length; i++) {
    const arr = infoArr[i].split('=');
    sessionInfo.set(arr[0], arr[1]);
  }
  return sessionInfo;
};
export const trackEvent = ({ evtName, properties, contextData }: IPropsType) => {
  const timeData = timeTrackingData();
  const user_type = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
  const sessionInfo = getSessionInfo(cookiesService.getCookies(COOKIE_DATA.OTHER_SESSION_INFO) || '');
  const last_visit_date = sessionInfo.get(COOKIE_DATA.LAST_VISIT_DATE) || '';
  const days_since_last_visit = sessionInfo.get(COOKIE_DATA.DAYS_SINCE_LAST_VISIT) || '';
  try {
    (window as any).analytics.track(
      evtName,
      { ...properties, ...timeData, _session_start_time: sessionInfo.get(COOKIE_DATA.SESSION_START_TIME) },
      { ...contextData, ...{ traits: { ...contextData?.traits, user_type, last_visit_date, days_since_last_visit } } },
    );
  } catch (error: any) {
    const errorData = {
      event_name: evtName,
      data: {
        ...properties,
        ...timeData,
        contextData: { ...contextData, ...{ traits: { ...contextData?.traits, user_type } } },
      },
      error_message: error.toString(),
      error_stack: error.stack,
    };
    (window as any).analytics.track(ERROR_OCCUERED, errorData);
  }
};

export const identify = (userinfo: IUserInfoProps, contextData: IContextData) => {
  const user_type = cookiesService.getCookies(COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT);
  let userId;
  if (userinfo && userinfo?.userId) {
    userId = userinfo.userId;
  }
  (window as any).analytics.identify(
    userId,
    { ...contextData?.traits, user_type },
    { ...contextData, ...{ traits: { ...contextData?.traits, user_type } } },
  );
};
