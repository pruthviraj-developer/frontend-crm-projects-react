import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  LeftContent,
  RightContent,
  NavBarWrapper,
  HopscotchImage,
  BackIconWrapper,
  CartIconWrapper,
  HopscotchShortImage,
  NavIconWrapperSearch,
  NavIconWrapperWishList,
  NavigationIconsWrapper,
} from './StyledNavBar';
import { IconWrapper, CartIconQuantity } from './../StyledNavBar';
import {
  CartItemQtyContext,
  LoginContext,
  UserInfoContext,
} from '@hs/framework';
import { INavBarProps } from '../INavBar';
import {
  CartIcon,
  IconSearch,
  HopScotchIcon,
  IconArrowWhite,
  HopScotchShortIcon,
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
      <LeftContent>
        <Link
          href={{
            pathname: '/',
            query,
          }}
        >
          <BackIconWrapper>
            <IconWrapper icon={IconArrowWhite} />
          </BackIconWrapper>
        </Link>
        <Link
          href={{
            pathname: '/',
            query,
          }}
        >
          <HopscotchImage>
            <HopScotchIcon />
          </HopscotchImage>
        </Link>
        <Link
          href={{
            pathname: '/',
            query,
          }}
        >
          <HopscotchShortImage>
            <HopScotchShortIcon />
          </HopscotchShortImage>
        </Link>
      </LeftContent>
      <RightContent>
        <NavigationIconsWrapper>
          <NavIconWrapperSearch onClick={showSearchPopup}>
            <IconWrapper icon={IconSearch} />
          </NavIconWrapperSearch>
          <NavIconWrapperWishList onClick={gotoWishList}>
            <IconWrapper icon={IconWishListDefault} />
          </NavIconWrapperWishList>
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
