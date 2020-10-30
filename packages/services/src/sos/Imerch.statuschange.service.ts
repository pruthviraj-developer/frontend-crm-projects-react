export interface MerchStatusChangeType {
  file?: File;
  params: NonProcParam;
}

export interface NonProcParam {
  remark: string;
  reason: string;
}
