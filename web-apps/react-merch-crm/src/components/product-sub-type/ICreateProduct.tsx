export interface ICreateProductSubtypeProps {
  header: string;
}

export interface IUrlParamsEntity {
  cat_id: string;
  subcat_id: string;
  prod_type_id: string;
}

export interface IOptionType {
  key: string | number;
  value: string;
  second: string | number;
  first: string | number;
}

export interface IProductDropdowns {
  display: string;
  options?: IOptionType[] | any;
  key: string;
  display_position: number;
}

export interface IProductDropDownProps {
  options?: IProductDropdowns[] | null;
  key: string;
  input_type?: string;
  apiKey?: string;
  type?: string;
  name?: string;
  label?: string;
  multi?: boolean;
  disabled?: boolean;
  display: string;
  clearFields?: Array<string>;
  display_position: number;
}

export enum ActionType {
  removeItems = 'removeItem',
  addItems = 'addItem',
}

export type Action = [ActionType.removeItems, string[]] | [ActionType.addItems, IProductDropDownProps[]];
