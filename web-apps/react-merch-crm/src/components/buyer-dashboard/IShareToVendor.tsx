export interface IVendors {
  vendorList?: IVendorsOption[] | null;
}
export interface IVendorsOption {
  id: number;
  display: string;
  email: string;
}

export interface OptionsType {
  first: number;
  key: string;
  second: string;
  value: string;
}

export interface IDashboardResponse {
  action?: string;
  message?: string;
  params?: string;
  statusCode?: number;
  data: OptionsType[];
}
