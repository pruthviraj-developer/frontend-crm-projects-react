import React, { FC, useContext } from 'react';
import { NextNavLink } from '../next-nav-link';
import {
  NavBarWrapper,
  HopscotchImage,
  RightContent,
  CartIconWrapper,
  CartIconQuantity,
} from './StyledNavBar';
import { CartIcon, HopScotchIcon } from '@hs/icons';
import { CartItemQtyContext } from '@hs/framework';

export const NavBar: FC = () => {
  const cartContext = useContext(CartItemQtyContext);
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
          {cartContext.cartItemQty > 0 && (
            <CartIconQuantity>{cartContext.cartItemQty}</CartIconQuantity>
          )}
        </CartIconWrapper>
      </RightContent>
    </NavBarWrapper>
  );
};
