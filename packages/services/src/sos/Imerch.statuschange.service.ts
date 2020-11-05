export interface MerchStatusChangeType {
  file?: string | Blob;
  params: NonProcParam | NonProcCurrentVendorParam;
}

export interface NonProcParam {
  // remark: string;
  reason: string;
}

export interface NonProcCurrentVendorParam {
  remark: string;
  fulfillmentstatus: string;
}
