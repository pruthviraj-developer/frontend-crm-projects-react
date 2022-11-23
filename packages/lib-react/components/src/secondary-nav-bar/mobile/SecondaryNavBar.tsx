import React, { FC } from 'react';
import { NextNavLink } from '../../next-nav-link';
import { NavBarWrapper, NotificationDot } from './StyledNavBar';
import { useSelectedSort } from '@hs/framework';
export const SecondaryNavBar: FC = () => {
  const sortedTile = useSelectedSort();
  return (
    <NavBarWrapper>
      <NextNavLink
        href="/"
        name="Discover"
        margin="0"
        color="#707070"
        fontWeight="600"
        fontSize="1.4rem"
        line-height="16px"
        hoverOpacity="0.8"
        display="inline-block"
        padding="17px 14px 15px"
      />
      <NotificationDot />
      {sortedTile && (
        <NextNavLink
          href="/"
          name={sortedTile}
          margin="0"
          color="#707070"
          fontWeight="400"
          fontSize="1.4rem"
          display="inline-block"
          padding="10 20px 0 0"
        />
      )}
      <NextNavLink
        href="/category-nav-1"
        name="Categories"
        margin="0"
        color="#707070"
        fontWeight="600"
        fontSize="1.4rem"
        display="inline-block"
        padding="17px 14px 15px"
      />

      <NextNavLink
        href="/moments"
        name="Moments"
        margin="0"
        color="#707070"
        fontWeight="600"
        fontSize="1.4rem"
        line-height="16px"
        hoverOpacity="0.8"
        display="inline-block"
        padding="17px 14px 15px"
      />
    </NavBarWrapper>
  );
};
