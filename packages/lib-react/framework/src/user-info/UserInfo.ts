import { useQuery } from 'react-query';
import {
  productDetailsService,
  timeService,
  cookiesService,
} from '@hs/services';
import { UserInfoProps } from './IUserInfo';

// const PERSISTENT_TICKET_COOKIE_NAME = 'hs_persistent_ticket';
const CUSTOMER_INFO_COOKIE_NAME = 'hs_customer_info';
// const CUSTOMER_SEGMENT_INFO = 'WEBSITE_customersegment';
const GUEST_CUSTOMER_INFO = 'hs_guest_customer_info';
const CART_ITEM_QTY_COOKIE_NAME = 'cart_item_quantity';

export const userInfo = () => {
  const {
    data: userData,
    isSuccess: isSuccess,
    isLoading: isLoading,
  } = useQuery<UserInfoProps>('userInfo', productDetailsService.getUserInfo, {
    staleTime: Infinity,
    retry: false,
  });

  if (isSuccess && userData) {
    // Store data in cookie and update service/cartQty
    const expireProp = {
      // Expire 30 days in the future
      expires: new Date(
        timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000
      ),
      path: '/',
    };
    if (userData.isLoggedIn) {
      cookiesService.setCookies({
        key: CUSTOMER_INFO_COOKIE_NAME,
        value: userData,
        options: expireProp,
      });
    } else {
      cookiesService.setCookies({
        key: GUEST_CUSTOMER_INFO,
        value: userData,
        options: expireProp,
      });
    }
    if (userData.cartItemQty !== undefined) {
      cookiesService.setCookies({
        key: CART_ITEM_QTY_COOKIE_NAME,
        value: userData.cartItemQty,
      });
    }
  }
  return {
    userInfo,
    isLoading,
  };
};
