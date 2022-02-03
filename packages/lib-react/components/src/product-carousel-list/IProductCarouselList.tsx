export interface IProductCarouselListProps {
  products?: IProductCarouselDetailsEntityList[] | null;
  section: string;
  subsection: string;
}

export interface IProductCarouselDetailsEntityList {
  id: number;
  imageUrl: string;
  productName: string;
  name?: string;
  brand?: string;
  brandName: string;
  salePrice: number;
  retailPrice?: number;
}
