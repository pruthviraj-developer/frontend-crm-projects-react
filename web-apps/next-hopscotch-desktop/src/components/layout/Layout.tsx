import { FooterDesktop, NavBarDesktop } from '@hs/components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useModal } from 'react-hooks-use-modal';

const SearchPopupComponent = dynamic(() => import('@/components/search-popup/SearchPopup'), {
  ssr: false,
});

export const Layout: FC<unknown> = ({ children }) => {
  const [SearchPopupModal, openSearchPopup, closeSearchPopup, isSearchPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarDesktop showSearchPopup={openSearchPopup}></NavBarDesktop>
      <main>{children}</main>
      <FooterDesktop />
      <SearchPopupModal>
        {isSearchPopupOpen && <SearchPopupComponent {...{ close: closeSearchPopup }}></SearchPopupComponent>}
      </SearchPopupModal>
    </>
  );
};
