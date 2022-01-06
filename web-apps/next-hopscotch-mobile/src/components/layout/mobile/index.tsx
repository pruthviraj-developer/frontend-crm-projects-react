import { Footer, NavBar } from '@hs/components';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useModal } from 'react-hooks-use-modal';
const SearchPopupComponent = dynamic(() => import('@/components/search-mobile'), {
  ssr: false,
});
const Layout: FC<unknown> = ({ children }) => {
  const [SearchPopupModal, openSearchPopup, closeSearchPopup, isSearchPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });
  return (
    <>
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
