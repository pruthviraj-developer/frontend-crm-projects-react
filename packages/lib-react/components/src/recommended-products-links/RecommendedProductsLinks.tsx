import React, { FC } from 'react';
import { IRecommendedProductsLinksProps } from './IRecommendedProductsLinks';
import { RecommendedProductsLinksWrapper } from './StyledRecommendedProductsLinks';
export const RecommendedProductsLinks: FC<IRecommendedProductsLinksProps> = ({
  isProductSoldOut,
  goToProductRecommendation,
}: IRecommendedProductsLinksProps) => {
  return (
    <RecommendedProductsLinksWrapper isProductSoldOut={isProductSoldOut}>
      Size sold out?&nbsp;
      <span
        className="see-similiar-link"
        onClick={() => {
          goToProductRecommendation('Size list');
        }}
      >
        See similar products
      </span>
    </RecommendedProductsLinksWrapper>
  );
};
