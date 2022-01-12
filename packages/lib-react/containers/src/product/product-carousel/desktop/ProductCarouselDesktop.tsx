import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { IconSeeSimilar } from '@hs/icons';

import { useKeenSlider } from 'keen-slider/react';
import {
  ProductCarouselWrapper,
  CarouselWrapper,
  ProductImageContainer,
  SimilarItemsLinkWrapper,
  SimilarTextElement,
  SvgIconsElement,
  TransparentImgOverlay,
  // RightButton,
  // LeftButton,
  RightArrow,
  LeftArrow,
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
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      slides: {
        perView: 1.68,
        spacing: 0,
      },
    },
    [
      // add plugins here
    ]
  );

  // const totalImages = (imgUrls && imgUrls.length) || 0;
  const [similarItemsDisplayWith, setSimilarItemsDisplayWith] =
    useState<number>(140);
  // const [left, setLeft] = useState<number>(0);
  // const [clientWidth, setClientWidth] = useState<number>(0);
  // const [scrollWidth, setScrollWidth] = useState<number>(0);
  // const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSimilarItemsDisplayWith(46);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const initializeVariables = () => {
  //   setLeft(left || 0);
  //   setClientWidth(
  //     document.getElementById('carousel-container')?.clientWidth ||
  //       clientWidth ||
  //       0
  //   );
  //   setScrollWidth(
  //     document.getElementById('carousel-1')?.scrollWidth || scrollWidth || 0
  //   );
  //   console.log(left);
  //   console.log(clientWidth);
  //   console.log(scrollWidth);
  //   // clientWidth ||
  //   //   this._$element.find('.pdp-images-container')[0].clientWidth;
  //   // this.scrollElement =
  //   // this.scrollElement || this._$element.find('.pdp-images')[0];
  //   // this.scrollWidth = this.scrollWidth || this.scrollElement.scrollWidth;
  // };

  // const CustomRightArrow = (rest: any) => {
  //   function handleClick() {
  //     initializeVariables();
  //     if (totalImages > activeIndex + 1) {
  //       const maxRight = scrollWidth - clientWidth;
  //       let imageWidth =
  //         (document.getElementById(
  //           `carousel-${rest.carouselState.currentSlide}`
  //         )?.clientWidth || 0) + 12;

  //       if ((clientWidth - imageWidth) / 2 > 60) {
  //         imageWidth = activeIndex > 0 ? imageWidth : imageWidth - 72;
  //       }

  //       setLeft(left - imageWidth);
  //       if (Math.abs(left) > maxRight) {
  //         if ((clientWidth - imageWidth) / 2 > 60) {
  //           setLeft(left - maxRight + 72);
  //         } else {
  //           setLeft(left - maxRight);
  //         }
  //       }
  //       setActiveIndex(activeIndex + 1);
  //       // do whatever you want on the right button click
  //       console.log('Right button clicked, go to next slide');
  //       console.log(left);
  //       console.log(rest);
  //       const element = document.querySelector('[data-index="0"]');
  //       // document.getElementById('carousel-1');
  //       if (element) {
  //         debugger;
  //         // element && element.style.left = left + 'px';
  //       }
  //       // this.showLeftScroller = this.showRightScroller = false;
  //     }
  //     // ... and don't forget to call onClick to slide
  //   }
  //   // onMove means if dragging or swiping in progress.
  //   return <RightButton onClick={() => handleClick()}>Right</RightButton>;
  // };

  // const CustomLeftArrow = (rest: any) => {
  //   function handleClick() {
  //     initializeVariables();
  //     setActiveIndex(activeIndex - 1);
  //     // do whatever you want on the right button click
  //     console.log('Left button clicked, go to next slide');
  //     console.log(rest);
  //     // const imageWidth =
  //     //   this._$element.find('.pdp-image-' + this.activeIndex)[0].clientWidth +
  //     //   12;
  //     // ... and don't forget to call onClick to slide
  //   }
  //   // onMove means if dragging or swiping in progress.
  //   return <LeftButton onClick={() => handleClick()}>Left</LeftButton>;
  // };

  const Arrow = (props: {
    disabled: boolean;
    left?: boolean;
    onClick: (e: any) => void;
  }) => {
    const disabeld = props.disabled ? ' arrow--disabled' : '';
    const getIcon = () => (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? 'arrow--left' : 'arrow--right'
        } ${disabeld}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
    return (
      <>
        {props.left ? (
          <LeftArrow>{getIcon()}</LeftArrow>
        ) : (
          <RightArrow>{getIcon()}</RightArrow>
        )}
      </>
    );
  };

  return (
    <ProductCarouselWrapper>
      {/* <CustomLeftArrow /> */}
      <CarouselWrapper ref={sliderRef} className="keen-slider">
        {imgUrls &&
          imgUrls.map((img, index: number) => {
            return (
              <ProductImageContainer
                key={index}
                className="keen-slider__slide"
                id={'carousel-' + index}
              >
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
      {/* <CustomRightArrow /> */}
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e: any) => {
              debugger;
              e.stopPropagation() || instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) => {
              debugger;
              e.stopPropagation() || instanceRef.current?.next();
            }}
            disabled={
              currentSlide ===
              instanceRef.current.track.details?.slides?.length - 1
            }
          />
        </>
      )}
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
