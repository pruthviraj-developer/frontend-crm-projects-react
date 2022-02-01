import React, { createContext, useState, useEffect, FC } from 'react';
import { useQuery } from 'react-query';
import {
  productDetailsService,
  timeService,
  cookiesService,
} from '@hs/services';
import { IUserInfoProps } from 'product/types';
import { COOKIE_DATA, LOCAL_DATA } from '../../storage';
import { UserInfoProps, INotificationProps } from './IUserInfoContext';
import { IUtmParam } from './../../types';
export const UserInfoContext = createContext<UserInfoProps>(
  {} as UserInfoProps
);

export const UserInfoProvider: FC<unknown> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<IUserInfoProps | undefined>();
  const [showAccountNotification, setAccountNotification] =
    useState<boolean>(false);
  const [utmParams, setUtmParams] = useState<IUtmParam>();
  const { data: info, isSuccess } = useQuery<IUserInfoProps>(
    'info',
    () => productDetailsService.getUserInfo({ ...utmParams }),
    {
      staleTime: Infinity,
      retry: false,
      enabled: utmParams != undefined,
    }
  );

  const { data: notification, isSuccess: isNotificationSuccess } =
    useQuery<INotificationProps>(
      'notification',
      productDetailsService.getAccountCardsCount,
      {
        staleTime: Infinity,
        retry: false,
        enabled: userInfo && userInfo.isLoggedIn === true ? true : false,
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
  const updateUtmParams = () => {
    let params: IUtmParam = {};
    const cookieUtmParams: IUtmParam = cookiesService.getCookieData(
      COOKIE_DATA.HS_UTM_PARAMS
    );
    if (cookieUtmParams) {
      params = {
        utm_campaign: cookieUtmParams['utm-campaign'],
        utm_medium: cookieUtmParams['utm-medium'],
        utm_source: cookieUtmParams['utm-source'],
      };
      if (cookieUtmParams['utm-content']) {
        params['utm-content'] = cookieUtmParams['utm-content'];
      }
      if (cookieUtmParams['utm-date']) {
        params['utm_date'] = cookieUtmParams['utm-date'];
      }
      if (cookieUtmParams['utm-term']) {
        params['utm_term'] = cookieUtmParams['utm-term'];
      }
    }
    setUtmParams(params);
  };

  useEffect(() => {
    setAccountNotification(false);
    if (isNotificationSuccess && userInfo?.isLoggedIn) {
      if (notification?.action === LOCAL_DATA.SUCCESS) {
        setAccountNotification(notification.count ? true : false);
      }
    }
  }, [userInfo, notification, isNotificationSuccess]);

  useEffect(() => {
    if (utmParams) {
      const deepLink: IUtmParam =
        cookiesService.getCookieData(COOKIE_DATA.HS_DEEPLINK_PARAMS) || {};
      const deeplink = deepLink.deeplink || '';
      const params: IUtmParam = { ...utmParams };
      const {
        utm_campaign = '',
        utm_medium = '',
        utm_source = '',
      }: IUtmParam = params;
      productDetailsService.postUtmParams(params, {
        deeplink,
        utm_campaign,
        utm_medium,
        utm_source,
      });
    }
  }, [utmParams]);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        showAccountNotification,
        updateUserInfo,
        updateUtmParams,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
