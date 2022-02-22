import React, { FC, useRef, useContext, useEffect, useState } from 'react';
import { NextNavLink } from '../../next-nav-link';
import {
  NavBarWrapper,
  NotificationBar,
  NavLinkWrapper,
  NavIconWrapper,
  NavigationIconsWrapper,
  HopscotchImage,
  RightContent,
  CartIconWrapper,
  FilteredBy,
  FilterWrapper,
  SearchWrapper,
  SearchForm,
  InputSearch,
  SearchIconWrapper,
  NavBarCntnr,
  NotificationDot,
  SearchLayout,
} from './StyledNavBarDesktop';
import { IconWrapper, CartIconQuantity } from './../StyledNavBar';
// import { useRouter } from 'next/router';
import Link from 'next/link';

import { CartIcon, HopScotchIcon, IconSearch } from '@hs/icons';

import {
  CartItemQtyContext,
  UserInfoContext,
  useSelectedSort,
} from '@hs/framework';
import { SearchDesktop } from './../../search-desktop';

export const NavBarDesktop: FC = () => {
  // const router = useRouter();
  const elementRef = useRef<any>();
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [isFormSubmit, setFormSubmitted] = useState<boolean>(false);
  const cartContext = useContext(CartItemQtyContext);
  const { showAccountNotification } = useContext(UserInfoContext);
  const sortedTile = useSelectedSort();
  const query = {
    ref: 'logo',
    funnel: 'Discover',
    from_screen: 'product',
    department: null,
    customTileId: null,
  };
  const showSearchField = () => {
    setShowSearch(!showSearch);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormSubmitted(false);
    setSearchText(e.target.value);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e ? e.preventDefault() : '';
    // _recentSearch = false;
    setFormSubmitted(true);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = showSearch ? 'hidden' : 'auto';
    }

    const ref = elementRef && elementRef.current;
    function handleClickOutside(event: MouseEvent) {
      if (ref && !ref.contains(event.target)) {
        setSearchText('');
        setShowSearch(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  return (
    <NavBarWrapper>
      <NavBarCntnr>
        <NotificationBar>
          {showAccountNotification && <NotificationDot />}
          <NextNavLink
            href="/my/account/orders"
            name="Account"
            margin="0"
            padding="8px 12px 6px"
            fontWeight="400"
            fontSize="1.2rem"
            hoverOpacity="0.8"
          />
          <NextNavLink
            href="/help"
            name="24x7 Customer care"
            margin="0"
            padding="8px 0 8px 12px"
            fontWeight="400"
            fontSize="1.2rem"
            hoverOpacity="0.8"
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
                href="/"
                name="Discover"
                display="inline-block"
                margin="0"
                fontSize="14px"
                fontWeight="600"
                line-height="16px"
                padding="20px 0 18px 0"
                color="#fff"
                hoverOpacity="0.8"
              />
              {sortedTile && (
                <FilteredBy>
                  <NextNavLink
                    href="/"
                    name={sortedTile}
                    display="inline-block"
                    margin="0"
                    padding="0"
                  />
                </FilteredBy>
              )}
            </FilterWrapper>
            <NextNavLink
              href="/moments"
              name="Moments"
              display="inline-block"
              margin="0 32px 0 0"
              fontSize="14px"
              fontWeight="600"
              line-height="16px"
              padding="20px 0 18px 0"
              color="#fff"
              hoverOpacity="0.8"
            />
            <NextNavLink
              href="/blog/"
              name="Blog"
              display="inline-block"
              margin="0 32px 0 0"
              fontSize="14px"
              fontWeight="600"
              line-height="16px"
              padding="20px 0 18px 0"
              color="#fff"
              hoverOpacity="0.8"
            />
          </NavLinkWrapper>
          <NavigationIconsWrapper>
            {showSearch ? (
              <SearchWrapper>
                <SearchIconWrapper
                  onClick={showSearchField}
                  icon={IconSearch}
                />
                <div ref={elementRef}>
                  <SearchForm
                    onSubmit={(e) => {
                      return submitForm(e);
                    }}
                    noValidate
                    autoComplete={'off'}
                  >
                    <InputSearch
                      onChange={handleOnChange}
                      placeholder="Search for products"
                    />
                  </SearchForm>
                  <SearchDesktop {...{ searchText, isFormSubmit }} />
                </div>
                <SearchLayout />
              </SearchWrapper>
            ) : (
              <NavIconWrapper onClick={showSearchField} marginRight={true}>
                <IconWrapper icon={IconSearch} />
              </NavIconWrapper>
            )}
            <Link
              href={{
                pathname: '/w/cart',
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
      </NavBarCntnr>
    </NavBarWrapper>
  );
};
