import React, { FC, useEffect, useState, useRef } from 'react';
import { RecommendedMatchingDesktop } from '../../recommended-matching';
import { ProductCarouselListDesktop } from '../../product-carousel-list';
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
  Scroller,
  CarouselIcon,
  CarouselListWrapper,
} from './StyledRecommendedProductsDesktop';
import { IconCarouselCaret } from '@hs/icons';
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
    return index % 2 != 0 ? <Divider key={`${index}r`}></Divider> : '';
  };

  const recoWrapper = useRef<HTMLDivElement>(null);
  const recoProduct = useRef<HTMLDivElement>(null);
  const [showLeftScroller, setShowLeftScroller] = useState(false);
  const [showRightScroller, setShowRightScroller] =
    products && products.length > 6 ? useState(true) : useState(false);
  const [marginLeft, setMarginLeft] = useState(0);
  let maxRight = 0;
  let scrollWidth = 0;
  const initializeVariables = () => {
    const productWidth = recoProduct && recoProduct.current;
    const recoWidth = recoWrapper && recoWrapper.current;
    if (
      productWidth &&
      productWidth.scrollWidth &&
      recoWidth &&
      recoWidth.scrollWidth
    ) {
      maxRight = productWidth.scrollWidth - recoWidth.clientWidth;
      scrollWidth = recoWidth.clientWidth - 2;
    }
  };

  useEffect(() => {
    if (recoProduct && recoProduct.current) {
      recoProduct.current.style.marginLeft = `${marginLeft}px`;
    }
  }, [marginLeft]);

  const scrollLeft = () => {
    let margin = 0;
    setShowRightScroller(true);
    initializeVariables();
    margin = marginLeft + scrollWidth < 0 ? marginLeft + scrollWidth : 0;
    setMarginLeft(margin);
    if (margin === 0) {
      setShowLeftScroller(false);
    }
    // segmentService.track(
    //   segmentService.EVENTS.RECO_PRODUCTS_CAROUSEL_SCROLLED,
    //   segmentData
    // );
  };

  const scrollRight = () => {
    let margin = 0;
    setShowLeftScroller(true);
    initializeVariables();
    margin =
      Math.abs(marginLeft - scrollWidth) > maxRight
        ? -maxRight
        : marginLeft - scrollWidth;
    setMarginLeft(margin);
    if (margin === -maxRight) {
      setShowRightScroller(false);
    }
    // segmentService.track(
    //   segmentService.EVENTS.RECO_PRODUCTS_CAROUSEL_SCROLLED,
    //   segmentData
    // );
  };

  return (
    <RecommendedProductsWrapper id={id || pid}>
      <RecommendedProductsTitle>
        <RecommendedTitle>{title}</RecommendedTitle>
        <HrDashedLine />
      </RecommendedProductsTitle>

      <RecommendedProductWrapper ref={recoWrapper}>
        {showLeftScroller && (
          <Scroller className="left" onClick={scrollLeft}>
            <CarouselIcon icon={IconCarouselCaret} />
          </Scroller>
        )}
        <CarouselListWrapper ref={recoProduct}>
          <ProductCarouselListDesktop
            products={products}
            section={section}
            subsection={subsection}
          ></ProductCarouselListDesktop>
        </CarouselListWrapper>
        {showRightScroller && (
          <Scroller onClick={scrollRight}>
            <CarouselIcon icon={IconCarouselCaret} />
          </Scroller>
        )}
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
                  key={'rm' + index}
                ></RecommendedMatchingDesktop>
              </>
            )
          )}
        </RecommendedMatchingWrapper>
      )}
    </RecommendedProductsWrapper>
  );
};
