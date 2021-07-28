import React, { FC } from 'react';
import { IFooterProps } from './Ifooter';
import {
  Copyright,
  FooterWrapper,
  FooterElements,
  FooterElement,
  Link,
} from './FooterCss';
export const Footer: FC<IFooterProps> = ({}: IFooterProps) => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <FooterElements>
        <FooterElement>
          <Link href="/about/AboutUs">About Us</Link>
        </FooterElement>
        <FooterElement>
          <Link href="/about/Terms">Terms of Service </Link>
        </FooterElement>
        <FooterElement>
          <Link href="/about/privacy">Privacy Policy</Link>
        </FooterElement>
      </FooterElements>
      <Copyright>
        &#169; 2011-{currentYear} Hopscotch. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};
