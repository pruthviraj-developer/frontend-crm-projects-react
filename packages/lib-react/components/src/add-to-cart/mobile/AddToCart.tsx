import React, { FC } from 'react';
import { IAddToCartProps } from '../IAddToCart';
import { AddToCartWrapper, AddToCartButton } from './StyledAddToCart';
export const AddToCart: FC<IAddToCartProps> = ({
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
    <></>
  );
};
