import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { NextNavLink } from '../next-nav-link';
import Link from 'next/link';
import { cookiesService } from '@hs/services';
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
import { CartItemQtyContext, LoginContext } from '@hs/framework';
import { INavBarProps, IUserInfoProps } from './INavBar';
import {
  CartIcon,
  HopScotchIcon,
  IconSearch,
  IconWishListDefault,
} from '@hs/icons';
const CUSTOMER_INFO_COOKIE_NAME = 'hs_customer_info';
export const NavBar: FC<INavBarProps> = ({ showSearchPopup }: INavBarProps) => {
  const cartContext = useContext(CartItemQtyContext);
  const { updateLoginPopup } = useContext(LoginContext);
  const router = useRouter();
  const gotoWishList = () => {
    const CUSTOMER_INFO: IUserInfoProps = cookiesService.getCookieData(
      CUSTOMER_INFO_COOKIE_NAME
    );
    if (!(CUSTOMER_INFO && CUSTOMER_INFO.isLoggedIn)) {
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
