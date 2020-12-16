export interface MerchStatusChangeType {
  file?: string | Blob;
  params: NonProcParam | NonProcCurrentVendorParam;
}

export interface NonProcParam {
  vendorId?: string;
  brandId?: string;
  reasonId?: string;
  currency?: string;
}

export interface NonProcCurrentVendorParam {
  remark: string;
  fulfillmentstatus: string;
}
