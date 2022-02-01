import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { useSessionStorage, SESSION_DATA, IUtmParam, IFunnelData, ISegmentData, COOKIE_DATA } from '@hs/framework';
import { cookiesService, timeService } from '@hs/services';
const DataManager: FC<unknown> = ({ children }) => {
  const router = useRouter();
  const [, setOaData] = useSessionStorage<IFunnelData>(SESSION_DATA.OA_DATA, null);
  const [, setSegmentData] = useSessionStorage<ISegmentData>(SESSION_DATA.SEGMENT_DATA, null);
  const UTM_STORAGE_TIME = 60 * 1000 * 1 * 60;
  const DEEPLINK_STORAGE_TIME = 24 * 60 * 60 * 1000;
  const { deeplink, utm_term, utm_date, utm_source, utm_medium, utm_content, utm_campaign }: IUtmParam = router.query;

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
    if (deeplink) {
      setDeeplinkParams({ deeplink });
    }
    if (utm_campaign || utm_content || utm_source || utm_medium || utm_date || utm_term) {
      setUtmParams({
        'utm-date': getFormattedData(utm_date),
        'utm-term': getFormattedData(utm_term),
        'utm-medium': getFormattedData(utm_medium),
        'utm-source': getFormattedData(utm_source),
        'utm-content': getFormattedData(utm_content),
        'utm-campaign': getFormattedData(utm_campaign),
      });
    } else if (typeof document != undefined && document.referrer) {
      const referrer = getHostName(document.referrer);
      if (referrer) {
        setUtmParams({
          'utm-source': referrer,
          'utm-medium': 'search',
          'utm-campaign': '',
        });
      }
    }
  };
  useEffect(() => {
    loadUtmFromLocation();
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
      setOaData({ funnel, funnel_tile, funnel_section, section, sub_section, source, plp, quickshop });
      setSegmentData({ from_screen, from_section, extraSegdata });
      router.replace(routeWithoutParams, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);
  return <>{children}</>;
};

export default DataManager;
