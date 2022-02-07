import { useEffect, FC, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import * as gtm from './GTMLib';
import { UserInfoContext, useDeviceDetail } from '@hs/framework';
import { IRouteChange } from './GTMLib';
const GoogleTagManager: FC<unknown> = ({ children }) => {
  const { userInfo } = useContext(UserInfoContext);
  const deviceDetail = useDeviceDetail();
  const router = useRouter();
  const routeChangeHandler = useCallback(
    (url: URL | string, { shallow }: IRouteChange) => {
      gtm.pageview(url, {
        shallow,
        data: userInfo?.isLoggedIn
          ? {
              userId: userInfo.userId,
              email: userInfo.email,
              name: userInfo.firstName + ' ' + userInfo.lastName,
              dimension1: deviceDetail.device.type || 'computer',
            }
          : { dimension1: deviceDetail.device.type || 'computer' },
      });
    },
    [userInfo, deviceDetail?.device?.type],
  );
  useEffect(() => {
    router.events.on('routeChangeComplete', routeChangeHandler);
    return () => {
      router.events.off('routeChangeComplete', routeChangeHandler);
    };
  }, [routeChangeHandler, router.events]);

  useEffect(() => {
    if (userInfo && window) {
      routeChangeHandler(window.location.pathname, {
        shallow: true,
      });
    }
  }, [routeChangeHandler, userInfo]);

  return <>{children}</>;
};

export default GoogleTagManager;
