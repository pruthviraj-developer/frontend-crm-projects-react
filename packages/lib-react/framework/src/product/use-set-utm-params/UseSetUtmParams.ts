import { useRouter } from 'next/router';
import {
  productDetailsService,
  cookiesService,
  timeService,
} from '@hs/services';
import { IUtmParam } from './../../types';
import { useCallback } from 'react';

const getFormattedData = (value = '') => {
  return value.replace(/[%#–]/g, '_');
};

const getHostName = (url: string) => {
  const a = new URL(url);
  return a.hostname;
};
const getTime = (storageTime: number) => {
  return {
    expires: new Date(timeService.getCurrentTime() + storageTime),
  };
};
export const useSetUtmParams = () => {
  const UTM_PARAMS_COOKIE_NAME = 'hs_utm_params';
  const UTM_STORAGE_TIME = 60 * 1000 * 1 * 60;
  const DEEPLINK_STORAGE_TIME = 24 * 60 * 60 * 1000;
  const router = useRouter();
  const {
    deeplink,
    utm_term,
    utm_date,
    utm_source,
    utm_medium,
    utm_content,
    utm_campaign,
  }: IUtmParam = router.query;

  const loadUtmFromLocation = () => {
    let utmParams = {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      deeplink: '',
    };
    if (deeplink) {
      setDeeplinkParams({ deeplink });
    }
    if (utm_source || utm_medium || utm_campaign) {
      setUtmParams({
        'utm-date': utm_date,
        'utm-term': utm_term,
        'utm-medium': utm_medium,
        'utm-source': utm_source,
        'utm-content': utm_content,
        'utm-campaign': utm_campaign,
      });
      utmParams = {
        utm_medium: getFormattedData(utm_medium),
        utm_source: getFormattedData(utm_source),
        utm_campaign: getFormattedData(utm_campaign),
        deeplink: deeplink || '',
      };
    } else if (typeof document != undefined && document.referrer) {
      const referrer = getHostName(document.referrer);
      if (referrer) {
        utmParams = {
          utm_source: referrer,
          utm_medium: 'search',
          utm_campaign: '',
          deeplink: '',
        };
      }
    }
    return utmParams;
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

  const postUtmParams = useCallback(() => {
    (async () => {
      const params = loadUtmFromLocation();
      await productDetailsService.postUtmParams({
        params,
      });
    })();
  }, []);

  return [postUtmParams];
};
