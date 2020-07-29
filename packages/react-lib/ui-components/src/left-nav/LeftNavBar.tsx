import React, { FC } from 'react';
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
  color: ${Colors.PINK[500]};
  opacity: 0.72;
`;

const StyledIcon = styled(SvgIcon)`
  margin: 0 20px;
  fill: ${Colors.PINK[500]};
`;

const StyleLeftNavItem = styled.div`
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
  }
  &:focus {
    box-shadow: none;
    outline: none;
  }
`;
const LeftNavItem: FC<LeftNavItemProps> = (props: LeftNavItemProps) => {
  return (
    <StyleLeftNavItem>
      <Link href={props.linkUrl} key={props.linkText}>
        <StyledIcon icon={props.icon} />
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
