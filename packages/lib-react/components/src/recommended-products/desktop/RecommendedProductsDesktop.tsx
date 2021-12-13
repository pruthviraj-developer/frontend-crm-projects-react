import React, { FC } from 'react';
import { RecommendedMatchingDesktop } from '../../recommended-matching';
import { ProductCarouselList } from '../../product-carousel-list';
import {
  IRecommendedProductsProps,
  IRecommendMatchingDetailListEntity,
} from '../IRecommendedProducts';
import {
  RecommendedMatchingWrapper,
  RecommendedProductsWrapper,
  RecommendedProductWrapper,
  RecommendedProductsTitle,
  RecommendedTitle,
  HrDashedLine,
  Divider,
} from './StyledRecommendedProductsDesktop';
export const RecommendedProductsDesktop: FC<IRecommendedProductsProps> = ({
  section,
  subsection,
  showmatching,
  products,
  id,
  pid,
  title,
  matching,
}: IRecommendedProductsProps) => {
  const getDivider = (index: number) => {
    return index % 2 != 0 ? <Divider></Divider> : '';
  };
  return (
    <RecommendedProductsWrapper id={id || pid}>
      <RecommendedProductsTitle>
        <RecommendedTitle>{title}</RecommendedTitle>
        <HrDashedLine />
      </RecommendedProductsTitle>

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
              <>
                {getDivider(index)}
                <RecommendedMatchingDesktop
                  product={product}
                  section={section}
                  key={index}
                ></RecommendedMatchingDesktop>
              </>
            )
          )}
        </RecommendedMatchingWrapper>
      )}
    </RecommendedProductsWrapper>
  );
};
