import { FooterDesktop, NavBarDesktop } from '@hs/components';
import Head from 'next/head';
import { FC } from 'react';

export const Layout: FC<unknown> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarDesktop />
      <main>{children}</main>
      <FooterDesktop />
    </>
  );
};
