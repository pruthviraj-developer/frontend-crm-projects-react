export interface IRecommendedProductsProps {
  section: string;
  subsection: string;
  showmatching: boolean;
  id?: string;
  pid: string;
  products?: IRecommendProductDetailListEntity[] | null;
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
