export interface MerchStatusChangeType {
  file?: string | Blob;
  params: NonProcParam | NonProcCurrentVendorParam;
}

export interface NonProcParam {
  reasonId: string;
}

export interface NonProcCurrentVendorParam {
  remark: string;
  fulfillmentstatus: string;
}
