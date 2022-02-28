import { Footer, NavBar } from '@hs/components';
import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useModal } from 'react-hooks-use-modal';
import { useSessionStorage, SESSION_DATA } from '@hs/framework';
import OrientationScreen from '@/components/orientation-screen/OrientationScreen';
const SearchPopupComponent = dynamic(() => import('@/components/search-mobile'), {
  ssr: false,
});
const Layout: FC<unknown> = ({ children }) => {
  const router = useRouter();
  const [, setCurrentUrl] = useSessionStorage<string>(SESSION_DATA.CURRENT_URL, null);
  const [SearchPopupModal, openSearchPopup, closeSearchPopup, isSearchPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });
  const [showOrientationChange, setOrientationChange] = useState<boolean>(false);
  useEffect(() => {
    const orientationChange = () => {
      try {
        const angle = (screen.orientation && screen.orientation.angle) || 0;
        if (angle === 90 || angle === 270) {
          setOrientationChange(true);
          true;
        } else {
          setOrientationChange(false);
        }
      } catch (e) {
        //
      }
    };
    orientationChange();
    window.addEventListener('orientationchange', orientationChange);
    return () => {
      window.removeEventListener('orientationchange', orientationChange);
    };
  }, []);

  useEffect(() => {
    const setUrl = (url: string) => {
      setCurrentUrl(url);
    };
    router.events.on('routeChangeComplete', setUrl);
    return () => {
      router.events.off('routeChangeComplete', setUrl);
    };
  }, [router.asPath]);
  return (
    <>
      {showOrientationChange && <OrientationScreen />}
      <NavBar showSearchPopup={openSearchPopup}></NavBar>
      <main>{children}</main>
      <Footer />
      <SearchPopupModal>
        {isSearchPopupOpen && <SearchPopupComponent {...{ close: closeSearchPopup }}></SearchPopupComponent>}
      </SearchPopupModal>
    </>
  );
};

export default Layout;
