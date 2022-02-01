import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import * as gtm from './GTMLib';
const GoogleTagManager: FC<unknown> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', gtm.pageview);
    return () => {
      router.events.off('routeChangeComplete', gtm.pageview);
    };
  }, [router.events]);

  useEffect(() => {
    gtm.pageview(router.asPath, { shallow: false });
  }, [router.asPath]);

  return <>{children}</>;
};

export default GoogleTagManager;
