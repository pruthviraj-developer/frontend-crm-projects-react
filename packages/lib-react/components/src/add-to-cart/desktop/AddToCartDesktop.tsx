import React, { FC } from 'react';
import { IAddToCartProps } from '../IAddToCart';
import { AddToCartWrapper, AddToCartButton, SoldOut } from './StyledAddToCart';
export const AddToCartDesktop: FC<IAddToCartProps> = ({
  addProductToCart,
  isProductSoldOut=false,
  disabled=false,
}: IAddToCartProps) => {
  return !isProductSoldOut ? (
    <AddToCartWrapper>
      <AddToCartButton
        onClick={() => {
          addProductToCart();
        }}
         disabled={disabled}
      >
        ADD TO CART
      </AddToCartButton>
    </AddToCartWrapper>
  ) : (
    <SoldOut>Sold out</SoldOut>
  );
};
