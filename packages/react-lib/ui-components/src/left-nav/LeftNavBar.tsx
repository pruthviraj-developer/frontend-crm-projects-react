import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Colors, fontWeight } from '@hs/utils';
import { BackIcon, SvgIcon } from '@hs/icons';
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
  height: 100vh;
  float: left;
`;
const activeClassName = 'active';
const StyledNavLink = styled(NavLink)`
  &.${activeClassName} {
    color: blue;
  }
  text-decoration: none;
`;
const LinkText = styled.div`
  font-weight: ${fontWeight.medium};
  font-size: 10px;
  text-align: center;
  margin-top: 7px;
  color: ${Colors.PINK[500]};
`;

const StyledIcon = styled(SvgIcon)`
  margin: 0 20px;
  fill: ${Colors.PINK[500]};
`;

const StyledLeftNavItem = styled.div`
  cursor: pointer;
  opacity: 0.72;
  padding: 18px 8px;
  color: ${Colors.PINK[500]};
  :hover {
    background-color: #2a3441;
    opacity: 1;
    ${StyledIcon} {
      fill: white;
    }
    ${LinkText} {
      color: white;
    }
  }
  &:focus {
    box-shadow: none;
    outline: none;
  }
`;
const LeftNavItem: FC<LeftNavItemProps> = (props: LeftNavItemProps) => {
  return (
    <StyledLeftNavItem>
      <StyledNavLink
        to={props.linkUrl}
        key={props.linkText}
        activeClassName="active"
      >
        <StyledIcon icon={props.icon} />
        <LinkText>{props.linkText}</LinkText>
      </StyledNavLink>
    </StyledLeftNavItem>
  );
};

export const LeftNavBar: FC<LeftNavBarProps> = (props: LeftNavBarProps) => {
  return (
    <StyledLeftNavBar>
      <LeftNavItem {...defaultItem}></LeftNavItem>
      {props.navList?.map((item) => (
        <LeftNavItem key={item.linkText} {...item}></LeftNavItem>
      ))}
    </StyledLeftNavBar>
  );
};
