export interface IMipLanding {
  action: string;
  statusCode: number;
  data: Data;
  message?: string;
}

export interface Data {
  totalRecords: number;
  pstGenderList: PstGenderList[];
  pFilters: PFilters;
}

export interface PstGenderList {
  imageUrl: string;
  pstGenderName: string;
  pstId: number;
  gender: string;
  discoveryPidCount: number;
  targetCurrentWidthData: string[][];
  keepCullData: [string, any, any][];
}

export interface PFilters {
  action: string;
  filterSection: FilterSection[];
  selectedFilters: SelectedFilter[];
}

export interface FilterSection {
  shouldHide: boolean;
  showSearch: boolean;
  filterList: FilterList[];
  name: string;
  uiType: string;
  hasSelected: boolean;
  isSingleCategory: boolean;
  isGenericFilter: boolean;
  isMultiSelect: boolean;
}

export interface FilterList {
  filter: Filter[];
}

export interface Filter {
  id: string;
  name: string;
  param: string;
  isSelected: boolean;
  popularityCount: number;
  sectionTracking: string;
  isAttribute: boolean;
}

export interface SelectedFilter {
  key: string;
  param: string;
  sectionTracking: string;
  selectedFilterName: string;
  attribute: boolean;
}
