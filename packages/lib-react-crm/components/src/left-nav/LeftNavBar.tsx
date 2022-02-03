import React, { FC } from 'react';
import { BackIcon } from '@hs/icons';
import { LeftNavBarProps, LeftNavItemProps } from './ILeftNavBar';
import {
  StyledNavLink,
  StyledIcon,
  LinkText,
  StyledLeftNavBar,
  StyledLink,
} from './StyledLeftNavBar';

const defaultItem: LeftNavItemProps = {
  linkUrl: '/intranet/welcome',
  linkText: 'CRM',
  icon: BackIcon,
};

const LeftNavItem: FC<LeftNavItemProps> = (props: LeftNavItemProps) => {
  return (
    <StyledNavLink
      to={props.linkUrl}
      key={props.linkText}
      activeClassName={'active'}
    >
      <StyledIcon icon={props.icon} />
      <LinkText>{props.linkText}</LinkText>
    </StyledNavLink>
  );
};

const LinkItem: FC<LeftNavItemProps> = (props: LeftNavItemProps) => {
  return (
    <StyledLink href={props.linkUrl} target={'_parent'}>
      <StyledIcon icon={props.icon} />
      <LinkText>{props.linkText}</LinkText>
    </StyledLink>
  );
};

export const LeftNavBar: FC<LeftNavBarProps> = (props: LeftNavBarProps) => {
  const list = props['navList'] ? props['navList'] : [];
  return (
    <StyledLeftNavBar>
      <LinkItem {...defaultItem}></LinkItem>
      {list?.map((item) => (
        <LeftNavItem key={item.linkText} {...item}></LeftNavItem>
      ))}
    </StyledLeftNavBar>
  );
};
