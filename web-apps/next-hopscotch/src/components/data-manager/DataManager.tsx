import { useEffect, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  useSessionStorage,
  SESSION_DATA,
  IUtmParam,
  IFunnelData,
  ISegmentData,
  COOKIE_DATA,
  UserInfoContext,
} from '@hs/framework';
import { cookiesService, timeService } from '@hs/services';

const getFormattedData = (value = '') => {
  return value.replace(/[%#–]/g, '_');
};

const getTime = (storageTime: number) => {
  return {
    expires: new Date(timeService.getCurrentTime() + storageTime),
  };
};
const DataManager: FC<unknown> = ({ children }) => {
  const router = useRouter();
  const { updateUtmParams } = useContext(UserInfoContext);
  const [, setOaData] = useSessionStorage<IFunnelData>(SESSION_DATA.OA_DATA, null);
  const [, setSegmentData] = useSessionStorage<ISegmentData>(SESSION_DATA.SEGMENT_DATA, null);
  const UTM_STORAGE_TIME = 60 * 1000 * 1 * 60;
  const DEEPLINK_STORAGE_TIME = 24 * 60 * 60 * 1000;
  const { deeplink, utm_term, utm_date, utm_source, utm_medium, utm_content, utm_campaign }: IUtmParam = router.query;

  const setUtmParams = (params: IUtmParam) => {
    cookiesService.setCookies({
      key: COOKIE_DATA.HS_UTM_PARAMS,
      value: params,
      options: getTime(UTM_STORAGE_TIME),
    });
  };

  const setDeeplinkParams = (deeplinkParams: IUtmParam) => {
    cookiesService.setCookies({
      key: COOKIE_DATA.HS_DEEPLINK_PARAMS,
      value: deeplinkParams,
      options: getTime(DEEPLINK_STORAGE_TIME),
    });
  };

  const loadUtmFromLocation = () => {
    let utmParams: IUtmParam = {};
    if (deeplink) {
      setDeeplinkParams({ deeplink });
    }
    if (utm_campaign || utm_source || utm_medium) {
      utmParams = {
        'utm-medium': getFormattedData(utm_medium),
        'utm-source': getFormattedData(utm_source),
        'utm-campaign': getFormattedData(utm_campaign),
      };
      if (utm_content) {
        utmParams['utm-content'] = getFormattedData(utm_content);
      }
      if (utm_date) {
        utmParams['utm-date'] = getFormattedData(utm_date);
      }
      if (utm_term) {
        utmParams['utm-term'] = getFormattedData(utm_term);
      }
      setUtmParams(utmParams);
    }
    updateUtmParams({ deeplink, ...utmParams });
  };
  useEffect(() => {
    loadUtmFromLocation();
  }, []);

  useEffect(() => {
    if (router.asPath.indexOf('?') > -1) {
      const routeWithoutParams = router.asPath.split('?')?.[0];
      const {
        funnel,
        funnel_tile,
        funnel_section,
        section,
        subsection: sub_section,
        source = '',
        plp,
        quickshop = 'No',
      }: IFunnelData = router.query;
      const { from_screen, from_section, extraSegdata }: ISegmentData = router.query;
      const { utm_source }: IUtmParam = router.query;
      setOaData({ funnel, funnel_tile, funnel_section, section, sub_section, source, plp, quickshop });
      setSegmentData({ from_screen, from_section, extraSegdata });
      if (!utm_source) {
        router.replace(routeWithoutParams, undefined, { shallow: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);
  return <>{children}</>;
};

export default DataManager;