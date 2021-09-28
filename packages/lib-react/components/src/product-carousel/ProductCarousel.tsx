import React, { FC } from 'react';
import {
  CarouselWrapper,
  ProductImageContainer,
} from './StyledProductCarousel';
import Carousel from 'react-multi-carousel';
import { IProductCarouselProps, IImageUrlProps } from './IProductCarousel';
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
}: IProductCarouselProps) => {
  const imageSize = 360;
  const responsive: any = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  };
  return (
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
      >
        {imgUrls &&
          imgUrls.map((img: IImageUrlProps, index: number) => {
            return (
              <ProductImageContainer key={index}>
                {/* <Image
                  key={index}
                  src={`${img.imgUrlFull}&tr=w-${imageSize},c-at_max,dpr-2,n-medium`}
                  placeholder="blur"
                  blurDataURL="https://static.hopscotch.in/web2/images/boutique-pattern.png"
                  layout="fill"
                  unoptimized
                /> */}
                <img
                  alt=""
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    maxWidth: '325px',
                    maxHeight: '325px',
                  }}
                  src={`${img.imgUrlFull}&tr=w-${imageSize},c-at_max,dpr-2,n-medium`}
                />
              </ProductImageContainer>
            );
          })}
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
