import { cookiesService } from '@hs/services';
import { useEffect, useState } from 'react';
import Parser from 'ua-parser-js';
import { COOKIE_DATA } from '../storage';
export interface IDeviceDetail extends Parser.IResult {
  id: string;
}
export const useDeviceDetail = () => {
  const [deviceDetail, setDeviceDetail] = useState<IDeviceDetail>();
  const id: string = cookiesService.getCookies(COOKIE_DATA.VISITOR_ID) || '';
  useEffect(() => {
    setDeviceDetail({
      ...new Parser().getResult(),
      id,
    });
  }, [id]);
  return deviceDetail;
};
