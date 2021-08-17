import React, { FC } from 'react';
import { INavBarProps } from './INavBar';
import {
  NavBarWrapper,
  HopscotchImage,
  RightContent,
  CartIconWrapper,
  CartIconQuantity,
  Link,
} from './StyledNavBar';
import { CartIcon, HopScotchIcon } from '@hs/icons';

export const NavBar: FC<INavBarProps> = ({}: INavBarProps) => {
  return (
    <NavBarWrapper>
      <HopscotchImage>
        <HopScotchIcon></HopScotchIcon>
      </HopscotchImage>
      <RightContent>
        <Link href="/my/account/orders/">Account</Link>
        <Link href="/helpcenter">Help</Link>
        <CartIconWrapper>
          <CartIcon />
          <CartIconQuantity>5</CartIconQuantity>
        </CartIconWrapper>
      </RightContent>
    </NavBarWrapper>
  );
};
