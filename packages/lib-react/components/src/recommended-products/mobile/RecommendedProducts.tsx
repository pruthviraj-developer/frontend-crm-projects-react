import React, { FC } from 'react';
import { RecommendedMatching } from '../../recommended-matching';
import { ProductCarouselList } from '../../product-carousel-list';
import {
  IRecommendedProductsProps,
  IRecommendMatchingDetailListEntity,
} from '../IRecommendedProducts';
import {
  RecommendedProductsWrapper,
  RecommendedProductWrapper,
  RecommendedProductsTitle,
  RecommendedMatchingWrapper,
} from './StyledRecommendedProducts';
export const RecommendedProducts: FC<IRecommendedProductsProps> = ({
  section,
  subsection,
  showmatching,
  products,
  id,
  pid,
  title,
  matching,
}: IRecommendedProductsProps) => {
  return (
    <RecommendedProductsWrapper id={id || pid}>
      <RecommendedProductsTitle>{title}</RecommendedProductsTitle>
      <RecommendedProductWrapper>
        <ProductCarouselList
          products={products}
          section={section}
          subsection={subsection}
        ></ProductCarouselList>
      </RecommendedProductWrapper>
      {showmatching && matching && matching.length && (
        <RecommendedMatchingWrapper>
          {matching.map(
            (product: IRecommendMatchingDetailListEntity, index: number) => (
              <RecommendedMatching
                product={product}
                section={section}
                key={index}
              ></RecommendedMatching>
            )
          )}
        </RecommendedMatchingWrapper>
      )}
    </RecommendedProductsWrapper>
  );
};
