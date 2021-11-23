import { IImageUrl } from '@hs/framework';
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
  isProductSoldOut: boolean;
  imgUrls?: IImageUrl[];
  goToProductRecommendation: (a: string) => void;
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
