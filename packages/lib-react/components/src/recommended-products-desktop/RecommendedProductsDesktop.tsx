import React, { FC } from 'react';
import { RecommendedMatchingDesktop } from '../recommended-matching-desktop';
import { ProductCarouselList } from '../product-carousel-list';
import {
  IRecommendedProductsDesktopProps,
  IRecommendMatchingDetailListEntityDesktop,
} from './IRecommendedProductsDesktop';
import {
  RecommendedMatchingWrapper,
  RecommendedProductsWrapper,
  RecommendedProductWrapper,
  RecommendedProductsTitle,
  RecommendedTitle,
  HrDashedLine,
  Divider,
} from './StyledRecommendedProductsDesktop';
export const RecommendedProductsDesktop: FC<IRecommendedProductsDesktopProps> =
  ({
    section,
    subsection,
    showmatching,
    products,
    id,
    pid,
    title,
    matching,
  }: IRecommendedProductsDesktopProps) => {
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
              (
                product: IRecommendMatchingDetailListEntityDesktop,
                index: number
              ) => (
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
