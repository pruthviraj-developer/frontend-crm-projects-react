export interface IProductCarouselListProps {
  products?: IRecommendProductDetailListEntity[] | null;
  section: string;
  subsection: string;
}

export interface IRecommendProductDetailListEntity {
  id: number;
  imageUrl: string;
  productName: string;
  name?: string;
  brand?: string;
  brandName: string;
  salePrice: number;
  retailPrice?: number;
}
