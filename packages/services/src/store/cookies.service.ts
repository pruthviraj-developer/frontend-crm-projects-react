import Cookies from 'js-cookie';
import { SetCookieProps, GetCookieProps } from './Icookies.service';

const getCookies = (params: GetCookieProps) => {
  return Cookies.get(params.key);
};

const setCookies = ({ key, value, options }: SetCookieProps) => {
  return Cookies.set(`${key}`, value, {
    path: '/',
    ...options,
  });
};

export const cookiesService = {
  getCookies,
  setCookies,
};
