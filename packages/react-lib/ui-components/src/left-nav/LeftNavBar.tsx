import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Colors, fontWeight } from '@hs/utils';
import { BackIcon, SvgIcon } from '@hs/icons';
import { LeftNavBarProps, LeftNavItemProps } from './LeftNavBar.interface';

const defaultItem: LeftNavItemProps = {
  linkUrl: '/intranet/welcome',
  linkText: 'CRM',
  icon: BackIcon,
};

const StyledLeftNavBar = styled.div`
  /* display: flex;
  flex-direction: row; */
  width: 80px;
  background-color: ${Colors.GREY[500]};
  left: 0;
  height: 150vh;
  display: inline-block;
  z-index: 100;
  position: fixed;
  padding-top: 20px;
`;

const StyleLeftNavItem = styled.div`
  display: inline-block;
  width: 80px;
  cursor: pointer;
  opacity: 0.72;
  padding: 18px 8px;
  :hover {
    background-color: #2a3441;
    opacity: 1;
    color: ${Colors.PINK[400]};
  }
  &:focus {
    box-shadow: none;
    outline: none;
  }
`;
const Link = styled.a`
  outline: none;
  text-decoration: none;
  color: ${Colors.PINK[500]};
`;
const LinkText = styled.div`
  font-weight: ${fontWeight.medium};
  font-size: 10px;
  text-align: center;
  margin-top: 7px;
  color: white;
  opacity: 0.72;
`;

const StyledIcon = styled(SvgIcon)`
  margin: 0 20px;
  /* color: ${Colors.PINK[500]}; */
`;

const LeftNavItem: FC<LeftNavItemProps> = (props: LeftNavItemProps) => {
  return (
    <StyleLeftNavItem>
      <Link href={props.linkUrl} key={props.linkText}>
        <StyledIcon icon={props.icon} fill={Colors.PINK[400]} />
        <LinkText>CRM</LinkText>
      </Link>
    </StyleLeftNavItem>
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
