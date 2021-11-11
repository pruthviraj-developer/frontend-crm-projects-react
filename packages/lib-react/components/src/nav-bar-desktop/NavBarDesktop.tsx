import React, { FC } from 'react';
import { NextNavLink } from '../next-nav-link';
import { NavBarWrapper, NotificationBar } from './StyledNavBarDesktop';
import { INavBarDesktopProps } from './INavBarDesktop';
export const NavBarDesktop: FC<INavBarDesktopProps> = () => {
  // const router = useRouter();
  // const query = {
  //   ref: 'logo',
  //   funnel: 'Discover',
  //   from_screen: 'product',
  //   department: null,
  //   customTileId: null,
  // };
  return (
    <NavBarWrapper>
      <NotificationBar>
        <NextNavLink
          href="/my/account/orders/?funnel=Account"
          name="Account"
          margin="0"
          padding="8px 12px 6px"
          fontWeight="400"
        />
        <NextNavLink
          href="/help"
          name="24x7 Customer care"
          margin="0"
          padding="8px 0 8px 12px"
          fontWeight="400"
        />
      </NotificationBar>
      {/* <div>
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
      </div> */}
    </NavBarWrapper>
  );
};
