export interface ReorderFiltersOptions {
  key: string;
  value?: string;
  display?: string;
  name?: string;
  type?: string;
}
interface FiltersOptions {
  id: number;
  display: string;
}
interface OptionType {
  key: string | number;
  value: string;
  second: string | number;
  first: string | number;
}

export interface ReorderFiltersProps {
  options?: ReorderFiltersOptions[] | FiltersOptions[] | OptionType[] | null;
  key: string;
  input_type: string;
  apiKey?: string;
  type?: string;
  name?: string;
  label?: string;
  multi?: boolean;
  display: string;
  clearFields?: Array<string>;
  display_position: number;
}

export interface ReorderFiltersObjectProps {
  sideBar: Array<ReorderFiltersProps | any>;
  defaultSelectedValues: any;
  onSubmit: (a: any) => any;
  onChange: (a: any, b: any) => any;
}
