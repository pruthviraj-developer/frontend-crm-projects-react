import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { NextNavLink } from '../../next-nav-link';
import Link from 'next/link';
import {
  NavBarWrapper,
  NavLinkWrapper,
  NotificationDot,
  NavIconWrapperSearch,
  NavIconWrapperWishList,
  NavigationIconsWrapper,
  HopscotchImage,
  RightContent,
  BackIconWrapper,
  CartIconWrapper,
} from './StyledNavBar';
import { IconWrapper, CartIconQuantity } from './../StyledNavBar';
import {
  CartItemQtyContext,
  LoginContext,
  UserInfoContext,
  useSessionStorage,
  SESSION_DATA,
} from '@hs/framework';
import { INavBarProps } from '../INavBar';
import {
  CartIcon,
  HopScotchIcon,
  IconSearch,
  IconArrowWhite,
  IconWishListDefault,
} from '@hs/icons';
export const NavBar: FC<INavBarProps> = ({ showSearchPopup }: INavBarProps) => {
  const cartContext = useContext(CartItemQtyContext);
  const { updateLoginPopup } = useContext(LoginContext);
  const { userInfo, showAccountNotification } = useContext(UserInfoContext);
  const [getCurrentUrl] = useSessionStorage<string>(
    SESSION_DATA.CURRENT_URL,
    null
  );
  const router = useRouter();
  const goBack = () => {
    if (
      document.referrer === '' ||
      document.referrer.includes('hopscotch') ||
      getCurrentUrl
    ) {
      router.back();
    } else {
      router.push({
        pathname: '/',
      });
    }
  };
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
      <BackIconWrapper onClick={goBack}>
        <IconWrapper icon={IconArrowWhite} />
      </BackIconWrapper>
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
          {showAccountNotification && <NotificationDot />}
          <NextNavLink
            href="/my/account/orders"
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
            padding="8px 6px 8px 5px"
          />
        </NavLinkWrapper>
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
