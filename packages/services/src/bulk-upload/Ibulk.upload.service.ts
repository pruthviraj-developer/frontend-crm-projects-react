export interface templateDownloadRes {
  is_available: boolean;
  url: string;
  message: string;
}
export interface bulkUploadParamsType {
  action: string;
}

export interface bulkUploadParams {
  file?: string | Blob;
  params: bulkUploadParamsType;
}
export interface bulkUploadRes {
  action: string;
  error_messages: string[];
  success_messages: string[];
}

export interface templateDownloadParam {
  action: string;
}
