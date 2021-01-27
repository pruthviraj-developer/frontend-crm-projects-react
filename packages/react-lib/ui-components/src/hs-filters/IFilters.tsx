interface state {
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
}

export interface FFiltersOption {
  display?: string;
  id?: string | number;
  currencyCode?: string;
  key?: string | number;
  value: string | number;
  first?: string;
  second?: string;
}

export interface FFiltersOptions {
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
  display?: number | string;
}

export interface IHsFilters {
  sideBar: Array<FFiltersOptions>;
  sideBarState?: state
  defaultSelectedValues?: any;
  updateFilters?:(a:any) => void;
}
