export interface IRecommendedProps {
  recommended?: IRecommendedProducts;
  showmatching: boolean;
  id: string;
  pid: string;
  section: string;
}

export interface IRecommendedProducts {
  action: string;
  recommendationTitle: string;
  recoType: string;
  recommendProductDetailList?: IRecommendProductDetailListEntity[] | null;
  recommendMatchingDetailList?: IRecommendMatchingDetailListEntity[] | null;
}

export interface IRecommendedProductsCarousel {
  details?: IRecommendProductDetailListEntity[] | null;
  matching?: IRecommendMatchingDetailListEntity[] | null;
  title: string;
}

export interface IRecommendProductDetailListEntity {
  id: number;
  imageUrl: string;
  productName: string;
  brandName: string;
  salePrice: number;
}

export interface IRecommendMatchingDetailListEntity {
  name: string;
  searchParams: SearchParams;
  recoType: string;
  screenName: string;
}

export interface SearchParams {
  subCategorys: number;
  brandId?: number | null;
  filterQuery: string;
  colour?: string | null;
}
