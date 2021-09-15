export interface IRecommendedMatchingProps {
  product: IRecommendMatchingDetailProps;
  section: string;
}
export interface IRecommendMatchingDetailProps {
  name: string;
  searchParams: IRecommendMatchingSearchParamsProps;
  recoType: string;
  screenName: string;
  type?: string;
}
export interface IRecommendMatchingSearchParamsProps {
  subCategorys: number;
  brandId?: number | null;
  filterQuery: string;
  colour?: string | null;
}
