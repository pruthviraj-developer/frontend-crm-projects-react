import { IImageUrl } from '@hs/framework';
export interface IProductCarouselProps {
  isProductSoldOut?: boolean;
  imgUrls?: IImageUrl[];
  goToProductRecommendation: (a: string) => void;
}
