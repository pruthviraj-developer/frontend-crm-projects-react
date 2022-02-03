interface state {
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
}

export interface FiltersOption {
  display: string;
  id?: string | number;
  currencyCode?: string;
  key?: string | number;
  value: string | number;
  first?: string;
  second?: string;
}

export interface Ilist {
  key: string;
  options: Array<FiltersOption>;
}

export interface FiltersOptions {
  isSelect?: boolean;
  name: string;
  label: string;
  type?: string;
  resetField?: string;
  options?: any;
  key?: string;
  input_type?: string;
}

export interface AutoCompleteOptions {
  key: number | string;
  value?: number | string;
  second?: number | string;
  first?: number | string;
}

export interface FiltersListPageProps {
  objectsList?: Array<Ilist>;
  sideBar: Array<any>;
  toggleSideBar?: state;
  updatedFilter: (a: any, b: any) => void;
  updateFiltersList: (a: any) => void;
}

export interface IHsFiltersList {
  sideBar: Array<any>;
  sideBarState?: state;
  defaultSelectedValues?: any;
  updateFilter: (a: any, b: any) => void;
  updateFilters?: (a: any) => void;
  updateRemovedFilters?: (a: any) => void;
}
