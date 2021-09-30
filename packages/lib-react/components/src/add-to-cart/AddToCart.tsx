import React, { FC } from 'react';
import { IAddToCartProps } from './IAddToCart';
import { AddToCartWrapper, AddToCartButton } from './StyledAddToCart';
export const AddToCart: FC<IAddToCartProps> = ({
  disabled,
  show,
}: IAddToCartProps) => {
  return show ? (
    <AddToCartWrapper>
      <AddToCartButton disabled={disabled}>ADD TO CART</AddToCartButton>
    </AddToCartWrapper>
  ) : (
    <div style={{ display: 'none' }}></div>
  );
};
