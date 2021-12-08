export interface IProductCarouselListDesktopProps {
  products?: IProductCarouselDetailsEntityListDesktop[] | null;
  section: string;
  subsection: string;
}

export interface IProductCarouselDetailsEntityListDesktop {
  id: number;
  imageUrl: string;
  productName: string;
  name?: string;
  brand?: string;
  brandName: string;
  salePrice: number;
  retailPrice?: number;
}
