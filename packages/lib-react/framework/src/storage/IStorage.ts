export interface IFunnelData {
  funnel?: string;
  funnel_tile?: string;
  funnel_section?: string;
  section?: string;
  sub_section?: string;
  source?: string;
  plp?: string;
  quickshop?: string;
  subsection?: string;
}
export interface ISegmentData {
  from_screen?: string;
  from_section?: string;
  extraSegdata?: string;
}

export interface ISortData {
  sortingTiles: SortingTile[];
  expiry: number;
  queryParams: QueryParams;
}

export interface QueryParams {
  homepageSection: string;
  homepageSubSection?: string;
}

export interface SortingTile {
  isSelected: boolean;
  name: string;
  queryParams: QueryParams;
  imageUrl: string;
  ageGroups: AgeGroup[];
  idx: string;
}

export interface AgeGroup {
  isSelected: boolean;
  name: string;
  displayName: string;
  queryParams: QueryParams;
  idx: string;
}
