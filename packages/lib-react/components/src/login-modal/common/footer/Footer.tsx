import React, { FC } from 'react';
import { IFooterProps } from './IFooter';

import {
  FooterWrapper,
  FooterDetails,
  ActionLink,
  Title,
  HrLine,
} from './StyledFooter';
export const Footer: FC<IFooterProps> = ({
  title,
  link,
  from,
  updateUserStatus,
}: IFooterProps) => {
  return (
    <FooterWrapper>
      <HrLine />
      <FooterDetails>
        <Title>{title}</Title>
        <ActionLink
          onClick={() => {
            updateUserStatus(from);
          }}
        >
          {link}
        </ActionLink>
      </FooterDetails>
    </FooterWrapper>
  );
};