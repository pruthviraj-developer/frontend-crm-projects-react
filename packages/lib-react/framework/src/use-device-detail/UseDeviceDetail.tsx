import { useEffect, useState } from 'react';
import Parser from 'ua-parser-js';
export const useDeviceDetail = () => {
  const [deviceDetail, setDeviceDetail] = useState<Parser.IResult>();
  useEffect(() => {
    setDeviceDetail({ ...new Parser().getResult() });
  }, []);
  return deviceDetail;
};
