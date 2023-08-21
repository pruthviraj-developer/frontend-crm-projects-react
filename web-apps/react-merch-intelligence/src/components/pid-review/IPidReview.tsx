export interface IPidReview {
  action: string;
  statusCode: number;
  data: Data;
  message?: string;
}

export interface Data {
  dashboardText: string;
  totalRecords: number;
  targetCurrentWidthData: string[][];
  keepCullData: string[][];
  salesMixAndInventoryMixes: string[][];
  discoveryProductDetails: DiscoveryProductDetails;
  inStockCatalogProductDetails: InStockCatalogProductDetails;
  oosBestSellerProductDetails: OosBestSellerProductDetails;
  oosTailProductDetails: OosTailProductDetails;
  sortingOptions: SortingOption[];
  pFilters: PFilters;
}

export interface DiscoveryProductDetails {
  bifurgationName: string;
  productCount: number;
  productList: ProductList[];
}

export interface ProductList {
  productId: number;
  imageUrl: string;
  pidData: string[][];
  discoveryDecision: string;
  isDecisionTaken: boolean;
}

export interface InStockCatalogProductDetails {
  bifurgationName: string;
  productCount: number;
  productList: any[];
}

export interface OosBestSellerProductDetails {
  bifurgationName: string;
  productCount: number;
  productList: any[];
}

export interface OosTailProductDetails {
  bifurgationName: string;
  productCount: number;
  productList: any[];
}

export interface SortingOption {
  orderRule: string;
  sortName: string;
  eventSortName: string;
  isSelected: boolean;
}

export interface PFilters {
  action: string;
  filterSection: FilterSection[];
  selectedFilters: any[];
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

export interface IuseParams {
  gender: string;
  id: string;
  pstName: string;
}
