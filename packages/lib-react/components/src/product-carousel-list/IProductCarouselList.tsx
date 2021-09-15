export interface IProductCarouselListProps {
  products?: IRecommendProductDetailListEntity[] | null;
  section: string;
  id: string;
  pid: string;
  subsection: string;
}

export interface IRecommendProductDetailListEntity {
  id: number;
  imageUrl: string;
  productName: string;
  brandName: string;
  salePrice: number;
  retailPrice?: number;
}
