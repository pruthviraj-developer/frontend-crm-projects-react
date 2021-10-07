import React, { FC } from 'react';
import { INavBarProps } from './INavBar';
import { NextNavLink } from '../next-nav-link';
import {
  NavBarWrapper,
  NavLinkWrapper,
  NavIconWrapper,
  NavigationIconsWrapper,
  HopscotchImage,
  RightContent,
  CartIconWrapper,
  CartIconQuantity,
  IconWrapper,
} from './StyledNavBar';
import {
  CartIcon,
  HopScotchIcon,
  IconSearch,
  IconWishListDefault,
} from '@hs/icons';

export const NavBar: FC<INavBarProps> = ({ count }: INavBarProps) => {
  return (
    <NavBarWrapper>
      <HopscotchImage>
        <HopScotchIcon></HopScotchIcon>
      </HopscotchImage>
      <RightContent>
        <NavLinkWrapper>
          <NextNavLink
            href="/my/account/orders/"
            name="Account"
            display="inline-block"
          />
          <NextNavLink
            href="/helpcenter"
            name="Help"
            fontWeight="500"
            display="inline-block"
            margin="16px 0 0 5px"
          />
        </NavLinkWrapper>
        <NavigationIconsWrapper>
          <NavIconWrapper marginRight={true}>
            <IconWrapper icon={IconSearch} />
          </NavIconWrapper>
          <NavIconWrapper>
            <IconWrapper icon={IconWishListDefault} />
          </NavIconWrapper>
          <CartIconWrapper>
            <CartIcon />
            {count > 0 && <CartIconQuantity>{count}</CartIconQuantity>}
          </CartIconWrapper>
        </NavigationIconsWrapper>
      </RightContent>
    </NavBarWrapper>
  );
};
