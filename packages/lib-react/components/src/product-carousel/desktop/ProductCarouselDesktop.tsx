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
  Arrows,
  RightArrow,
  LeftArrow,
  CarouselIcon,
} from './StyledProductCarouselDesktop';
import { IProductCarouselProps } from '../IProductCarousel';
const getSlides = (length, smallDevice) => {
  const slideArr: Record<string, number>[] = [];
  if (!smallDevice) {
    if (length === 1) {
      slideArr.push({ size: 0.6031, origin: 0.2 });
    } else {
      for (let i = 1; i < length; i++) {
        slideArr.push({
          size: 0.6031,
          spacing: 0.014,
        });
      }
      slideArr.push({ size: 0.6031, origin: 0.305 });
    }
  } else {
    if (length === 1) {
      slideArr.push({ size: 0.83, origin: 0.05 });
    } else {
      for (let i = 1; i < length; i++) {
        slideArr.push({
          size: 0.83,
          spacing: 0.016,
        });
      }
      slideArr.push({ size: 0.83, origin: 0.016 });
    }
  }
  return slideArr;
};
export const ProductCarouselDesktop: FC<IProductCarouselProps> = ({
  imgUrls,
  isProductSoldOut,
  goToProductRecommendation,
}: IProductCarouselProps) => {
  // const imageSize = '564px';
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: 'free',
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: () => getSlides(imgUrls && imgUrls.length, false),
    defaultAnimation: {
      duration: 1500,
    },
    breakpoints: {
      '(max-width: 64em)': {
        slides: () => getSlides(imgUrls && imgUrls.length, true),
      },
    },
  });

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
    if (imgUrls) {
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
          slides: () => getSlides(imgUrls.length, false),
          defaultAnimation: {
            duration: 1500,
          },
          breakpoints: {
            '(max-width: 64em)': {
              slides: () => getSlides(imgUrls.length, true),
            },
          },
        },
        0
      );
    }
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
                  priority={index < 2}
                  layout="fill"
                  objectFit="fill"
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
      {loaded && imgUrls && imgUrls?.length > 1 && instanceRef.current && (
        <Arrows>
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
        </Arrows>
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
