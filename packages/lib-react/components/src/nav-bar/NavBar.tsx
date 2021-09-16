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

export const NavBar: FC<INavBarProps> = ({ count }: INavBarProps) => {
  return (
    <NavBarWrapper>
      <HopscotchImage>
        <HopScotchIcon></HopScotchIcon>
      </HopscotchImage>
      <RightContent>
        <NextNavLink
          href="/my/account/orders/"
          name="Account"
          display="inline-block"
        />
        <NextNavLink href="/helpcenter" name="Help" display="inline-block" />
        <CartIconWrapper>
          <CartIcon />
          {count > 0 && <CartIconQuantity>{count}</CartIconQuantity>}
        </CartIconWrapper>
      </RightContent>
    </NavBarWrapper>
  );
};
