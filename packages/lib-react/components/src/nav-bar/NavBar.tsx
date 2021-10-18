import React, { FC, useContext } from 'react';
import { NextNavLink } from '../next-nav-link';
import Link from 'next/link';
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
import { CartItemQtyContext } from '@hs/framework';
import { INavBarProps } from './INavBar';
import {
  CartIcon,
  HopScotchIcon,
  IconSearch,
  IconWishListDefault,
} from '@hs/icons';

export const NavBar: FC<INavBarProps> = ({ showSearchPopup }: INavBarProps) => {
  const cartContext = useContext(CartItemQtyContext);
  const query = {
    ref: 'logo',
    funnel: 'Discover',
    from_screen: 'product',
    department: null,
    customTileId: null,
  };
  return (
    <NavBarWrapper>
      <Link
        href={{
          pathname: '/',
          query,
        }}
      >
        <HopscotchImage>
          <HopScotchIcon></HopScotchIcon>
        </HopscotchImage>
      </Link>
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
          <NavIconWrapper onClick={showSearchPopup} marginRight={true}>
            <IconWrapper icon={IconSearch} />
          </NavIconWrapper>
          <NavIconWrapper>
            <IconWrapper icon={IconWishListDefault} />
          </NavIconWrapper>
          <Link
            href={{
              pathname: '/v2/cart',
            }}
          >
            <CartIconWrapper>
              <CartIcon />
              {cartContext.cartItemQty > 0 && (
                <CartIconQuantity>{cartContext.cartItemQty}</CartIconQuantity>
              )}
            </CartIconWrapper>
          </Link>
        </NavigationIconsWrapper>
      </RightContent>
    </NavBarWrapper>
  );
};
