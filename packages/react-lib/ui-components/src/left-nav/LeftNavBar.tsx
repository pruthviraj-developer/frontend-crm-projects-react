import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Colors, fontWeight } from '@hs/utils';
import { SvgIcon, BackIcon } from '@hs/icons';
import { LeftNavBarProps, LeftNavItemProps } from './ILeftNavBar';

const defaultItem: LeftNavItemProps = {
  linkUrl: '/intranet/welcome',
  linkText: 'CRM',
  icon: BackIcon,
};

const StyledLeftNavBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  background-color: ${Colors.GREY_SHADE[500]};
  height: 95vh;
  float: left;
`;
const LinkText = styled.div`
  font-weight: ${fontWeight.medium};
  font-size: 10px;
  text-align: center;
  margin-top: 7px;
  color: white;
`;

const StyledIcon = styled(SvgIcon)`
  margin: 0 20px;
  fill: white;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  opacity: 0.72;
  padding: 18px 8px;
  color: white;
  :hover {
    background-color: ${Colors.BLUE[500]};
    opacity: 1;
  }
  &.active {
    background-color: ${Colors.BLUE[500]};
    opacity: 1;
    ${StyledIcon} {
      fill: ${Colors.PINK[500]};
    }
    ${LinkText} {
      color: ${Colors.PINK[500]};
    }
  }
`;

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

export const LeftNavBar: FC<LeftNavBarProps> = (props: LeftNavBarProps) => {
  const list = props['navList'] ? props['navList'] : [];
  return (
    <StyledLeftNavBar>
      {[{ ...defaultItem }, ...list]?.map((item) => (
        <LeftNavItem key={item.linkText} {...item}></LeftNavItem>
      ))}
    </StyledLeftNavBar>
  );
};
