import { FooterDesktop } from '@hs/components';
import Head from 'next/head';
import { FC } from 'react';
import { NavBarDesktop } from '../nav-bar';

export const Layout: FC<unknown> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarDesktop></NavBarDesktop>
      <main>{children}</main>
      <FooterDesktop />
    </>
  );
};
