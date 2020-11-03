export interface MerchStatusChangeType {
  file: string | Blob;
  params: NonProcParam;
}

export interface NonProcParam {
  remark: string;
  reason: string;
}
