import {
  // IUseSegmentProps,
  IContextData,
} from './IUseSegment';
import { IUtmParam } from './../types';
import { useEffect, useState } from 'react';
import { COOKIE_DATA } from '../storage';
import { cookiesService } from '@hs/services';
import { useDeviceDetail } from '../use-device-detail';

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

export const useSegment = () => {
  const deviceDetail = useDeviceDetail();
  const [contextData, setContextData] = useState<IContextData>();
  const getFormattedExperiments = () => {
    const experiments =
      cookiesService.getCookies(COOKIE_DATA.EXPERIMENTS) || 'none';
    return experiments.split(',');
  };

  useEffect(() => {
    if (deviceDetail) {
      const utmData = cookiesService.getCookieData<IUtmParam>(
        COOKIE_DATA.HS_UTM_PARAMS
      );
      setContextData({
        device: {
          model: deviceDetail.device.model || deviceDetail.os.name,
          manufacturer: deviceDetail?.device.vendor,
          id: deviceDetail.id,
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
          hs_device_id: deviceDetail.id,
          hs_site: deviceDetail?.device.type === 'mobile' ? 'Mobile' : 'Web',
          hs_framework: 'nextjs',
          utm_source: utmData['utm-source'] || 'none',
          utm_medium: utmData['utm-medium'] || 'none',
          utm_campaign: utmData['utm-campaign'] || 'none',
          utm_term: utmData['utm-term'] || 'none',
          utm_content: utmData['utm-content'] || 'none',
          utm_date: utmData['utm-date'] || 'none',
          experiments: getFormattedExperiments(),
          in_app_browser: getInAppBrowser(deviceDetail?.ua),
          user_agent: deviceDetail?.ua || '',
          hs_referrer: window.document.referrer || 'direct',
        },
      });
    }
  }, [deviceDetail]);
  return [
    {
      contextData,
    },
  ] as const;
};
