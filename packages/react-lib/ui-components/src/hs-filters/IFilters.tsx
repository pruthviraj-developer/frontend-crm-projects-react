export interface FFiltersOption {
  display: string;
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
  options?: FFiltersOption[] | null;
  key?: string;
  input_type?: string;
}

export interface AutoCompleteOptions {
  key: number | string;
  value?: number | string;
  second?: number | string;
  first?: number | string;
}

export interface IHsFilters {
  sideBar: Array<FFiltersOptions>;
  defaultSelectedValues?: any;
  updateFilters?:(a:any) => void;
}
