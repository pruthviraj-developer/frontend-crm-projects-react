import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { NextNavLink } from '../../next-nav-link';
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
import {
  CartItemQtyContext,
  LoginContext,
  UserInfoContext,
} from '@hs/framework';
import { INavBarProps } from '../INavBar';
import {
  CartIcon,
  HopScotchIcon,
  IconSearch,
  IconWishListDefault,
} from '@hs/icons';
export const NavBar: FC<INavBarProps> = ({ showSearchPopup }: INavBarProps) => {
  const cartContext = useContext(CartItemQtyContext);
  const { updateLoginPopup } = useContext(LoginContext);
  const { userInfo } = useContext(UserInfoContext);
  const router = useRouter();
  const gotoWishList = () => {
    if (!(userInfo && userInfo.isLoggedIn)) {
      updateLoginPopup(true);
    } else {
      router.push({
        pathname: '/v2/wishlist',
        query: { fromScreen: 'Discover' },
      });
    }
  };
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
            fontSize="1.2rem"
            fontWeight="600"
          />
          <NextNavLink
            href="/helpcenter"
            name="Help"
            fontWeight="600"
            fontSize="1.2rem"
            display="inline-block"
            margin="16px 0 0 5px"
          />
        </NavLinkWrapper>
        <NavigationIconsWrapper>
          <NavIconWrapper onClick={showSearchPopup} marginRight={true}>
            <IconWrapper icon={IconSearch} />
          </NavIconWrapper>
          <NavIconWrapper onClick={gotoWishList}>
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
