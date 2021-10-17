import { CartItemQtyProvider } from '@hs/framework';
import { Footer, NavBar } from '@hs/components';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useModal } from 'react-hooks-use-modal';
const SearchPopupComponent = dynamic(() => import('../../components/search-popup/SearchPopup'), {
  ssr: false,
});
export const Layout: FC<unknown> = ({ children }) => {
  const [SearchPopupModal, openSearchPopup, closeSearchPopup, isSearchPopupOpen] = useModal('root', {
    preventScroll: false,
    closeOnOverlayClick: true,
  });
  return (
    <CartItemQtyProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar showSearchPopup={openSearchPopup}></NavBar>
      <main>{children}</main>
      <Footer />
      <SearchPopupModal>
        {isSearchPopupOpen && <SearchPopupComponent {...{ close: closeSearchPopup }}></SearchPopupComponent>}
      </SearchPopupModal>
    </CartItemQtyProvider>
  );
};
