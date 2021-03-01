export interface FiltersOptions {
  key: string;
  value?: string;
  display?: string;
}

export interface Filters {
  options?: FiltersOptions[] | null;
  key: string;
  input_type: string;
  type?: string;
  name?: string;
  label?: string;
  multi?: boolean;
  display: string;
}

export interface FiltersObject {
  sideBar: Array<Filters>;
  defaultSelectedValues: Record<string, string>;
  onSubmit: (a: any) => void;
}
