export interface ISelectedProps {
  sortingTiles?: SortingTilesEntity[] | null;
  expiry: number;
  queryParams: SortQueryParams;
}
export interface SortingTilesEntity {
  isSelected: boolean;
  name: string;
  queryParams: QueryParams1;
  imageUrl: string;
  ageGroups?: (AgeGroupsEntity | null)[] | null;
  idx: string;
}
export interface QueryParams1 {
  homepageSection: string;
  homepageSubSection?: string | null;
}
export interface AgeGroupsEntity {
  isSelected: boolean;
  name: string;
  displayName: string;
  queryParams: SortQueryParams;
  idx: string;
}
export interface SortQueryParams {
  homepageSection: string;
  homepageSubSection: string;
}
