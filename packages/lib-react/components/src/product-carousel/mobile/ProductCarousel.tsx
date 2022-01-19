import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import { IconSeeSimilar } from '@hs/icons';
import {
  CarouselWrapper,
  TransparentImgOverlay,
  ProductImageContainer,
  ProductCarouselWrapper,
  SimilarItemsLinkWrapper,
  SvgIconsElement,
  SimilarTextElement,
  Dot,
  Dots,
} from './StyledProductCarousel';
import { IProductCarouselProps } from '../IProductCarousel';
export const ProductCarousel: FC<IProductCarouselProps> = ({
  imgUrls,
  isProductSoldOut,
  goToProductRecommendation,
}: IProductCarouselProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [similarItemsDisplayWith, setSimilarItemsDisplayWith] =
    useState<number>(140);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: 'free',
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    defaultAnimation: {
      duration: 1500,
    },
  });

  useEffect(() => {
    if (isProductSoldOut) {
      return;
    }
    const timer = setTimeout(() => {
      setSimilarItemsDisplayWith(38);
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
        defaultAnimation: {
          duration: 1500,
        },
      },
      0
    );
  }, [imgUrls]);
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
                  priority
                  layout="fill"
                  draggable={false}
                  loader={({ src, width }) =>
                    `${src}&tr=w-${width},c-at_max,n-medium`
                  }
                  src={img.imgUrlFull}
                  className="pdpImages"
                />
                <TransparentImgOverlay></TransparentImgOverlay>
              </ProductImageContainer>
            );
          })}
      </CarouselWrapper>
      {loaded && instanceRef.current && (
        <Dots>
          {instanceRef?.current?.track.details.slides.map(
            (idx, index: number) => {
              return (
                <Dot
                  key={index || idx.abs}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(index);
                  }}
                  active={currentSlide === index ? true : false}
                ></Dot>
              );
            }
          )}
        </Dots>
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
