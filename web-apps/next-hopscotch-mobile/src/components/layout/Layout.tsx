import { Footer, NavBar } from '@hs/components';
import Head from 'next/head';
import { FC } from 'react';

export const Layout: FC<unknown> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar count={0}></NavBar>
      <main>{children}</main>
      <Footer />
    </>
  );
};
