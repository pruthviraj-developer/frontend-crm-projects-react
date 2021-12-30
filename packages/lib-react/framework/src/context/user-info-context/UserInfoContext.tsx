import React, { createContext, useState, useEffect, FC } from 'react';
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
  const [userInfo, setUserInfo] = useState<IUserInfoProps | undefined>();
  const { data: info, isSuccess } = useQuery<IUserInfoProps>(
    'info',
    productDetailsService.getUserInfo,
    {
      staleTime: Infinity,
      retry: false,
    }
  );

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

  useEffect(() => {
    if (isSuccess && info) {
      if (info.isLoggedIn) {
        setCookie(COOKIE_DATA.CUSTOMER_INFO, info);
        cookiesService.deleteCookie(COOKIE_DATA.GUEST_CUSTOMER_INFO);
      } else {
        setCookie(COOKIE_DATA.GUEST_CUSTOMER_INFO, info);
        cookiesService.deleteCookie(COOKIE_DATA.CUSTOMER_INFO);
      }
      if (info.cartItemQty !== undefined) {
        setCookie(COOKIE_DATA.CART_ITEM_QTY, info.cartItemQty);
      }
      setUserInfo(info);
    }
  }, [info, isSuccess]);

  const updateUserInfo = (data: IUserInfoProps) => {
    setUserInfo(data);
    setCookie(COOKIE_DATA.CUSTOMER_INFO, data);
    cookiesService.deleteCookie(COOKIE_DATA.GUEST_CUSTOMER_INFO);
  };
  return (
    <UserInfoContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
