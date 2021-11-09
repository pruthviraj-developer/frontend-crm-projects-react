export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;
export const PRODUCT_IMPRESSION = 'productImpression';
export const ADD_TO_CART = 'addToCart';
export const pageview = (url: URL | string, { shallow }: IRouteChange) => {
  !shallow &&
    (window as any).dataLayer.push({
      event: 'content-view',
      'content-name': url,
    });
};

export interface IPropsType {
  event: string;
  data: Record<string, string | number | unknown>;
}
export interface IRouteChange {
  shallow: Boolean;
}

export const trackEvent = ({ event, data }: IPropsType) => {
  (window as any).dataLayer.push({ event, ...data });
};
