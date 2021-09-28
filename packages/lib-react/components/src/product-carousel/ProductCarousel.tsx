import React, { FC } from 'react';
import { CarouselWrapper } from './StyledProductCarousel';
import Carousel from 'react-multi-carousel';
import { IProductCarouselProps } from './IProductCarousel';
export const ProductCarousel: FC<IProductCarouselProps> = ({
  focusOnSelect,
  showArrows,
  draggable,
  renderButtonGroupOutside,
  renderDotsOutside,
  slidesToSlide,
  swipeable,
  showDots,
}: IProductCarouselProps) => {
  const responsive: any = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  };
  return (
    <CarouselWrapper>
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows={showArrows}
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        dotListClass=""
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

      {/* <Carousel
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
      </Carousel> */}
    </CarouselWrapper>
  );
};
