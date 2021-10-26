import { useQuery } from 'react-query';
import {
  productDetailsService,
  timeService,
  cookiesService,
} from '@hs/services';
import { IUserInfoProps } from 'product/types';
import { COOKIE_DATA } from '../storage';

export const userInfo = () => {
  const {
    data: userData,
    isSuccess: isSuccess,
    isLoading: isLoading,
  } = useQuery<IUserInfoProps>('userInfo', productDetailsService.getUserInfo, {
    staleTime: Infinity,
    retry: false,
  });

  if (isSuccess && userData) {
    // Store data in cookie and update service/cartQty
    const setCookie = (key: string, value: any) => {
      const expireProp = {
        expires: new Date(
          timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000
        ),
      };
      cookiesService.setCookies({
        key,
        value,
        options: expireProp,
      });
    };
    if (userData.isLoggedIn) {
      setCookie(COOKIE_DATA.CUSTOMER_INFO, userData);
    } else {
      setCookie(COOKIE_DATA.GUEST_CUSTOMER_INFO, userData);
    }
    if (userData.cartItemQty !== undefined) {
      setCookie(COOKIE_DATA.CART_ITEM_QTY, userData.cartItemQty);
    }
    setCookie(COOKIE_DATA.PERSISTENT_TICKET, userData.persistentTicket);
  }
  return {
    userInfo: userData,
    isLoading,
  };
};
