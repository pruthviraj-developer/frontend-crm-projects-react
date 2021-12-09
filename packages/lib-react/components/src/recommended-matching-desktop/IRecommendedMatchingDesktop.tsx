export interface IRecommendedMatchingPropsDesktop {
  product: IRecommendMatchingDetailPropsDesktop;
  section: string;
}
export interface IRecommendMatchingDetailPropsDesktop {
  name: string;
  searchParams: IRecommendMatchingSearchParamsPropsDesktop;
  recoType: string;
  screenName: string;
  type?: string;
}
export interface IRecommendMatchingSearchParamsPropsDesktop {
  subCategorys: number;
  brandId?: number | null;
  filterQuery: string;
  colour?: string | null;
}
