import { FooterDesktop, NavBarDesktop } from '@hs/components';
import { FC } from 'react';
const Layout: FC<unknown> = ({ children }) => {
  const childProps = children as unknown as Record<string, Record<string, string>>;
  return (
    <>
      <NavBarDesktop />
      <main>{children}</main>
      {/* @ts-ignore: Unreachable code error */}
      <FooterDesktop
        {...{ showPopularSearch: childProps?.props?.showPopularSearch, urlPath: childProps?.props?.urlPath }}
      />
    </>
  );
};

export default Layout;
