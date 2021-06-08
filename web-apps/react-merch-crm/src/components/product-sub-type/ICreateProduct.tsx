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

export interface IValues {
  key: string;
  value: string | number;
}

export interface IOptionsType {
  value: string | number;
  key: string;
}

export interface IValueOfSelected {
  key: string;
  value: string;
}

export interface ProductAttributeType {
  type: IValueOfSelected;
  uiType: string;
  values: IValueOfSelected[];
}

export interface ProductDataType {
  attributes: ProductAttributeType[];
  categoryId: IValueOfSelected;
  productSubTypeName: string;
  productTypeId: IValueOfSelected;
  subCategoryId: IValueOfSelected;
}

export interface IValuesType {
  attributeList: ProductAttributeType[] | [];
  categoryId: IValueOfSelected;
  productSubTypeName: string;
  productTypeId: IValueOfSelected;
  subCategoryId: IValueOfSelected;
}

export interface IGetProductResponse {
  action: string;
  data: ProductDataType;
  messageList?: string | null;
  statusCode: number;
}

export interface IAttributePostValue {
  attributeId: string | number;
  attributeValues: IValueOfSelected[];
}

export interface IAttributePostValueType {
  attributeId: string | number;
  attributeValues: Array<string> | [];
}

export interface IPostValues {
  categoryId: IValueOfSelected;
  subcategoryId: IValueOfSelected;
  productTypeId: IValueOfSelected;
  productSubtypeName: string;
  attributeList: IAttributePostValue[];
}

export interface IAttributesData {
  attributeId: string | number;
  attributeKey: string;
  attributeName: string;
  label: string;
  note?: string;
  operationType?: string;
  prefix?: string;
  suffix?: string;
  uiType: string;
  valueType: string;
  validations?: Array<string>;
  values: IValueOfSelected[];
}

export interface IAttributeListDataResponse {
  action: string;
  attributes: IAttributesData[] | [];
  message?: Array<string>;
}
