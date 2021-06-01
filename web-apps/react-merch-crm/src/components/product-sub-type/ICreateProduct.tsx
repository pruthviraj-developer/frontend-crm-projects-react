export interface ICreateProductSubtypeProps {
  header: string;
}

export interface IUrlParamsEntity {
  id: string;
}

export interface IOptionType {
  key: string | number;
  value: string;
  second: string | number;
  first: string | number;
}

export interface IProductListType {
  productCategoryId: string | number;
  productCategoryName: string;
  productSubCategoryId: string | number;
  productSubCategoryName: string;
  productSubtypeId: string | number;
  productSubtypeName: string;
  productTypeId: string | number;
  productTypeName: string;
  status: string;
}

export interface IProductType {
  message?: string;
  productSubtypeList?: IProductListType[];
  status: string;
  totalCount?: number;
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

export interface IValues {
  key: string;
  value: string | number;
}

export interface IOperationType {
  displayName?: string;
  key: string;
  value: string;
}

export interface IAttributeItems {
  attributeId: number | string;
  attributeKey: string;
  attributeName: string;
  label?: string;
  note?: string;
  prefix?: string;
  suffix?: string;
  uiType: string;
  validations?: [] | null;
  valueType: string;
  values?: IValues[];
  key?: string;
  operationType: IOperationType[] | null;
}

export interface IAttributeResponse {
  [key: string]: IAttributeItems;
}

export interface ICategoryData {
  key: number;
  name: string;
}

export interface IAttributeResponseData {
  attributes: IAttributeResponse;
  category: ICategoryData[];
}

export interface IAttributeListItem {
  action?: string;
  data: IAttributeResponseData | null;
  statusCode?: number;
}

export interface ISelectedAttributesType {
  [key: string]: any;
}

export interface IOptionsType {
  value: string | number;
  key: string;
}

export interface IAddItemsType {
  display: string;
  label: string;
  display_position: number;
  key: string;
  operationType: IOperationType[] | null;
  options: IOptionsType | any;
  uiType: string;
  values?: IOperationType;
}

export interface IDeleteItemsType {
  display: string;
  label: string;
  display_position: number;
  key: string;
  operationType: IOperationType | null;
  options: IOptionsType | any;
  uiType: string;
  values?: IOperationType;
}

export enum ActionType {
  removeItems = 'removeItem',
  addItems = 'addItem',
}

export type Action = [ActionType.removeItems, string[]] | [ActionType.addItems, IProductDropDownProps[]];
