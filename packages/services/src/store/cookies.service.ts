import Cookies from 'js-cookie';
import { SetCookieProps } from './Icookies.service';

const getCookies = (key: string) => {
  return Cookies.get(key);
};

const setCookies = ({ key, value, options }: SetCookieProps) => {
  const storeValue =
    typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
  return Cookies.set(`${key}`, storeValue, {
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
