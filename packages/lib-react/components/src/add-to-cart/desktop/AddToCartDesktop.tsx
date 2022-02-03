import React, { FC } from 'react';
import { IAddToCartProps } from '../IAddToCart';
import { AddToCartWrapper, AddToCartButton, SoldOut } from './StyledAddToCart';
export const AddToCartDesktop: FC<IAddToCartProps> = ({
  addProductToCart,
  disabled,
  show,
}: IAddToCartProps) => {
  return show ? (
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
