export interface IVendors {
  vendorList?: IVendorsOption[] | null;
}
export interface IVendorsOption {
  id: number;
  display: string;
  email: string;
}

export interface OptionsType {
  id: number;
  name: string;
}

export interface IDashboardResponse {
  action?: string;
  message?: string;
  params?: string;
  statusCode?: number;
  data: OptionsType[];
}

export interface IInitialProductTypes {
  vendor: number | null;
  emailIds: (string)[] | null;
  vendorDetails: (VendorDetailsEntity)[] | null;
}
interface VendorDetailsEntity {
  categoryId: OptionsType | {};
  subCategoryId: OptionsType;
  productTypeId: (OptionsType)[] | null;
}
