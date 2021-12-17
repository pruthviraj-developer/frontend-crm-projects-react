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
          goToProductRecommendation('Size list');
        }}
      >
        See similar products
      </SeeSimilar>
    </SeeSimilarProductsWrapper>
  );
};
