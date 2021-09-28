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

export interface IProductCarouselBreakPoints {
  desktop: DesktopOrMobileOrTablet;
  mobile: DesktopOrMobileOrTablet;
  tablet: DesktopOrMobileOrTablet;
}
export interface DesktopOrMobileOrTablet {
  breakpoint: Breakpoint;
  items: number;
}
export interface Breakpoint {
  max: number;
  min: number;
}
