import { CartItemQtyProvider } from '@hs/framework';
import { Footer, NavBar } from '@hs/components';
import Head from 'next/head';
import { FC } from 'react';
export const Layout: FC<unknown> = ({ children }) => {
  return (
    <CartItemQtyProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar></NavBar>
      <main>{children}</main>
      <Footer />
    </CartItemQtyProvider>
  );
};
