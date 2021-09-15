import React, { FC } from 'react';
import { CarouselWrapper } from './StyledProductCarousel';
import { Carousel } from 'react-responsive-carousel';
import { IProductCarouselProps } from './IProductCarousel';

export const ProductCarousel: FC<IProductCarouselProps> = ({
  autoPlay,
  dynamicHeight,
  showArrows,
  showThumbs,
  showStatus,
}: IProductCarouselProps) => {
  return (
    <CarouselWrapper>
      <Carousel
        autoPlay={autoPlay || false}
        dynamicHeight={dynamicHeight || true}
        showArrows={showArrows || false}
        showThumbs={showThumbs || false}
        showStatus={showStatus || false}
      >
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
        <div>
          <img alt="" src="http://placehold.it/375x375" />
        </div>
      </Carousel>
    </CarouselWrapper>
  );
};
