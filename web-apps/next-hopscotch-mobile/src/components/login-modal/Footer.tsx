import React, { FC } from 'react';
import { IFooterProps } from './ILoginModal';
import { FooterWrapper, FooterDescription, FooterDescriptionLink } from './StyledLoginModal';
export const Footer: FC<IFooterProps> = ({
  footerDescription,
  footerLink,
  footerLinkText,
  signInOrJoin,
}: IFooterProps) => {
  return (
    <FooterWrapper>
      <FooterDescription>{footerDescription}</FooterDescription>
      <FooterDescriptionLink
        onClick={() => {
          signInOrJoin(footerLink);
        }}
      >
        {footerLinkText}
      </FooterDescriptionLink>
    </FooterWrapper>
  );
};
