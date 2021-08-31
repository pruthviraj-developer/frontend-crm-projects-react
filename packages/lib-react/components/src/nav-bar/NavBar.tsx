import React, { FC } from 'react';
import { INavBarProps } from './INavBar';
import { NextNavLink } from '../next-nav-link';
import {
  NavBarWrapper,
  HopscotchImage,
  RightContent,
  CartIconWrapper,
  CartIconQuantity,
} from './StyledNavBar';
import { CartIcon, HopScotchIcon } from '@hs/icons';

export const NavBar: FC<INavBarProps> = () => {
  return (
    <NavBarWrapper>
      <HopscotchImage>
        <HopScotchIcon></HopScotchIcon>
      </HopscotchImage>
      <RightContent>
        <NextNavLink href="/my/account/orders/" name="Account" />
        <NextNavLink href="/helpcenter" name="Help" />
        <CartIconWrapper>
          <CartIcon />
          <CartIconQuantity>5</CartIconQuantity>
        </CartIconWrapper>
      </RightContent>
    </NavBarWrapper>
  );
};
