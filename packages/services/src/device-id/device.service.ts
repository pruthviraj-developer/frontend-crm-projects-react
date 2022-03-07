import { cookiesService } from '../store/cookies.service';
import { timeService } from '../time/time.service';
const VISITORID = 'VISITOR_ID';
const getDeviceId = () => {
  let d = new Date().getTime();
  if (
    typeof window !== 'undefined' &&
    window.performance &&
    typeof window.performance.now === typeof function () {}
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  const expireProp = {
    expires: new Date(timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000),
  };
  cookiesService.setCookies({
    key: VISITORID,
    value: uuid,
    options: expireProp,
  });
  return uuid;
};

export const deviceService = {
  getDeviceId,
};
