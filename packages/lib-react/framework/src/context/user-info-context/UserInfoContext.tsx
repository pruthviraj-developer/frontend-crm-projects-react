import React, { createContext, FC } from 'react';
import { useQuery } from 'react-query';
import {
  productDetailsService,
  timeService,
  cookiesService,
} from '@hs/services';
import { IUserInfoProps } from 'product/types';
import { COOKIE_DATA } from '../../storage';
import { UserInfoProps } from './IUserInfoContext';

export const UserInfoContext = createContext<UserInfoProps>(
  {} as UserInfoProps
);

export const UserInfoProvider: FC<unknown> = ({ children }) => {
  const { data: userInfo, isSuccess: isSuccess } = useQuery<IUserInfoProps>(
    'userInfo',
    productDetailsService.getUserInfo,
    {
      staleTime: Infinity,
      retry: false,
    }
  );
  const expireProp = {
    expires: new Date(timeService.getCurrentTime() + 30 * 24 * 60 * 60 * 1000),
  };
  if (isSuccess && userInfo) {
    const setCookie = (key: string, value: any) => {
      cookiesService.setCookies({
        key,
        value,
        options: expireProp,
      });
    };
    if (userInfo.isLoggedIn) {
      setCookie(COOKIE_DATA.CUSTOMER_INFO, userInfo);
      cookiesService.deleteCookie(COOKIE_DATA.GUEST_CUSTOMER_INFO);
    } else {
      setCookie(COOKIE_DATA.GUEST_CUSTOMER_INFO, userInfo);
      cookiesService.deleteCookie(COOKIE_DATA.CUSTOMER_INFO);
    }
    if (userInfo.cartItemQty !== undefined) {
      setCookie(COOKIE_DATA.CART_ITEM_QTY, userInfo.cartItemQty);
    }
  }
  return (
    <UserInfoContext.Provider value={{ userInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
