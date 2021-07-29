export interface IVendors {
  vendorList?: IVendorsOption[] | null;
}
export interface IVendorsOption {
  id: number;
  display: string;
}

export interface OptionType {
  id: number | undefined;
  name: string;
}

export interface IVendorDetailsResponse {
  action: string;
  message?: null;
  params?: null;
  statusCode: number;
  data: IVendorDetails;
}

export interface IVendorDetails {
  vendor: IVendorsOption | string | undefined;
  emailIds: Array<string>;
  vendorDetails: IVendorDetailsEntity[];
}

export interface IVendorDetailsEntity {
  categoryId: number | undefined;
  subCategoryId: number | undefined;
  productTypeId: number[];
}
export interface ProductTypeIdEntityOrCategoryIdOrSubCategoryId {
  key: number;
  value: string;
  second: string;
  first: number;
}
export interface CategoryPropsType {
  categoryIdName: string;
  subCategoryIdName: string;
  productTypeIdName: string;
  values: any;
  disabled?: boolean;
}

export interface ISendemail {
  action: string;
  message: string;
  params?: null;
  statusCode: number;
}

export interface ShareToVendorProps {
  header: string;
}
