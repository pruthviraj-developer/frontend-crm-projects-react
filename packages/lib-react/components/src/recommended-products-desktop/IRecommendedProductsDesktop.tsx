export interface IRecommendedProductsDesktopProps {
  section: string;
  subsection: string;
  showmatching: boolean;
  id?: string;
  pid: string;
  products?: IRecommendProductDetailListEntityDesktop[] | null;
  matching?: IRecommendMatchingDetailListEntityDesktop[] | null;
  title: string;
}

export interface IRecommendProductDetailListEntityDesktop {
  id: number;
  imageUrl: string;
  productName: string;
  brandName: string;
  salePrice: number;
}

export interface IRecommendMatchingDetailListEntityDesktop {
  name: string;
  searchParams: ISearchParamsDesktop;
  recoType: string;
  screenName: string;
}

export interface ISearchParamsDesktop {
  subCategorys: number;
  brandId?: number | null;
  filterQuery: string;
  colour?: string | null;
}
