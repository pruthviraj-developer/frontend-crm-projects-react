import React, { FC } from 'react';
import { IAddToCartProps } from '../IAddToCart';
import { AddToCartWrapper, AddToCartButton } from './StyledAddToCart';
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
    <div style={{ display: 'none' }}></div>
  );
};
