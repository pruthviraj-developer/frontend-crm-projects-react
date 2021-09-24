import {
  IProperties,
  IUseSegmentProps,
  ContextData,
  ITraits,
} from './IUseSegment';
import Parser from 'ua-parser-js';
import { useEffect, useState } from 'react';
export const useSegment = ({ data }: IUseSegmentProps) => {
  const [deviceDetail, setDeviceDetail] = useState<Parser.IResult>();
  const [contextData, setContextData] = useState<ContextData>();
  const [traits, setTraits] = useState<ITraits>();
  const [properties, setProperties] = useState<IProperties>(() => ({
    funnel: '',
    funnel_tile: '',
    funnel_section: '',
    source: '',
    section: null,
    subsection: '',
    plp: '',
    sortbar_group: '',
    preorder: null,
    character: 'Not applicable',
    sort_by: 'User',
    universal: 'None',
    _session_start_time: '',
    ...data,
  }));

  const getWeek = (date: Date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil(
      ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
    );
    return week;
  };

  useEffect(() => {
    setDeviceDetail({ ...new Parser().getResult() });
    const currentTime = new Date();
    const currentOffset = currentTime.getTimezoneOffset();
    const ISTOffset = 330; // IST offset UTC +5:30
    const d = new Date(
      currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );
    setProperties((prevState) => {
      return {
        ...prevState,
        '[time] hour_of_day': d.getHours(),
        '[time] day_of_week': (d.getDay() + 1) % 7,
        '[time] day_of_month': d.getDate(),
        '[time] month_of_year': d.getMonth() + 1,
        '[time] week_of_year': getWeek(d),
      };
    });
  }, []);

  useEffect(() => {
    setContextData({
      device: {
        model: deviceDetail?.device.model || deviceDetail?.os.name,
        manufacturer: deviceDetail?.device.vendor,
        id: 'VISITOR_ID',
      },
      os: {
        name: deviceDetail?.browser.name,
        version: deviceDetail?.browser.version,
      },
      hs_site: deviceDetail?.device.type === 'mobile' ? 'Mobile' : 'Web',
    });
  }, []);

  useEffect(() => {
    setTraits({
      user_type: 'string',
      hs_device_id: 'string',
      hs_site: deviceDetail?.device.type === 'mobile' ? 'Mobile' : 'Web',
      utm_source: 'string' || 'none',
      utm_medium: 'string' || 'none',
      utm_campaign: 'string' || 'none',
      utm_term: 'string' || 'none',
      utm_content: 'string' || 'none',
      utm_date: 'string' || 'none',
      last_visit_date: 'string',
      days_since_last_visit: 'string',
      experiments: ['string', 'string'],
      in_app_browser: '',
      user_agent: deviceDetail?.ua || '',
      hs_referrer: 'string' || 'direct',
    });
  }, []);

  return { contextData, traits, properties };
};
