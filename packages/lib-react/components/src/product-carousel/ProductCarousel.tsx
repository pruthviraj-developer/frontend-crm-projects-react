import React, { FC, useState } from 'react';
import {
  ProductCarouselWrapper,
  CarouselWrapper,
  ProductImageContainer,
  SimilarItemsLinkWrapper,
  SimilarTextElement,
  SvgIconsElement,
} from './StyledProductCarousel';
import Carousel from 'react-multi-carousel';
import {
  IProductCarouselProps,
  IImageUrlProps,
  IProductCarouselBreakPoints,
} from './IProductCarousel';
import { IconSeeSimilar } from '@hs/icons';
export const ProductCarousel: FC<IProductCarouselProps> = ({
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
  setTimeout(() => {
    setSimilarItemsDisplayWith(38);
  }, 2000);
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
        >
          {imgUrls &&
            imgUrls.map((img: IImageUrlProps, index: number) => {
              return (
                <ProductImageContainer key={index}>
                  <img
                    alt=""
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      maxWidth: '100%',
                      maxHeight: '325px',
                    }}
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
