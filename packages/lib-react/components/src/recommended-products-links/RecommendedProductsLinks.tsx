import React, { FC } from 'react';
import { IRecommendedProductsLinksProps } from './IRecommendedProductsLinks';
import { RecommendedProductsLinksWrapper } from './StyledRecommendedProductsLinks';
export const RecommendedProductsLinks: FC<IRecommendedProductsLinksProps> = ({
  isProductSoldOut,
}: IRecommendedProductsLinksProps) => {
  return (
    <RecommendedProductsLinksWrapper isProductSoldOut={isProductSoldOut}>
      Size sold out?&nbsp;
      <span className="see-similiar-link">See similar products</span>
    </RecommendedProductsLinksWrapper>
  );
};
