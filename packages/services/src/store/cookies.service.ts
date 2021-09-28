import Cookies from 'js-cookie';
import { SetCookieProps } from './Icookies.service';

const getCookies = (key: string) => {
  return Cookies.get(key);
};

const setCookies = ({ key, value, options }: SetCookieProps) => {
  return Cookies.set(`${key}`, value, {
    path: '/',
    ...options,
  });
};

const getCookieData = <T>(key: string) => {
  const cookie: T = JSON.parse(Cookies.get(key) || '{}');
  return cookie;
};

export const cookiesService = {
  getCookies,
  setCookies,
  getCookieData,
};
