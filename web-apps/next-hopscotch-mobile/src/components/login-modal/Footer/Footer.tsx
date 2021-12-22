import React, { FC } from 'react';
import { IFooterProps } from './IFooter';
import { FooterWrapper, FooterDetails, ActionLink, Title, HrLine } from './StyledFooter';
export const Footer: FC<IFooterProps> = ({ title, link }: IFooterProps) => {
  return (
    <FooterWrapper>
      <HrLine />
      <FooterDetails>
        <Title>{title}</Title>
        <ActionLink>{link}</ActionLink>
      </FooterDetails>
    </FooterWrapper>
  );
};
