import { useCookies } from 'react-cookie';
import { SetCookieProps, GetCookieProps } from './Icookies.service';

const [cookies, setCookie] = useCookies();

const getCookies = (params: GetCookieProps) => {
  // @ts-ignore: Unreachable code error
  return cookies(params.key);
};

const setCookies = (params: SetCookieProps) => {
  return setCookie(`${params.key}`, params.value, {
    path: '/',
    ...params.options,
  });
};

export const cookiesService = {
  getCookies,
  setCookies,
};
