import { FooterDesktop, NavBarDesktop } from '@hs/components';
import { FC } from 'react';
const Layout: FC<unknown> = ({ children }) => {
  return (
    <>
      <NavBarDesktop />
      <main>{children}</main>
      <FooterDesktop />
    </>
  );
};

export default Layout;
