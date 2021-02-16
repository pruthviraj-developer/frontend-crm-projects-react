export interface templateDownloadRes {
  is_available: boolean;
  url: string;
  message: string;
}

export interface bulkUploadData {
  file?: string | Blob;
}

export interface bulkUploadParamsType {
  action: string;
}

export interface bulkUploadParams {
  data: bulkUploadData;
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
