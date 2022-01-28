import { useRouter } from 'next/router';
import {
  productDetailsService,
  cookiesService,
  timeService,
} from '@hs/services';
import { IUtmParam } from './../../types';

export const useSetUtmParams = (): unknown => {
  const UTM_PARAMS_COOKIE_NAME = 'hs_utm_params';
  const UTM_STORAGE_TIME = 60 * 1000 * 1 * 60;
  const DEEPLINK_STORAGE_TIME = 24 * 60 * 60 * 1000;
  const router = useRouter();
  const getHostName = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    return a.hostname;
  };

  const loadUtmFromLocation = () => {
    // var queryParams = this._$location.search() || {};
    const {
      deeplink,
      utm_term,
      utm_date,
      utm_source,
      utm_medium,
      utm_content,
      utm_campaign,
    }: IUtmParam = router.query;
    if (deeplink) {
      setDeeplinkParams({ deeplink });
    }
    if (utm_source || utm_medium || utm_campaign) {
      const getFormattedData = (value = '') => {
        return value.replace(/[%#–]/g, '_');
      };
      setUtmParams({
        'utm-date': utm_date,
        'utm-term': utm_term,
        'utm-medium': utm_medium,
        'utm-source': utm_source,
        'utm-content': utm_content,
        'utm-campaign': utm_campaign,
      });
      return {
        utm_medium: getFormattedData(utm_medium),
        utm_source: getFormattedData(utm_source),
        utm_campaign: getFormattedData(utm_campaign),
        deeplink,
      };
    } else if (typeof document != undefined && document.referrer) {
      const referrer = getHostName(document.referrer);
      if (referrer) {
        return {
          utm_source: referrer,
          utm_medium: 'search',
        };
      }
    }
    return {};
  };

  const getTime = (storageTime: number) => {
    return {
      expires: new Date(timeService.getCurrentTime() + storageTime),
    };
  };

  const setUtmParams = (params: IUtmParam) => {
    if (params) {
      cookiesService.setCookies({
        key: UTM_PARAMS_COOKIE_NAME,
        value: params,
        options: getTime(UTM_STORAGE_TIME),
      });
    }
  };

  const setDeeplinkParams = (deeplinkParams: IUtmParam) => {
    if (deeplinkParams) {
      cookiesService.setCookies({
        key: 'hs_deeplink_params',
        value: deeplinkParams,
        options: getTime(DEEPLINK_STORAGE_TIME),
      });
    }
  };

  const postUtmParams = () => {
    (async () => {
      const p: any = loadUtmFromLocation();
      const params: any = {};
      for (const key in p) {
        params[key] = Array.isArray(p[key])
          ? p[key][p[key].length - 1]
          : p[key];
      }
      await productDetailsService.postUtmParams({
        utm_source: params['utm_source'] || '',
        utm_medium: params['utm_medium'] || '',
        utm_campaign: params['utm_campaign'] || '',
        deeplink: params['deeplink'] || '',
      });
    })();
  };

  return [postUtmParams];
};
