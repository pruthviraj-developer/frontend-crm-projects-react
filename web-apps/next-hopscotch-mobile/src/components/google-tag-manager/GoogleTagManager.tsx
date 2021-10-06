import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import * as gtm from './GTMLib';
import { useSessionStorage, SESSION_DATA, IFunnelData, ISegmentData } from '@hs/framework';
const GoogleTagManager: FC<unknown> = ({ children }) => {
  const router = useRouter();
  const [, setOaData] = useSessionStorage<IFunnelData>(SESSION_DATA.OA_DATA, null);
  const [, setSegmentData] = useSessionStorage<ISegmentData>(SESSION_DATA.SEGMENT_DATA, null);
  useEffect(() => {
    router.events.on('routeChangeComplete', gtm.pageview);
    return () => {
      router.events.off('routeChangeComplete', gtm.pageview);
    };
  }, [router.events]);

  useEffect(() => {
    if (router.asPath.indexOf('?') > -1) {
      const routeWithoutParams = router.asPath.split('?')?.[0];
      const {
        funnel,
        funnel_tile,
        funnel_section,
        section,
        subsection: sub_section,
        source = '',
        plp,
        quickshop = 'No',
      }: IFunnelData = router.query;
      const { from_screen, from_section, extraSegdata }: ISegmentData = router.query;
      setOaData({ funnel, funnel_tile, funnel_section, section, sub_section, source, plp, quickshop });
      setSegmentData({ from_screen, from_section, extraSegdata });
      router.replace(routeWithoutParams, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);
  return <>{children}</>;
};

export default GoogleTagManager;
