import React, { FC } from 'react';
import { ISeeSimilarProductsProps } from './ISeeSimilarProducts';
import {
  SeeSimilarProductsWrapper,
  SeeSimilar,
  SizeSoldOut,
} from './StyledSeeSimilarProducts';
export const SeeSimilarProducts: FC<ISeeSimilarProductsProps> = ({
  goToProductRecommendation,
}: ISeeSimilarProductsProps) => {
  return (
    <SeeSimilarProductsWrapper>
      <SizeSoldOut>Size sold out?</SizeSoldOut>
      <SeeSimilar
        onClick={() => {
          goToProductRecommendation('Add to cart');
        }}
      >
        See similar products
      </SeeSimilar>
    </SeeSimilarProductsWrapper>
  );
};
