export interface ReorderFiltersOptions {
  key: string;
  value?: string;
  display?: string;
  name?: string;
}

export interface ReorderFiltersProps {
  options?: ReorderFiltersOptions[] | null;
  key: string;
  input_type: string;
  type?: string;
  name?: string;
  label?: string;
  multi?: boolean;
  display: string;
  clearFields?: Array<string>;
  onChange?: (a: any, b: any) => any;
}

export interface ReorderFiltersObjectProps {
  sideBar: Array<ReorderFiltersProps | any>;
  defaultSelectedValues: any;
  onSubmit: (a: any) => any;
}
