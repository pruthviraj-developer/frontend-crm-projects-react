import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { IconSeeSimilar } from '@hs/icons';
import {
  ProductCarouselWrapper,
  CarouselWrapper,
  ProductImageContainer,
  SimilarItemsLinkWrapper,
  SimilarTextElement,
  SvgIconsElement,
  TransparentImgOverlay,
  RightButton,
  LeftButton,
} from './StyledProductCarouselDesktop';
import {
  IProductCarouselDesktopProps,
  // IProductCarouselDesktopBreakPoints,
} from './IProductCarouselDesktop';
export const ProductCarouselDesktop: FC<IProductCarouselDesktopProps> = ({
  imgUrls,
  goToProductRecommendation,
}: IProductCarouselDesktopProps) => {
  const imageSize = '554px';
  // const responsive: IProductCarouselDesktopBreakPoints | any = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 1,
  //     partialVisibilityGutter: 359,
  //   },
  //   mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 1,
  //     partialVisibilityGutter: 40,
  //   },
  // };
  const totalImages = (imgUrls && imgUrls.length) || 0;
  const [similarItemsDisplayWith, setSimilarItemsDisplayWith] =
    useState<number>(140);
  const [left, setLeft] = useState<number>(0);
  const [clientWidth, setClientWidth] = useState<number>(0);
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSimilarItemsDisplayWith(46);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const initializeVariables = () => {
    setLeft(left || 0);
    setClientWidth(
      document.getElementById('carousel-container')?.clientWidth ||
        clientWidth ||
        0
    );
    setScrollWidth(
      document.getElementById('carousel-1')?.scrollWidth || scrollWidth || 0
    );
    console.log(left);
    console.log(clientWidth);
    console.log(scrollWidth);
    // clientWidth ||
    //   this._$element.find('.pdp-images-container')[0].clientWidth;
    // this.scrollElement =
    // this.scrollElement || this._$element.find('.pdp-images')[0];
    // this.scrollWidth = this.scrollWidth || this.scrollElement.scrollWidth;
  };

  const CustomRightArrow = (rest: any) => {
    function handleClick() {
      initializeVariables();
      if (totalImages > activeIndex + 1) {
        const maxRight = scrollWidth - clientWidth;
        let imageWidth =
          (document.getElementById(
            `carousel-${rest.carouselState.currentSlide}`
          )?.clientWidth || 0) + 12;

        if ((clientWidth - imageWidth) / 2 > 60) {
          imageWidth = activeIndex > 0 ? imageWidth : imageWidth - 72;
        }

        setLeft(left - imageWidth);
        if (Math.abs(left) > maxRight) {
          if ((clientWidth - imageWidth) / 2 > 60) {
            setLeft(left - maxRight + 72);
          } else {
            setLeft(left - maxRight);
          }
        }
        setActiveIndex(activeIndex + 1);
        // do whatever you want on the right button click
        console.log('Right button clicked, go to next slide');
        console.log(left);
        console.log(rest);
        const element = document.querySelector('[data-index="0"]');
        // document.getElementById('carousel-1');
        if (element) {
          debugger;
          // element && element.style.left = left + 'px';
        }
        // this.showLeftScroller = this.showRightScroller = false;
      }
      // ... and don't forget to call onClick to slide
    }
    // onMove means if dragging or swiping in progress.
    return <RightButton onClick={() => handleClick()}>Right</RightButton>;
  };

  const CustomLeftArrow = (rest: any) => {
    function handleClick() {
      initializeVariables();
      setActiveIndex(activeIndex - 1);
      // do whatever you want on the right button click
      console.log('Left button clicked, go to next slide');
      console.log(rest);
      // const imageWidth =
      //   this._$element.find('.pdp-image-' + this.activeIndex)[0].clientWidth +
      //   12;
      // ... and don't forget to call onClick to slide
    }
    // onMove means if dragging or swiping in progress.
    return <LeftButton onClick={() => handleClick()}>Left</LeftButton>;
  };

  return (
    <ProductCarouselWrapper>
      <CustomLeftArrow />
      <CarouselWrapper id={'carousel-container'}>
        {imgUrls &&
          imgUrls.map((img, index: number) => {
            return (
              <ProductImageContainer key={index} id={'carousel-' + index}>
                <Image
                  alt=""
                  layout="responsive"
                  draggable={false}
                  unoptimized
                  width={imageSize}
                  height={imageSize}
                  src={`${img.imgUrlFull}&tr=w-${imageSize},c-at_max,dpr-2,n-medium`}
                />
                <TransparentImgOverlay></TransparentImgOverlay>
              </ProductImageContainer>
            );
          })}
      </CarouselWrapper>
      <CustomRightArrow />
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
