import React, { FC, useContext, useState } from 'react';
import { NextNavLink } from '@hs/components';
import {
  NavBarWrapper,
  NotificationBar,
  NavLinkWrapper,
  NavIconWrapper,
  NavigationIconsWrapper,
  HopscotchImage,
  RightContent,
  CartIconWrapper,
  CartIconQuantity,
  IconWrapper,
  FilteredBy,
  FilterWrapper,
  SearchWrapper,
  InputSearch,
  SearchIconWrapper,
} from './StyledNavBarDesktop';
import { INavBarProps } from '../INavBar';

// import { useRouter } from 'next/router';
import Link from 'next/link';

import { CartIcon, HopScotchIcon, IconSearch } from '@hs/icons';

import { CartItemQtyContext } from '@hs/framework';
import Search from '@/components/search/Search';

export const NavBarDesktop: FC<INavBarProps> = ({ showSearchPopup }: INavBarProps) => {
  // const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const cartContext = useContext(CartItemQtyContext);
  const query = {
    ref: 'logo',
    funnel: 'Discover',
    from_screen: 'product',
    department: null,
    customTileId: null,
  };

  const showSearchField = () => {
    setShowSearch(!showSearch);
    // showSearchPopup();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const close = () => {};
  return (
    <NavBarWrapper>
      <NotificationBar>
        <NextNavLink
          href="/my/account/orders/?funnel=Account"
          name="Account"
          margin="0"
          padding="8px 12px 6px"
          fontWeight="400"
          fontSize="1.2rem"
        />
        <NextNavLink
          href="/help"
          name="24x7 Customer care"
          margin="0"
          padding="8px 0 8px 12px"
          fontWeight="400"
          fontSize="1.2rem"
        />
      </NotificationBar>
      <RightContent>
        <NavLinkWrapper>
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
          <FilterWrapper>
            <NextNavLink
              href="/?funnel=Discover&amp;from_screen=product"
              name="Discover"
              display="inline-block"
              margin="0"
              fontSize="14px"
              line-height="16px"
              padding="20px 0 18px 0"
              color="#fff"
            />
            <FilteredBy>
              <NextNavLink
                href="/?funnel=Discover&amp;from_screen=product&amp;ref=navigation&amp;department=null&amp;customTileId=null"
                name="Boys 1-5 years"
                display="inline-block"
                margin="0"
                padding="0"
              />
            </FilteredBy>
          </FilterWrapper>
          <NextNavLink
            href="/moments?funnel=Moments&amp;from_screen=product"
            name="Moments"
            display="inline-block"
            margin="0 32px 0 0"
            fontSize="14px"
            line-height="16px"
            padding="20px 0 18px 0"
            color="#fff"
          />
          <NextNavLink
            href="/blog/"
            name="Blog"
            display="inline-block"
            margin="0 32px 0 0"
            fontSize="14px"
            line-height="16px"
            padding="20px 0 18px 0"
            color="#fff"
          />
        </NavLinkWrapper>
        <NavigationIconsWrapper>
          {showSearch ? (
            <NavIconWrapper onClick={showSearchField} marginRight={true}>
              <IconWrapper icon={IconSearch} />
            </NavIconWrapper>
          ) : (
            <SearchWrapper>
              <SearchIconWrapper onClick={showSearchField} icon={IconSearch} />
              <InputSearch onChange={handleOnChange} placeholder="Search for products" />
              <Search {...{ close, searchText }} />
            </SearchWrapper>
          )}
          <Link
            href={{
              pathname: '/w/cart',
            }}
          >
            <CartIconWrapper>
              <CartIcon />
              {cartContext.cartItemQty > 0 && <CartIconQuantity>{cartContext.cartItemQty}</CartIconQuantity>}
            </CartIconWrapper>
          </Link>
        </NavigationIconsWrapper>
      </RightContent>
    </NavBarWrapper>
  );
};
