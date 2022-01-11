import { FooterDesktop, NavBarDesktop } from '@hs/components';
import { FC } from 'react';

export const Layout: FC<unknown> = ({ children }) => {
  return (
    <>
<<<<<<< HEAD
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
=======
      <NavBarDesktop />
>>>>>>> WUI-289
      <main>{children}</main>
      <FooterDesktop />
    </>
  );
};
