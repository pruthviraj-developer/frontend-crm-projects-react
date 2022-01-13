import {
  IUseSegmentProps,
  IContextData,
  ISegmentProperties,
  IUtmParam,
} from './IUseSegment';
import Parser from 'ua-parser-js';
import { useEffect, useState } from 'react';
import {
  COOKIE_DATA,
  SESSION_DATA,
  useSessionStorage,
  IFunnelData,
  ISegmentData,
  LOCAL_DATA,
  useReadLocalStorage,
  ISortData,
} from '../storage';
import { cookiesService } from '@hs/services';

const getSessionInfo = (sessionInfostr: string) => {
  const infoArr = sessionInfostr.split(',');
  const sessionInfo = new Map<string, string>();
  for (let i = 0; i < infoArr.length; i++) {
    const arr = infoArr[i].split('=');
    sessionInfo.set(arr[0], arr[1]);
  }
  return sessionInfo;
};
const getSortBarData = (sortData?: ISortData) => {
  const data = { sortbar: 'All', sortbar_group: 'All', sort_by: 'System' };
  if (sortData && sortData.sortingTiles && sortData.sortingTiles.length > 0) {
    for (let item = 0; item < sortData.sortingTiles.length; item++) {
      if (sortData.sortingTiles[item].isSelected) {
        data.sortbar_group = '';
        data.sortbar = sortData.sortingTiles[item].name;
        data.sort_by = 'User';
        if (sortData.sortingTiles[item].ageGroups) {
          for (
            let subItem = 0;
            subItem < sortData.sortingTiles[item].ageGroups.length;
            subItem++
          ) {
            if (sortData.sortingTiles[item].ageGroups[subItem].isSelected) {
              data.sortbar_group =
                sortData.sortingTiles[item].ageGroups[subItem].name;
            }
          }
        }
      }
    }
  }
  return data;
};
const IN_APP_BROWSER_MAP = new Map<string, string>([
  ['Instagram', 'INSTAGRAM'],
  ['FBAN', 'FACEBOOK'],
  ['FBAV', 'FACEBOOK'],
]);

const getInAppBrowser = (ua: string) => {
  let browser = '';
  IN_APP_BROWSER_MAP.forEach((value: string, key: string) => {
    if (ua.indexOf(key) > -1) browser = value;
  });
  return browser;
};

const getWeek = (date: Date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const week = Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
  );
  return week;
};

export const useSegment = () => {
  const [deviceDetail, setDeviceDetail] = useState<Parser.IResult>();
  const [contextData, setContextData] = useState<IContextData>();
  const [properties, setProperties] = useState<ISegmentProperties>();
  const [funnelData] = useSessionStorage<IFunnelData>(
    SESSION_DATA.OA_DATA,
    null
  );
  const [segmentData] = useSessionStorage<ISegmentData>(
    SESSION_DATA.SEGMENT_DATA,
    null
  );
  const screenMap = useReadLocalStorage<Record<string, string>>([
    LOCAL_DATA.SEGMENT_SCREEN_MAP,
  ]).get(LOCAL_DATA.SEGMENT_SCREEN_MAP);
  const sortbarData =
    useReadLocalStorage<ISortData>([LOCAL_DATA.SORT_DATA]).get(
      LOCAL_DATA.SORT_DATA
    ) || undefined;

  const getFormattedExperiments = () => {
    const experiments =
      cookiesService.getCookies(COOKIE_DATA.EXPERIMENTS) || 'none';
    return experiments.split(',');
  };

  useEffect(() => {
    setDeviceDetail({ ...new Parser().getResult() });
  }, []);

  useEffect(() => {
    if (deviceDetail) {
      const currentTime = new Date();
      const currentOffset = currentTime.getTimezoneOffset();
      const ISTOffset = 330; // IST offset UTC +5:30
      const d = new Date(
        currentTime.getTime() + (ISTOffset + currentOffset) * 60000
      );
      const sessionInfo = getSessionInfo(
        cookiesService.getCookies(COOKIE_DATA.OTHER_SESSION_INFO) || ''
      );
      const utmData = cookiesService.getCookieData<IUtmParam>(
        COOKIE_DATA.HS_UTM_PARAMS
      );
      const sortTrackingData = getSortBarData(sortbarData);
      setProperties(() => {
        return {
          funnel: funnelData?.funnel || 'DIRECT',
          funnel_tile: funnelData?.funnel_tile || '',
          funnel_section: funnelData?.funnel_section || '',
          source: funnelData?.source || '',
          section: funnelData?.section,
          subsection: funnelData?.sub_section || '',
          plp: funnelData?.plp || '',
          from_screen:
            segmentData?.from_screen != null
              ? screenMap?.[segmentData.from_screen]
              : '',
          sortbar_group: sortTrackingData.sortbar_group,
          sortbar: sortTrackingData.sortbar,
          preorder: null,
          character: 'Not applicable',
          sort_by: sortTrackingData.sort_by,
          universal: 'None',
          _session_start_time: sessionInfo.get(COOKIE_DATA.SESSION_START_TIME),
          '[time] hour_of_day': d.getHours(),
          '[time] day_of_week': (d.getDay() + 1) % 7,
          '[time] day_of_month': d.getDate(),
          '[time] month_of_year': d.getMonth() + 1,
          '[time] week_of_year': getWeek(d),
        };
      });
      setContextData({
        device: {
          model: deviceDetail?.device.model || deviceDetail?.os.name,
          manufacturer: deviceDetail?.device.vendor,
          id: cookiesService.getCookies(COOKIE_DATA.VISITOR_ID) || '',
        },
        os: {
          name: deviceDetail?.browser.name,
          version: deviceDetail?.browser.version,
        },
        hs_site: deviceDetail?.device.type === 'mobile' ? 'Mobile' : 'Web',
        traits: {
          user_type: cookiesService.getCookies(
            COOKIE_DATA.WEBSITE_CUSTOMER_SEGMENT
          ),
          hs_device_id: cookiesService.getCookies(COOKIE_DATA.VISITOR_ID),
          hs_site: deviceDetail?.device.type === 'mobile' ? 'Mobile' : 'Web',
          hs_framework: 'nextjs',
          utm_source: utmData['utm-source'] || 'none',
          utm_medium: utmData['utm-medium'] || 'none',
          utm_campaign: utmData['utm-campaign'] || 'none',
          utm_term: utmData['utm-term'] || 'none',
          utm_content: utmData['utm-content'] || 'none',
          utm_date: utmData['utm-date'] || 'none',
          last_visit_date: sessionInfo.get(COOKIE_DATA.LAST_VISIT_DATE) || '',
          days_since_last_visit:
            sessionInfo.get(COOKIE_DATA.DAYS_SINCE_LAST_VISIT) || '',
          experiments: getFormattedExperiments(),
          in_app_browser: getInAppBrowser(deviceDetail?.ua),
          user_agent: deviceDetail?.ua || '',
          hs_referrer: window.document.referrer || 'direct',
        },
      });
    }
  }, [deviceDetail]);
  const setSegmentData = ({ properties, traits }: IUseSegmentProps) => {
    setProperties((prevState) => ({ ...prevState, ...properties }));
    setContextData((prevState) => ({
      ...prevState,
      ...{ ...prevState?.traits, ...traits },
    }));
  };
  return [
    {
      contextData,
      properties,
    },
    setSegmentData,
  ] as const;
};
