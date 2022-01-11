import { IImageUrl } from '@hs/framework';
export interface IProductCarouselDesktopProps {
  showArrows?: boolean;
  autoPlay?: boolean;
  draggable?: boolean;
  focusOnSelect?: boolean;
  renderButtonGroupOutside?: boolean;
  renderDotsOutside?: boolean;
  slidesToSlide: number;
  swipeable?: boolean;
  showDots?: boolean;
  imgUrls?: IImageUrl[];
  goToProductRecommendation: (a: string) => void;
}
export interface IProductCarouselDesktopBreakPoints {
  desktop: DesktopOrMobileOrTablet;
  mobile: DesktopOrMobileOrTablet;
  tablet: DesktopOrMobileOrTablet;
}
interface DesktopOrMobileOrTablet {
  breakpoint: Breakpoint;
  items: number;
}
interface Breakpoint {
  max: number;
  min: number;
}
