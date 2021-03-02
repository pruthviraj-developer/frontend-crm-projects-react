export interface ReorderFiltersOptions {
  key: string;
  value?: string;
  display?: string;
  name?: string;
}

export interface ReorderFilters {
  options?: ReorderFiltersOptions[] | null;
  key: string;
  input_type: string;
  type?: string;
  name?: string;
  label?: string;
  multi?: boolean;
  display: string;
  clearFields?: Array<string>;
}

export interface ReorderFiltersObject {
  sideBar: Array<ReorderFilters | any>;
  defaultSelectedValues: any;
  onSubmit: (a: any) => void;
}
