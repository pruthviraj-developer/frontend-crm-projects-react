import React, { FC } from 'react';
import { IGoToCartProps } from '../IGoToCart';
import Link from 'next/link';
import { GoToCartButton, GoToCartMobileWrapper } from './StyledGoToCartMobile';

export const GoToCartMobile: FC<IGoToCartProps> = ({
  goToCart,
}: IGoToCartProps) => {
  return (
    <Link
      href={{
        pathname: '/v2/cart',
      }}
      passHref
    >
      <GoToCartMobileWrapper onClick={goToCart}>
        <GoToCartButton>Go to Cart</GoToCartButton>
      </GoToCartMobileWrapper>
    </Link>
  );
};
