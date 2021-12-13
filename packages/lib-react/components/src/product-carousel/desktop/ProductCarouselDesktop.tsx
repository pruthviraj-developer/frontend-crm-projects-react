import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import { IconSeeSimilar } from '@hs/icons';
import {
  ProductCarouselWrapper,
  CarouselWrapper,
  ProductImageContainer,
  SimilarItemsLinkWrapper,
  SimilarTextElement,
  SvgIconsElement,
} from './StyledProductCarouselDesktop';
import {
  IProductCarouselProps,
  IProductCarouselBreakPoints,
} from '../IProductCarousel';
export const ProductCarouselDesktop: FC<IProductCarouselProps> = ({
  focusOnSelect,
  showArrows,
  draggable,
  renderButtonGroupOutside,
  renderDotsOutside,
  slidesToSlide,
  swipeable,
  showDots,
  imgUrls,
  goToProductRecommendation,
}: IProductCarouselProps) => {
  const imageSize = 360;
  const responsive: IProductCarouselBreakPoints | any = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  };
  const [similarItemsDisplayWith, setSimilarItemsDisplayWith] =
    useState<number>(140);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSimilarItemsDisplayWith(38);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ProductCarouselWrapper>
      <CarouselWrapper>
        <Carousel
          ssr
          responsive={responsive}
          additionalTransfrom={0}
          arrows={showArrows}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          draggable={draggable}
          focusOnSelect={focusOnSelect}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={renderButtonGroupOutside}
          renderDotsOutside={renderDotsOutside}
          showDots={showDots}
          sliderClass=""
          slidesToSlide={slidesToSlide}
          swipeable={swipeable}
          dotListClass="product-carousel-dot-list"
          containerClass="product-carousel-container"
          deviceType="mobile"
        >
          {imgUrls &&
            imgUrls.map((img, index: number) => {
              return (
                <ProductImageContainer key={index}>
                  <Image
                    alt=""
                    layout="fill"
                    draggable={false}
                    unoptimized
                    src={`${img.imgUrlFull}&tr=w-${imageSize},c-at_max,dpr-2,n-medium`}
                  />
                </ProductImageContainer>
              );
            })}
        </Carousel>
      </CarouselWrapper>
      <SimilarItemsLinkWrapper
        width={similarItemsDisplayWith}
        onClick={() => {
          goToProductRecommendation('Overlay');
        }}
      >
        <SimilarTextElement width={similarItemsDisplayWith}>
          SEE SIMILAR
        </SimilarTextElement>
        <SvgIconsElement icon={IconSeeSimilar} />
      </SimilarItemsLinkWrapper>
    </ProductCarouselWrapper>
  );
};
