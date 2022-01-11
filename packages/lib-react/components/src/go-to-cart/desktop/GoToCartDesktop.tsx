import React, { FC } from 'react';
import Link from 'next/link';
import { IGoToCartProps } from '../IGoToCart';
import {
  GoToCartButton,
  GoToCartDesktopWrapper,
} from './StyledGoToCartDesktop';

export const GoToCartDesktop: FC<IGoToCartProps> = ({
  goToCart,
}: IGoToCartProps) => {
  return (
    <Link
      href={{
        pathname: '/v2/cart',
      }}
      passHref
    >
      <GoToCartDesktopWrapper onClick={goToCart}>
        <GoToCartButton>Go to Cart</GoToCartButton>
      </GoToCartDesktopWrapper>
    </Link>
  );
};
