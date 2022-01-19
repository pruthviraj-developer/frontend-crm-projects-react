import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { IconSeeSimilar, IconCarouselCaret } from '@hs/icons';

import { useKeenSlider } from 'keen-slider/react';
import {
  ProductCarouselWrapper,
  CarouselWrapper,
  ProductImageContainer,
  SimilarItemsLinkWrapper,
  SimilarTextElement,
  SvgIconsElement,
  TransparentImgOverlay,
  RightArrow,
  LeftArrow,
  CarouselIcon,
} from './StyledProductCarouselDesktop';
import { IProductCarouselProps } from '../IProductCarousel';
export const ProductCarouselDesktop: FC<IProductCarouselProps> = ({
  imgUrls,
  isProductSoldOut,
  goToProductRecommendation,
}: IProductCarouselProps) => {
  // const imageSize = '564px';
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: 'free',
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      slides: {
        perView: 1.68,
        spacing: 12,
      },
      defaultAnimation: {
        duration: 1500,
      },
    },
    [
      // add plugins here
    ]
  );

  // const totalImages = (imgUrls && imgUrls.length) || 0;
  const [similarItemsDisplayWith, setSimilarItemsDisplayWith] =
    useState<number>(140);
  useEffect(() => {
    if (isProductSoldOut) {
      return;
    }
    const timer = setTimeout(() => {
      setSimilarItemsDisplayWith(46);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isProductSoldOut]);

  useEffect(() => {
    instanceRef.current?.update(
      {
        initial: 0,
        mode: 'free',
        slideChanged(s) {
          setCurrentSlide(s.track.details.rel);
        },
        created() {
          setLoaded(true);
        },
        slides: {
          perView: 1.68,
          spacing: 12,
        },
        defaultAnimation: {
          duration: 1500,
        },
      },
      0
    );
  }, [imgUrls]);

  const Arrow = (props: {
    disabled: boolean;
    left?: boolean;
    onClick: (e: any) => void;
  }) => {
    return (
      <>
        {props.left ? (
          <LeftArrow
            disabled={props.disabled}
            onClick={props.onClick}
            className="left"
          >
            <CarouselIcon icon={IconCarouselCaret} />
          </LeftArrow>
        ) : (
          <RightArrow disabled={props.disabled} onClick={props.onClick}>
            <CarouselIcon icon={IconCarouselCaret} />
          </RightArrow>
        )}
      </>
    );
  };

  return (
    <ProductCarouselWrapper>
      {/* <CustomLeftArrow /> */}
      <CarouselWrapper ref={sliderRef} className="keen-slider" key="slider">
        {imgUrls &&
          imgUrls.map((img, index: number) => {
            return (
              <ProductImageContainer
                key={img.imgUrlFull}
                className="keen-slider__slide"
                id={'carousel-' + index}
              >
                <Image
                  priority
                  layout="fill"
                  draggable={false}
                  loader={({ src, width }) =>
                    `${src}&tr=w-${width},c-at_max,n-medium`
                  }
                  src={img.imgUrlFull}
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
              e.stopPropagation() || instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) => {
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
