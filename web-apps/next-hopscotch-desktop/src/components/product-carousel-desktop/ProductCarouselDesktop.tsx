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
  TransparentImgOverlay,
} from './StyledProductCarouselDesktop';
import { IProductCarouselDesktopProps, IProductCarouselDesktopBreakPoints } from './IProductCarouselDesktop';
export const ProductCarouselDesktop: FC<IProductCarouselDesktopProps> = ({
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
}: IProductCarouselDesktopProps) => {
  const imageSize = 360;
  const responsive: IProductCarouselDesktopBreakPoints | any = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, partialVisibilityGutter: 359 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1, partialVisibilityGutter: 40 },
  };
  const [similarItemsDisplayWith, setSimilarItemsDisplayWith] = useState<number>(140);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSimilarItemsDisplayWith(46);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const CustomRightArrow = (rest: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;

    function handleClick() {
      // do whatever you want on the right button click
      console.log('Right button clicked, go to next slide');
      // ... and don't forget to call onClick to slide
    }
    // onMove means if dragging or swiping in progress.
    return <button onClick={() => handleClick()}> test</button>;
  };

  const CustomLeftArrow = (rest: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;

    function handleClick() {
      // do whatever you want on the right button click
      console.log('Left button clicked, go to next slide');
      // ... and don't forget to call onClick to slide
    }
    // onMove means if dragging or swiping in progress.
    return <button onClick={() => handleClick()}> test</button>;
  };

  return (
    <ProductCarouselWrapper>
      <CarouselWrapper>
        <Carousel
          ssr
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          responsive={responsive}
          additionalTransfrom={0}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          draggable={draggable}
          focusOnSelect={focusOnSelect}
          infinite={false}
          keyBoardControl
          minimumTouchDrag={80}
          slidesToSlide={slidesToSlide}
          swipeable={swipeable}
          dotListClass="product-carousel-dot-list"
          containerClass="product-carousel-container"
          deviceType="desktop"
          partialVisible={true}
          itemClass="product-carousel-item"
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
                  <TransparentImgOverlay></TransparentImgOverlay>
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
        <SimilarTextElement width={similarItemsDisplayWith}>SEE SIMILAR</SimilarTextElement>
        <SvgIconsElement icon={IconSeeSimilar} />
      </SimilarItemsLinkWrapper>
    </ProductCarouselWrapper>
  );
};
