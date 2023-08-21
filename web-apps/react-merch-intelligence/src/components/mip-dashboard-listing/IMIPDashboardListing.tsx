import { tableDataType } from '@hs-crm/components';
import { IPlpFilterEntityProps } from '@hs-crm/components';
export interface MipListingProps {
  action: string;
  statusCode: number;
  data: Data;
}

export interface Data {
  mskuData: tableDataType;
  totalRecords: number;
  productList: ProductList[];
  pFilters: IPlpFilterEntityProps;
  salesMixAndInventoryMixes: tableDataType;
  mandatoryRows: number;
  dashboardText: string;
}

export interface ProductList {
  imageUrl: string;
  productId: number;
  status: string;
  pidData: tableDataType;
  discoveryDecision: string;
  catalog: boolean;
  isDecisionTaken: boolean;
}

export interface PidTableData {
  label: string;
  value: number;
}

export interface PFilters {
  action: string;
  filterSection: FilterSection[];
  selectedFilters: any[];
}

export interface FilterSection {
  isSingleCategory: boolean;
  isGenericFilter: boolean;
  name: string;
  shouldHide: boolean;
  isMultiSelect: boolean;
  showSearch: boolean;
  filterList: FilterList[];
  uiType?: string;
  hasSelected?: boolean;
}

export interface FilterList {
  filter: Filter[];
}

export interface Filter {
  popularityCount?: number;
  id: string;
  name: string;
  param: string;
  value?: string;
  isSelected: boolean;
  sectionTracking: string;
  isAttribute: boolean;
}

export interface urlParamsProps {
  id: string;
}
