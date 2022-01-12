import { FooterDesktop, NavBarDesktop } from '@hs/components';
import { FC } from 'react';

export const Layout: FC<unknown> = ({ children }) => {
  return (
    <>
      <NavBarDesktop />
      <main>{children}</main>
      <FooterDesktop />
    </>
  );
};
