export interface IVendors {
  vendorList?: IVendorsOption[] | null;
}
export interface IVendorsOption {
  id: number;
  display: string;
  email: string;
}
