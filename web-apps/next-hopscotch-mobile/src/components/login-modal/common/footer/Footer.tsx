import React, { FC } from 'react';
import { SIGNIN } from '../../constants';
import { IFooterProps } from './IFooter';

import { FooterWrapper, FooterDetails, ActionLink, Title, HrLine } from './StyledFooter';
export const Footer: FC<IFooterProps> = ({ title, link, from, updateUserStatus }: IFooterProps) => {
  return (
    <FooterWrapper>
      <HrLine />
      <FooterDetails>
        <Title>{title}</Title>
        <ActionLink
          onClick={() => {
            updateUserStatus(SIGNIN === from ? true : false);
          }}
        >
          {link}
        </ActionLink>
      </FooterDetails>
    </FooterWrapper>
  );
};
