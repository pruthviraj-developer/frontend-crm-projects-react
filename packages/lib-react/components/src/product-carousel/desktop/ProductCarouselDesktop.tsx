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
  Slide,
} from './StyledProductCarouselDesktop';
import { IProductCarouselProps } from '../IProductCarousel';

export const ProductCarouselDesktop: FC<IProductCarouselProps> = ({
  imgUrls,
  isProductSoldOut,
  goToProductRecommendation,
}: IProductCarouselProps) => {
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
    slides:
      imgUrls && imgUrls.length > 1
        ? { perView: 'auto', spacing: 12 }
        : { perView: 'auto', spacing: 12, origin: 'center' },
    defaultAnimation: {
      duration: 1500,
    },
  });

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
          slides:
            imgUrls.length > 1
              ? { perView: 'auto', spacing: 12 }
              : { perView: 'auto', spacing: 12, origin: 'center' },
          defaultAnimation: {
            duration: 1500,
          },
        },
        0
      );
    }
    return () => {
      instanceRef.current?.destroy();
    };
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
                  alt="hopscotch"
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
        <Slide className="keen-slider__slide" />
      </CarouselWrapper>
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
              currentSlide >= instanceRef.current.track.details?.maxIdx - 1
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
