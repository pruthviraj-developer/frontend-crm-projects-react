export interface IProductCarouselProps {
  showArrows?: boolean;
  autoPlay?: boolean;
  draggable?: boolean;
  focusOnSelect?: boolean;
  renderButtonGroupOutside?: boolean;
  renderDotsOutside?: boolean;
  slidesToSlide: number;
  swipeable?: boolean;
  showDots?: boolean;
  imgUrls: IImageUrlProps[];
}

export interface IImageUrlProps {
  imgUrl: string;
  imgUrlLarge: string;
  imgUrlFull: string;
  imgUrlThumbnail: string;
  isCover: boolean;
  imgUrlHeight: number;
  imgUrlWidth: number;
  imgUrlLargeHeight: number;
  imgUrlLargeWidth: number;
  imgUrlFullHeight: number;
  imgUrlFullWidth: number;
  imgUrlThumbnailHeight: number;
  imgUrlThumbnailWidth: number;
}
